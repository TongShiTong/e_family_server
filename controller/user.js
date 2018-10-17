//引入express路由
const {Router} = require('express')
const router = Router()
//引入数据库模块
const userModel = require('../model/user')

//注册，是post模块
router.post('/user', async (req, res, next) => {
    try {
        // 注册所需的字段
        const {idnumber, password, desc} = req.body

        const avatarNumber = Math.ceil(Math.random()*9)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`

        if(password&&password.length>=5){
            //将字段创建
            const data = await userModel.create({idnumber, password, desc, avatar})
            console.log(data)
            //发送出去
            res.json({
                code: 200,
                msg: '注册成功',
                data
            })
        } else {
            throw '请确认密码长度至少为5位'
        }
    } catch (err) {
        //如果报错，在这会捕获到，发送出去
        res.json({
            code: 400,
            msg: '缺少必要参数',
            err
        })
    }
})

router.post("/login", async (req,res) => {
    try {
        const {idnumber, password} = req.body
        const userData = await userModel.findOne({idnumber})
        if (!userData) {
            res.json ({
                code: 400,
                msg: '用户不存在'
            })
        }else {
            if(password&&password==userData.password) {
                //用session记录登录信息状态，给session赋值（user）
                req.session.user = userData
                //直接发送记录不了登录的状态
                res.json({
                    code: 200,
                    msg: '登录成功',
                    userData:{
                        avatar: userData.avatar,
                        idnumber: userData.idnumber,
                        password: userData.password,
                        desc: userData.desc,
                    }
                })
            }else {
                res.json({
                    code: 400,
                    msg: '密码不正确'
                })
            }
        }
    }catch (err) {
        res.json({
            code: 400,
            msg: err
        })
    }
})

module.exports = router


//登录需要session，安装session
//session本来存在内存，安装github,session下面一个mongo,就存在数据库里了