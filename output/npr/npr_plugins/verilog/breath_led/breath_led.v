
module breath_led(
    input       clk ,      //系统时钟 50MHz
    input       rst_n ,    //系统复位，低电平有效
    output reg  led            //LED灯
);


parameter CNT_2US_MAX = 7'd100;
parameter CNT_2MS_MAX = 10'd1000;
parameter CNT_2S_MAX  = 10'd1000;

//reg define
reg [6:0] cnt_2us=0;
reg [9:0] cnt_2ms=0;
reg [9:0] cnt_2s=0;
reg       inc_dec_flag; //亮度递增/递减 0:递增 1:递减

wire add_cnt_2us;
wire end_cnt_2us;
wire add_cnt_2ms;
wire end_cnt_2ms;
wire add_cnt_2s;
wire end_cnt_2s;


assign add_cnt_2us = 1;
assign end_cnt_2us = add_cnt_2us && cnt_2us== CNT_2US_MAX-1;

assign add_cnt_2ms= end_cnt_2us;
assign end_cnt_2ms= add_cnt_2ms &&  cnt_2ms == CNT_2MS_MAX - 1;

assign add_cnt_2s=  end_cnt_2ms;
assign end_cnt_2s=  add_cnt_2s  &&   cnt_2s == CNT_2S_MAX - 1;


//cnt_2us:计数2us
always @(posedge clk or negedge rst_n)begin
	if(!rst_n)begin
		cnt_2us <= 0;
	end
	else if(add_cnt_2us)begin
		if(end_cnt_2us)
			cnt_2us <= 0;
		else
			cnt_2us <= cnt_2us + 1;
	end
end

//cnt_2ms:计数2ms
always@(posedge clk or negedge rst_n) begin
    if(!rst_n)
        cnt_2ms <= 10'b0;
    else if(add_cnt_2ms) begin
        if(end_cnt_2ms)
            cnt_2ms <= 10'b0;
        else
      		cnt_2ms <= cnt_2ms + 1;
    end
end

//cnt_2s:计数2s
always@(posedge clk or negedge rst_n) begin
    if(!rst_n)
        cnt_2s <= 0;
    else if(add_cnt_2s) begin
        if(end_cnt_2s)
            cnt_2s <= 10'b0;
        else
      		cnt_2s <= cnt_2s + 1;
    end
end






//inc_dec_flag为低电平，led灯由暗变亮，inc_dec_flag为高电平，led灯由亮变暗
always@(posedge clk or negedge rst_n) begin
    if(!rst_n)
        inc_dec_flag <= 1'b0;
    else if(end_cnt_2s && end_cnt_2ms && end_cnt_2us)
        inc_dec_flag <= ~inc_dec_flag;
    else
        inc_dec_flag <= inc_dec_flag;
end

//led:输出信号连接到外部的led灯
always@(posedge clk or negedge rst_n) begin
    if(!rst_n)
        led <= 1'b0;
    else if((inc_dec_flag == 1'b1 && cnt_2ms >= cnt_2s) || (inc_dec_flag == 1'b0 && cnt_2ms <= cnt_2s))
        led <= 1'b1;
    else
        led <= 1'b0;
end

endmodule