module key_debounce(
    input  clk,
    input  rst_n,
    input        key_in     ,
    output  reg  key_out
);

//计算器值
parameter  MAX_CNT =10 ;
reg[7:0] cnt=0;
wire add_cnt;
wire end_cnt;
reg        key_d0;            //将按键信号延迟一个时钟周期
reg        key_d1;            //将按键信号延迟两个时钟周期

always @ (posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        key_d0 <= 1'b1;
        key_d1 <= 1'b1;
    end
    else begin
        key_d0 <= key_in;
        key_d1 <= key_d0;
    end
end


//第一段：同步时序always模块，格式化描述次态寄存器迁移到现态寄存器(不需更改）
always @(posedge clk or negedge rst_n)begin
	if(!rst_n)begin
		cnt <= 0;
	end
	else if(add_cnt)begin
		if(end_cnt)
			cnt <= 0;
		else
			cnt <= cnt + 1;
	end
end


//第二段：设计转移条件
assign add_cnt = cnt<MAX_CNT;
assign end_cnt = (add_cnt && cnt== MAX_CNT-1)||key_d1!=key_d0 ;


//第三段：同步时序always模块,输出
always @(posedge clk or negedge rst_n)begin
    if(rst_n==1'b0)
       key_out<=1'b1;
    else if(cnt==MAX_CNT-1)
       key_out<=key_d1;
end



endmodule
