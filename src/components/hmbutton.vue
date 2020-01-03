<template>
  <div class="btn" @click="handleclick">
      <span :class='icon'></span>
      <slot></slot>
  </div>
</template>

<script>
export default {
    props:['icon'],
    methods:{
        handleclick(event){
            this.$emit('click',event);
        }
    }
}
</script>

<style lang='less' scoped>
    .btn{
        width: 318*100vw/360;
        height: 50px;
        background-color: rgb(203, 49, 0);
        border-radius: 25px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
    }
</style>