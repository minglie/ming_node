var M=require("ming_node");

var app=M.server();
app.listen(8888);

app.installPlugin("http://localhost:4444/OssWebApi.js",{
    name:"我是插件构造方法参数"
},{
    name:"我是插件构造方法附加参数"
});
