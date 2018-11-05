var express = require('express');
var router = express.Router();
const adminUserModel = require('../model/user')
//取JWT秘钥
const jwt = require('jsonwebtoken')
4
//引入逻辑
const user = require('../controller/user')
const swiper = require('../controller/swiper')
const news = require('../controller/news')
const category = require('../controller/category')
const common = require('../controller/common')
const topic = require('../controller/topic')
//秘钥
const cert = require('../utils/auth')
const newsModel = require('../model/news')


router.use('/admin/user', user)
router.use('/admin/news', news)
router.use('/admin/swiper', swiper)
router.use('/admin/category', category)
router.use('/admin/common', common)
router.use('/admin/topic', topic)

//加密
router.post('/demo/login', async (req, res , next) => {
    const {idnumber, password} = req.body
    const user = await adminUserModel.findOne(idnumber)
    if (user) {
        if (user.password = password) {
                const token = jwt.sign({userId: user._id}, cert, {expiresIn: 60*60*7})
                res.json({
                    code: 200,
                    token,
                    msg: '登录成功',
                    data: user
                })
        } else {
            res.json({
                code: 400,
                msg: '密码不正确'
            })
        }
    }else {
        res.json({
            code: 400,
            msg: '该用户不存在'
        })
    }
})

//普通获取新闻
router.get('/demo/getNews1', async (req, res, next) => {
    const dataList = await newsModel.find()
    res.json ({
        code: 200,
        msg: 'success',
        data: dataList
    })
})

//带token获取新闻
router.get('/demo/getNews2', (req, res, next) => {
    let token = req.headers.token || req.body.token || req.query.token

    if(token) {
        jwt.verify(token, cert, function (err, decode) {
            if (err){
                res.json({
                    code: 403,
                    msg: '登录状态失效'
                })
                return
            }
            console.log(decode)
            adminUserModel.findOne({_id: decode.userId}).then(user => {
                newsModel.find().then(data => {
                    res.json({
                        code: 200,
                        data: {
                            news: data,
                            user: user
                        }
                    })
                })
            })
        })
    }else {
        res.json({
            code: 403,
            msg: '缺少token'
        })
    }
})

//全局注册
// router.use(user)

module.exports = router;
