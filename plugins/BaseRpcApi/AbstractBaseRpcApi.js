const CollectionUtils=require("../../utils/common/CollectionUtils");
const M=require("../../index");

class AbstractBaseRpcApi{

    constructor({tableName,prefix,generateTime=false}) {
        this.tableName=tableName;
        this.prefix=prefix?prefix:tableName;
        this.generateTime=generateTime;
    }

    async add(obj){}
    async delete(obj){}
    async list({page,num,order,...queryCase}){}
    async listAll(obj){}
    async update(obj){}
    async getChildenList(id,queryCase){}

    install(app,args){
        app.post(`${this.prefix}/add`,async (req,res)=>{
            const params=req.params;
            if(this.generateTime){
                params.gmt_create=new Date();
            }
            let r=await this.add(params)
            res.send(M.successResult(r));
        })
        app.post(`${this.prefix}/delete`,async (req,res)=>{
            let r=await this.delete(req.params);
            res.send(M.successResult(r));
        });

        app.post(`${this.prefix}/update`,async (req,res)=>{
            const params=req.params;
            if(this.generateTime){
                params.gmt_modified=new Date();
            }
            await this.update(params);
            res.send(M.successResult());
        });

        app.get(`${this.prefix}/getById`,async (req,res)=>{
            let r=await this.getById(req.params.id);
            res.send(M.successResult(r));
        });

        app.get(`${this.prefix}/listAll`,async (req,res)=>{
            const params=req.params;
            let r=await this.listAll(params);
            res.send(M.successResult(r));
        });

        app.get(`${this.prefix}/list`,async (req,res)=>{
            let {page,num,order,...queryCase}=req.params;
            if(!order){
                order=null;
            }
            let r=await this.list({page,num,order,queryCase});
            res.send(M.successResult(r));
        });

        /**
         * 如果有parent_id才能返回树
         */
        app.get(`${this.prefix}/tree`,async (req,res)=>{
            const {parent_id,...queryCase}=req.params;
            let r=await  CollectionUtils.selectTree(this.getChildenList.bind(this), parent_id,queryCase);
            res.send(M.successResult(r));
        })
    }
}



module.exports = AbstractBaseRpcApi;