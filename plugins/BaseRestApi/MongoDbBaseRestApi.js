/**
 * @type {MemoryDb|{}}
 */
const M=require("../../index");
const AbstractBaseRestApi=require("./AbstractBaseRestApi");


class MongoDbBaseRestApi extends AbstractBaseRestApi{
    constructor(props) {
        super(props);
        this.mongoDb=M.mongoDb;
    }

    async add(obj){
        let r= this.mongoDb.insert(this.tableName,obj);
        return r;
    }

    async delete(obj){
        let r= this.mongoDb.remove(this.tableName,{
            _id:  M.mongoDb.ObjectID(obj.id)
        });
        return r;
    }

    async getById(id){
        let r=await this.mongoDb.getById(this.tableName,id);
        return r;
    }

    async list({page=1,num=10,order,queryCase}){
        page=Number.parseInt(page);
        num=Number.parseInt(num);
        let tableName=this.tableName;
        return new Promise(async (resolve,reject)=>{
            this.mongoDb.connect().then((db)=>{
                var result=db.collection(this.tableName).find(queryCase,{
                    skip:(page-1)*num,
                    limit:num
                });
                result.toArray(async function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    let total=await db.collection(tableName).count(queryCase);
                    resolve({rows:docs,total:total});
                })
            })
        })
    }


    async listAll(obj){
        let r= this.mongoDb.find(this.tableName,obj);
        return r;
    }

    async update(obj){
        let {id,...newObj}=obj;
        let r= this.mongoDb.update(this.tableName,{
            _id:  M.mongoDb.ObjectID(id)
        },newObj);
        return r;
    }

    async getChildenList(id,caseObj){
        let r= this.listAll({parent_id:id,...caseObj});
        return r;
    }

}


module.exports = MongoDbBaseRestApi;