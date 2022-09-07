/* 注册和登录的验证规则 */
//导入定义验证规则的包
const joi = require('joi')

//定义用户名和密码的验证规则
const username = joi.string().pattern(/^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/).min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义id和邮箱的验证规则
const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()
const gender =joi.string().required()
const nickname =joi.string().pattern(/^\S{1,10}$/).required()
const birthday =joi.string().required()

//定义更新头像的验证规则
const avatar = joi.string().dataUri().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body:{
    username,
    password,
  }
}

// 定义更新用户信息的规则对象
exports.update_userinfo_schema = {
  body:{
    id,
    email,
    gender,
    nickname,
    birthday
  }
}

//定义修改密码的规则对象
exports.update_password_schema = {
  body:{
    oldPwd:password,
    newPwd:joi.not(joi.ref('oldPwd')).concat(password)
  },
}

//定义更新头像的规则对象
exports.update_avatar_schema = {
  body:{
    avatar,
  }
}
