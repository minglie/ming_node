const child_process = require('child_process');
var args = process.argv.splice(2)
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
M.getFileNameByUrl=function (url){
    let split= url.split("/");
    return split[split.length-1]
}

async function main(){
    let npr_pluginsPath=process.argv[1].replaceAll("\\install\\index.js","");
    let fileName=M.getFileNameByUrl(args[2]).replace(".js","");
    await M.exec(`mkdir ${npr_pluginsPath}\\${fileName}`)
    await M.exec(`curl ${args[2]} > ${npr_pluginsPath}\\${fileName}\\index.js`)
    console.log(fileName+"  install success!")
}

main()