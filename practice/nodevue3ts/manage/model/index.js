const mysql=require('mysql')

const db=mysql.createConnection({
    host: '127.0.0.1', // 表示连接某个服务器上的mysql数据库
    user: 'root', // 数据库的用户名 （默认为root）
    password: 'shinyina', 
    database: 'nodevue3',// 创建的本地数据库名称
})

db.connect();

module.exports=db