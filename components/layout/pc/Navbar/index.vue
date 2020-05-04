<template>
  <nav class="navbar"
       role="navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link to="/"
                   class="navbar-item">
          <h1 class="logo">{{logoName}}</h1>
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
      menus: constant.menus,
      logoName: constant.logos
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
        font-size: 1.3em;
        color: var(--white);
        text-indent: -9999px;
        background-size: contain;
        background-repeat: no-repeat;
        background: url("https://static.ikmoons.com/logo.svg");
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

      & > .navbar-link {
        line-height: 2.5rem;
        padding: 0.375rem 1rem;
        white-space: nowrap;

        &.navbar-active {
          color: var(--black-bis);
          font-weight: $weight-semibold;
        }
      }
    }
  }
}
</style>
