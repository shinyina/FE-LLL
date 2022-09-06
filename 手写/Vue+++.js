class Band{
    constructor(obj){
        this.$data=obj
        Observer(obj)
        Compile(obj)
    }
}

function Observer(obj){
    const dependency=new Dependency()
    Object.keys(obj).forEach(key=>{
         var value=obj[key];
        Object.defineProperty(obj,key,{
            get(){
                if(Dependency.temp)
                {
                    dependency.addSub(Dependency.temp)
                }
                return value
            },
            set(newvalue){
                value=newvalue
                dependency.notify()
            }
        })
    })
}

function Compile(obj){
    Object.keys(obj).forEach(key=>{
        var element=document.querySelector(`#${key}`)
        element.innerHTML=obj[key];
    })
    Object.keys(obj).forEach(key=>{
       new Watcher(obj,key,()=>{
        var element=document.querySelector(`#${key}`)
        element.innerHTML=obj[key];
       })
    })
}

class Dependency{
    constructor(){
        this.queue=[]
    }
    addSub(sub){
        this.queue.push(sub)
    }
    notify(){
        this.queue.forEach(key=>{
            key.updata()
        })
    }
}

class Watcher{
    constructor(vm,key,callback){
        this.vm=vm
        this.key=key
        this.callback=callback
        Dependency.temp=this
        vm[key]
        Dependency.temp=null
    }
    updata(){
        this.callback()
    }
}