// 1.引入Vue
import Vue from 'vue'
// 2.引入VueRouter--构造函数
import VueRouter from 'vue-router'
// 3.挂载：明确的告诉vue，使用vue-router来进行路由的管理
Vue.use(VueRouter)

// 引入路由所映射的组件
import login from '@/views/Login.vue'
import Personal from '@/views/Personal.vue'

//创建路由对象
let router = new VueRouter({
    // 配置路由
    routes: [
        {
            name: 'login',
            path: '/login',
            component: login
        },
        {
            name: 'Personal',
            path: '/personal',
            component: Personal
        }
    ]
})

// 添加导航守卫：前置守卫：在跳转之前进行调用
// 所有路由跳转请求都会经过这个导航守卫
// to：目标路由
// from：源路由
// next:下一步的操作，就是用户当前需要进行的操作
router.beforeEach((to, from, next) => {
    // 并不是每个页面的访问都需要先登录
    if (to.path.indexOf('/personal') === 0) { // 访问个人中心页需要登录
        // 如果用户登录过，则进行路由的跳转，否则重定向到登录页
        let token = localStorage.getItem('toutiao_41_token')
        if (token) {
            // 如果有token就说明你登录过了,进行下一步操作
            next()
        } else {
            // 如果是访问需要授权的页面而且没有登录过，则重定向到登录页
            next({ name: 'Login' })
        }
    }else{
        // 如果不是访问需要授权的页面，就不需要判断是否登录，直接进行下一步操作
        next()
    }
})

// 暴露路由
export default router