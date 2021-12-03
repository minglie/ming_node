var M=require("../index");


Db= M.getMongoDB({
    dbUrl: "mongodb://root:123456@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=miapi",
    dbName:"miapi"
})



const MongoDbBaseRestApi= require("../plugins/BaseRestApi/MongoDbBaseRestApi");



let mongoDbBaseRestApi = new MongoDbBaseRestApi({tableName:"test",prefix:"ming", generateTime:true})
var app=M.server();
app.listen(8888);

app.use(mongoDbBaseRestApi);
