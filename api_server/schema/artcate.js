/* 定义验证文章分类的校验规则 */
//导入定义验证规则的模块
const joi = require('joi')

//定义分类名称的校验规则
const name = joi.string().required()
// 定义分类Id 的校验规则
const id = joi.number().integer().min(1).required()

//校验规则对象：添加分类
exports.add_list_schema = {
  body:{
    name
  }
}
//校验规则对象：删除分类
exports.del_list_schema = {
  params:{
    id
  }
}

//校验规则对象：获取分类数据
exports.get_list_schema = {
  params:{
    id
  }
}

//校验规则对象：更新分类数据
exports.update_list_schema ={
  body:{
    Id:id,
    name
  }
}
