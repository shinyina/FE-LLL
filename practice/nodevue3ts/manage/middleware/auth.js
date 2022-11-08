const jwt = require('jsonwebtoken')
const config = require("../config")

module.exports = (req, res, next) => {
    const token = req.header("token")
    if (!token) {
        return res.status(400).json({
            code: 400,
            msg: "无token"
        })
    }
    try {
        req.userData = jwt.verify(token, config.secret)
        next()
    } catch (error) {
        return res.status(401).json({
            code: 401,
            msg: "无效token"
        })
    }
}