/**
 * File : MemoryDb.js
 * By : Minglie
 * QQ: 934031452
 * Date :2021.09.14
 * rem : 内存数据库
 */

const M=require("../index");

class MemoryDb{

    constructor(tableName) {
        this.tableName=tableName;
        this.dataList=[]
    }

    /**
     * 单个加
     * @param obj
     * @returns {Promise<*>}
     */
    async add(obj){
        obj.id = M.randomStr();
        this.dataList=[...this.dataList,obj];
        return obj;
    }

    async update(obj){
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].id == obj.id) {
                this.dataList[i]=obj;
                return
            }
        }
    }

    listAll(caseObj){
        let o_keys=[];
        if(caseObj){
            o_keys = Object.keys(caseObj);
        }
        if (caseObj && o_keys.length>0) {
            let r_list = [];
            let o_vals = Object.values(caseObj);
            var d = this.dataList;
            for (let i = 0; i < d.length; i++) {
                let s=0;
                for (let j=0;j<o_keys.length;j++){
                    if(o_keys[j][0]=="$"){
                        let realKey=o_keys[j].replace("$","");
                        if (d[i][realKey].indexOf(o_vals[j])==-1) {
                            break
                        }
                    }else {
                        if (d[i][o_keys[j]] != o_vals[j]) {
                            break
                        }
                    }
                    s++;
                }
                if(s==o_keys.length){
                    r_list.push(d[i]);
                }
            }
            return r_list;
        } else {
            return this.dataList;
        }
    }


    listByPage({page=0, num=10, caseObj,order}) {
        page=Number.parseInt(page);
        num=Number.parseInt(num);
        if (page <= 0) page = 1;
        let rows;
        if (caseObj) {
            rows = this.listAll(caseObj);
        } else {
            rows = this.listAll();
        }
        if(order){
            let orderArr= order.split(" ");
            let orderField=orderArr[0];
            let orderType=orderArr[1];
            rows.sort((a,b)=>{
                let ret=0;
                if (a[orderField]>b[orderField]) {
                    ret= 1;
                 }else if(a<b){
                    ret= -1
                 }else{
                    ret= 0;
                 }
                 if(orderType=="desc"){
                     return ret;
                 }else {
                     return -1*ret;
                 }
            })
        }
        let total = rows.length;
        rows=JSON.parse(JSON.stringify(rows))
        rows = rows.splice((page - 1) * num, num)
        return {rows, total}
    }


    deleteAll(o) {
        if (o) {
            let r_list = [];
            let o_keys = Object.keys(o);
            let o_vals = Object.values(o)
            var d = this.dataList;
            let delete_index=[]
            for (let i = 0; i < d.length; i++) {
                let s=0;
                for (let j=0;j<o_keys.length;j++){
                    if (d[i][o_keys[j]] != o_vals[j]) {
                        break
                    }
                    s++;
                }
                if(s==o_keys.length){
                    delete_index.push(i)
                }
            }
            for (let i = 0; i < d.length; i++) {
                 if(!delete_index.includes(i)){
                     r_list.push(d[i])
                 }
            }
            this.dataList=r_list;
            return delete_index.length;
        } else {
            let length=this.dataList.length;
            this.dataList=[];
            return length;
        }
    }

    getById(id) {
        var d = this.dataList;
        for (let i = 0; i < d.length; i++) {
            if(d[i].id==id){
                return d[i];
            }
        }
        return null;
    }

    deleteById(id) {
        var d = this.dataList;
        for (let i = 0; i < d.length; i++) {
            if(d[i].id==id){
                this.dataList.splice(i, 1);
                return id;
            }
        }
        return 0;
    }
}


module.exports = MemoryDb;