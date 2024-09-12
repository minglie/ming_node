`timescale 1ns / 1ns


module uart_rx_led
(
    input [7:0]      input_led,
    output reg [7:0] output_led,
    input sys_clk,
    input sys_rst_n
);


always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n) begin
        output_led  <= 8'b1111_1111;
    end
    else  begin
        output_led <=  ~input_led;
    end
end


endmodule
