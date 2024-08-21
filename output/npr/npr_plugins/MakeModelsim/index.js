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
    await M.exec(`mkdir doc`);
    await M.exec(`mkdir opt`);
    await M.exec(`mkdir sims`);
    await M.exec(`mkdir src`);
    await M.exec(`mkdir tb`);

    fs.writeFileSync('doc/Readme.md',
`# led
led test`
    );

    fs.writeFileSync('sims/filelist.f',
`"../src/*v"
"../tb/*v"`
    );


    fs.writeFileSync('sims/Makefile',
        `#setting parameter
work= work
output= ../opt
vsimbatch0= -do "run -all"


#commandbegin
all:compile vsim
lib:
\techo "start compile for Questasim10.6c"
\tvlib $(work)
\tvmap work $(work)
vlog :
\tvlog  -f filelist.f -l $(output)/compile.log
compile: lib vlog
run:
\tmodelsim -do ./run.do
#make clean
clean:
\tdel *.wlf
\tdel vsim_stacktrace.vstf
\tdel transcript
\tdel modelsim.ini
\trmdir /s /q work
`
    );

    fs.writeFileSync('sims/run.do',
        `vsim -voptargs=+acc  work.tb
add wave -position insertpoint sim:/tb/*
run 100ns`
    );


    fs.writeFileSync('src/led.v',
        `module led(                     
    input     key , 
    
    output    led  
);


assign led =key;   

endmodule`
    );

    fs.writeFileSync('tb/tb.v',
        `\`timescale 1ns / 1ns        //仿真单位/仿真精度

module tb();



reg           key;
wire          led;


initial begin
    key <= 1'b1;   
    #12        
    key <= 1'b1;  
    #3
    key <= 1'b0;   
    #2
    key <= 1'b1;
    #2
    key <= 1'b0;
    #2        
    key <= 1'b1;  
    #3
    key <= 1'b0;   
    #2
    key <= 1'b1;
    #2
    key <= 1'b0;
end

//例化led模块
led  u_led(
    .key          (key),
    .led          (led)
    );

endmodule

`
    );

    console.log("MakeModelsim install success!")
}

function help(){
    console.log(
        `
cd sims;
make compile
make run
`)
}

function main(){

    switch (args[2]){
        case "": install();break;
        case "help": help();break;
    }

}


main()

