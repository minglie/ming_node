MemoryDb=require("../module/MemoryDb")

db= new MemoryDb()

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