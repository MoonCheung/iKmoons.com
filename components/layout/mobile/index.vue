<template>
  <div id="particles-bg"
       class="hero">
    <v-navbar class="hero-head"></v-navbar>
    <main class="hero-body">
      <article class="container">
        <nuxt />
      </article>
    </main>
    <v-footer class="hero-foot"></v-footer>
  </div>
</template>

<script>
import VNavbar from './Navbar/index';
import VFooter from './Footer/index';
import { partConfig } from '@/config/app.config'

export default {
  name: 'MobileIndex',
  components: {
    VNavbar,
    VFooter
  },
  mounted () {
    this.getGranules();
  },
  methods: {
    getGranules () {
      particlesJS('particles-bg', partConfig);
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;

  &-head,
  &-foot {
    width: 100%;
  }

  &-body {
    flex: 1 0;
    padding: $spacing-evenSize * 6 0;

    & > .container {
      margin: 0 auto;
      position: relative;
    }
  }
}
</style>
