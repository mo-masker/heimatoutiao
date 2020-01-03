import Vue from 'vue'
import App from './App.vue'
// import App from './views/Login.vue'

import router from '@/router/index.js'

// 引入全局样式
import '@/styles/reset.css'
Vue.config.productionTip = false


new Vue({
  // z注入
  router,
  render: h => h(App),
}).$mount('#app')
