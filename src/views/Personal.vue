<template>
  <div class="personal">
    <router-link :to="{path:`/editPersonal/${currentUser.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.create_date}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <hmcell title="我的关注" desc="关注的用户"></hmcell>
    <hmcell title="我的跟帖" desc="跟帖/回复"></hmcell>
    <hmcell title="我的收藏" desc="文章/视频"></hmcell>
    <hmcell title="设置" desc=""></hmcell>
    <hmbutton class="btn">退出</hmbutton>
  </div>
</template>

<script>
import hmcell from '@/components/hmcell.vue'
import hmbutton from '@/components/hmbutton.vue'
import {getUserById} from '@/apis/user.js'
export default {
  data(){
    return {
      // 当前登录对象的数据
      currentUser:{}
    }
  },
  // 注册
  components:{
    hmcell,hmbutton
  },
  // 钩子函数
  async mounted(){
    // console.log(this.$route.params.id);
    let res = await getUserById(this.$route.params.id)
    // console.log(res);
    if(res.data.message === '获取成功'){
      this.currentUser = res.data.data
      // 把图片的路径指向当前服务器
      this.currentUser.head_img = 'http://127.0.0.1:3000' + this.currentUser.head_img
      // console.log(this.currentUser);
    }else if(res.data.message === '用户信息验证失败'){
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn{
  margin: 20px auto;
  background-color: #f00;
}
</style>
