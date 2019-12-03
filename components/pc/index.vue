<template>
  <div class="hero">
    <v-navbar class="hero-head" />
    <main class="hero-body">
      <article class="container">
        <nuxt />
        <v-sidebar />
      </article>
    </main>
    <v-footer class="hero-foot" />
  </div>
</template>

<script>
import VNavbar from './Navbar/index';
import VFooter from './Footer/index';
import VSidebar from './Sidebar/index';

export default {
  name: 'PcIndex',
  components: {
    VNavbar,
    VFooter,
    VSidebar
  }
}
</script>

<style lang="scss" scoped>
.hero {
  &-body {
    margin-top: 3.25rem;
    padding: 1.429rem 0;
    .container {
      margin: 0 auto;
      position: relative;
    }
  }
}
</style>
