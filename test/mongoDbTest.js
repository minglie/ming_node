var M=require("../index");

/**
 * "mongodb": "^3.6.8"
 */
Db= M.getMongoDB({
    dbUrl: "mongodb://root:123456@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=miapi",
    dbName:"miapi"
 })
//设置表名
Db.collectionName="test"

async function  main() {
    setTimeout(async ()=>{
           //根据id查询
            d = await Db.getById("60ae3485d6070000d8002c54")
            console.log("getById",d)
            //添加
             d =await Db.insert({"name":"ls"})
             console.log("insert",d)
            //修改
            d =await Db.update({_id:Db.ObjectID("60ae3485d6070000d8002c54")},{name:"wwwe"})
            console.log("update",d)

            //查询
            d =await Db.find({name:"wwwe"})
            console.log("find",d)

            //批量添加
            d =await Db.insertMany([{name:"wwwe"},{"name":"ww"}])
            console.log("insertMany",d)

            //删除
            d =await Db.remove({_id:Db.ObjectID("60ae3a4b532c42adf436afbf")})
            console.log("insertMany",d)

             //原始client
             d=  await   Db.dbClient.collection("test").find({"name":"ls"})
             console.log("Db.dbClient.collection",d)

    },2000)

}


main()