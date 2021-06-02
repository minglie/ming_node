var M=require("../index");

app=M.server()

app.listen(8888)

app.use(["/ae","/mrr"],(req,res)=>{

    res.send("WW")
})



app.get("/a/c",(req,res)=>{
    res.send("AAAAAAAAAA")
})