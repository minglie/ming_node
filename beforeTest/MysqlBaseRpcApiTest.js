var M=require("../index");


M.getMySql({
    database:"miapi"
})



const MysqlBaseRpcApi= require("../plugins/BaseRpcApi/MysqlBaseRpcApi");



let mysqlBaseRpcApi = new MysqlBaseRpcApi({tableName:"ming",generateTime:true})
var app=M.server();
app.listen(8888);

app.use(mysqlBaseRpcApi);
