var M=require("ming_node");

app=M.server()

app.listen(8888)

app.use(["/h1[0-9]","/h2+"],(req,res)=>{
    res.send("AAAA")
})


app.use("/hello",(req,res)=>{
    res.send("WW")
})

//不会被掉到, 因为  app.use(["/h1[0-9]","/h2+"])已经sen过
app.get("/h15",(req,res)=>{
    res.send("BBBB")
})