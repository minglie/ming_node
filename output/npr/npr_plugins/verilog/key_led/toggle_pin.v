module toggle_pin(
    input        clk,
    input        rst_n,
    input        in_pin,
    output  reg  out_pin
    );


reg    in_pin_d0;          //将消抖后的按键值延迟一个时钟周期
reg    in_pin_d1;


always @ (posedge clk or negedge rst_n) begin
    if(!rst_n) begin
        in_pin_d0 <= 1'b1;
        in_pin_d1 <= 1'b1;
    end
    else begin
        in_pin_d0 <= in_pin;
        in_pin_d1 <= in_pin_d0;
    end
end


//每次按键按下时，就翻转蜂鸣器的状态
always @ (posedge clk or negedge rst_n) begin
    if(!rst_n)
        out_pin <= 1'b1;
    else if(in_pin_d0==0  &&  in_pin_d1 == 1)
        out_pin <= ~out_pin;
    else
        out_pin <= out_pin;
end

endmodule
