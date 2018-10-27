//引入express路由
const {Router} = require('express')
const router = Router()
const swiperModel = require('../model/swiper')
const auth = require('./auth')

//添加轮播图接口
router.post('/', auth, async (req, res, next) => {
    try {
        const {
            title,
            img,
            newsId,
            status,
            sort
        } = req.body
        const data = await swiperModel.create({
            title,
            img,
            newsId,
            status,
            sort
        })
        res.json({
            code: 200,
            msg: '轮播图添加成功',
            data
        })
    }catch (err) {
        res.json({
            code: 400,
            msg: '添加轮播图失败',
            err
        })
    }
})

//获取轮播图接口
router.get('/', async (req, res, next) => {
    try {
        let { page = 1,page_size = 10 } = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await swiperModel.find()
            .skip((page - 1) * page_size)
            .limit(page_size)
            .sort({sort: 1, _id: 1})
            .populate({
                path: 'newsId',
                select: '-password'
            })
        res.json({
            code: 200,
            msg: '获取轮播图成功',
            data
        })
    }catch (err) {
        res.json({
            code: 400,
            msg: '获取轮播图失败',
            err
        })
    }
})

//获取单个轮播图
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await swiperModel.findById(id)
            .populate({
                path: 'newsId',
                select: '-password'
            })
        res.json({
            code: 200,
            msg: '轮播图获取成功',
            data
        })
    }catch (err) {
        next(err)
    }
})

//修改轮播图
router.patch('/:id', auth, async (req, res, next) => {
    try {
        const {
            title,
            img,
            newsId,
            status,
            sort
        } = req.body
        const data = await swiperModel.findById(id)
        const updateData = await data.updateOne({
            $set: {
                title,
                img,
                newsId,
                status,
                sort
            }
        })
        res.json({
            code: 200,
            msg: '轮播图修改成功',
            data: updateData
        })
    }catch (err) {
        res,json({
            code: 200,
            msg: '修改轮播图失败',
            err
        })
    }
})

//删除轮播图
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await swiperModel.findById(id)
        const deleteData = await data.deleteOne()
        res.json({
            code: 200,
            msg: '删除轮播图成功',
            data: deleteData
        })
    }catch (err) {
        res.json({
            code: 400,
            msg: '删除轮播图失败',
            err
        })
    }
})

module.exports = router