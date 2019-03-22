# ming_node
轻便完善的Web服务,随用随扔的Web服务

 >  ming_node是一个快速搭建web服务,接口测试,日常脚本编写的一个工具集
 
 
#ming_mock安装
 ```sh
 $ npm install ming_mock
 ```

  
#ming_node最小环境    
    
```javascript
var M=require("ming_node");
var app=M.server();
app.listen(8888);

app.get("/getById",(req,res)=>{
    return "ok";
}
 ```
 
 
#ming_mock的使用详情,请到ming_node的主页查看

https://minglie.github.io/src/openSourcePage/ming_node/index.html
 