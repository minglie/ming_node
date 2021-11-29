var M=require("ming_node");
var BaseGraphqlApi=require("plugins/BaseGraphqlApi");
var app=M.server();
app.listen(8888);


//方式1
app.use(new BaseGraphqlApi({
    tableName:"mi_file",
    prefix:"mifile",
    db:"mysql"
}));

