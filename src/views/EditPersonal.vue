<template>
  <div class="edit">
      <hmheader title="编辑个人信息">
          <!-- <van-icon name="arrow-left" slot="left" @click="$router.back()"/> -->
          <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
      </hmheader>
  </div>
</template>

<script>
import hmheader from '@/components/hmheader.vue'
export default {
    components:{
        hmheader
    }
}
</script>

<style>

</style>