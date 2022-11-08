const config=require('./config')

const express=require('express')
const cors=require('cors')
const morgan=require('morgan')

const app=express()

//中间件
app.use(express.json()).use(cors()).use(morgan())

//
app.use(express.static('public'))

//路由
app.use("/api",require('./routes'))
//数据库
require('./model')

app.use(require('./middleware/error'))

app.listen(config.app.port,()=>{
    console.log('Server Run Port',config.app.port);
})