`timescale 1ns / 1ns        //仿真单位/仿真精度

module tb();


parameter PERIOD  = 10;

reg           clk=1;
reg           rst_n=1;
reg           key;
wire[2:0]          led;



initial begin
    forever #(PERIOD/2)  clk=~clk;
end



initial begin
    $monitor ("rst_n=%0b led=%0b",rst_n, led);
    #(PERIOD*2) 
    rst_n  =  1;
    key <= 1'b1;   
    #(PERIOD*2)        
    key <= 1'b1;  
    #(PERIOD*2) 
    key <= 1'b0;   
    #(PERIOD*2) 
    key <= 1'b1;
     #(PERIOD*2) 
    key <= 1'b0;
     #(PERIOD*2) 
    key <= 1'b1;  
    #(PERIOD*2) 
    key <= 1'b0;   
     #(PERIOD*2) 
    key <= 1'b1;
    #(PERIOD*2) 
    key <= 1'b0;
    $display("TTTT");
end

//例化led模块
led  u_led(
     .clk          (clk),
    .rst_n          (rst_n),
    .key          (key),
    .led          (led)
    );

endmodule

