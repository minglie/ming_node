/**
 build/CUR_DIR
 led/tb.v led.v
 */

const fs = require('fs');
var args = process.argv.splice(2)
let argsPath=args[0] || "./";


function install(){
    fs.writeFileSync('run.bat',

`rmdir /s /q work
del vsim.wlf
del transcript
set MY_PARAM=%1%
modelsim -do top.do`

    );


    fs.writeFileSync('top.do',

        `vlib work
vmap work work
vlog   ../$::env(MY_PARAM)/*.v
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

