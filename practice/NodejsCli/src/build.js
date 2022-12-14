const fs = require('fs')
const path = require('path')

const defaultOptions = {
    entry: './public/js/index.js',
    output: './dist/js/bundle.js',
}
const modules = {}
var cmj = {}
cmj.config = (options) => Object.assign(defaultOptions, options)

//提取函数中的依赖
function getDepsFromFun(fun) {
    return fun.toString().match(/(?<=require\(['"])(.+)(?=['"]\))/g)
}

cmj.run = () => {
    //读取入口文件内容
    let mainFile = fs.readFileSync(defaultOptions.entry, 'utf-8')
    //将文件添加到依赖
    getModule(defaultOptions.entry, mainFile)
    //提取入口文件 依赖
    let deps = getDepsFromFun(mainFile)
    // 递归 读取文件内容，并引入到模块中
    getDepModule(deps)
    // 生成代码
    genBundle()
}


var genBundle = () => {
    let moduleStr = '{'
    for (let name in modules) {
        moduleStr += `'${name}': ${modules[name].toString()},`
    }
    moduleStr += '}'
    let bundleFile = `
    const cache = {};
    (function(modules){
        const require = (path)=>{
            path = path.replace(/\\.\\/|\\.js/g, '')
            path += '.js'
            if(cache[path]) return cache[path]
            let module = cache[path] = {
                exports:{},
                name:path,
            }
            modules[path](module,module.exports,require)
            return module.exports
        }   
        return require('${defaultOptions.entry}')
    })(${moduleStr})
    `
    fs.writeFileSync(defaultOptions.output, bundleFile)

}

var getDepModule = (deps) => {
    if (deps) {
        deps.map(e => {
            e = e.replace('.js', '')
            e = e + '.js'
            console.log(path.join(__dirname, e))
            let file = fs.readFileSync(path.join(__dirname, e), 'utf-8')
            console.log(e)
            getModule(e, file)
        })
    }
}

var getModule = (name, file) => {
    name = name.replace('./', '')
    eval(`
    modules['${name}'] = function (module,exports,require){
        ${file}
    }
`)
}


// 打包工具配置
cmj.config({
    entry: './public/js/index.js',
    output: './dist/js/index.js'
})
//启动打包

export function build() {
    fs.mkdir('dist', () => { })
    fs.mkdir('./dist/js', () => { })
    cmj.run()
    fs.copyFile('./public/index.html', './dist/index.html', (err) => { if (err) console.log(err); })
}