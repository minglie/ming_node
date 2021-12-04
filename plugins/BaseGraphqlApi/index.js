var getGraphqlSchema= require("./getGraphqlSchema")
const { graphqlHTTP } = require('express-graphql')

class BaseGraphqlApi{
    constructor({dbBaseMapper,prefix,generateTime}) {
        this.dbBaseMapper=dbBaseMapper;
        this.tableName=dbBaseMapper.tableName;
        this.prefix=prefix?prefix:tableName;
        this.generateTime=generateTime;
    }
    async install(app,args){
        let schema=await getGraphqlSchema({
            dbBaseMapper:this.dbBaseMapper,
            generateTime:this.generateTime}
        );

        app.mapping(`/${this.prefix}`,graphqlHTTP({
            schema:schema,
            graphiql:true
        }))
    }
}
module.exports = BaseGraphqlApi;