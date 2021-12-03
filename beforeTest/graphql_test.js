var M = require('../index');
var BaseMapper=require("../module/BaseMapper")
var Db=M.getMySql({
    "database" : "miapi"
})
let dbBaseMapper= new BaseMapper("person");
const BaseGraphqlApi= require("../plugins/BaseGraphqlApi/index");
let baseGraphqlApi = new BaseGraphqlApi({prefix:"person", dbBaseMapper});

var app = M.server()
app.listen(4000)
app.use(baseGraphqlApi);
