var M=require("../index");

async function  main(){
    DD=   await M.require("http://localhost:8888/aa.js")
    console.log(DD)
}

main()