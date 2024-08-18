vlib work
vmap work work
vlog   ../$::env(MY_PARAM)/*.v
vsim -voptargs=+acc  work.tb
add wave -position insertpoint sim:/tb/*
run 100ns