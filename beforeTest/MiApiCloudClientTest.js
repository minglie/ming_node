const MiApiCloudClient=require("../module/MiApiCloudClient")


M.MiApiCloudClient = new MiApiCloudClient("A6032931027980", "FF279F8E-8B09-5F1A-1036-F6AE53F3538D").tableClient("mi_user");


mi_resource.list({},null,null,"sort").then(d => {
    let result = { rows: d  }
    console.log(result)
})

// mi_resource.add({
//     username:"minglie2234"
// }).then(d=>{
//     console.log(d)
// })