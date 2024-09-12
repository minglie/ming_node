`timescale 1ns / 1ns

module top_UART_TX
(
    input	      sys_clk,                  //系统时钟
    input         sys_rst_n,                //系统复位，低电平有效
    output      txd
 );

//wire define

wire [7:0] data_inline;              //UART接收数据
wire       uart_send_en;                //UART发送使能


wire       uart_recv_done;              //UART接收完成

wire [7:0] uart_send_data;              //UART发送数据
wire       uart_tx_busy;                //UART发送忙状态标志

uart_tx#(.UART_BPS(960000)) u_uart_transmit
(
    .sys_clk (sys_clk),                   //系统时钟
    .sys_rst_n  (sys_rst_n),                //系统复位，低电平有效
    .uart_en (uart_send_en),                  //发送使能信号
    .uart_din (data_inline),                 //待发送数据
    .uart_txd (txd)                  //UART发送端口
 );




 uart_tx_count#(.COUNT_200(3000)) u_uart_tx_count
 (
        .sys_clk (sys_clk),
        .sys_rst_n (sys_rst_n),
        .enable_txd (uart_send_en),  //允许串口发送
        .data  (data_inline)
 );

endmodule