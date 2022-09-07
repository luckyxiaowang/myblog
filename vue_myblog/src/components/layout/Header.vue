<template>
  <div class="headerbox">
    <el-header >
<el-menu
:default-active="$route.path"
  class="el-menu-demo"
  mode="horizontal"
  background-color="rgb(0,0,0,0)"
  text-color="#575e66"
  router
  style="border: none"
  active-text-color="#4dd2ff">
  <el-menu-item :index="'/'+item.path" v-for="item in menuList" :key="item.id">
  <template slot="title">
    <!-- 图标 -->
    <i :class="iconsName[item.id]"></i>
    <!-- 文字 -->
    <span>{{ item.authName}}</span>
  </template>
  </el-menu-item>
</el-menu>
<div class="userbox" >
  <!-- 如果用户有头像就显示头像，没有头像就显示默认头像 -->
  <el-avatar icon="el-icon-user-solid" v-if="user_pic" ></el-avatar>
  <el-avatar icon="el-icon-user-solid" v-else></el-avatar>
  <div class="user-option">
    <h5 class="username" >{{ username }}</h5>
    <p class="loginout" v-on:click="loginout">退出登录</p>
  </div>

</div>

    </el-header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      key: 0,
      activeIndex: '1',
      menuList: [
        {
          id: 1,
          authName: '首页',
          path: 'home'
        },
        {
          id: 2,
          authName: '博客',
          path: 'blog'
        },
        {
          id: 3,
          authName: '写博客',
          path: 'blogging'
        },
        {
          id: 4,
          authName: '我的',
          path: 'my'
        }
      ],
      iconsName: {
        1: 'iconfont icon-shouye',
        2: 'iconfont icon-shu',
        3: 'iconfont icon-bianji',
        4: 'iconfont icon-wode'
      }

    }
  },
  methods: {
    loginout () {
      this.$confirm('确定要退出吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除token值
        this.$store.commit('updateToken', '')
        // 清除用户信息
        this.$store.commit('updateUserInfo', {})
        // 跳转到登录页
        this.$router.push('/login')
      }).catch((err) => err)
    }
  },
  computed: {
    ...mapGetters(['username', 'user_pic'])
  }
}

</script>

<style scoped lang="less">
.headerbox{
  width:100%;
  height: 60px;
  position:sticky;
  top:0;
}
.el-header {
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 9999;
    display: flex;//弹性布局
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    /* background-color:  rgb(208, 234, 246); */

      > div {
      display: flex;
      align-items: center;
    }

    .el-menu {
      flex-shrink: 0;
    }
  }
  .el-header:hover {
    opacity: 1 !important;
  }
    .el-menu {
    background-color: rgba(0, 0, 0, 0) !important;
  }

  .el-menu /deep/ .el-menu-item{
    background-color: rgba(0, 0, 0, 0) !important;
  }

  .el-menu /deep/ .el-menu-item:hover {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .userbox{
    flex-shrink:0;
    width: 300px;
    height: 60px;
    align-items: center;
    justify-content: space-between;

  .el-avatar {
      width: 36px;
      height: 36px;
      margin-left: 40px;
      z-index: 200;
    }
.user-option{
position: absolute;
top:0px;
right:50px;
width: 200px;
height: 60px;
text-align: center;
line-height: 60px;
.username ,.loginout{
  display: inline-block;
  margin-right: 30px;
}
.loginout{
  font-size: 16px;
  cursor:pointer;
}

  }

  }
</style>
