//文章分类的路由模块
const express = require('express')

const router = express.Router()

//导入处理文章分类的处理函数
const artcate_handler = require ('../router_handler/artcate')

//导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

//导入需要的验证规则对象
const {add_list_schema,del_list_schema,get_list_schema,update_list_schema} = require('../schema/artcate')

//获取文章分类
router.get('/list',artcate_handler.getArticleLists)
//增加文章分类
router.post('/addlist',expressJoi(add_list_schema), artcate_handler.addArticleLists)
//删除文章分类
router.delete('/dellist/:id',expressJoi(del_list_schema),artcate_handler.delArticleLists)
//获取文章分类数据
router.get('/info/:id',expressJoi(get_list_schema),artcate_handler.getArticleInfo)
//更新文章分类数据
router.put('/updateinfo',expressJoi(update_list_schema),artcate_handler.updateArticleInfo)

//向外导出路由模块
module.exports = router


