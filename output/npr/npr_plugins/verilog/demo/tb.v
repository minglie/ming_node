`timescale 1ns / 1ns        //���浥λ/���澫��

module tb();



reg           key;
wire          led;


initial begin
    key <= 1'b1;
    #2
    key <= 1'b1;
    #3
    key <= 1'b0;
    #2
    key <= 1'b1;
    #2
    key <= 1'b0;
end

//����ledģ��
led  u_led(
    .key          (key),
    .led          (led)
    );

endmodule

