var M=require("../index");
const ApiCloudBaseRpcApi= require("../plugins/BaseRpcApi/ApiCloudBaseRpcApi");
const MiApiCloudClient=require("../module/MiApiCloudClient");
const apiCloudClient = new MiApiCloudClient("A6032931027980", "FF279F8E-8B09-5F1A-1036-F6AE53F3538D");
let apiCloudBaseRpcApi = new ApiCloudBaseRpcApi(
        {
            prefix:"ming",
            tableName:"ming",
            apiCloudClient
        }
    )

var app=M.server();

app.listen(8888);

app.use(apiCloudBaseRpcApi);
