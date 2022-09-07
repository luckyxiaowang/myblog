<template>
  <div >
    <el-container >
  <el-aside width="200px">
    <el-menu
    :default-active="$route.path"
      class="el-menu-vertical-demo"
      router
      background-color="rgb(0,0,0,0)"
      text-color="#ffffff"
      active-text-color="#4dd2ff"
      >
      <el-menu-item :index="'/'+item.path" v-for="item in mylist" :key="item.id">
      <template slot="title">
        <i :class="iconsName[item.id]" style="color:aliceblue"></i>
        <span>{{ item.authName }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: 0,
      activeIndex: '1',
      mylist: [
        {
          id: '1',
          authName: '关于我',
          path: 'my'
        },
        {
          id: '2',
          authName: '编辑资料',
          path: 'updateuser'
        },
        {
          id: '3',
          authName: '修改密码',
          path: 'updatepwd'

        }
      ],
      iconsName: {
        1: 'el-icon-user',
        2: 'el-icon-edit-outline',
        3: 'el-icon-lock'
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-container{
  width: 1200px;
  height: 560px;
  margin: auto;
  background-color: rgba(0,0,0,0.3);
}
  .el-aside {
    text-align: center;
    /* line-height: 200px; */
  }

  .el-main {
    color: #333;
    text-align: center;
    margin: 0;
    padding: 0;
    /* line-height: 160px; */
  }
.el-menu{
  background-color: rgba(0,0,0,0) !important;
}
.el-menu /deep/ .el-menu-item{
  background-color: rgba(0,0,0,0) !important;
}
 .el-menu /deep/ .el-menu-item:hover {
    background-color: rgba(0, 0, 0, 0) !important;
  }
</style>
