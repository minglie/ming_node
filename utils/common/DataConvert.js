const DataConvert={};

DataConvert.num2Bytes=(num,length=4)=>{
    if(length==2){
        return [(num&(0xFF00))>>8,num&(0x00FF)]
    }
    if(length==4){
        return [(num&(0xFF000000))>>24,(num&(0x00FF0000))>>16,(num&(0x0000FF00))>>8,num&(0x00FF)]
    }
}

DataConvert.str2Bytes=(str,length=16)=>{
    let zeroBuffer=new Buffer(length);
    let strBuffer=new Buffer(str);
    for (let i=0;i<16;i++){
        zeroBuffer[i]=strBuffer[i];
    }
    return zeroBuffer;
}

DataConvert.parseIpToInt=(ip)=> {
    var buf = ip.split(".")
    return (parseInt(buf[0]) << 24 |
        parseInt(buf[1]) << 16 |
        parseInt(buf[2]) << 8 |
        parseInt(buf[3]))>>>0;
}


module.exports = DataConvert;