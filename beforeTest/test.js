var M=require("../index");

app=M.server()
app.listen(8888)

app.get(["/h15","/h16","/h18888"],(req,res)=>{
    res.send("BBBBXXXEEEEE")
})