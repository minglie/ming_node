var getGraphqlSchema= require("./getGraphqlSchema")
const { graphqlHTTP } = require('express-graphql')

class BaseGraphqlApi{
    constructor({dbBaseMapper,prefix}) {
        this.dbBaseMapper=dbBaseMapper;
        this.tableName=dbBaseMapper.tableName;
        this.prefix=prefix?prefix:tableName;
    }
    install(app,args){
        let schema= getGraphqlSchema( this.dbBaseMapper)
        app.mapping(`/${this.prefix}`,graphqlHTTP({
            schema:schema,
            graphiql:true
        }))
    }
}
module.exports = BaseGraphqlApi;