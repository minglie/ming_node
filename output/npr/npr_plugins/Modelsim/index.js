/**
 build/CUR_DIR
 led/tb.v led.v
 */
const child_process = require('child_process');
const fs = require('fs');
var args = process.argv.splice(2)
let argsPath=args[0] || "./";


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




async function install(){
    await M.exec(`mkdir build`);
    fs.writeFileSync('build/run.bat',

        `rmdir /s /q work
del vsim.wlf
del transcript
set MY_PARAM=%1%
modelsim -do top.do`

    );


    fs.writeFileSync('build/top.do',

        `vlib work
vmap work work
vlog   ../$::env(MY_PARAM)/*v
vsim -voptargs=+acc  work.tb
add wave -position insertpoint sim:/tb/*
run 100ns`

    );

    console.log("Modelsim install success!")
}

function help(){
    console.log(
        `
build/$:run led
led/tb.v led.v
`)
}

function main(){

    switch (args[2]){
        case "": install();break;
        case "help": help();break;
    }

}


main()

