<template>
  <div class="hero">
    <v-navbar class="hero-head" />
    <main class="hero-body">
      <article class="container">
        <nuxt />
        <v-aside v-show="!noAsidePage" />
      </article>
    </main>
    <v-footer class="hero-foot" />
  </div>
</template>

<script>
import VNavbar from './Navbar/index';
import VFooter from './Footer/index';
import VAside from './Sidebar/index';

export default {
  name: 'PcIndex',
  components: {
    VNavbar,
    VFooter,
    VAside
  },
  computed: {
    noAsidePage () {
      return ['about'].includes(this.$route.name);
    }
  },
  created () {
    console.log(this.noAsidePage)
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
