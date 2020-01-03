// 1.引入Vue
import Vue from 'vue'
// 2.引入VueRouter--构造函数
import VueRouter from 'vue-router'
// 3.挂载：明确的告诉vue，使用vue-router来进行路由的管理
Vue.use(VueRouter)

// 引入路由所映射的组件
import login from '@/views/login.vue'

//创建路由对象
let router = new VueRouter({
    // 配置路由
    routes:[
        {
            name:'login',
            path:'/login',
            component:login
        }
    ]
})

// 暴露路由
export default router