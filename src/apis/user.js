
// 引入配置好基准路径的axios
import axios from '@/utils/myaxios.js'

// 登陆
export  const login = (data) =>{
    return axios({
        method:'post',
        url:'/login',
        data
    })
}

// 根据id获取用户详情
export const getUserById = (id)=>{
    return axios({
        url:`/user/${id}`,
        // 自定义的请求头
        // headers:{后台规定的key:token}
        headers:{'Authorization':localStorage.getItem('toutiao_41_token')}
    })
}