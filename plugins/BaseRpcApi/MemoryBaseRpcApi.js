/**
 * 数据源为内存的rpc风格接口
 */
const MemoryDb=require("../../module/MemoryDb");
const AbstractBaseRpc=require("./AbstractBaseRpc");

class MemoryBaseRpcApi extends AbstractBaseRpc{

    constructor(props) {
       super(props);
       this.memoryDb=new MemoryDb(props.tableName);
    }
    async add(obj){
        let r= this.memoryDb.add(obj);
        return r;
    }

    async delete(obj){
        let r= this.memoryDb.deleteAll(obj);
        return r;
    }

    async list({page,num,queryCase}){
        let r= this.memoryDb.listByPage(page,num,queryCase);
        return r;
    }

    async listAll(obj){
        let r= this.memoryDb.listAll(obj);
        return r;
    }

    async update(obj){
        let r= this.memoryDb.update(obj);
        return r;
    }

    async getChildenList(id,caseObj){
        let r= this.memoryDb.listAll({parent_id:id,...caseObj});
        return r;
    }
}


module.exports = MemoryBaseRpcApi;