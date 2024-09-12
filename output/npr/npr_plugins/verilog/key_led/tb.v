
`timescale 1ns / 1ns        //仿真单位/仿真精度

module tb();

//parameter define
parameter  CLK_PERIOD = 10;           //时钟周期 10ns
parameter  CNT_MAX = 20'd10;          //消抖时间 10ns

//reg define
reg           sys_clk;
reg           sys_rst_n;
reg           key;

wire          key_out;
wire          beep;

//信号初始化
initial begin
    sys_clk <= 1'b0;
    sys_rst_n <= 1'b0;
    key <= 1'b1;
    #200
    sys_rst_n <= 1'b1;
//key信号变化
    #20
    key <= 1'b0;
    #20
    key <= 1'b1;
    #50
    key <= 1'b0;
    #40
    key <= 1'b1;
    #20
    key <= 1'b0;
    #300
    key <= 1'b1;
    #50
    key <= 1'b0;
    #40
    key <= 1'b1;
    #300
    key <= 1'b0;
    #300
    key <= 1'b1;
    #500
    key <= 1'b0;
    #500
    key <= 1'b1;
    #500
    key <= 1'b0;
    #500
    key <= 1'b1;
end

//产生时钟
always #(CLK_PERIOD/2) sys_clk = ~sys_clk;

//按键消抖
key_debounce #(
    .MAX_CNT    (CNT_MAX)
)u_top_key_beep(
    .clk      (sys_clk),
    .rst_n    (sys_rst_n),
    .key_in   (key),
    .key_out(key_out)
    );

//灯取反
toggle_pin u_toggle_pin(
    .clk      (sys_clk),
    .rst_n    (sys_rst_n),
    .in_pin(~key_out),
    .out_pin(beep)
);

endmodule

