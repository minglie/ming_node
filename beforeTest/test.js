M=require("../index.js")


async function main(){
   await M.readCsvLine("./a.csv",l=>{
        console.log(l)
    })
    console.log("结束")
}

main()