`timescale 1ns / 1ns        //仿真单位/仿真精度

module tb();



reg           key;
wire          led;


initial begin
    key <= 1'b1;
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

