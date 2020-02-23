<template>
  <nav class="mobile-nav">
    <div class="container">
      <!-- 汉堡包菜单 -->
      <div class="nav-hamburger"
           @click.stop="toggleMenus">
        <div class="hamburger-menu"
             ref="burger">
          <div class="bar top"></div>
          <div class="bar middle"></div>
          <div class="bar bottom"></div>
        </div>
        <div class="nav-menu"
             v-show="isActive">
          <nuxt-link class="navbar-link"
                     v-for="(item,index) in menus"
                     :key="index"
                     :to="item.route">{{item.name}}</nuxt-link>
        </div>
      </div>
      <!-- 导航品牌图标 -->
      <div class="nav-brand">
        <nuxt-link to="/"
                   class="navbar-item">
          <img class="logo"
               src="https://static.ikmoons.com/logo.svg"
               alt="logo">
        </nuxt-link>
      </div>
      <!-- 搜索图标 -->
      <div class="nav-search"
           @click.stop="onShowSearch">
        <i class="icon-search">
          <svg-icon name="search" />
        </i>
      </div>
      <!-- 搜索栏显示与否 -->
      <v-search class="fixedSearch"
                :isSearch="false"
                v-show="isShowSearch"></v-search>
    </div>
  </nav>
</template>

<script>
import VSearch from '@/components/common/search';
import { constant } from '@/config/app.config';

export default {
  name: 'MobileNav',
  components: {
    VSearch
  },
  data () {
    return {
      isActive: false,
      isShowSearch: false,
      menus: constant.menus
    }
  },
  created () {
    this.$on('onCloseSearch', function (searchMap) {
      this.$nextTick(() => {
        if (!this.isShowSearch) {
          searchMap[0].focus()
          this.isShowSearch = true;
        } else {
          searchMap[0].blur()
          this.isShowSearch = false;
        }
      })
    })
  },
  methods: {
    // 显示搜索栏
    onShowSearch () {
      this.isShowSearch = true;
      const burger = this.$refs.burger.children;
      if (this.isActive) {
        this.isActive = false;
        burger[0].style.transform = `rotate(${0}deg)`;
        burger[1].style.opacity = 1;
        burger[2].style.transform = `rotate(${0}deg)`;
      };
    },
    // 菜单显示与否
    toggleMenus () {
      const burger = this.$refs.burger.children;
      if (!this.isActive) {
        this.isActive = true;
        burger[0].style.transform = `rotate(${45}deg)`;
        burger[1].style.opacity = 0;
        burger[2].style.transform = `rotate(${-45}deg)`;
      } else {
        this.isActive = false;
        burger[0].style.transform = `rotate(${0}deg)`;
        burger[1].style.opacity = 1;
        burger[2].style.transform = `rotate(${0}deg)`;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-nav {
  flex: 0 0 45px;

  & > .container {
    display: flex;
    height: 45px;
    flex-flow: row wrap;
    justify-content: space-between;
    padding-left: calc(0.5em - 1px);
    padding-right: calc(0.5em - 1px);
    padding-top: calc(0.25em - 1px);
    padding-bottom: calc(0.25em - 1px);
    background-color: var(--white);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    .nav {
      &-hamburger {
        flex: 0 0 2em;
        align-self: center;
        position: relative;

        .hamburger-menu {
          display: flex;
          cursor: pointer;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-around;
          width: 1.786rem;
          height: 1.786rem;

          & > .bar {
            height: 0.286em;
            background: black;
            border-radius: $radius-size * 2;
            margin: 0.214em 0.143em;
            transform-origin: left;
            transition: all 0.5s;
          }

          & > .middle {
            margin: 0 0.143em;
          }
        }

        & > .nav-menu {
          position: absolute;
          top: 35px;
          left: -6px;
          background-color: #fff;
          width: 100vw;
          display: flex;
          flex-flow: column wrap;
          align-content: center;
          justify-content: flex-start;
          padding: 0 $spacing-evenSize * 4 $spacing-evenSize * 4
            $spacing-evenSize * 4;

          .navbar-link {
            display: inline-block;
            width: 100%;
            text-align: center;
            padding: $spacing-evenSize * 4;
          }

          .navbar-active {
            background-color: #eeeeee;
            border-color: transparent;
          }
        }
      }

      &-brand {
        flex: 1 0 0;
        align-self: center;
        text-align: center;

        .navbar-item {
          display: inline-flex;
          overflow: hidden;
          padding: 0 0.571rem;

          & > .logo {
            width: 120px;
          }
        }
      }

      &-search {
        flex: 0 0 2em;
        display: inline-flex;
        padding-left: calc(0.5em - 1px);
        padding-top: calc(0.25em - 1px);
        padding-bottom: calc(0.25em - 1px);

        & > .icon-search {
          display: inline-flex;
          align-self: center;

          & > .icon {
            font-size: 0.8rem;
          }
        }
      }
    }

    .fixedSearch {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;

      /deep/ .control {
        &.has-icons-right {
          & > .input,
          & > .search-icon {
            height: 3.2em;
          }
        }
      }
    }
  }
}
</style>
