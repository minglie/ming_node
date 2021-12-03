M=require("../../index")

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');




function getGraphqlSchema({dbBaseMapper}){
    const ResponseType =  new GraphQLObjectType({
        name:'response',
        fields:{
            status:{type:GraphQLInt},
            msg:{type:GraphQLString}
        }
    })

    const qlObjectType = new GraphQLObjectType({
        name:'person',
        fields:{
            id:{type:GraphQLInt},
            name:{type:GraphQLString}
        }
    })

    const RootQuery = new GraphQLObjectType({
        name:'personQuery',
        fields:{
            person:{
                type: new GraphQLList(qlObjectType),
                args:{
                    id:{type:GraphQLInt},
                    name:{type:GraphQLString}
                },
                async resolve(parentValue,args){
                    return Db.doSql(`select * from person`);
                }
            }
        }
    })

    var mutation = new GraphQLObjectType({
        name:"Mutation",
        fields:{
            addPerson:{
                type:ResponseType,
                args:{
                    name:{type:GraphQLString}
                },
                async resolve(parenValue,args){
                    //await personDao.insert(args.name)
                    return {status:0,msg:"ok"}
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