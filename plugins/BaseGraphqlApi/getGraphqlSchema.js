M=require("../../index");
const Db=M.getMySql({});
const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLBoolean,
} = require('graphql');


function getGraphTypeBySqlType(sqlType) {
    sqlType = sqlType.toLowerCase();
    if (sqlType.indexOf("string") >= 0 || sqlType.indexOf("varchar") >= 0 || sqlType.indexOf("text") >= 0) {
        return GraphQLString;
    } else if (sqlType.indexOf("int") >= 0) {
        return GraphQLInt;
    } else if (sqlType.indexOf("date") >= 0 || sqlType.indexOf("time") >= 0) {
        return GraphQLString;
    } else if (sqlType.indexOf("double") >= 0) {
        return GraphQLFloat;
    } else if (sqlType.indexOf("float") >= 0) {
        return GraphQLFloat;
    } else if (sqlType.indexOf("decimal") >= 0) {
        return GraphQLFloat;
    }
    return GraphQLString;
}


function obj2QueryCase(obj){
    let queryCase="1=1";
    if(obj && Object.keys(obj).length>0){
        for(var p in obj) {
            queryCase=queryCase+` and ${p}='${obj[p]}' `
        }
    }
    return queryCase;

}

async function getGraphqlSchema({dbBaseMapper,generateTime}){
    let tableName=dbBaseMapper.tableName;
    let tableSchema=await dbBaseMapper.getTableSchema()
    const ResponseType =  new GraphQLObjectType({
        name:'response',
        fields:{
            code:{type:GraphQLInt},
            msg:{type:GraphQLString},
            data:{type:GraphQLString},
        }
    })
    let qlObjectTypeParams={};
    qlObjectTypeParams.name=tableName;
    qlObjectTypeParams.fields={};
       tableSchema.forEach(u=>{
           qlObjectTypeParams.fields[u.column_name]={
                type:getGraphTypeBySqlType(u.column_type),
                description:u.column_comment};
         })
    const qlObjectType = new GraphQLObjectType(qlObjectTypeParams)
    const RootQuery = new GraphQLObjectType({
        name:tableName+'Query',
        fields:{
            rows:{
                type: new GraphQLList(qlObjectType),
                args:{...qlObjectTypeParams.fields,
                        page:{type:GraphQLInt, description:"页码"},
                        num:{type:GraphQLInt, description:"每页条数"},
                        order:{type:GraphQLInt, description:"排序"}
                     },
                async resolve(parentValue,args){
                    const {page=1,num=10,order="id",...queryCase}=args;
                    const queryCaseStr=  obj2QueryCase(queryCase);
                    return dbBaseMapper.selectPurePageList({
                        page,
                        num,
                        order,
                        queryCase:queryCaseStr})
                    //return Db.doSql(`select * from person`);
                }
            },
            total:{
                    type: GraphQLInt,
                    args:qlObjectTypeParams.fields,
                    async resolve(parentValue,args){
                        const {page=1,num=10,order="id",...queryCase}=args;
                        const queryCaseStr=  obj2QueryCase(queryCase);
                        return dbBaseMapper.selectCount({queryCase:queryCaseStr})
                    }
            }
        }
    })

    var mutation = new GraphQLObjectType({
        name:tableName+"Mutation",
        fields:{
            add:{
                type:ResponseType,
                args:qlObjectTypeParams.fields,
                async resolve(parenValue,args){
                    if(generateTime){
                        args.gmt_create=new Date().format("yyyy-MM-dd hh:mm:ss");
                    }
                    await dbBaseMapper.insert(args);
                    return {code:0,msg:"success"}
                }
            },
            update:{
                type:ResponseType,
                args:qlObjectTypeParams.fields,
                async resolve(parenValue,args){
                     const   {id,...updateObj}=args;
                    if(generateTime){
                        updateObj.gmt_modified=new Date().format("yyyy-MM-dd hh:mm:ss");
                    }
                     await dbBaseMapper.update(updateObj,`id=${id}`)
                     return {code:0,msg:"success"}
                   }
                }
            ,
            delete:{
                type:ResponseType,
                args:qlObjectTypeParams.fields,
                async resolve(parenValue,args){
                    const queryCaseStr=  obj2QueryCase(args);
                    await dbBaseMapper.delete(queryCaseStr);
                    return {code:0,msg:"ok"}
                }
            }
        }

    })
    const schema = new GraphQLSchema({
        query: RootQuery,
        mutation: mutation
    })
    return schema;
}



module.exports=getGraphqlSchema;