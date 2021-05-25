var M=require("./index");

Db= M.getMongoDB({})

async function  main() {


    setTimeout(async ()=>{
        for (let i = 0; i < 33; i++) {

            d = await Db.getById("60ad1bca14eb7753ff6084cb")
            console.log(d)
        }


    },2000)




}


main()