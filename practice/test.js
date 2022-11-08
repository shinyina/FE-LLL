const objecSerach = (arr) => {
    for (const x of arr)
        if (Object.prototype.toString.call(x) === '[object Object]')
            console.log(x);
}

let arr = [1, {}, { a: 1, b: { c: 2 } }, { 0: 0 }, 'len', null,[1,2]]
objecSerach(arr)