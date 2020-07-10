<template>
  <div class="hot-wrap">
    <div class="hot-head">
      <i class="head-icon">
        <svg-icon name="article" />
      </i>
      <span class="head-title">热门文章</span>
    </div>
    <div class="hot-list">
      <div class="hot-item" v-for="(item, index) in list" :key="index">
        <div class="hot-left"></div>
        <div class="hot-right">
          <nuxt-link class="hot-link" :to="`/article/${item.id}`">
            {{ item.title }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.hot {
  &-wrap {
    padding: 0.6rem;
    margin-bottom: 0.6rem;

    .hot-head {
      padding: 0.2rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 0.071rem solid $border-frame;

      .head-icon {
        margin-right: 0.4rem;
        flex: 0 1;
        .icon {
          color: $accent-color;
          width: 1.25em;
          height: 1.25em;
        }
      }
      .head-title {
        flex: 1 1;
        font-weight: bold;
      }
    }

    .hot-list {
      counter-reset: hotIcon;

      .hot-item {
        display: flex;
        padding: 0.6rem 0 0.6rem 0.4rem;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;

        .hot-left {
          flex-grow: 0;
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          margin-right: 0.4rem;
          padding-top: 0.071rem;
          text-align: center;
          border-radius: $radius-size;
          background-color: var(--grey-lighter);
        }

        .hot-left:before {
          counter-increment: hotIcon;
          content: counter(hotIcon);
        }

        .hot-right {
          flex-grow: 1;
          flex-shrink: 0;

          & > .hot-link {
            &:hover,
            &:active {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
