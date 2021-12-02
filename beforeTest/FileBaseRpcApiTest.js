var M=require("../index");
const FileBaseRpcApi= require("../plugins/BaseRpcApi/FileBaseRpcApi");

let fileBaseRpcApi = new FileBaseRpcApi({prefix:"ming", tableName:"a.json"})
var app=M.server();
app.listen(8888);

app.use(fileBaseRpcApi);
