MemoryDb=require("../module/MemoryDb")

db= new MemoryDb()

db.add({
    name:"zs"
})

console.log(db.listByPage())


db.add({
    name:"ls"
})

console.log(db.listByPage())