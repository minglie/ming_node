module AND_Gate(
  input A,
  input B,
  output Y,
  input clk);

  assign Y = A&&B;
endmodule


module tb;
reg A;
reg B;
reg clk;
wire Y;

AND_Gate inst(.A(A), .B(B), .Y(Y), .clk(clk));

always #5 clk = ~clk;
initial
begin
  $monitor ("\nA=%0b B=%0b Y=%0b", A, B, Y);

  clk<=0;
  A<=0;
  B<=0;

  #10
  A<=0;
  B<=1;

  #10
  A<=1;
  B<=0;

  #10
  A<=1;
  B<=1;

  #15 $finish;
end


endmodule
