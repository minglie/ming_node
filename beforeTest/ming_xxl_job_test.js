var M=require("../index");
var xxlJob=require("./ming_xxl_job.js");


async function main(){
    //停止任务
    if(0){
        r= await xxlJob.stopJobInfoById(6)
        console.log("jobinfo/stop<===",r)
    }
    //启动任务
    if(0){
        r= await xxlJob.startJobInfoById(6)
        console.log("jobinfo/statt<===",r)
    }
    //触发执行一次
    if(0){
        r= await xxlJob.triggerJobInfoById(2,"AA")
        console.log("jobinfo/trigger<===",r)
    }

    //doSql
    if(0){
        r= await xxlJob.doSql("select 1")
        console.log("jobinfo/doSql<===",r)
    }
    //getJobAttribute
    if(0){
        r= await xxlJob.getJobAttribute(1,"name")
        console.log("getJobAttribute<===",r)
    }

    //setJobAttribute
    if(0){
        r= await xxlJob.setJobAttribute(1,"name","WWWW")
        console.log("getJobAttribute<===",r)
    }

    //updateJobInfo
    if(1){
        r= await  xxlJob.updateJobInfo(1,{cron:"* 5 * * * ?"})
        console.log("updateJobInfo<===",r)
    }


}

main()
//这句话必须加,脚本类的定时任务执行完一定要退出
setTimeout(()=>process.exit(),1000)