<template>
  <nav class="navbar"
       role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/"
                   class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png"
               width="112"
               height="28">
        </nuxt-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link to="/"
                     class="navbar-item">首页</nuxt-link>
          <nuxt-link to="/archive"
                     class="navbar-item">归档</nuxt-link>
          <nuxt-link to="/about"
                     class="navbar-item">关于</nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'VNavbar'
}
</script>

<style lang="scss" scoped>
.navbar {
  .container {
    margin: 0 auto;
    position: relative;
  }
  &-brand {
    flex-grow: 0;
    flex-shrink: 0;
    overflow: hidden;
    padding: 0 0.571rem;

    .navbar-item {
      display: inline-block;
    }
  }
  &-menu {
    flex-grow: 1;
    flex-shrink: 0;

    .navbar-start {
      display: flex;
      overflow: hidden;
      margin-right: auto;
      align-items: center;
      justify-content: flex-start;

      .navbar-item {
        line-height: 2.5rem;
        padding: 0.375rem 1rem;
        white-space: nowrap;
      }
    }
  }
}
</style>
