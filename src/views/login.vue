<template>
  <div class="login">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <!-- 使用封装组件时的属性设置默认会设置给封装组件的根元素 -->
        <!-- 如果封装组件设置了props，那么优先为props中的成员赋值 -->
        <hminput
          placeholder="用户名/手机号"
          :rules="/^(\d{5,6})$|^(\d{10})$/"
          msg="用户名或者手机号输入不正确"
          :value="users.username"
          @input="handleinput"
        ></hminput>
        <hminput placeholder="密码" :rules="/^\S{3,16}$/" msg="请输入3-16位的密码" v-model="users.password"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton @click="login">登录按钮</hmbutton>
    </div>
  </div>
</template>

<script>
import hmbutton from "@/components/hmbutton.vue";
import hminput from "@/components/hminput.vue";
import { login } from "@/apis/user.js";
export default {
  data() {
    return {
      users: {
        username: "10086",
        password: "123"
      }
    };
  },
  components: {
    hmbutton,
    hminput
  },
  methods: {
    // 标记当前方法中有异步操作
    async login() {
      // 打印出实时输入的数据
      // console.log(this.users);
      // login(this.users)
      // .then(res =>{
      //   console.log(res);
      // })
      // .catch(err =>{
      //   console.log(err);
      // })

      // 验证数据
      if (
        /^(\d{5,6})$|^1(\d{10})$/.test(this.users.username) &&
        /^\S{3,16}$/.test(this.users.password)
      ) {
        // 得到login函数的返回值
        let res = await login(this.users);
        // console.log(res);
        if (res.data.message === "用户不存在") {
          // 给用户提示
          this.$toast.fail(res.data.message);
        } else {
          // 将当前接收到的token实现本地存储
          localStorage.setItem('toutiao_41_token',res.data.data.token)
          // 为了后期的操作，将当前用户数据也存储到本地
          localStorage.setItem('toutiao_41_userInfo',JSON.stringify(res.data.data.user))
          // 实现页面的跳转
          this.$router.push({path:`Personal/${res.data.data.user.id}`})
        }
      }else{
        this.$toast.fail('数据输入不合法')
      }
    },
    handleinput(data) {
      this.users.username = data;
    }
  }
};
</script>

<style lang='less'>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>