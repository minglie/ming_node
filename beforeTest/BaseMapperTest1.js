var M=require("../index");
Db= M.getMySql({
    database: "lj_node"
})
const BaseMapper=require("../module/BaseMapper");
//mi_api 是表名
file_chat_msgMapper = new BaseMapper("file_chat_msg");
async function main(){

    r=await file_chat_msgMapper.selectList({});
    await BaseMapper.appendListName({
        tableName:"vip_basic",
        list:r,
        list_idkey:"create_user",
        list_namekey:"create_user_name",
        db_idkey:"unionid",
        db_namekey:"name"
    })
    console.log(r);
}

main().then(d=>{
    process.exit()
})
