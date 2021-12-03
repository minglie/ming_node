var M=require("../index");
const MysqlBaseRestApi= require("../plugins/BaseRestApi/MysqlBaseRestApi");

M.getMySql({
    database:"miapi"
})


let mysqlBaseRestApi = new MysqlBaseRestApi({tableName:"ming",generateTime:true})
var app=M.server();
app.listen(8888);

app.use(mysqlBaseRestApi);
