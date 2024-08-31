module led(
    input clk,
    input rst_n,
    input  key,
    output wire[2:0]  led
);

typedef enum reg [2:0] {
    S0, 
    S1, 
    S2, 
    S3 
} state_t;
state_t state_c=S0, state_n=S0;
logic s0_s1_start;
logic s1_s2_start;
logic s2_s3_start;


always@(posedge clk or negedge rst_n)begin
    if(!rst_n)begin
        state_c <= S0;
    end
    else begin
        state_c <= state_n;
    end
end
//第二段：组合逻辑always模块，描述状态转移条件判断
always@(*)begin
    case(state_c)
        S0: begin//状态
            if(s0_s1_start)begin
                state_n = S1;//状态1
            end
            else begin
                state_n = state_c;
            end
        end

        S1:begin
            if(s1_s2_start)begin
                state_n = S2;//状态2
            end
            else begin
                state_n = state_c;
            end
        end

        S2:begin
            if(s2_s3_start)begin
                state_n = S3;//状态3
            end
            else begin
                state_n = state_c;
            end
        end
        default:begin
                state_n = S0;
        end
    endcase
end
//第三段：设计转移条件
assign s0_s1_start  = state_c==S0 ;
assign s1_s2_start   = state_c==S1  ;
assign s2_s3_start   = state_c==S2   ;


assign led=state_c;


endmodule

