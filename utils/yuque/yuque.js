M=require("ming_node");
let url=require("url");


//M.yuqueToken="ZW9aH3CUDFWvC0ZU6nzoozBg03smn6Y5D36LqB8x";


M.getYuque= async function (yuqueUrl,type){
    M.reqComHeaders={"X-Auth-Token": M.yuqueToken,"User-Agent":"PostmanRuntime/7.26.1"}
    type=type||"html";
    let r= url.parse(yuqueUrl)
    let host="https://"+r.hostname;
    let all_path=yuqueUrl.split(host)[1];
    let all_path_arr=all_path.split("/");
    let yuqueApi=`${host}/api/v2/repos/${all_path_arr[1]}/${all_path_arr[2]}/docs/${all_path_arr[3]}`;
    let r1=await M.get(yuqueApi);
    let artileContent=r1.data.body;
    artileContent=artileContent.replace(/\s+/g,'')
    artileContent=artileContent.replace("```"+type,"")
    artileContent=artileContent.replace("```","")
    return artileContent;
}



