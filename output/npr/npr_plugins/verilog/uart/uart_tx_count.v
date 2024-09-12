`timescale 1ns / 1ns

module uart_tx_count
#(
	parameter COUNT_200 = 26'd10000000
)
(
    input sys_clk,
    input sys_rst_n,
    output reg enable_txd,  //允许串口发送
    output reg [7:0] data
 );

reg [25:0] clk_cnt; //计数器
reg [3:0]  dat_cnt;//数据计数器，发送第几个




always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n) begin
        clk_cnt <= 26'b0;
    end
    else if(clk_cnt == COUNT_200) begin
        clk_cnt <= 26'b0;
    end
    else begin
        clk_cnt <= clk_cnt + 1'b1;
    end
end

always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n) begin
        dat_cnt <= 4'b0;
        enable_txd <= 1'b0;
    end
    else if(clk_cnt == COUNT_200 - 1'b1) begin
            dat_cnt <= dat_cnt + 1'b1;
            enable_txd <= 1'b1;
    end
    else
        enable_txd <= 1'b0;
end

always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n) begin
        data <= 8'b0;
    end
    else begin
        case(dat_cnt)
            4'd0:data <= 8'b00110000;
            4'd1:data <= 8'b00110001;
            4'd2:data <= 8'b00110010;
            4'd3:data <= 8'b00110011;
            4'd4:data <= 8'b00110100;
            4'd5:data <= 8'b00110101;
            4'd6:data <= 8'b00110110;
            4'd7:data <= 8'b00110111;
            4'd8:data <= 8'b00111000;
            4'd9:data <= 8'b00111001;
            4'd10:data <= 8'b00111010;
            4'd11:data <= 8'b00111011;
            4'd12:data <= 8'b00111100;
            4'd13:data <= 8'b00111101;
            4'd14:data <= 8'b00111110;
            4'd15:data <= 8'b00111111;
            default:;
            endcase
    end
end

endmodule
