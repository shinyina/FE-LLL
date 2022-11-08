class Band {
    constructor(obj) {
        this.$data = obj
        //先Observer再渲染！！！
        Observer(obj)
        Compile(obj)
    }
}

function Compile(obj) {
    //第一次渲染
    for (let key in obj)
        document.querySelector(`#${key}`).innerText = obj[key]
    //给每个变量添加回调
    for (let key in obj)
        new Watcher(obj, key, (key) => {
            document.querySelector(`#${key}`).innerText = obj[key]
        })
}

function Observer(obj) {
    for (let key in obj) {
        let value = obj[key]//先存起来不然会无限递归
        let dep = new Dependency()
        Object.defineProperty(obj, key, {
            get() {
                //Dependency.target存放的Watcher的实例
                if (Dependency.target) {
                    dep.addSub(Dependency.target)
                }
                return value
            },
            set(newValue) {
                //触发修改通知页面更新即执行回调
                value = newValue
                dep.notify()
            }
        })
    }
}
class Watcher {
    constructor(vm, key, fn) {
        this.vm = vm
        this.key = key
        this.fn = fn
        Dependency.target = this
        // 触发get
        vm[key]
        Dependency.target = null
    }
    updated() {
        this.fn(this.key)
    }
}
class Dependency {
    constructor() {
        this.queue = []
        this.target
    }
    addSub(watcher) {
        this.queue.push(watcher)
    }
    notify() {
        this.queue.forEach(key => key.updated())
    }
}