<template>
  <b-navbar wrapper-class="container is-fullhd"
            fixed-top
            shadow>
    <template slot="brand">
      <b-navbar-item tag="router-link"
                     :to="{ path: '/' }">
        <img src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
             alt="Logo">
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="#">
        首页
      </b-navbar-item>
      <b-navbar-item href="#">
        归档
      </b-navbar-item>
      <b-navbar-item href="#">
        关于
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'VNavbar'
}
</script>

<style lang="scss" scoped>
</style>
