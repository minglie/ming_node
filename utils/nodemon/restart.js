const M = require('../../index.js');
const { spawn } = require('child_process')

let childProcess;
let timer = null;

function debounce(mainFile) {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
        //console.log('nodemon')
        childProcess && childProcess.kill()
        childProcess = spawn('node', [mainFile], {
            stdio: [process.stdin, process.stdout, process.stderr]
        });
    }, 800)
}

function watchSigleFile(file,mainFile){
    M.watchFile(file,({file,event})=>{
        if(event=="change"){
            console.log("change:"+file);
            debounce(mainFile)
        }
    })
}

module.exports = function (watchFile,mainFile){
    debounce(mainFile);
    let r=[];
    if(Array.isArray(watchFile)) {
        r=watchFile;
    }else {
        r.push(watchFile);
    }
    r.forEach(u=>{
        watchSigleFile(u,mainFile);
    })
};