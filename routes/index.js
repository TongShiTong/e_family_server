var express = require('express');
var router = express.Router();
//引入逻辑
const user = require('../controller/user')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.use('/admin/user', user)

//全局注册
// router.use(user)

module.exports = router;
