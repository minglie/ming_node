`timescale  1ns / 1ps

module tb;

// digital_tube Parameters
parameter PERIOD  = 10;


// digital_tube Inputs
reg   clk                                  = 0 ;
reg   rst_n                                = 0 ;
reg[3:0] d0=4'b0011;
reg[3:0] d1=4'b0111;
reg[3:0] d2=4'b1111;
reg[3:0] d3=4'b1011;
reg   [3:0]  dp_in                         = 0 ;

// digital_tube Outputs
wire  [3:0]  sel                           ;
wire  [7:0]  dig                           ;


initial begin
    forever #(PERIOD/2)  clk=~clk;

end


initial begin
    #(PERIOD*2)
    rst_n  =  1;
    d0=4'b0001;
    #(PERIOD*2)
    d0=4'b0011;
    #(PERIOD*2)
    d0=4'b0110;
    #(PERIOD*2)
    d0=4'b0111;
end


digital_tube  u_digital_tube (
    .clk                     ( clk          ),
    .rst_n                   ( rst_n        ),
    .d0                      ( d0 ),
    .d1                      ( d1 ),
    .d2                      ( d2 ),
    .d3                      ( d3 ),
    .dp_in                   ( d3 ),
    .sel                     (sel),
    .dig                     (dig )
);


endmodule

