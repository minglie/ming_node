`timescale 1ns / 1ns
/***************************************************************
 * Copyright(C), 2022 蓝萌电子 All Rights Reserved.
 * ModuleName : uart_rx.v
 * Date       : 2022年6月9日
 * Time       : 0:28:11
 * Author     : 沈玲玲
 * Version    : V1.0
 *      Version | Modify
 *      ----------------------------------
 *       v1.0    .....
 *   * Copyright: 2022 蓝萌电子 All Rights Reserved.
 *   *
 *   * This software is licensed under terms that can be found in the LICENSE file
 *   * in the root directory of this software component.
 *   * If no LICENSE file comes with this software, it is provided GPL3.0.
 *   *
 *   * Description:
 ***************************************************************/



module  uart_rx
#(
	parameter CLK_FREQ = 50000000,
	parameter UART_BPS = 9600
)
(
    input sys_clk,
    input sys_rst_n,
    input uart_rxd,
    output reg uart_done,
    output reg [7:0] uart_data
);

localparam BPS_CNT = CLK_FREQ/UART_BPS;
//reg define
reg uart_rxd_d0;
reg uart_rxd_d1;
reg [15:0] clk_cnt;
reg [3:0] rx_cnt;
reg rx_flag;
reg [7:0] rxdata;

//wire define
wire start_flag;

/**
  *  Main Code
  *  主要运行代码
 **/
//捕获下降沿
assign start_flag = uart_rxd_d1&(~uart_rxd_d0);
//对UART接收端口数据延时两个周期
always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n) begin
	uart_rxd_d0 <= 1'b0;
	uart_rxd_d1 <= 1'b0;
    end
    else begin
	uart_rxd_d0 <= uart_rxd;
	uart_rxd_d1 <= uart_rxd_d0;
    end
end
//检测脉冲信号srart_flag  进入接受过程
always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n)
		rx_flag <= 1'b0;
    else  begin
        if(start_flag)
            rx_flag <= 1'b1;
        else if((rx_cnt == 4'd9)&&(clk_cnt == BPS_CNT/2))
            rx_flag <= 1'b0;
        else
            rx_flag <= rx_flag;
    end
end
//进入接受过程，启动系统时钟计数器
always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n) begin
        clk_cnt <= 16'd0;
    end
    else if(rx_flag) begin
        if(clk_cnt < BPS_CNT -1)
            clk_cnt <= clk_cnt +1'b1;
        else
            clk_cnt <= 16'd0;
        end
    else
        clk_cnt <= 16'd0;
end

//进入接受过程，启动接收数据计数器
always @ (posedge sys_clk or negedge sys_rst_n) begin
    if(!sys_rst_n) begin
        rx_cnt <= 4'd0;
    end
    else if(rx_flag) begin
        if(clk_cnt < BPS_CNT -1)
            rx_cnt <= rx_cnt +1'b1;
        else
            rx_cnt <= rx_cnt;
    end
    else
        rx_cnt <= 4'd0;
end

//根据接收数据计数器来寄存uart接收端口数据
always @(posedge sys_clk or negedge sys_rst_n) begin
    if ( !sys_rst_n)
        rxdata <= 8'd0;
    else if(rx_flag)                            //系统处于接收过程
        if (clk_cnt == BPS_CNT/2) begin         //判断系统时钟计数器计数到数据位中间
            case ( rx_cnt )
             4'd1 : rxdata[0] <= uart_rxd_d1;   //寄存数据位最低位
             4'd2 : rxdata[1] <= uart_rxd_d1;
             4'd3 : rxdata[2] <= uart_rxd_d1;
             4'd4 : rxdata[3] <= uart_rxd_d1;
             4'd5 : rxdata[4] <= uart_rxd_d1;
             4'd6 : rxdata[5] <= uart_rxd_d1;
             4'd7 : rxdata[6] <= uart_rxd_d1;
             4'd8 : rxdata[7] <= uart_rxd_d1;   //寄存数据位最高位
             default:;
            endcase
        end
        else
            rxdata <= rxdata;
    else
        rxdata <= 8'd0;
end

//数据接收完毕后给出标志信号并寄存输出接收到的数据
always @(posedge sys_clk or negedge sys_rst_n) begin
    if (!sys_rst_n) begin
        uart_data <= 8'd0;
        uart_done <= 1'b0;
    end
    else if(rx_cnt == 4'd9) begin               //接收数据计数器计数到停止位时
        uart_data <= rxdata;                    //寄存输出接收到的数据
        uart_done <= 1'b1;                      //并将接收完成标志位拉高
    end
    else begin
        uart_data <= uart_data;
        uart_done <= 1'b0;
    end
end

endmodule
