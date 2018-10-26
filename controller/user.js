//引入express路由
const {Router} = require('express')
const router = Router()
//引入数据库模块
const userModel = require('../model/user')
//导入鉴权
const auth = require('./auth')

//注册接口，是post模块
router.post('/', auth, async (req, res, next) => {//增加管理员
    try {
        // 注册所需的字段
        const {
            idnumber,
            password,
            desc,
            nickname,
            job,
            sex,
            phone
        } = req.body

        const avatarNumber = Math.ceil(Math.random()*8)
        const avatar = `http://pbl.yaojunrong.com/avatar${avatarNumber}.jpg`

        if(password&&password.length>=5){
            //将字段创建
            const data = await userModel.create({idnumber, password, desc, avatar,  nickname,
                job,
                sex,
                phone})
            console.log(data)
            //发送出去
            res.json({
                code: 200,
                msg: '注册管理员成功',
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

//修改管理员借口
router.patch('update/:id', auth, async (req, res , next) => {
    try {
        const {
            idnumber,
            password,
            desc,
            nickname,
            job,
            sex,
            phone
        } = req.body
        const { id } = req.params
        const data = await userModel.findById(id)
        const updateData = await data.updateOne({
            $set: {
                idnumber,
                password,
                desc,
                nickname,
                job,
                sex,
                phone
            }
        })
        res.json({
            code: 200,
            msg: '修改管理员信息成功',
            data: updateData
        })
    }catch (err) {
        res.json ({
            code: 400,
            msg: '修改管理员失败',
            err
        })
    }
})

//获取全部管理员接口
router.get('/', auth, async ( req, res, next ) => {
    try {
        let{ page = 1, page_size = 10 } = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const data = await userModel.find()
            .skip((page-1) * page_size)
            .limit(page_size)
            .sort({_id: -1})
            .select('-password')
        res.json ({
            code: 200,
            data
        })
    }catch (err) {
        res.json({
            cod: 400,
            msg: '没有找到数据'
        })
    }
})

//获取单个管理员信息接口
router.get('/:id',auth, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await userModel.findById(id).select('-password')
        res.json({
            code: 200,
            msg: '管理员获取成功',
            data
        })
    }catch (err) {
        res.json({
            code: 400,
            msg: '获取管理员失败',
            err
        })
    }
})

//删除管理员借口
router.delete('/delete', auth, async (req, res, next) => {
    try {
        const { id } = req.query
        const data = await userModel.deleteOne({_id: id})
        res.json({
            code: 200,
            msg: '删除管理员成功',
            data
        })
    }catch (err) {
        res,json ({
            code: 400,
            msg: '删除失败',
            err
        })
    }
})
//登录接口
router.post("/login", async (req,res, next) => {
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
                    code: 401,
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

//退出登录接口
router.post('/logout', (req, res, next) => {
    if (req.session.user) {
        req.session.user = null
        res.json({
            code: 200,
            msg: '退出登录成功'
        })
    } else {
        res.json ({
            code: 400,
            msg: '未登录状态'
        })
    }
})

module.exports = router


//登录需要session，安装session
//session本来存在内存，安装github,session下面一个mongo,就存在数据库里了