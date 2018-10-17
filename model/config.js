const mongoose = require('mongoose')
//连接数据库，后面写库名
mongoose.connect('mongodb://localhost/e_family', { useNewUrlParser: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    // we're connected!
    //连接成功打印
    console.log('连接成功!')
})

//连接导出
module.exports = db