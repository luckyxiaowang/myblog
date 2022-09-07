/* 定义验证文章分类的校验规则 */
//导入定义验证规则的模块
const joi = require('joi')

//定义分类名称的校验规则
const name = joi.string().required()
// 定义分类Id 的校验规则
const id = joi.number().integer().min(1).required()

//添加分类的校验规则
exports.add_label_schema = {
  body:{
    name
  }
}