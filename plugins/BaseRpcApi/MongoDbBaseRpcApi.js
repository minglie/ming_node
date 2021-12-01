/**
 *
 * @type {MemoryDb|{}}
 */

const MemoryDb=require("../../module/MemoryDb")
const M=require("../../index");

const memoryDb = new MemoryDb();

class MemoryBaseRpcApi{
    constructor({tableName,prefix}) {
        this.tableName=tableName;
        this.prefix=prefix?prefix:tableName;
    }

    async add(obj){
        let r= memoryDb.add(obj);
        return r;
    }

    async delete(obj){
        let r= memoryDb.deleteAll(obj);
        return r;
    }

    async list(obj){
        let r= memoryDb.listByPage({startPage:0,limit:3,obj});
        return r;
    }

    async listAll(obj){
        let r= memoryDb.listAll(obj);
        return r;
    }

    async update(obj){
        let r= memoryDb.update(obj);
        return r;
    }

    install(app,args){
        app.post(`${this.prefix}/add`,async (req,res)=>{
            let r=await this.add(req.params)
            res.send(M.successResult(r));
        })
        app.get(`${this.prefix}/delete`,async (req,res)=>{
            let r=M.deleteById(req.params.id);
            res.send(M.successResult());
        });

        app.post(`${this.prefix}/update`,async (req,res)=>{
            await this.update(req.params);
            res.send(M.successResult());
        });

        app.get(`${this.prefix}/getById`,async (req,res)=>{
            let r=await this.getById(req.params.id);
            res.send(M.successResult());
        });

        app.get(`${this.prefix}/listAll`,async (req,res)=>{
            let r=await this.listAll();
            res.send(M.successResult(r));
        });

        app.get(`${this.prefix}/list`,async (req,res)=>{
            const {page,num}=req.params;
            let r=await this.list({page,num});
            res.send(M.successResult(r));
        })

        /**
         * 如果有parentId则返回树
         */
        app.get(`${this.prefix}/tree`,async (req,res)=>{
            let r=await this.list({page,num});
            res.send(M.successResult(r));
        })
    }
}


module.exports = MemoryBaseRpcApi;