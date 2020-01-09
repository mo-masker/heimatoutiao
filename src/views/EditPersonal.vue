<template>
  <div class="edit">{{currentUser.gender}}
    <!-- 使用封装的头部组件 -->
    <hmheader title="编辑个人信息">
      <!-- <van-icon name="arrow-left" slot="left" @click="$router.back()"/> -->
      <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
    </hmheader>
    <!-- 用户头像 -->
    <div class="userimg">
      <img :src="currentUser.head_img" alt />
      <van-uploader :after-read="afterRead" />
    </div>
    <hmcell title="昵称" :desc="currentUser.nickname"></hmcell>
    <hmcell title="密码" :desc="currentUser.password" type='password'></hmcell>
    <hmcell title="性别" :desc="currentUser.gender"></hmcell>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue";
import hmcell from "@/components/hmcell.vue";
import { uploadFile } from "@/apis/upload.js";
import {getUserById,updateUserById} from '@/apis/user.js'

export default {
  components: {
    hmheader,
    hmcell
  },
  data(){
      return {
          // 新建一个对象存储用户数据
          currentUser:{}
      }
  },
  async mounted(){
      // 获取当前登录用户的id
      let res = await getUserById(this.$route.params.id)
    //   console.log(res);
      if(res.data.message === '获取成功'){
          this.currentUser = res.data.data
          // 如果有图片，则拼接
          if(this.currentUser.head_img){
              this.currentUser.head_img = 'http://127.0.0.1:3000' + this.currentUser.head_img
          }else {
              // 如果没有图片，则设置默认图片
              this.currentUser.head_img = 'http://127.0.0.1:3000/uploads/images/default.png'
          }
      }
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // file.file是当前的文件对象
    //   console.log(file);
      let formdata = new FormData();
      formdata.append('file',file.file)
      let res = await uploadFile(formdata)
      console.log(res);
      if(res.data.message === '文件上传成功'){
          // 实现预览
          this.currentUser.head_img = "http://127.0.0.1:3000"+res.data.data.url
          // 再次发起请求，实现用户头像的更新
          let res2 = await updateUserById(this.currentUser.id,{head_img:res.data.data.url})
          console.log(res2);
          if(res2.data.message === '修改成功'){
              this.$toast.success('修改成功')
          }else{
              this.$toast.fail('修改失败')
          }
      }else{
          //轻提示
          this.$toast.fail('文件上传失败')
      }
    }
  }
};
</script>

<style lang='less' scoped>
.userimg {
  // padding: 20px 0;
  height: 150px;
  position: relative;
  > img {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    display: block;
    // margin: 0 auto;
    border-radius: 50%;
    background-color: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/ .van-uploader__upload {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
  /deep/ .van-uploader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }
}
</style>