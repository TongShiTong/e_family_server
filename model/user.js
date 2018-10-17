//引入mongoose
const mongoose = require('mongoose')

//建一张用户表
const user = new mongoose.Schema({
    //字段
    avatar: String,
    idnumber: {
        type: String,
        //唯一且必须
        unique: true,
        required: true
    },
    desc: String,
    password: String
//    后面第二项传的时间
}, {versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('user', user)