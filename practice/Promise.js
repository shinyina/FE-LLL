class Commitment {
    static PENDING = 'PENDING'; FULFILLED = 'FULFILLED'; REJECTED = 'REJECTED'
    constructor(func) {
        this.state = Commitment.PENDING
        this.resolveCallBack = []
        this.rejectCallBack = []
        try {
            func(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
    resolve = (result) => {
        if (this.state == Commitment.PENDING) {
            setTimeout(() => {
                this.state = Commitment.FULFILLED
                this.result = result
                this.resolveCallBack.forEach(fn=>fn(this.result))
            })
        }
    }
    reject = (result) => {
        if (this.state == Commitment.PENDING) {
            setTimeout(() => {
                this.state = Commitment.REJECTED
                this.result = result
                this.rejectCallBack.forEach(fn=>fn(this.result))
            })
        }
    }
    then(onResolve, onReject) {
        typeof onResolve == 'function' ? onResolve : () => { }
        typeof onReject == 'function' ? onReject : () => { }
        if (this.state == Commitment.PENDING) {
            this.rejectCallBack.push(onReject)
            this.resolveCallBack.push(onResolve)
        }
        else if (this.state == Commitment.FULFILLED)
            setTimeout(onResolve(this.result))
        else if (this.state == Commitment.REJECTED)
            setTimeout(onReject(this.result))
    }
}

let p = new Commitment((resolve, reject) => {
    console.log('000');
    // resolve(111)
    setTimeout(() => { resolve('111') }, 2000)
})

p.then(res => { console.log(res); console.log(333) }, () => { })
p.then(() => { setTimeout(() => { console.log(666) }, 700); console.log(888); }, () => { })