//引入express路由
const {Router} = require('express')
const router = Router()
const categoryModel = require('../model/category')
const auth = require('./auth')

//添加分类接口
router.post('/', auth, async (req, res, next) => {
    try {
        const {title, icon} = req.body
        const data = await categoryModel.create({
            title,
            icon
        })
        res.json({
            code: 200,
            msg: '添加分类成功',
            data
        })
    }catch (err) {
        next(err)
    }
})

//获取分类接口
router.get('/', async (req, res, next) => {
    try {
        const data = await categoryModel.find().sort({_id: -1})
        res.json({
            code: 200,
            msg: '分类获取成功',
            data
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router