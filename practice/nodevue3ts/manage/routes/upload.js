const router = require('express').Router()
const db = require('../model')
const message = require('../utils')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
})

const upload = multer({ storage })

router.post('/', upload.single("file"), (req, res) => {
    message.data(res, {
        msg: '文件上传成功',
        url:`http://127.0.0.1:3000/uploads/${req.file.originalname}`
    })
})

module.exports = router