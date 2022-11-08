class Observered{
    constructor(){
        this.observeList=[]
    }
    add(observe){
        this.observeList.push(observe)
    }
    notify(){
        this.observeList.forEach(fn=>fn.updated())
    }
}

class Observe{
    constructor(fn){
        this.fn=fn
    }
    updated() {
     this.fn()   
    }
}

const ob1=new Observe(()=>{
    console.log(111);
})
const ob2=new Observe(()=>{
    console.log(222);
})
const obed=new Observered()
obed.add(ob1)
obed.add(ob2)
obed.notify()
