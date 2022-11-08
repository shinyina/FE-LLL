import fs from 'fs'

const xhr=XMLHttpRequest()


function fun (options) {
    return new Promise((resolve, reject) => {
      //初始化默认值
      options = options || {}
      options.type = (options.type || 'POST').toUpperCase()
      const params = options.data
      // 创建XMLHttpRequest对象
      const xhr = new XMLHttpRequest()
      //发送请求
      if (options.type === "GET") {
        xhr.open('GET', options.url + "?" + getParams(params), true)
        xhr.send()
      } else if (options.type === "POST") {
        xhr.open('POST', options.url, true)
        //设置请求头
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(getParams(params))

      }
      //设置返回信息格式
      xhr.responseType = "json"
      //接收返回信息
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response)
          } else {
            reject(new Error(xhr.statusText))
          }

        }
      }
      xhr.onerror = function () {
        reject(new Error(xhr.statusText))
      }
      //设置接口请求超时时间
      setTimeout(() => {
        //取消当前请求
        xhr.abort()
      }, 5000)

    })

  }

function createFile() {
    fun({
        type:'get',
        url:'https://s2.232232.xyz/static/67/2022/10/14-6349186b56430.ico'
    }).then((data)=>{
        console.log(data);
    })
    fs.mkdirSync("./public/");
    fs.mkdirSync("./public/js/");
    fs.writeFileSync('./public/index.html', `
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
    `)
    fs.writeFileSync('./public/js/index.js','console.log("zhang")')
}

export function create() {
    createFile()
}