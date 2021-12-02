/**
 * 数据源为内存的rpc风格接口
 */
const M=require("../../index")
const AbstractBaseRpc=require("./AbstractBaseRpc");

class FileBaseRpcApi extends AbstractBaseRpc{
    constructor(props) {
        super(props);
    }
    async add(obj){
        obj.id = M.randomStr();
        M.addObjToFile(this.tableName, obj);
        return obj;
    }

    async delete(obj){
        if (obj) {
            M.deleteObjByPropFile(this.tableName, o);
        } else {
            M.writeObjToFile(this.tableName,[]);
        }
        return r;
    }

    async list({page=1,num=10,queryCase}){
        page=Number.parseInt(page);
        num=Number.parseInt(num);
        if (page <= 0) page = 1;
        let rows =await this.listAll(queryCase);
        let total = rows.length;
        rows = rows.splice((page - 1) * num, num)
        return {rows, total}
    }

    async listAll(obj){
        if (obj) {
            return M.listAllObjByPropFile(this.tableName, obj);
        } else {
            return M.getObjByFile(this.tableName);
        }
    }

    async update(obj){
        let r=  M.updateObjByIdFile(this.tableName,obj);
        return r;
    }

    async getChildenList(id,caseObj){
        let r= this.listAll({parent_id:id,...caseObj});
        return r;
    }
}


module.exports = FileBaseRpcApi;