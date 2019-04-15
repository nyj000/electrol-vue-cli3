import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const IS_WEB = process.env.IS_WEB

Vue.config.productionTip = false

Vue.prototype.__open = function (url) {
  if (IS_WEB) {
    window.open(url) // 新窗口打开
  } else {
    require('electron').shell.openExternal(url) // 浏览器打开
  }
}

// 全局混入 IS_WEB IS_APP 变量
Vue.mixin({
  data: () => {
    return {
      IS_WEB,
      IS_APP: !IS_WEB,
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
