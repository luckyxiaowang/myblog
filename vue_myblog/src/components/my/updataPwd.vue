<template>
  <div class="pwd-container">
    <span>修改密码</span>
    <!-- 修改密码区域 -->
    <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" label-width="100px" class="demo-pwdForm">
 <!-- 旧密码 -->
 <el-form-item label="旧密码" prop="oldPwd">
    <el-input type="password" v-model="pwdForm.oldPwd" autocomplete="off"></el-input>
  </el-form-item>
  <!-- 新密码 -->
 <el-form-item label="新密码" prop="newPwd">
    <el-input type="password" v-model="pwdForm.newPwd" autocomplete="off"></el-input>
  </el-form-item>
  <!-- 确认新密码 -->
  <el-form-item label="确认新密码" prop="rePwd">
    <el-input type="password" v-model="pwdForm.rePwd" autocomplete="off"></el-input>
  </el-form-item>
  <!-- 按钮区域 -->
   <el-form-item>
    <el-button type="primary" v-on:click="pwdsubmit" style="background-color:rgb(128, 224, 255);border:none">提交</el-button>
    <el-button @click="resetForm('ruleForm')" style="border:none">重置</el-button>
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
import { updataPwdAPI } from '@/api'
export default {
  data () {
    // 旧密码不能和新密码的值一样
    const samePwd = (rule, value, callback) => {
      if (value === this.pwdForm.oldPwd) {
        callback(new Error('新密码的值不能和旧密码的值一样'))
      } else {
        callback()
      }
    }
    /* 验证再一次输入的密码是否与新密码值一样 */
    const validatePass = (rule, value, callback) => {
      if (value !== this.pwdForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        rePwd: ''
      },
      rules: {
        oldPwd: [
          { message: '旧密码不能为空', trigger: 'blur', required: 'true' },
          { pattern: /^\S{6,12}$/, message: '密码必须是6-12的非空字符', trigger: 'blur' }
        ],
        newPwd: [
          { message: '新密码不能为空', trigger: 'blur', required: 'true' },
          { pattern: /^\S{6,12}$/, message: '密码必须是6-12的非空字符', trigger: 'blur' },
          { validator: samePwd, trigger: 'blur' }
        ],
        rePwd: [
          { message: '请再次输入新密码', trigger: 'blur', required: 'true' },
          { pattern: /^\S{6,12}$/, message: '密码必须是6-12的非空字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    pwdsubmit () {
      this.$refs.pwdForm.validate(async valid => {
        if (!valid) return false // 未通过校验
        const { data: res } = await updataPwdAPI(this.pwdForm)
        // 后台返回的status不等于0,
        if (res.status !== 0) return this.$message.error('更新密码失败')
        this.$message.success('更新密码成功')
        // 清空表单的值
        this.$refs.pwdForm.resetFields()
        // 清空token值和用户信息并跳转到登录页
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        this.$router.push('/login')
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style lang="less" scoped>
.pwd-container{
  width: 100%;
  height: 100%;
  position: relative;
  span{
    position: absolute;
    top:10px;
    left:10px;
    font-family: 'SimHei';
    font-size: 24px;
  }
}

.el-form{
  position: absolute;
  width: 400px;
  height: 400px;
  top:150px;
  left:250px;
  .el-form-item {
    /deep/ .el-form-item__label {
      color: aliceblue;
    }
  }
}

.el-form{
  .el-form-item{
    /deep/ .el-form-item__content{
      input{
        background-color: rgba(0,0,0,0);
        border-radius: 10px;
      }
    }
  }
}
</style>
