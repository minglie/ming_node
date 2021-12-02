const MiApiCloudClient=require("../module/MiApiCloudClient")


const mi_resource = new MiApiCloudClient("A6032931027980", "FF279F8E-8B09-5F1A-1036-F6AE53F3538D").tableClient("file");


mi_resource.list({name:"mi_resource.json"},null,null,"sort").then(d => {
    let result = { rows: d  }
    console.log(result)
})