//引入express路由
const {Router} = require('express')
const auth = require('./auth')
const topicModel = require('../model/topic')
const commonModel = require('../model/common')
const router = Router()

//添加评论接口
router.post('/', auth, async (req, res, next) => {
    try {
        const {content, topicId} = req.body
        const user = req.session.user._id

        let comment;
    //    根据ID查找互动主题
        const topic = await topicModel.findById(topicId)
        if (topic) {
            comment = await commonModel.create({
                content,
                user,
                topic: topicId
            })
            await topic.updateOne({$push: {comment: comment._id}})
            res.json ({
                code: 200,
                data: comment,
                msg: '评论添加成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '该主题不存在'
            })
        }
    }catch (err) {
        next(err)
    }
})

//获取主题评论
router.get('/:topicId', async (req, res, next) => {
    try {
        const topicId = req.params.topicId
        const data = await commonModel.find({topic: topicId})
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({
                path: 'topic',
                select: 'content'
            })
        res.json({
            code: 200,
            msg: '获取成功',
            data
        })
    }catch (err) {
        next(err)
    }
})

module.exports = router