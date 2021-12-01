const MemoryDb=require("../../module/MemoryDb")
const M=require("../../index");
const memoryDb = new MemoryDb();

class BaseRpcApi{

    constructor({tableName,prefix,dataSourceType}) {
        this.tableName=tableName;
        this.prefix=prefix?prefix:tableName;
        this.dataSourceType=dataSourceType;

    }

    async add(obj){
        let r= memoryDb.add(obj);
        return r;
    }

    async delete(obj){
        let r= memoryDb.deleteAll(obj);
        return r;
    }

    async list(obj){
        let r= memoryDb.listByPage({startPage:0,limit:3,caseObj});
        return r;
    }

    async update(obj){
        let r= memoryDb.listByPage({startPage:0,limit:3,caseObj});
        return r;
    }

    install(app,args){
        const M=app.M;
        app.post(`${this.prefix}/add`,async (req,res)=>{
            let r=await this.add(req.params)
            res.send(M.successResult(r));
        })
    }
}