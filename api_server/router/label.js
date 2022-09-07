//标签接口
const express = require('express')
const router = express.Router()

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要的验证规则对象
const {add_label_schema} = require('../schema/label')


//导入获取标签的函数
const label_handler = require('../router_handler/label')
//获取标签接口
router.get('/list',label_handler.getLabelLists)
//获取增加标签接口
router.post('/addlist',expressJoi(add_label_schema),label_handler.addArticleLists)

module.exports = router