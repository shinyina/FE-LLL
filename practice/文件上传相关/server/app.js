const express=require('express')

const app=express()

//文件上传
app.post('/upload',())

app.listen('8081',()=>{
    console.log('Server run at http://localhost:8081');
})
