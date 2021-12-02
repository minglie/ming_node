

class CollectionUtils{
    static async selectTree(getChildenList,parent_id=-1,queryCase={}){
        async function addChilden(record){
            let cList= await getChildenList(record.id,queryCase);
            record.childen=cList;
            if(cList.length==0){
                return
            }
            for (let i=0;i<cList.length;i++){
                let cObj= cList[i];
                addChilden(cObj);
            }
        }

        let rootList=await getChildenList(parent_id,queryCase);
        for (let i=0;i<rootList.length;i++){
            let obj=rootList[i];
            await addChilden(obj);
        }
        return rootList;
    }


}

module.exports = CollectionUtils;