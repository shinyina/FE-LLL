const router = require('express').Router()
const db = require('../model')
const message = require('../utils')
const userTypre = require('../model/user')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

//加密
async function encryption(password) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}
//注册
router.post('/', (req, res) => {
    if (userTypre(req.body)) {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        db.query(`insert into users(email,name,password,avatar,introduction) values('${req.body.email}','${req.body.name}','${req.body.password}','https://s2.232232.xyz/static/67/2022/11/01-63610c3689280.jpg','这个人什么都没有留下')`, (err, data) => {
            if (!err)
                message.data(res, '注册成功')
            else
                message.error(res, err.code)
        })
    }
    else
        message.error(res, '错误类型')
})
//获取所有用户
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, data) => {
        if (err)
            message.error(res, err.code)
        else
            message.data(res, data)
    })
})
//获取指定用户
router.get('/:name', (req, res) => {
    db.query(`SELECT id,name,avatar,introduction FROM users where name = '${req.params.name}'`, (err, data) => {
        if (err) {
            message.error(res, err.code)
        }
        else
            message.data(res, data)
    })
})
//编辑/修改用户
router.put('/:id', auth, (req, res) => {
    if (req.userData.id == req.params.id)
        if (req.body.avatar)
            db.query(`update users set introduction='${req.body.introduction}',name='${req.body.name}',avatar='${req.body.avatar}' where id=${req.params.id}`, (err, data) => {
                if (!err)
                    message.data(res, '修改成功')
                else
                    message.error(res, err.code)
            })
        else {
            db.query(`update users set introduction='${req.body.introduction}',name='${req.body.name}' where id=${req.params.id}`, (err, data) => {
                if (!err)
                    message.data(res, '修改成功')
                else
                    message.error(res, err.code)
            })
        }
    else
        message.error(res, '权限不足')
})
//删除用户
router.delete('/:id', (req, res) => {
    db.query(`DELETE FROM users where id = ${req.params.id}`, (err, data) => {
        if (err)
            message.error(res, err.code)
        else
            message.data(res, '删除成功')
    })
})

module.exports = router