class Vue {
    constructor(obj_instance) {
        this.$data = obj_instance.data;
        Observer(this.$data)
        Compile(obj_instance.el, this)
    }
}

function Observer(data_instance) {
    // console.log(data_instance);
    const dependency = new Dependency()
    if (!data_instance || typeof data_instance != 'object') return;
    Object.keys(data_instance).forEach(key => {
        var value = data_instance[key]
        Observer(value)
        Object.defineProperty(data_instance, key, {
            configurable: true,
            enumerable: true,
            get() {
                Dependency.temp && dependency.addSub(Dependency.temp)
                return value;
            },
            set(newValue) {
                value = newValue
                dependency.notify()
            },
        })
    })
}

function Compile(element, vm) {
    vm.$el = document.querySelector(element);
    const fragment = document.createDocumentFragment();
    let child;
    while (child = vm.$el.firstChild) {
        fragment.append(child)
    }
    fragment_compile(fragment);
    function fragment_compile(node) {
        const pattern = /\{\{\s*(\S+)\s*\}\}/;
        const xxx = node.nodeValue;
        if (node.nodeType === 3) {
            const reslut_regax = pattern.exec(node.nodeValue)
            if (reslut_regax) {
                const arr = reslut_regax[1].split('.')
                const value = arr.reduce((tol, cur) => tol[cur], vm.$data)
                node.nodeValue = node.nodeValue.replace(pattern, value);
                new Watcher(vm, reslut_regax[1], newValue => {
                    node.nodeValue = xxx.replace(pattern, newValue)
                })
            }
            return;
        }
        if (node.nodeType === 1 && node.nodeName === 'INPUT') {
            const attr = Array.from(node.attributes);
            attr.forEach(i => {
                if (i.nodeName === 'v-model') {
                    const value = i.nodeValue.split('.').reduce((tol, cur) => tol[cur], vm.$data)
                    node.value = value
                    new Watcher(vm, i.nodeValue, newValue => {
                        node.value = newValue
                    })
                    node.addEventListener('input', e => {
                        const arr1 = i.nodeValue.split('.')
                        const arr2 = arr1.slice(0, arr1.lenght - 1)
                        const final = arr2.reduce((tol, cur) => tol[cur], vm.$data)
                        final[arr1[arr1.lenght - 1]] = e.target.value;
                    })
                }
            })
        }
        node.childNodes.forEach(key => {
            fragment_compile(key)
        })
    }
    vm.$el.append(fragment)
}

class Dependency {
    constructor() {
        this.subscribers = []
    }
    addSub = (sub) => {
        this.subscribers.push(sub)
    }
    notify = () => {
        this.subscribers.forEach(sub => sub.updata())
    }
}

class Watcher {
    constructor(vm, key, callback) {
        this.vm = vm
        this.key = key
        this.callback = callback
        Dependency.temp = this
        key.split('.').reduce((tol, cur) => tol[cur], vm.$data)
        Dependency.temp = null
    }
    updata() {
        const value = this.key.split('.').reduce((tol, cur) => tol[cur], vm.$data)
        this.callback(value)
    }
}