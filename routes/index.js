var express = require('express');
var router = express.Router();
//引入逻辑
const user = require('../controller/user')
const swiper = require('../controller/swiper')
const news = require('../controller/news')
const category = require('../controller/category')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/admin/user', user)
router.use('/admin/news', news)
router.use('/admin/swiper', swiper)
router.use('/admin/category', category)

//全局注册
// router.use(user)

module.exports = router;
