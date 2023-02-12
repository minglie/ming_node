M=require("ming_node");

app= M.server()
app.listen(8090)
app.get("/a",(req,res)=>{
    res.send("32224")
})