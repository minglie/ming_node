`timescale 1ns / 1ns
module top_UART_RX
(
    input sys_clk,
    input sys_rst_n,
    input rxd,
	//write wire
    output wire [7:0] led_output
);

wire [7:0] rxd_data;
/****************************************
  *  			Main Code
  *  			主要代码
 ****************************************/

 //串口接收模块
uart_rx u_uart_recv
(
    .sys_clk        (sys_clk),
    .sys_rst_n      (sys_rst_n),

    .uart_rxd       (rxd),
    .uart_data      (rxd_data)
);

//LED灯
uart_rx_led u_uart_rx_led
(
    .input_led (rxd_data),
    .output_led (led_output),
    .sys_clk (sys_clk),
    .sys_rst_n (sys_rst_n)
);


endmodule
