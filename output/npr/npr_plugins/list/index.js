const child_process = require('child_process');

const M={};
M.exec = function (comand) {
    let promise = new Promise(function (reslove, reject) {
        child_process.exec(comand, function (err, stdout, stderr) {
            if (err || stderr) console.error(err, stderr);
            reslove(stdout);
        });

    })
    return promise;
}

async function main(){
    let npr_pluginsPath=process.argv[1].replaceAll("\\list\\index.js","");
    let r=  await M.exec("dir /b "+ npr_pluginsPath);
    console.log(r.replaceAll(".idea",""));
}
main()