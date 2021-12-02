/**
 * 数据源为内存的rpc风格接口
 */
const M=require("../../index")
const AbstractBaseRpc=require("./AbstractBaseRpc");
const MiApiCloudClient=require("../../module/MiApiCloudClient")

class ApiCloudBaseRpcApi extends AbstractBaseRpc{
    constructor(props) {
        super(props);
    }
    async add(obj){
        obj.id = M.randomStr();
        M.addObjToFile(this.tableName, obj);
        return obj;
    }

    async delete(obj){


    }

    async getById(id){

    }

    async list({page=1,num=10,queryCase}){

    }

    async listAll(obj){

    }

    async update(obj){

    }

    async getChildenList(id,caseObj){

    }
}


module.exports = FileBaseRpcApi;