var M=require("../index");
var app=M.server();
app.listen(8888);
app.put("/getById/:id",(req,res)=>{
    console.log("put",req.params);
    res.send("ok");
})

app.post("/getById/:id",(req,res)=>{
    console.log("post",req.params);
    res.send("ok");
})


app.delete("/getById/:id",(req,res)=>{
    console.log("delete",req.params);
    res.send("ok");
})