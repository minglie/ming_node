const M=require("ming_node")
const Db=M.getMySql({})

class BaseMapper {
    constructor(tableName) {
        this.tableName =tableName;
    }

    /**
     * 单个加
     * @param obj
     * @returns {Promise<*>}
     */
    async insert(obj){
        let sql=  BaseMapper.getInsertObjSql(this.tableName,obj)
        let r=await Db.doSql(sql);
        return r;
    }


    async replace(obj){
        let sql=  BaseMapper.getReplaceObjSql(this.tableName,obj)
        let r=await Db.doSql(sql);
        return r;
    }

    /**
     * 批量加
     * @param objs
     * @returns {Promise<*>}
     */
    async batchInsert(objs){
        let batchInsertSql="";
        for (let i=0;i<objs.length;i++){
            let sql=  BaseMapper.getInsertObjSql(this.tableName,objs[i])
            batchInsertSql=batchInsertSql+sql+"\n"
        }
        let r=await Db.doSql(batchInsertSql);
        return r;
    }

    /**
     * 根据id改
     * @param obj
     * @param caseStr
     * @returns {Promise<*>}
     */
    async update(obj,caseStr){
        let sql=  BaseMapper.getUpdateObjSql(this.tableName,obj,caseStr)
        let r=await Db.doSql(sql);
        return r;
    }

    /**
     *根据条件改
     * @param caseStr
     * @returns {Promise<*>}
     */
    async delete(caseStr){
        let sql=  BaseMapper.getDeleteObjSql(this.tableName,caseStr)
        let r=await Db.doSql(sql);
        return r;
    }
    /**
     * 根据id删
     * @param caseStr
     * @returns {Promise<*>}
     */
    async deleteById(id){
        let sql=  BaseMapper.getDeleteObjSql(this.tableName,"id="+id);
        let r=await Db.doSql(sql);
        return r;
    }

    /**
     * 通过id查
     * @param id
     * @param columns
     * @returns {Promise<null|*>}
     */
    async selectById({id,columns}){
        if(!id){return null;}
        let queryColumn=BaseMapper.getColumn(columns);
        let r= await Db.doSql(`select ${queryColumn} from ${this.tableName} where id=${id}`);
        let res=  BaseMapper.getFirstRecord(r)
        return res;
    }

    /**
     * 通过ids查
     * @param ids
     * @param columns
     * @returns {Promise<*|null>}
     */
    async selectBatchIds({ids=[],columns}){
        if(!ids || ids.length==0){return null;}
        let queryColumn=BaseMapper.getColumn(columns);
        let r= await Db.doSql(`select ${queryColumn} from ${this.tableName} where id in (${ids.join()})`);
        return r;
    }


    /**
     * 通过queryCase查
     * @param queryCase
     * @param columns
     * @returns {Promise<*>}
     */
    async selectOne({queryCase="1=1",columns}){
        let queryColumn=BaseMapper.getColumn(columns);
        let dataList=await Db.doSql(`SELECT ${queryColumn} FROM ${this.tableName} where ${queryCase}   LIMIT 1`);
        let res=  BaseMapper.getFirstRecord(dataList)
        return res;
    }

    /**
     * 查个数
     * @param queryCase
     * @returns {Promise<{}|*>}
     */
    async selectCount({queryCase="1=1"}) {
        let dataList=await Db.doSql(`SELECT count(1) c FROM ${this.tableName} where ${queryCase}`);
        return dataList[0].c;
    }

    /**
     * 分页查
     * @param page
     * @param num
     * @param queryCase
     * @param columns
     * @param order
     * @returns {Promise<{total: (*|{}), dataList: *}>}
     */
    async selectPage({page=1,num=10,queryCase="1=1", columns="*",order="id desc"}){
        let start = (page - 1) * num;
        let whereCase=queryCase;
        let queryColumn=BaseMapper.getColumn(columns);
        let dataList=await Db.doSql(`SELECT ${queryColumn} FROM ${this.tableName} where ${whereCase} order by ${order}  LIMIT ${start},${num}`)
        let totalR=await Db.doSql(`SELECT count(1) c FROM ${this.tableName}  where ${whereCase}`)
        let total=totalR[0].c
        return {dataList,total};
    }

    /**
     * 列表
     * @param columns
     * @param queryCase
     * @param order
     * @param limit
     * @returns {Promise<*>}
     */
    async selectList({ columns="*",queryCase="1=1", order="id desc",limit=10000}){
        let queryColumn=BaseMapper.getColumn(columns);
        let whereCase=queryCase;
        let dataList=await Db.doSql(`SELECT ${queryColumn} FROM ${this.tableName} where ${whereCase} order by ${order}  LIMIT ${limit}`)
        return dataList;
    }

    /**
     * 查后代
     * @param parent_id
     * @param queryCase
     * @returns {Promise<*>}
     */
    async selectDescendantIdList({parent_id=-1, queryCase="1=1"}){
        let sql=`
           select id from (
                select t1.id,
                if(find_in_set(parent_id, @pids) > 0, @pids := concat(@pids, ',', id), 0) as ischild
                from (
                 select id,parent_id from ${this.tableName} t WHERE ${queryCase}  order by parent_id, id
                ) t1,
                (select @pids := ${parent_id}) t2
                ) t3 where ischild != 0 
        `;
        let dataList=await Db.doSql(sql);
        return dataList;
    }

    /**
     * 查树
     * @param columns
     * @param parent_id
     * @returns {Promise<*>}
     */
    async selectTree({columns="*",parent_id=-1}){
        const that=this;
        async function getList(pid){
            let sql=`
               SELECT ${columns} from ${that.tableName} WHERE parent_id=${pid};
            `;
            let dataList=await Db.doSql(sql);
            return dataList;
        };
        async function addChilden(record){
            let cList= await getList(record.id);
            record.childen=cList;
            if(cList.length==0){
                return
            }
            for (let i=0;i<cList.length;i++){
                let cObj= cList[i];
                addChilden(cObj);
            }
        }

        let rootList=await getList(parent_id);
        for (let i=0;i<rootList.length;i++){
            let obj=rootList[i];
            await addChilden(obj);
        }
        return rootList;
    }



    static getColumn(columns){
        let queryColumn=" * ";
        if(columns){
            queryColumn=columns;
        }
        return queryColumn;
    }

    static getFirstRecord(records){
        if(records.length==0){
            return null
        }else {
            return records[0];
        }
    }

    static getInsertObjSql(tableName, obj) {
        var fields = "(";
        var values = "(";
        for (let field in obj) {
            fields += field + ",";
            values += `'${obj[field]}'` + ",";
        }
        fields = fields.substr(0, fields.lastIndexOf(","));
        values = values.substr(0, values.lastIndexOf(","));
        fields += ")";
        values += ");";
        let sql = "insert into " + tableName + fields + " values " + values;
        return sql;
    }

    static getReplaceObjSql(tableName, obj) {
        var fields = "(";
        var values = "(";
        for (let field in obj) {
            fields += field + ",";
            values += `'${obj[field]}'` + ",";
        }
        fields = fields.substr(0, fields.lastIndexOf(","));
        values = values.substr(0, values.lastIndexOf(","));
        fields += ")";
        values += ");";
        let sql = "replace into " + tableName + fields + " values " + values;
        return sql;
    }

    static getDeleteObjSql(tableName,caseStr) {
        caseStr=!caseStr? `id=${obj.id}`:caseStr;
        let sql = `delete from ${tableName} where ${caseStr}`;
        return sql;
    }

    static getUpdateObjSql(tableName, obj, caseStr) {
        var fields = [];
        for (let field in obj) {
            if (field != "id")
                fields.push(field);
        }
        let sql = "";
        caseStr=!caseStr? `id=${obj.id}`:caseStr;
        sql = `update ${tableName} set ${fields.map(u => u + "='" + obj[u] + "'")} where ${caseStr}`;
        return sql;
    }

    static getSelectObjSql(tableName, obj) {
        var fields = [];
        for (let field in obj) {
            fields.push(field);
        }
        let sql = `select * from ${tableName} where ${fields.map(u => u + "='" + obj[u] + "'")}`;
        sql = sql.replace(/,/g, " and ")
        return sql;
    }

}


module.exports = BaseMapper;

