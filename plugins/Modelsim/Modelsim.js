const fs = require('fs');

fs.writeFileSync('run.bat',

`rmdir /s /q work
del server.js
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