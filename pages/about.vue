<template>
  <div class="container">
    <nuxt-link to="/">
      index-page
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'dark',
  asyncData() {
    return new Promise((resolve)=> {
      setTimeout(function() {
        resolve({})
      },1000)
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  font-size: 20px;
  text-align: center;
  padding-top: 100px;
}
</style>
