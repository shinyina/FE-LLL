class Commitment {
    static PENDING = '待定'; static FULFILLED = '成功'; static REJECTED = '失败';
    constructor(func) {
        this.resolveCallBack = [];
        this.rejectCallBack = [];
        this.status = Commitment.PENDING;
        this.reslut = null;
        try {
            func(this.resolve, this.reject);
        } catch (error) {
            this.reject(error)
        }

    }
    resolve = (reslut) => {
        if (this.status === Commitment.PENDING) {
            setTimeout(() => {
                this.status = Commitment.FULFILLED;
                this.reslut = reslut;
                for(let i=0;i<this.resolveCallBack.length;i++){
                    this.resolveCallBack[i](reslut);
                }//等量代换
            })
        }
    }
    reject = (reslut) => {
        if (this.status === Commitment.PENDING) {
            setTimeout(() => {
                this.status = Commitment.REJECTED;
                this.reslut = reslut;
                this.rejectCallBack.forEach(callback => {
                    callback(reslut);
                })
            })
        }
    }
    then(onFULFILLED, onREJECTED) {
        onFULFILLED = typeof (onFULFILLED) === 'function' ? onFULFILLED : () => { };
        onREJECTED = typeof (onREJECTED) === 'function' ? onREJECTED : () => { };
        if (this.status === Commitment.PENDING) {
            this.resolveCallBack.push(onFULFILLED)
            this.rejectCallBack.push(onREJECTED)
        }
        if (this.status === Commitment.FULFILLED) {
            setTimeout(() => {
                onFULFILLED(this.reslut)
            })
        }
        if (this.status === Commitment.REJECTED) {
            setTimeout(() => {
                onREJECTED(this.reslut)
            })
        }
    }
}
let p = new Commitment((resolve, reject) => {
    setTimeout(()=>{
        resolve('111')
        console.log('000');
    })
}).then(res => { console.log(res); }, err => { console.error(err); })