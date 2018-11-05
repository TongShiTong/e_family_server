//引入express路由
const {Router} = require('express')
const router = Router()
const topicModel = require('../model/topic')
const auth = require('./auth')

//添加互动主题接口
router.post('/', auth, async (req, res, next) => {
    try {
        const {content} = req.body
        const userId = req.session.user._id
        const data = await topicModel.create({
            content,
            user:userId
        })
        res.json({
            code: 200,
            msg: '添加互动主题成功',
            data
        })
    }catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        let {page = 1, page_size = 10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        let count = await topicModel.count()
        const dataList = await topicModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: 1})
            .populate({
                path: 'user',
                select: 'username avatar'
            })
            .populate({
                path: 'common',
                select: 'content'
            })
        res.json({
            code: 200,
            msg: '请求成功',
            data: dataList,
            count
        })
    }catch (err) {
        next(err)
    }
})

//获取单条平论主题
router.get('/:_id', async (req, res, next) => {
    try {
        const {_id} = req.params
        const data = await topicModel.findById({_id})
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({
                path: 'common',
                select: 'content'
            })
        res.json({
            code: 200,
            msg: '获取单条信息成功',
            data
        })
    }catch (err) {
        next(err)
    }
})

//删除互动主题接口
router.delete('/', auth, async (req, res, next) => {
    try {
        const {id} = req.query
        const data = await topicModel.deleteOne({
            _id: id
        })
        res.json({
            code: 200,
            msg: '删除成功',
            data
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router