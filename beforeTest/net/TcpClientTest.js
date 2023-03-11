const TcpClient= require("../../module/net/TcpClient.js");
app=new TcpClient("127.0.0.1",8889);
app.connect()

app.set("data", (req,res)=>{
    console.log(req)
    res.send("AAA")
})

app.send("123")