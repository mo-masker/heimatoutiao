
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