// 基于axios封装，网络请求的函数
import store from '@/store'
import axios from 'axios'
import router from 'vue-router'
import { Message } from 'element-ui'

// axios.create()创建一个带配置项的自定义axios函数
// myAxios请求的时候，地址baseURL+url,然后去请求后台
const myAxios = axios.create({
  baseURL: 'http://127.0.0.1:3007'
})

// 定义请求拦截器，api里每次调用request都会先走这个请求拦截器
myAxios.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 定义响应拦截器
myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.dir(error)
  if (error.response.status === 401) {
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    router.push('/login')
    Message.error('您的身份信息已过期，请重新登录')
  }

  return Promise.reject(error)
})
// 导出axios自定义函数
export default myAxios
