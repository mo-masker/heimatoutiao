<template>
  <div class="edit">
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
    <hmcell title="昵称" :desc="currentUser.nickname" @click="nickshow=!nickshow"></hmcell>
    <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field ref="nick" :value="currentUser.nickname" required label="昵称" placeholder="请输入昵称" />
    </van-dialog>
    <hmcell title="密码" :desc="currentUser.password" type="password" @click="passshow=!passshow"></hmcell>
    <van-dialog v-model="passshow" title="修改密码" show-cancel-button @confirm="updatePassword" :before-close="beforeClose">
      <van-field ref="originPass" required label="原密码" placeholder="请输入原密码" />
      <van-field ref="newPass" required label="新密码" placeholder="请输入新密码" />
    </van-dialog>
    <hmcell title="性别" :desc="currentUser.gender===1?'男':'女'"></hmcell>
  </div>
</template>

<script>
import hmheader from "@/components/hmheader.vue";
import hmcell from "@/components/hmcell.vue";
import { uploadFile } from "@/apis/upload.js";
import { getUserById, updateUserById } from "@/apis/user.js";

export default {
  components: {
    hmheader,
    hmcell
  },
  data() {
    return {
      // 新建一个对象存储用户数据
      currentUser: {},
      // 修改昵称对话框是否可见
      nickshow: false,
      passshow: false
    };
  },
  async mounted() {
    // 获取当前登录用户的id
    let res = await getUserById(this.$route.params.id);
    //   console.log(res);
    if (res.data.message === "获取成功") {
      this.currentUser = res.data.data;
      // 如果有图片，则拼接
      if (this.currentUser.head_img) {
        this.currentUser.head_img =
          "http://127.0.0.1:3000" + this.currentUser.head_img;
      } else {
        // 如果没有图片，则设置默认图片
        this.currentUser.head_img =
          "http://127.0.0.1:3000/uploads/image/default.png";
      }
    }
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // file.file是当前的文件对象
      // console.log(file);
      let formdata = new FormData();
      formdata.append("file", file.file);
      let res = await uploadFile(formdata);
      // console.log(res);
      if (res.data.message === "文件上传成功") {
        // 实现预览
        this.currentUser.head_img = "http://127.0.0.1:3000" + res.data.data.url;
        // 再次发起请求，实现用户头像的更新
        let res2 = await updateUserById(this.currentUser.id, {
          head_img: res.data.data.url
        });
        // console.log(res2);
        if (res2.data.message === "修改成功") {
          this.$toast.success("修改成功");
        } else {
          this.$toast.fail("修改失败");
        }
      } else {
        //轻提示
        this.$toast.fail("文件上传失败");
      }
    },
    // 修改昵称
    async updateNickname() {
      // 获取用户输入的内容
      // input:封装的van-filed中，文本框的ref值就是input
      let name = this.$refs.nick.$refs.input.value;
      console.log(name);
      // 更新
      let res = await updateUserById(this.currentUser.id, {
        nickname: name
      });
      console.log(res);
      if (res.data.message === "修改成功") {
        //为了实现页面的刷新效果，需要将页面中昵称的绑定数据进行更新
        this.currentUser.nickname = name;
        this.$toast.success("修改成功");
      } else {
        this.$toast.fail("修改失败");
      }
    },
    //修改密码
    async updatePassword() {
      // 获取用户输入的原密码，判断和用户密码是否匹配
      // 如果匹配，则获取用户输入的新密码，判断是否符合正则规范，如果符合，则获取新密码，实现密码的修改，如果不符合则给出提示
      // 如果原密码输入不正确，则给出提示
      let originPass = this.$refs.originPass.$refs.input.value;
      // console.log(originPass);
      if(originPass===this.currentUser.password){
        //获取输入的新密码
        let newPass = this.$refs.newPass.$refs.input.value;
        // console.log(newPass);
        if(/^\S{3,16}$/.test(newPass)){
          let res = await updateUserById(this.currentUser.id,{password:newPass});
          // console.log(res);
          if(res.data.message === "修改成功"){
            // 为了实现页面的刷新效果，需要将页面中昵称的绑定数据进行更新
            this.currentUser.password = newPass;
            this.$toast.success("修改成功")
          }else{
            this.$toast.fail("修改失败")
          }
        }
      }
    },
    beforeClose(action,done){
      // console.log(action);
      // 如果用户单击的是确认，那么就需要判断原密码是否输入正确
      if(action === "confirm"){
        // 获取用户输入的原密码
        let originPass = this.$refs.originPass.$refs.input.value;
        // 获取原密码进行密码是否正确的判断
        if(originPass!==this.currentUser.password){
          // 给出提示
          this.$toast.fail("原密码输入不正确")
          // 阻止dialog的关闭
          this.$refs.originPass.$refs.input.select();
          this.$refs.originPass.$refs.input.focus();
          done(false)
        }else if(!/^\S{3,16}$/.test(this.$refs.newPass.$refs.input.value)){
          this.$toast.fail("请输入3-16位的新密码")
          done(false)
        }else{
          // 如果这里没有添加done，那么窗口不会关闭
          done()
        }
      }else{
        // 点了取消就关闭dialog
        done()
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