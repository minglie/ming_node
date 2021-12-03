var M=require("../index");
const MemoryBaseRestApi= require("../plugins/BaseRestApi/MemoryBaseRestApi");

let memoryBaseRestApi = new MemoryBaseRestApi({tableName:"ming",generateTime:true})
var app=M.server();
app.listen(8888);

app.use(memoryBaseRestApi);
