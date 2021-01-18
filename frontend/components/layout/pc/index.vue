<template>
  <div id="particles-bg" class="hero">
    <v-navbar class="hero-head" />
    <main class="hero-body">
      <article class="container">
        <!-- TODO: 切换其他页面时候有存在Bug,待处理 -->
        <!-- <nuxt keep-alive /> -->
        <nuxt />
        <transition name="slide-fade">
          <v-aside v-if="!noAsidePage" />
        </transition>
      </article>
    </main>
    <v-footer class="hero-foot" />
  </div>
</template>

<script>
import VNavbar from './Navbar/index';
import VFooter from './Footer/index';
import VAside from './Sidebar/index';
import { partConfig } from '@/config/app.config';

export default {
  name: 'PcIndex',
  components: {
    VNavbar,
    VFooter,
    VAside
  },
  computed: {
    noAsidePage() {
      return ['about'].includes(this.$route.name);
    }
  },
  mounted() {
    this.getGranules();
  },
  methods: {
    getGranules() {
      particlesJS('particles-bg', partConfig);
    }
  }
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  height: 100vh;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  &-head,
  &-foot {
    width: 100%;
  }

  &-body {
    flex: 1 0;
    margin-top: 3.25rem;
    padding: 1.429rem 0;

    & > .container {
      display: flex;
      margin: 0 auto;
      position: relative;
      width: $width-size;
      justify-content: flex-start;

      .about {
        & + .aside {
          display: none;
        }
      }
    }
  }
}
</style>
