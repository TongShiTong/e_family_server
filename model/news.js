//引入mongoose
const mongoose = require('mongoose')

//建一张表
const news = new mongoose.Schema({
    title: String,
    content: {
        type: String,
        required: true
    },
    contentText: String,
    img: String,
    author: {
        type: mongoose.SchemaTypes.ObjectId,
    //    关联用户表
        ref: 'user'
    },
    type: {
        type: mongoose.SchemaTypes.ObjectId,
    //    关联分类表
        ref: 'category'
    },
    look_nums: {
        type: Number,
        default: 0
    },
}, {versionKey: false,timestamp: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'
    }})

module.exports = mongoose.model('news', news)