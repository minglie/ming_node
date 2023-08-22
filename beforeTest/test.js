M=require("../index.js")

async function main(){


    a=await M.request.post("https://reqres.in/api/users",{})
    console.log(a)
}



main()