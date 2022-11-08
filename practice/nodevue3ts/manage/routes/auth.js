const router = require('express').Router()
const authType = require('../model/auth')
const db = require('../model')
const message = require('../utils')
const bcrypt = require('bcryptjs')
const config = require('../config')
const jwt = require('jsonwebtoken')

router.post('/', (req, res) => {
    if (authType(req.body)) {
        db.query(`select * from users where email='${req.body.email}'`, (err, data) => {
            if (err) message.error(res, err.code)
            else {
                if (!data[0]) message.error(res, '账号不存在')
                else if (bcrypt.compareSync(req.body.password, data[0].password))//第一个是用户提交密码（加密前）第二个是数据库中密码（加密后）
                {
                    var user = { ...data[0], password: null }
                    var token = jwt.sign(user, config.secret, { expiresIn: '1h' })
                    message.data(res, { token,user })
                }
                else {
                    message.error(res, '密码错误')
                }
            }

        })
    }
    else {
        message.error(res, '类型错误')
    }
})

module.exports = router