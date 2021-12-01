class BaseGraphqlApi{

    constructor({tableName}) {

    }

    async add(obj){
        obj.id = M.randomStr();
        this.dataList=[...this.dataList,obj];
        return obj;
    }

    install(app,args){
        const {M}=app;
        app.get("/c",(req,res)=>{
            res.send("c")
        })
    }

}