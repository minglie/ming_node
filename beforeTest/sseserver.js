var M=require("../index");

var app=M.server();
app.listen(8888);

//SSE 心跳周期
M._sseHeatTime=3000;


sseApp=M.sseServer()
//sseApp.listen(2000)
app.get("/sseServer",sseApp)

//sse 连接成功钩子
app.set("sse_connection",(clientId)=>{
    console.log(clientId+"连接成功")
    //返回false 说明不让连接
    return true;
})

//sse 断开钩子
app.set("sse_disconnect",(clientId)=>{
    console.log(clientId+"断开连接")
})

//查询所有sse客户端
app.get("allSseClient",(clientId)=>{
    res.send(M._sseClientMap.keys());
})

//广播方式发送
app.get("/sseSend1",(req,res)=>{
    console.log(req.params);
    sseApp.send(req.params);
    res.send("ok");
})


//私信发送
app.get("/sseSend2",(req,res)=>{
    console.log(req.params);
    sseApp.send(req.params,"clientId");
    res.send("ok");
})
