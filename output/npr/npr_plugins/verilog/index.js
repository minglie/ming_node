const path = require('path');
var args = process.argv.splice(2)
var CUR_DIR=path.parse(process.argv[1]).dir;
const M=require("../common/ming_node");
async function install(dir){
    M.copyDir(path.join(CUR_DIR,dir),dir);
}
async function help(){
   let r=await  M.exec("dir "+CUR_DIR);
   console.log(r);
}

function main(){
    switch (args[2]){
        case "": install("led");break;
        case "help": help();break;
        default:{
            install(args[2]);break;
        }
    }

}

main();

