module HC_FPGA_Demo_Top
(
    input CLOCK_XTAL_50MHz,
	input RESET,
	output[7:0] DIG,
	output[5:0] SEL
);


wire[3:0] d0=5;
wire[3:0] d1=2;
wire[3:0] d2=1;
wire[3:0] d3=7;


digital_tube  u_digital_tube (
    .clk                     ( CLOCK_XTAL_50MHz          ),
    .rst_n                   ( RESET        ),
    .d0                      ( d0 ),
    .d1                      ( d1 ),
    .d2                      ( d2 ),
    .d3                      ( d3 ),
    .dp_in                   ( ~0 ),
    .sel                     ( SEL    [5:0] ),
    .dig                     ( DIG    [7:0] )
);


endmodule
