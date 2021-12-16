

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


    static list2Csv({list,titlesKeys,titlesNames}){
        if(list==null||list.length==0){
            return;
        }
        if(!titlesKeys){
            titlesKeys=Object.keys(list[0])
        }
        if(!titlesNames){
            titlesNames=titlesKeys
        }
        let bodyStr="";
        list.forEach((items, index) => {
            for(let key of titlesKeys){
                items[key]=items[key]+"";
                bodyStr=bodyStr+`"${!items[key]?'null': ""+items[key].replace(/\s/g,"")}"`+","
            }
            // console.log(bodyStr)
            bodyStr=bodyStr+"\n";
        })
        return `\ufeff`+titlesNames+'\n'+bodyStr;
    }

    static n(arr,key="unionId"){
        function n1(r1,r2,key){
            if(r1==null || r2==null ||r1==undefined||r2==undefined || r1.length==0 || r2.length==0){
                return []
            }
            let  r2keyList=r2.map(u=>u[key])
            let result=   r1.filter(u=>r2keyList.indexOf(u[key])!==-1)
            return result;
        }
        let allResult=[]
        try{
            if(arr==null || arr==undefined || arr.length==0){
                return []
            }
            for (let i=0;i<arr.length;i++){
                if(arr[i]==null||arr[i]==undefined||arr[i].length==0){
                    return []
                }
            }
            allResult= arr.reduce((r1,r2)=>{
                let ri= n1(r1,r2,key)
                if(ri==null||ri==undefined||ri.length==0){
                    throw []
                }
                return ri;
            },arr[0])
        }catch (e){
            allResult=e;
        }
        return allResult;
    }

    static u(arr,key="unionId"){
        function u1(r1,r2,key){
            if(r1==null && r2==null){
                return []
            }
            let r=[...r1,...r2];
            return r;
        }
        let allResult=[]
        try{
            if(arr==null || arr==undefined || arr.length==0){
                return []
            }
            for (let i=0;i<arr.length;i++){
                if(arr[i]==null||arr[i]==undefined||arr[i].length==0){
                    return []
                }
            }
            allResult= arr.reduce((r1,r2)=>{
                let ri= u1(r1,r2,key)
                if(ri==null||ri==undefined||ri.length==0){
                    return [];
                }
                return ri;
            },arr[0])
        }catch (e){
            allResult=[];
        }
        let  allResultKeys=allResult.map(u=>u[key]);
        let allResult1=[];
        let allResult1KeyObj={};
        for (let i=0;i<allResult.length;i++){
            let allResultObj=allResult[i];
            let k= allResultObj[key];
            if(allResult1KeyObj[k]){
                continue;
            }else {
                allResult1.push(allResultObj);
                allResult1KeyObj[k]=true;
            }
        }
        return allResult1;
    }

    static dif(arr1,arr2,key="unionId"){
        if(arr1==null || arr1==null|| arr1.length==0 ){
            return []
        }
        if(arr2==null || arr2==null|| arr2.length==0 ){
            return arr1;
        }
        let  r2keyList=arr2.map(u=>u[key])
        let result=  arr1.filter(u=>r2keyList.indexOf(u[key])==-1)
        return result;

    }

}

module.exports = CollectionUtils;