// 封装的是具体的接口请求方法
// 注意：每一个方法只负责请求一个URL地址
import request from '@/utils/request.js'
/**
 * 注册接口
 * @param {*} param0
 * @returns
 */
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/register',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 登录接口
 * @param {*} param0
 * @returns promise对象
 */
export const loginAPI = ({ username, password }) => {
  return request({
    url: '/api/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}

/**
 * 获取用户信息接口
 * @returns
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/my/userinfo'
  })
}
// 更新用户信息的接口
export const updateUserInfoAPI = ({ id, username, nickname, gender, email, birthday, user_pic }) => {
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data: {
      id,
      username,
      nickname,
      gender,
      email,
      birthday,
      user_pic
    }
  })
}
// 更新头像的接口
export const updateAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'PATCH',
    data: {
      avatar
    }
  })
}

// 只有一个参数的时候不用大括号
// 修改密码的接口
export const updataPwdAPI = ({ oldPwd, newPwd, rePwd }) => {
  return request({
    url: '/my/updatepwd',
    method: 'PATCH',
    data: {
      oldPwd,
      newPwd,
      rePwd
    }
  })
}

// 获取分类的接口
export const getArticlelistAPI = () => {
  return request({
    url: '/my/cate/list'

  })
}

// 添加博客分类的接口
export const addArticlelistAPI = (name) => {
  return request({
    url: '/my/cate/addlist',
    method: 'POST',
    data: {
      name
    }
  })
}

// 获取文章标签的接口
export const getLabellistAPI = () => {
  return request({
    url: '/my/label/list'
  })
}

// 添加文章标签的接口
export const addLabellistAPI = (name) => {
  return request({
    url: '/my/label/addlist',
    method: 'POST',
    data: {
      name
    }
  })
}
