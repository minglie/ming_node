/**
 * 数据源为内存的rpc风格接口
 */
const AbstractBaseRpcApi=require("./AbstractBaseRpcApi");


class ApiCloudBaseRpcApi extends AbstractBaseRpcApi{
    constructor(props) {
        super(props);
        this.appid=props.appid;
        this.appkey=props.appkey;
        this.apiCloudClient = props.apiCloudClient;
        this.tableClient= this.apiCloudClient.tableClient(props.tableName);
    }
    async add(obj){
       let r= await this.tableClient.add(obj);
       return r;
    }

    async delete(obj){
        let r= await this.tableClient.delete(obj);
        return r;
    }

    async getById(id){
        let r=await this.tableClient.list({id},null,null,"sort");
        return r[0];
    }

    async list({page=1,num=10,order="createdAt ASC",queryCase}){
        page=Number.parseInt(page);
        num=Number.parseInt(num);
        let limit=num;
        let skip= (page-1)*num
        let rows=await this.tableClient.list(queryCase,limit,skip,order);
        let countResult=await this.tableClient.count(queryCase);
        return {rows, total:countResult.count}
    }

    async listAll(obj){
        let r=await this.tableClient.list(obj,null,null,"sort");
        return r;
    }

    async update(obj){
        let r=  await this.tableClient.update(obj);
        return r;
    }

    async getChildenList(id,caseObj){
        let r= this.listAll({parent_id:id,...caseObj});
        return r;
    }
}


module.exports = ApiCloudBaseRpcApi;