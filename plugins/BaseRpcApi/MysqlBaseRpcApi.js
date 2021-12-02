/**
 * @type {MemoryDb|{}}
 */

const BaseMapper=require("../../module/BaseMapper");
const AbstractBaseRpc=require("./AbstractBaseRpc");


class MysqlBaseRpcApi extends AbstractBaseRpc{
    constructor(props) {
        super(props);
        this.dbBaseMapper= new BaseMapper(this.tableName);
    }

    async add(obj){
        if(obj.gmt_create){
            obj.gmt_create=obj.gmt_create.format("yyyy-MM-dd hh:mm:ss");
        }
        let r= this.dbBaseMapper.insert(obj);
        return r;
    }

    async delete(obj){
        let r= this.dbBaseMapper.delete(obj);
        return r;
    }

    async getById(id){
        let r=await this.dbBaseMapper.selectById({id});
        return r;
    }

    async list({page,num,queryCase}){
        let queryCaseStr= MysqlBaseRpcApi.obj2QueryCase(queryCase);
        let r= this.dbBaseMapper.selectPage({page,num,queryCase:queryCaseStr});
        return r;
    }

    async listAll(obj){
        let queryCase= MysqlBaseRpcApi.obj2QueryCase(obj);
        let r= this.dbBaseMapper.selectList({queryCase:queryCase});
        return r;
    }

    async update(obj){
        if(obj.gmt_modified){
            obj.gmt_modified=obj.gmt_modified.format("yyyy-MM-dd hh:mm:ss");
        }
        let {id,...newObj}=obj;
        let r= this.dbBaseMapper.update(newObj,`id=${id}`);
        return r;
    }

    async getChildenList(id,caseObj){
        let r= this.listAll({parent_id:id,...caseObj});
        return r;
    }

    static obj2QueryCase(obj){
        let queryCase="1=1";
        if(obj && Object.keys(obj).length>0){
            for(var p in obj) {
                queryCase=queryCase+` and ${p}='${obj[p]}' `
            }
        }
        return queryCase;

    }
}


module.exports = MysqlBaseRpcApi;