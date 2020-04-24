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
 
#ming_node快速mock前端接口
     
 ```javascript
var M=require("ming_node");
var app=M.server();
app.listen(8888);

app.post("/add",(req,res)=>{
    r=M.add(req.params)
    res.send(M.result(r));
})

app.get("/delete",(req,res)=>{
    M.deleteById(req.params.id)
    res.send(M.result("ok"));
})

app.post("/update",(req,res)=>{
    M.update(req.params)
    res.send(M.result("ok"));
})

app.get("/getById",(req,res)=>{
    r=M.getById(req.params.id)
    res.send(M.result(r));
})

app.get("/listAll",(req,res)=>{
    r=M.listAll()
    res.send(M.result(r));
})

app.get("/listByParentId",(req,res)=>{
    r=M.listByProp({parentId:req.params.parentId})
    res.send(M.result(r));
})

app.get("/listByPage",(req,res)=>{
    r=M.listByPage(req.params.startPage,req.params.limit)
    res.send(M.result(r));
}) 
 
```
#ming_node  cookie与session的处理  
```javascript
var M=require("ming_node");
var app=M.server();
app.listen(8888);

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
#基于ming_node 的mockServer

 ```sh
curl https://minglie.gitee.io/mingpage/static/share_edit.js > index.js && node index.js
 ```
 
#ming_node的使用详情,请到ming_node的主页查看

https://minglie.github.io/os/ming_node/
 
