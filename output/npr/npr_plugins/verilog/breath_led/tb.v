`timescale  1ns / 1ns

module tb;

// 10ns
parameter PERIOD       = 10      ;
parameter CNT_2US_MAX  = 7'd10  ;
parameter CNT_2MS_MAX  = 10'd100;
parameter CNT_2S_MAX   = 10'd100;

// breath_led Inputs
reg   sys_clk                              = 0 ;
reg   sys_rst_n                            = 0 ;

// breath_led Outputs
wire  led                                  ;


initial
begin
    forever #(PERIOD/2)  sys_clk=~sys_clk;
end

initial
begin
    #(PERIOD*2) sys_rst_n  =  1;
end

breath_led #(
    .CNT_2US_MAX ( CNT_2US_MAX ),
    .CNT_2MS_MAX ( CNT_2MS_MAX ),
    .CNT_2S_MAX  ( CNT_2S_MAX  ))
 u_breath_led (
    .clk                 ( sys_clk     ),
    .rst_n               ( sys_rst_n   ),
    .led                 ( led         )
);

endmodule