# ming_node
轻便完善的Web服务,随用随扔的Web服务

 >  ming_node是一个快速搭建web服务,接口测试,日常脚本编写的一个工具集
 
 
#ming_node安装
 ```sh
 $ npm install ming_node
 ```

  
#ming_node最小环境    
    
```javascript
var M=require("ming_node");
var app=M.server();
app.listen(8888);
app.get("/getById",(req,res)=>{ 
    console.log(req.params);
    res.send("ok");
})


 ```

#ming_node  cookie与session的处理  
```javascript
var M=require("ming_node");
var app=M.server();
app.listen(8888);
// 请求钩子
app.begin((req,res)=>{console.log("req ",req.url)})
// 响应钩子
app.end((d)=>{console.log("res ",d)})

app.get("/setSession",(req,res)=>{
    //打印请求ip与cookie
    console.log(req.ip,req.cookies)
    //设置session
    req.session={ss:55}
    res.send("ok");
})

app.get("/getSession",(req,res)=>{
    //打印session
    console.log(req.session)
    //设置cookie
    res.cookie("username","zs");
    res.send("ok");
})
```
#ming_node  彻底的单文件化 
```javascript
+async function(){
    M =await new Promise((v)=>require('https').get("https://minglie.github.io/js/ming_node.js",(q)=>{d='';q.on('data',(a)=>d+=a);q.on('end',()=>v(eval(d)))}))
  var app=M.server();
    app.listen(8888);
    app.get("/",async (req,res)=>{ 
       app.redirect("/index.html",req,res)
    })
}();
```

#ming_node  支持代理 回调 promise 的http简易客户端

```javascript
M=require("ming_node")

//代理配置
M.httpProxy={
    host: '127.0.0.1', // 代理 IP
    port: 8888, // 代理端口
}

//请求之前拦截器
M.httpBefore = (d) => {console.log(d);  return d }
//请求之后拦截器
M.httpEnd = (d) => { console.log("rrrrrr",d)}

//公共 Queryparams
M.reqComQueryparams={userId:123456}

//get请求
M.get("http://baidu.com/pagelist",{name:"zs"}).then(d=>{
     console.log(d.code)
})

//get请求回调版
M.get("http://baidu.com/pagelist",d=>{
    console.log(d.code)
},{name:"huidiao"})


//post请求
M.post("http://baidu.com/a?age=44",{name:"ls"}).then(d=>{
     console.log(d)
})

```

#ming_node  接口测试demo

```javascript
M=require("ming_node")

//代理配置
M.httpProxy={
    host: '127.0.0.1', // 代理 IP
    port: 8888, // 代理端口
}

//请求之前拦截器
M.httpBefore = (d) => {console.log(d.path);  return d }

/**
 //本机8888端口 服务端 代码
app.get("/pagelist",async (req,res)=>{ 
    console.log(req.params)
    res.send(`{"code":3002,"message":"操作成功","success":true,"data":[{"name":"zs"},{"name":"ls"}]}`)
})
 */
async function main(){
    let r=await M.get("http://minglie.github.io/pagelist?name=zs")   
    for(let i=0;i<r.data.length;i++){
         let user= r.data[i];
         const {name}=user;  
         M.log(name);
    }
 }

 main()

```


#基于ming_node 的 ming_api_mock




#ming_node的使用详情,请到ming_node的主页查看

https://minglie.github.io/os/ming_node/
 
