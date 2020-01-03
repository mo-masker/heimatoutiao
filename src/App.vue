<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import login from './views/login.vue'
export default {
  name: 'app',
  component:{
    login
  }
}
</script>

<style>
</style>
