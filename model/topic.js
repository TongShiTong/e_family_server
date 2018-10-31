//引入mongoose
const mongoose = require('mongoose')

//建一张表
const topic = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
        required: true
    },
    common: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'common'
        }
    ]
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('topic', topic)