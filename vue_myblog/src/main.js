import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入全局样式表
import global from '@/assets/css/global.css'
// 引入阿里巴巴图标
// 引入Iconfont 矢量图标库
import '@/assets/icon/iconfont.css'

Vue.config.productionTip = false

Vue.use(global)
Vue.use(ElementUI)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
