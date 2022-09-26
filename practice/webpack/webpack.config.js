const path = require("path");

module.exports = {

    entry: "./src/main.js",

    output: {
        // path: 文件输出目录，必须是绝对路径
        // path.resolve()方法返回一个绝对路径
        // __dirname 当前文件的文件夹绝对路径
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },

    module: {
        rules: [{
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
        }],
    },

    plugins: [],

    mode: "development"
}