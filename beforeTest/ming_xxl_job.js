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

ming_xxl_job.getJobAttribute=async function (id,key){
    r= await ming_xxl_job.doSql(`SELECT field_value FROM xxl_job_info_db WHERE id=${id} and field_key="${key}"`)
    if(r.content.length){
        return r.content[0]["field_value"];
    }
    return null;
}

ming_xxl_job.setJobAttribute=async function (id,key,value){
    r= await ming_xxl_job.doSql(`REPLACE INTO xxl_job_info_db (job_info_id,field_key,field_value,update_time) VALUES (${id},'${key}','${value}',now())`)
    return r;
}

ming_xxl_job.updateJobInfo=async function (id,jobInfo){
    r= await M.post("http://localhost:8080/jobinfo/update",{
        "jobDesc": jobInfo.jobDesc||"延时触发执行器执行",
        "author": jobInfo.author||"XXL",
        "jobGroup": jobInfo.jobGroup||1,
        "scheduleType": jobInfo.scheduleType||"CRON",
        "scheduleConf": jobInfo.cron|| "* 2 * * * ?",
        "cronGen_display": jobInfo.cron|| "* 2 * * * ?",
        "schedule_conf_CRON": jobInfo.cron|| "* 2 * * * ?",
        "executorRouteStrategy": jobInfo.executorRouteStrategy|| "FIRST",
        "misfireStrategy": "DO_NOTHING",
        "executorBlockStrategy": "SERIAL_EXECUTION",
        "executorTimeout": 0,
        "executorFailRetryCount": 0,
        id: id
    },{
        "Content-Type":"application/x-www-form-urlencoded;",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}


ming_xxl_job.doSql=async function (sql){
    //触发执行一次
    r= await M.post("http://localhost:8080/doSql",{sql:sql},{
        "Content-Type":"application/x-www-form-urlencoded; ",
        "XXL-JOB-ACCESS-TOKEN":""
    })
    return r;
}



module.exports =ming_xxl_job;