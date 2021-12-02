/**
 * 数据源为内存的rpc风格接口
 */
const M=require("../../index")
const AbstractBaseRpcApi=require("./AbstractBaseRpcApi");
const MiApiCloudClient=require("../../module/MiApiCloudClient")

class ApiCloudBaseRpcApi extends AbstractBaseRpcApi{
    constructor(props) {
        super(props);
        this.appid=props.appid;
        this.appkey=props.appkey;
        this.miApiCloudClient = new MiApiCloudClient("A6032931027980", "FF279F8E-8B09-5F1A-1036-F6AE53F3538D");
        this.tableClient= this.miApiCloudClient.tableClient(props.tableName)

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