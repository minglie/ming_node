class DtUtils;
    localparam
    NUM0 = ~8'h3f,
    NUM1 = ~8'h06,
    NUM2 = ~8'h5b,
    NUM3 = ~8'h4f,
    NUM4 = ~8'h66,
    NUM5 = ~8'h6d,
    NUM6 = ~8'h7d,
    NUM7 = ~8'h07,
    NUM8 = ~8'h7f,
    NUM9 = ~8'h6f,
    NUMA = ~8'h77,
    NUMB = ~8'h7c,
    NUMC = ~8'h39,
    NUMD = ~8'h5e,
    NUME = ~8'h79,
    NUMF = ~8'h71;

    static  function reg[7:0] hex2Dig(logic[3:0] hex_in);
       reg [7:0] dig;
       case(hex_in)
			4'h0: dig[7:0] = NUM0;
			4'h1: dig[7:0] = NUM1;
			4'h2: dig[7:0] = NUM2;
			4'h3: dig[7:0] = NUM3;
			4'h4: dig[7:0] = NUM4;
			4'h5: dig[7:0] = NUM5;
			4'h6: dig[7:0] = NUM6;
			4'h7: dig[7:0] = NUM7;
			4'h8: dig[7:0] = NUM8;
			4'h9: dig[7:0] = NUM9;
			4'ha: dig[7:0] = NUMA;
			4'hb: dig[7:0] = NUMB;
			4'hc: dig[7:0] = NUMC;
			4'hd: dig[7:0] = NUMD;
			4'he: dig[7:0] = NUME;
			default: dig[7:0] = 7'b0111000;
		endcase
        return dig;
    endfunction


endclass



module digital_tube(
    input clk,
    input rst_n,
    input [3:0] d0, //第一个数码管显示的数字
    input [3:0] d1,
    input [3:0] d2,
    input [3:0] d3,
    input [3:0] dp_in, //小数点控制
    output reg [5:0] sel,   //片选
    output reg [7:0] dig  //段选
    );

	localparam N = 16; //使用低16位对50Mhz的时钟进行分频(50MHZ/2^16)
	reg [N-1:0] regN; //高两位作为控制信号，低16位为计数器，对时钟进行分频
	reg [3:0] hex_in; //段选控制信号
	reg dp;

	always@(posedge clk or negedge rst_n)
	begin
		if(rst_n==0)
			regN <= 0;
		else
			regN <= regN + 1;
	end

	always@(*) begin
		case(regN[N-1:N-2])
            2'b00:begin
                sel = 6'b111110; //选中第1个数码管
                hex_in = d0; //数码管显示的数字由hex_in控制，显示d0输入的数字；
                dp = dp_in[0]; //控制该数码管的小数点的亮灭
            end
            2'b01:begin
                sel = 6'b111101; //选中第二个数码管
                hex_in = d1;
                dp = dp_in[1];
            end
            2'b10:begin
                sel = 6'b111011;
                hex_in = d2;
                dp = dp_in[2];
            end
            default:begin
                sel = 6'b110111;
                hex_in = d3;
                dp = dp_in[3];
            end
		endcase
	end
	always@(posedge clk) begin
		dig[7:0] =DtUtils::hex2Dig(hex_in);
	end
endmodule