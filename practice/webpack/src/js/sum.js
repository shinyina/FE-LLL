export default function sum(...args) {
    return args.reduce((prev, curr) =>  prev + curr , 0);//箭头函数不加括号默认return
}

