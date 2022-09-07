<template>
  <div class="registerbox">
    <!-- 注册表单区域 -->
    <el-form
      :model="regForm"
      status-icon
      :rules="rules"
      ref="regForm"
      label-width="100px"
      class="register_container"
    >
      <!-- 用户名区域 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="regForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <!-- 密码区域 -->
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="regForm.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- 确认密码区域 -->
      <el-form-item label="确认密码" prop="repassword">
        <el-input
          type="password"
          v-model="regForm.repassword"
          autocomplete="off"
          placeholder="请再次确认密码"
        ></el-input>
      </el-form-item>
      <!-- 注册按钮区域 -->
      <el-form-item class="rb">
        <el-button
          type="primary"
          v-on:click="registerbtn"
          style="
            width: 100px;
            background-color: rgb(204, 204, 255, 0.5);
            border: none;
          "
          >注&nbsp;&nbsp;册</el-button
        >
        <!-- 重置按钮区域 -->
        <el-button
          @click="resetForm('regForm')"
          style="
            width: 100px;
            background-color: rgb(204, 204, 255, 0.5);
            border: none;
            color: aliceblue;
          "
          >重&nbsp;&nbsp;置</el-button
        >
      </el-form-item>
     <div class="lg">
        <el-link
          type="info"
          :underline="false"
          v-on:click="loginsubmit"
          >注册成功，立即登录</el-link
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { registerAPI } from '@/api'

export default {
  name: 'register',
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.regForm.repassword !== '') {
          this.$refs.regForm.validateField('repassword')
        }
        callback()
      }
    }
    const validateRepassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      rules: {
        username: [
          { message: '用户名不能为空', trigger: 'blur', required: 'true' },
          {
            pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,10}$/,
            message: '用户名必须是1-10的大小写字母数字或中文',
            trigger: 'blur'
          }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' },
          {
            pattern: /^\S{6,12}$/,
            message: '密码必须是6-12的非空字符',
            trigger: 'blur'
          }
        ],
        repassword: [
          { validator: validateRepassword, trigger: 'blur' },
          {
            pattern: /^\S{6,12}$/,
            message: '密码必须是6-12的非空字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 注册按钮
    registerbtn () {
      this.$refs.regForm.validate(async (valid) => {
        if (valid) {
          // 通过校验，拿到绑定的数据
          // console.log(this.regForm)
          // 1.调用注册接口
          const { data: res } = await registerAPI(this.regForm)
          // console.log(res)
          // 2.注册失败，提示用户
          if (res.status !== 0) return this.$message.error(res.message)
          // 3.注册成功，提示用户
          this.$message.success(res.message)
        } else {
          return false
        }
      })
    },
    // 跳转登录按钮
    loginsubmit () {
      this.$router.push({ path: '/login' })
    },
    // 重置按钮
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.registerbox {
  width: 100%;
  height: 100%;
  background: url('@/assets/img/lgbg.jpg') no-repeat;
  overflow: hidden;
  background-size: cover;
  position: fixed;
}
.register_container {
  background-clip: padding-box;
  margin: 150px auto;
  padding: 70px 40px 50px 10px;
  width: 500px;
  border-radius: 25px;
  box-shadow: 5px 2px 35px -7px #ff9a9e;
  background-image: linear-gradient(#f2e5ff, #ccccff);
}
.rb {
  padding-top: 50px;
  margin-left: 60px;
}
.lg{
  margin-left: 350px;
}
</style>
