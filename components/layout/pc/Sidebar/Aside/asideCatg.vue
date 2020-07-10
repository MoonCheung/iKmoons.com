<template>
  <div class="catg-wrap">
    <div class="catg-head">
      <i class="head-icon">
        <svg-icon name="classify" />
      </i>
      <span class="head-title">分类</span>
    </div>
    <div class="catg-list">
      <div class="catg-item" v-for="(item, index) in catgList" :key="index">
        <nuxt-link :to="`/catg/${item.categoryname}`" no-prefetch>
          <div class="catg-left">
            <svg-icon :name="item.name" />
          </div>
          <div class="catg-right">
            <span class="catg-name">{{ item.categoryname }}</span>
            <span class="catg-count">
              共&nbsp;{{ item.catgNum === undefined ? 0 : item.catgNum.count }}&nbsp;篇文章
            </span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CatgList',
  computed: {
    ...mapState({
      catgList: state => state.catg.list.catgList
    })
  }
};
</script>

<style lang="scss" scoped>
.catg {
  &-wrap {
    padding: 0.6rem;
    margin-bottom: 0.6rem;

    .catg-head {
      padding: 0.2rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 0.071rem solid $border-frame;

      .head-icon {
        margin-right: 0.4rem;
        flex: 0 1;
        .icon {
          width: 1.25em;
          height: 1.25em;
        }
      }

      .head-title {
        flex: 1 1;
        font-weight: bold;
      }
    }

    .catg-list {
      .catg-item {
        margin-top: 0.429rem;
        padding: 0.286rem;

        & > a {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;

          .catg-left {
            margin-right: 0.4rem;
            flex: 0 1;

            & > .icon {
              color: $accent-color;
              width: 1.25em;
              height: 1.25em;
            }
          }

          .catg-right {
            flex: 1 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .catg-name {
              flex: 1 1;
            }
          }
        }
        &:hover,
        &:active {
          border-radius: 0.286rem;
          background-color: var(--grey-lightest);
        }
      }
    }
  }
}
</style>
