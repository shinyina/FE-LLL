const router =require('express').Router()
//用户
router.use('/user',require("./user")).use('/login',require('./auth')).use('/upload',require('./upload'))

module.exports= router