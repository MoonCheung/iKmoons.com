<template>
  <nav class="navbar"
       role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/"
                   class="navbar-item">
          <img class="logo"
               src="https://static.ikmoons.com/logo.svg"
               alt="logo" />
        </nuxt-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link class="navbar-link"
                     v-for="(item,index) in menus"
                     :key="index"
                     :to="item.route">{{item.name}}</nuxt-link>
        </div>
      </div>
      <v-search :isSearch="true"></v-search>
    </div>
  </nav>
</template>

<script>
import VSearch from '@/components/common/search';
import { constant } from '@/config/app.config';

export default {
  name: 'VNavbar',
  components: {
    VSearch,
  },
  data () {
    return {
      menus: constant.menus
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  & > .container {
    margin: 0 auto;
    position: relative;
  }
  &-brand {
    overflow: hidden;
    padding: 0 0.571rem;

    .navbar-item {
      display: inline-block;
      & > .logo {
        width: 120px;
      }
    }
  }
  &-menu {
    flex: 1 0 0;

    .navbar-start {
      display: flex;
      overflow: hidden;
      margin-right: auto;
      align-items: center;
      justify-content: flex-start;

      .navbar-link {
        line-height: 2.5rem;
        padding: 0.375rem 1rem;
        white-space: nowrap;
      }
    }
  }
}
</style>
