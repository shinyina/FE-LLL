import babel from 'rollup-plugin-babel'

//导出对象作为配置文件
export default {
    input:'./src/index.js',
    output:{
        file:'./dist/vue.js',
        format:'umd',//esm ES6模块 commonjs模块 iife自执行函数 umd(commonjs amd)
        name:'Vue',
        sourcemap:true
    },
    plugins:[
        babel({
            exclude:'node_modules/**'//排除第三方文件
        })
    ]
}



