//引入mongoose
const mongoose = require('mongoose')

//建一张轮播图表
const swiper = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    img: {
        type: String,
        required: true
    },
    newsId: {
        type: mongoose.SchemaTypes.ObjectId,
    //    关联新闻表
        ref: 'news'
    },
//    是否显示，状态
    status: {
        type: Number,
        default: 1
    },
//    排序
    sort: {
        type: Number,
        default: 0
    }
}, {versionKey: false, timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime'}})

module.exports = mongoose.model('swiper', swiper)