const TcpServer=require("../../module/net/TcpServer.js");
app=new TcpServer()
app.listen(9999)

app.set("connect",(req,res)=>{

    console.log(req)
})

app.set("data",(req,res)=>{

    console.log(req.params+"")

    res.send("123")

})