//引入express路由
const {Router} = require('express')
const router = Router()
const topicModel = require('../model/topic')
const auth = require('./auth')


module.exports = router