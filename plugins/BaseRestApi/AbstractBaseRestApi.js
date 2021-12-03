const M=require("../../index");

class AbstractBaseRest{

    constructor({tableName,prefix,generateTime=false}) {
        this.tableName=tableName;
        this.prefix=prefix?prefix:tableName;
        this.generateTime=generateTime;
    }

    async add(obj){}
    async delete(obj){}
    async list({page,num,...queryCase}){}
    async listAll(obj){}
    async update(obj){}
    async getChildenList(id,queryCase){}

    install(app,args){
        app.post(`${this.prefix}`,async (req,res)=>{
            const params=req.params;
            if(this.generateTime){
                params.gmt_create=new Date();
            }
            let r=await this.add(params)
            res.send(M.successResult(r));
        })
        app.delete(`${this.prefix}`,async (req,res)=>{
            let r=await this.delete(req.params);
            res.send(M.successResult(r));
        });

        /**
         * 修改
         */
        app.put(`${this.prefix}`,async (req,res)=>{
            const params=req.params;
            if(this.generateTime){
                params.gmt_modified=new Date();
            }
            await this.update(params);
            res.send(M.successResult());
        });

        app.get(`${this.prefix}/:id`,async (req,res)=>{
            const {id,page,num,...queryCase}=req.params;
            if(id==undefined){
                let r=await this.list({page,num,queryCase});
                res.send(M.successResult(r));
            }else {
                let r=await this.getById(req.params.id);
                res.send(M.successResult(r));
            }
        });
    }
}



module.exports = AbstractBaseRest;