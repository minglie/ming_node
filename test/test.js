M=require("../index")
var app=M.server();
app.listen(9999);
M.proxyHost="http://127.0.0.1:8888"
M.proxyHost=""
//启用静态资源代理
M.enableProxyStatucResource=true;
//忽略代理的地址
ignoreUrlList=["/","/favicon.ico"]

app.begin(async (req,res)=>{
    if(ignoreUrlList.indexOf(req.url)>-1||req.url.startsWith("/_")||req.url.startsWith("/.")){
        return;
    }
    if(req.isStaticRequest()){
        if(M.enableProxyStatucResource){
            res.renderUrl(M.proxyHost+req.url);
        }
        return;
    }
    res.alreadySend = true;
    //转换为axios格式
    let axiosConfig=await M.getAxiosConfig(req);
    console.log("====>",JSON.stringify(axiosConfig))
    //发出请求
    let result=await M.axios(axiosConfig)
    console.log("<======",result)
    console.log("---------------------------")
    res.send(result);
})