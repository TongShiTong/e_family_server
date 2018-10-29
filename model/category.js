//引入mongoose
const mongoose = require('mongoose')

//建一张表
const category = new mongoose.Schema({
    title: String,
    icon: String
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('category', category)