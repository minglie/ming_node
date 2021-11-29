const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


function PersonType(){

    const dbmoduleType = new GraphQLObjectType({
        name:'person',
        fields:{
            id:{type:GraphQLInt},
            name:{type:GraphQLString}
        }
    })
    return dbmoduleType;
}



module.exports = PersonType;

