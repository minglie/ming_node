var M=require("./index");
var app=M.server();
app.listen(9999);

app.set("no_router_handle",(req,res)=>{
    res.end('no aa')
})

app.set("no_page_handle",(req,res)=>{
    res.send("no router")
})

app.set("gloable_exception_handle",(err,req,res)=>{
    console.error(err.stack)
    res.send("系统错误")
})

app.get("/render",(req,res)=>{
    a=777;
    o={
        name:"zs"
    }
    console.log(req.params.id)
    res.render("/a.html");
})


app.get("/renderBaidu",(req,res)=>{
    res.render("https://www.baidu.com/");
})