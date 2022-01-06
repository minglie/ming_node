FileDb=require("../module/FileDb")

db= new FileDb("a.json",false)

db.add({
    name:"zs"
})

console.log(db.listByPage({caseObj:{
        "$name":"s"
    }}))


db.add({
    name:"ls"
})

console.log(db.listByPage({}))