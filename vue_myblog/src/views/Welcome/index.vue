<template>
    <div class="WelcomeBox">
        <Header></Header>
        <el-main style="overflow:hidden">
            <router-view></router-view>
        </el-main>
        <Footer v-show="pageName!=='about'"></Footer>
        <transition name="fade">
            <p id="back-top" v-if="backTopFlag" @click="scollTo(0)">
                <span><i class="el-icon-arrow-up"></i></span>
            </p>
        </transition>
    </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: { Footer, Header },
  data () {
    return {
      scrollTop: 0,
      opacity: 0,
      timer: null,
      speed: 0.2,
      backTopFlag: false
    }
  },
  computed: {
    ...mapState([
      'pageName'
    ])
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.getScroll)
  },
  watch: {
    scrollTop: {
      handler (value) {
        if (value > 100 && this.backTopFlag === false) {
          this.backTopFlag = true
        } else if (value <= 100 && this.backTopFlag === true) {
          this.backTopFlag = false
        }
      }
    }
  },
  methods: {
    // 每次屏幕滚动时为scrollTop赋新值
    getScroll () {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    },
    // 实现平滑滚动到固定位置
    scollTo (offset) {
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped lang="less">
.WelcomeBox{
   width: 100%;
   min-height: 100%;
  background:url('@/assets/img/bg.jpg') ;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

    /*滑到顶部*/
    #back-top span {
        cursor: pointer;
        height: 50px;
        margin: -125px 0 0;
        overflow: hidden;
        padding: 0;
        position: fixed;
        right: 150px;
        bottom: 50px;
        width: 50px;
        z-index: 11;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,.16);
        border-radius: 50%;
        display: flex;
        opacity: 0.8;
        justify-content: center;
        align-items: center;
        /*background: url('../assets/about/rocket.png') no-repeat;*/
    }
    #back-top:hover span{
        opacity: 1;
    }
    .el-icon-arrow-up{
        color: #ccc;
        font-size: 40px;
    }

    .fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 1s;
    }

    .fade-leave-to{
        opacity: 0;
    }
    .fade-leave-active{
        transition: opacity 1s;
    }

</style>
