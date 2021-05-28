var M=require("../index");

const ming_xxl_job={};

ming_xxl_job.stopJobInfoById=async function (id){
    //停止任务
    r= await M.post("http://localhost:8080/jobinfo/stop",{id:id},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}


ming_xxl_job.startJobInfoById=async function (id){
    //停止任务
    r= await M.post("http://localhost:8080/jobinfo/start",{id:id},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}


ming_xxl_job.triggerJobInfoById=async function (id,executorParam){
    //触发执行一次
    r= await M.post("http://localhost:8080/jobinfo/trigger",{id:id,executorParam:executorParam},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}


module.exports =ming_xxl_job;