/**
 * @type {MemoryDb|{}}
 */
const M=require("../../index");
const AbstractBaseRpc=require("./AbstractBaseRpc");


class MongoDbBaseRpcApi extends AbstractBaseRpc{
    constructor(props) {
        super(props);
        this.mongoDb=M.mongoDb;
    }

    async add(obj){
        let r= this.mongoDb.insert(this.tableName,obj);
        return r;
    }

    async delete(obj){
        let r= this.dbBaseMapper.delete(obj);
        return r;
    }

    async getById(id){
        let r=await this.mongoDb.getById(this.tableName,id);
        return r;
    }

    async list({page,num,queryCase}){


        return r;
    }

    async listAll(obj){
        let r= this.mongoDb.find(this.tableName,obj);
        return r;
    }

    async update(obj){
        let {id,...newObj}=obj;
        let r= this.dbBaseMapper.update(newObj,`id=${id}`);
        return r;
    }

    async getChildenList(id,caseObj){
        let r= this.listAll({parent_id:id,...caseObj});
        return r;
    }

}


module.exports = MongoDbBaseRpcApi;