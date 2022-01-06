/**
 * 数据源为内存的rpc风格接口
 */
const FileDb=require("../../module/FileDb");
const AbstractBaseRpcApi=require("./AbstractBaseRpcApi");

class FileBaseRpcApi extends AbstractBaseRpcApi{

    constructor(props) {
        super(props);
        if(props.readFromMemory==null){
            props.readFromMemory=true;
        }
        this.fileDb=new FileDb(props.tableName,props.readFromMemory);
    }
    async add(obj){
        let r= this.fileDb.add(obj);
        return r;
    }

    async delete(obj){
        let r= this.fileDb.deleteAll(obj);
        return r;
    }

    async getById(id){
        let r=this.fileDb.getById(id);
        return r;
    }

    async list({page,num,order,queryCase}){
        let r= this.fileDb.listByPage({page,num,caseObj:queryCase,order});
        return r;
    }

    async listAll(obj){
        let r= this.fileDb.listAll(obj);
        return r;
    }

    async update(obj){
        let r= this.fileDb.update(obj);
        return r;
    }

    async getChildenList(id,caseObj){
        let r= this.fileDb.listAll({parent_id:id,...caseObj});
        return r;
    }
}


module.exports = FileBaseRpcApi;