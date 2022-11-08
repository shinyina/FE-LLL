function Parent(name){
    this.name=name
}
Parent.prototype.getName=function(){
    return this.name
}

function Son(name,age){
    Parent.call(this,name)
    this.age=age
}
Son.prototype.getAge=function(){
    return this.age
}

Son.prototype.__proto__=Object.create(Parent.prototype)

let son1=new Son('shiyin',66)
console.log(son1.getName());