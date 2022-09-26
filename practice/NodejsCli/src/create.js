const fs = require('fs')

import { runServer } from './runServer'

async function createFile() {
    fs.mkdir('public', () => { })
    fs.mkdir('./public/js', () => { })
    fs.writeFile('./public/index.html', `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zhangcli</title>
    <script src="./js/index.js"></script>
</head>
<body>
    <h1>欢迎使用zhangcli</h1>
</body>
</html>
        `, () => { })
    fs.writeFile('./public/js/index.js', `console.log('zhangcli')`, () => { })
}
export function create() {
    createFile().then(() => { runServer() })
}