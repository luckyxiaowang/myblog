<template>
  <div class="box">
    <!-- 登录表单 -->
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="login_container"
    >
    <!-- 用户名区域 -->
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="loginForm.username"  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <!-- 密码区域 -->
      <el-form-item label="密码" prop="password" class="passbox">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- 登录按钮区域 -->
        <el-form-item class="loginbtn">
    <el-button type="primary"  v-on:click="loginbtn"  style="width:100%;background-color: rgb(204, 204, 255,0.5);border: none;">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
  </el-form-item>
<!-- 跳转注册页面 -->
   <div class="reg">
            <el-link
              type="info"
              :underline="false"
              v-on:click="register"
              >没有账号？立即注册</el-link
            >
          </div>
    </el-form>
  </div>
  <!--  </div> -->
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        password: '',
        username: ''
      },
      rules: {
        password: [{ message: '请输入密码', trigger: 'blur', required: 'true' },
          {
            pattern: /^\S{6,12}$/,
            message: '密码必须是6-12的非空字符',
            trigger: 'blur'
          }],
        username: [
          { message: '请输入用户名', trigger: 'blur', required: 'true' },
          {
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字或中文',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['updateToken']),
    loginbtn () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // 通过校验，拿到绑定的数据
          /* console.log(this.loginForm) */
          // 1.调用注册接口
          const { data: res } = await loginAPI(this.loginForm)
          /* console.log(res) */
          if (res.status === 0) {
            // 2.注册成功，提示用户
            this.$message.success(res.message)
            // 注册成功后将token值存入到vuex中
            /* console.log(res.token) */
            this.updateToken(res.token)
            // 4.跳转到首页
            this.$router.push('/')
          } else {
            // 3.注册失败，提示用户
            this.$message.error(res.message)
          }
        } else {
          return false
        }
      })
    },
    register () {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: url('@/assets/img/lgbg.jpg') no-repeat;
  overflow: hidden;
  background-size: cover;
  position: fixed;
}
.login_container {
  background-clip: padding-box;
  margin: 150px auto;
  padding: 70px 40px 50px 10px;
  width: 500px;
  border-radius: 25px;
  box-shadow: 5px 2px 35px -7px #ff9a9e;
  background-image: linear-gradient(#f2e5ff, #ccccff);
}
.passbox{
  padding-top:40px;
}
.loginbtn{
  margin-right: 60px;
  padding-top:50px
}
.reg{
  margin-left: 350px;
  padding-top: 20px;
}

</style>
