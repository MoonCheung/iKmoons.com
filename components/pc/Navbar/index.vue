<template>
  <nav class="navbar"
       role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item"
           href="#">
          <img src="https://bulma.io/images/bulma-logo.png"
               width="112"
               height="28">
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <a href="#"
             class="navbar-item">首页</a>
          <a href="#"
             class="navbar-item">归档</a>
          <a href="#"
             class="navbar-item">关于</a>
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
    flex-grow: 1;
    margin: 0 auto;
    position: relative;
    width: 1080px;
  }
  &-brand {
    flex-grow: 0;
    flex-shrink: 1;
  }
  &-menu {
    flex-grow: 1;
    flex-shrink: 1;

    .navbar-start {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: auto;

      .navbar-item {
        padding: 0.375rem 1rem;
        white-space: nowrap;
      }
    }
  }
}
</style>
