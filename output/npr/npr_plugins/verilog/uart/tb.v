`timescale  1ns / 1ns

module tb;

// digital_tube Parameters
parameter PERIOD  = 2;


// digital_tube Inputs
reg   clk                                  = 0 ;
reg   rst_n                                = 1 ;
wire  txd;

initial begin
    forever #(PERIOD/2)  clk=~clk;
end


initial begin
    #(PERIOD*2)
    rst_n  =  0;
    #(PERIOD*2)
    rst_n  =  1;
end


top_UART_TX  u_top_UART_TX (
    .sys_clk                     ( clk          ),
    .sys_rst_n                   ( rst_n        ),
    .txd                      ( txd )
);


endmodule

