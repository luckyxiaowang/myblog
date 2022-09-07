//导入express模块
const express = require('express')

//创建express的服务器实例
const app =express()

const joi =require('joi')

//导入并配置cors中间件
const cors = require('cors')
app.use(cors())

//配置解析表单数据的中间件 这个中间件只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended:false }))
//配置解析json数据的中间件
app.use(express.json())

//一定要在路由之前，封装res.cc函数
app.use((req,res,next) =>{
  //status默认值为1，表示失败的情况
  //err的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function(err,status = 1) {
    res.send({
      status,
      message:err instanceof Error ? err.message : err,
    })
  }
  next()
})

//一定要在路由之前配置解析Token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret:config.jwtSecreKey}).unless({path:[/^\/api/]}))



//导入并使用用户路由模块
const userRouter = require('./router/user.js')
app.use('/api',userRouter)

//导入并使用获取用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)  //注册

//导入并使用获取文章分类的路由模块
const artcateRouter = require('./router/artcate')
app.use('/my/cate',artcateRouter)

//导入并使用文章管理的路由模块
const articleRouter = require('./router/article')
app.use('/my/article',articleRouter)

//导入并使用标签的路由模块
const labelRouter= require('./router/label')
app.use('/my/label',labelRouter)


//定义错误级别的中间件
app.use((err,req,res,next) =>{
  //验证失败导致的错误
  if(err instanceof joi.ValidationError) return res.cc(err)

  //身份认证失败后的错误
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  //未知的错误
  res.cc(err)
})

//调用app.listen方法，指定端口号并启动web服务器
app.listen(3007,()=>{
console.log("api server running at http://127.0.0.1:3007");
})