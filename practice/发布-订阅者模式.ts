class Observe {
    message
    constructor() {
        this.message = {};
    }
    $on(type:string, callback:Function):void {
        if (!this.message[type]) {
            this.message[type] = [];
        }
        this.message[type].push(callback)
    }
    $off(type:string, callback:Function):void {
        if (!callback)
            delete this.message[type];
        else
            this.message[type] = this.message[type].filter((item) => item !== callback);
    }
    $emit(type:string):void { 
        this.message[type].forEach(key=>key())
    }
}

const ob = new Observe();
function call1() { console.log('111') }
function call2() { console.log('2222') }
ob.$on('buy', call1)
ob.$on('buy', call2)
 ob.$emit('buy')