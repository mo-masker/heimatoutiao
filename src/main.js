import Vue from 'vue'
import App from './App.vue'
// import App from './views/Login.vue'

import router from '@/router/index.js'

import { Button, Toast, Icon, Uploader } from 'vant';

Vue.use(Button)
  .use(Toast)
  .use(Icon)
  .use(Uploader)


// 引入全局样式
import '@/styles/reset.css'
Vue.config.productionTip = false


new Vue({
  // z注入
  router,
  render: h => h(App),
}).$mount('#app')
