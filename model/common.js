//引入mongoose
const mongoose = require('mongoose')

//建一张表
const common = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    topic: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'topic'
    }
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('common', common)