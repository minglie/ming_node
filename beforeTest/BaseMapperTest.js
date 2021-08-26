var M=require("../index");
Db= M.getMySql({})
const BaseMapper=require("../module/BaseMapper");
//mi_api 是表名
miapi = new BaseMapper("mi_api");
async function main(){
    //通过id查
    let r=await miapi.selectById({id:66,columns:"id,name"})
    console.log("selectById",r);
    //通过ids查
    r=await miapi.selectBatchIds({ids:[66,67],columns:"id"})
    console.log("selectBatchIds",r);
    //查个数
    r=await miapi.selectCount("id>0")
    console.log("selectCount",r);
    //分页查
    r=await miapi.selectPage({page:1,num:10,queryCase:"1=1", columns:"id,name",order:"id desc"})
    console.log("selectPage",r);
    //列表
    r=await miapi.selectList({queryCase:"1=1", columns:"id,name",order:"id desc",limit:"3,4"})
    console.log("selectList",r);
    //查后端id
    r=await miapi.selectDescendantIdList({parent_id:-1})
    console.log("selectDescendantIdList",r);
    //查树
    r=await miapi.selectTree({columns:"*",parent_id:-1})
    console.log("selectTree",r);
    //单个加
    r=await miapi.insert({name:"zs",parent_id:-1})
    console.log("insert",r);
    //批量加
    r=await miapi.batchInsert([{name:"zs",parent_id:-1}]);
    console.log("insert",r);
    //根据id改
    r=await miapi.update({name:"zs",parent_id:-1,id:695});
    console.log("update",r);
    //根据条件改
    r=await miapi.update({name:"zs",parent_id:-1,id:695},"name='zs'");
    console.log("update",r);
    //根据条件删
    r=await miapi.delete("id=695");
    console.log("delete",r);
    //根据id删
    r=await miapi.deleteById(695);
    console.log("deleteById",r);
}

main().then(d=>{
    process.exit()
})
