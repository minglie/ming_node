var M=require("../index");

CollectionUtils= require("../utils/common/CollectionUtils")

r1= CollectionUtils.u([[{name:"zs"}],[{name:"zws"}]],"name")
r2= CollectionUtils.n([[{name:"zs"}],[{name:"zs"}]],"name")
console.log(r1)
console.log(r2)

console.log(MIO)