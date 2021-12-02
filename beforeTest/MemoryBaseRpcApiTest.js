var M=require("../index");
const MemoryBaseRpcApi= require("../plugins/BaseRpcApi/MemoryBaseRpcApi");

let memoryBaseRpcApi = new MemoryBaseRpcApi({tableName:"ming",generateTime:true})
var app=M.server();
app.listen(8888);

app.use(memoryBaseRpcApi);
