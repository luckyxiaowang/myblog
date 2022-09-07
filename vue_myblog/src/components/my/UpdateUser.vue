<template>
<div class="userinfo-container">
  <span>编辑个人资料</span>
  <!-- 上传头像区域 -->
<img class="avatar-up" src="@/assets/img/avatar.jpg" v-if="!this.avatar"/>
<img class="avatar-up" v-else :src="this.avatar"/>
<input type="file" accept="image/*" style="display:none" ref="iptRef" @change="onFileChange"/>
<button class="choose_avatar" v-on:click="chooseAvatar"><i class="el-icon-camera"></i>选择头像</button>
<button class="upload_avatar" v-on:click="uploadAvatar" :disabled="avatar ===''"><i class="el-icon-upload"></i>上传头像</button>

<!-- 用户信息区域 -->
<!-- <div class="user-form"> -->
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm item">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="userForm.username"></el-input>
  </el-form-item>
   <el-form-item label="昵称" prop="nickname">
    <el-input v-model="userForm.nickname"></el-input>
  </el-form-item>
  <el-form-item label="性别" prop="gender">
    <el-radio-group v-model="userForm.gender">
      <el-radio label="男"></el-radio>
      <el-radio label="女"></el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="邮箱" prop="email">
    <el-input v-model="userForm.email"></el-input>
  </el-form-item>
  <el-form-item label="生日" required>
    <el-col :span="11">
      <el-form-item prop="birthday">
        <el-date-picker type="date" placeholder="选择日期" v-model="userForm.birthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" v-on:click="usersubmit" style="background-color:rgb(128, 224, 255);border:none">提交</el-button>
    <el-button @click="resetForm('ruleForm')" style="border:none">重置</el-button>
  </el-form-item>
</el-form>
</div>
<!-- </div>
 --></template>

<script>
import { updateAvatarAPI, updateUserInfoAPI } from '@/api'
export default {
  data () {
    return {
      userForm: {
        username: this.$store.state.userinfo.username,
        nickname: '',
        gender: '',
        email: '',
        birthday: ''
      },
      avatar: '',
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'change' },
          { type: 'email', message: '请输入正确的邮箱格式' }
        ],
        birthday: [
          { type: 'date', message: '请选择日期', trigger: 'change' }// 生日不是必须的
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /* 选择图片 */
    chooseAvatar () {
      this.$refs.iptRef.click()
    },
    // 在选择框选择图片后触发的改变事件
    onFileChange (e) {
      const files = e.target.files
      if (files.length === 0) {
      // 没有选择图片
        this.avatar = ''
      } else {
        // 1. 创建FileReader对象
        const fr = new FileReader()
        // 2. 调用readAsDataURL 函数，读取文件内容
        fr.readAsDataURL(files[0])
        // 3. 监听fr的onload 事件
        fr.onload = async e => {
          // 4. 通过e.target.result获取到读取的结果，值是字符串（base64格式的字符串）
          this.avatar = e.target.result
          console.log(e.target.result)
        }
      }
    },
    /* 上传图片 */
    async uploadAvatar () {
      // 调用接口
      const { data: res } = await updateAvatarAPI(this.avatar)
      // 更新头像失败
      if (res.status !== 0) return this.$message.error(res.message)
      // 更新头像成功
      this.$message.success(res.message)
      this.$store.dispatch('getUserInfoActions')
    },
    /* 上传用户信息 */
    usersubmit () {
      // 验证表单
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          // 验证表单通过后
          console.log(this.userForm)
          // 必须携带id,根据id修改用户信息
          this.userForm.id = this.$store.state.userinfo.id

          const { data: res } = await updateUserInfoAPI(this.userForm)
          // 如果后台返回的status不等于0，则输出错误提示
          if (res.status !== 0) return this.$message.error(res.message)
          // 更新用户信息成功
          this.$message.success(res.message)
          // 重新让vuex获取下最新的用户数据
          this.$store.dispatch('getUserInfoActions')
        } else {
          return false
        }
      })
    },
    /* 重置按钮 */
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.userinfo-container{
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
/* 头像区域 */
.avatar-up{
  width: 200px;
  height: 200px;
  position: absolute;
  top:100px;
  left: 100px;
}
.choose_avatar{
  position: absolute;
  top:350px;
  left: 80px;
}
.upload_avatar{
  position: absolute;
  top:350px;
  left: 220px;
}
.upload_avatar , .choose_avatar{
  width: 100px;
  height: 35px;
  border-radius: 25px;
  border: none;
  background-color:#E4E7ED;
}
/* 用户信息区域 */
.el-form{
  position: absolute;
  top:100px;
  right: 100px;
  width: 400px;
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
/* .el-form{
  .el-form-item{
    /deep/ .el-form-item__content{
      button{
        .usersubmit{
         background-color: rgba(204, 56, 56, );
        border-radius: 10px;
        }

      }
    }
  }
} */

</style>
