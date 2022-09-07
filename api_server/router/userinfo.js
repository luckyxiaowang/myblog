const express = require('express')
const router =express.Router()

//导入获取用户信息/更新用户信息的处理函数
const userinfo_handler = require('../router_handler/userinfo')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要的验证规则对象
const {update_userinfo_schema ,update_password_schema,update_avatar_schema} = require('../schema/user')

//挂载路由
//获取用户信息的路由
router.get('/userinfo',userinfo_handler.getUserInfo )
//获取更新用户信息的路由(更新)
router.put('/userinfo',expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)//只有通过expressJoi(update_userinfo_schema)，才会执行后面的函数
//获取修改密码的路由(更新)
router.patch('/updatepwd',expressJoi(update_password_schema),userinfo_handler.updatePassword)
//更新用户头像的路由(更新)
router.patch('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)


module.exports = router