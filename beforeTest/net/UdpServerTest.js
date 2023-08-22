const UdpServer= require("../../module/net/UdpServer.js");
app=new UdpServer();
app.listen(9999)

app.set("message", (req,res)=>{
    console.log(req.params+"")
    res.send("AAA")
})

