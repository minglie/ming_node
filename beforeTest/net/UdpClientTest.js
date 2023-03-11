const UdpClient= require("../../module/net/UdpClient.js");
app=new UdpClient("127.0.0.1",8889);
app.listen(9999)

app.set("message", (req,res)=>{
    console.log(req.params)
    res.send("AAA")
})

app.send("123")