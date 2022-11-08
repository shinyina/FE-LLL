Function.prototype.myCall=function(context,...args){
    context=context||window
    let fn=Symbol()
    context[fn]=this
    let res=context[fn](...args)
    delete context[fn]
    return res
}
function sum(a, b) {
    return a + b + this.c
}

let obj = {
    c: 3
}

console.log(sum.myCall(obj, 1, 2)); 
console.log(sum.call(obj, 1, 2)); 