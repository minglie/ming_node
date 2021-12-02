var M=require("../index");


Db= M.getMongoDB({
    dbUrl: "mongodb://root:123456@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=miapi",
    dbName:"miapi"
})



const MongoDbBaseRpcApi= require("../plugins/BaseRpcApi/MongoDbBaseRpcApi");



let mongoDbBaseRpcApi = new MongoDbBaseRpcApi({tableName:"test",prefix:"ming", generateTime:true})
var app=M.server();
app.listen(8888);

app.use(mongoDbBaseRpcApi);
