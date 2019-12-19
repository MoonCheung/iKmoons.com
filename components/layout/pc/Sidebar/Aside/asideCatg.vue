<template>
  <div class="catg-wrap">
    <div class="catg-head">
      <i class="head-icon">
        <svg-icon name="classify" />
      </i>
      <span class="head-title">分类</span>
    </div>
    <div class="catg-list">
      <div class="catg-item"
           v-for="(item,index) in catgList"
           :key="index">
        <nuxt-link :to="`/catg/${item.categoryname}`"
                   no-prefetch>
          <div class="catg-left">
            <svg-icon :name="item.name" />
          </div>
          <div class="catg-right">
            <span class="catg-name">{{item.categoryname}}</span>
            <span class="catg-count">共&nbsp;{{item.catgNum.count}}&nbsp;篇文章</span>
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
    }),
  }
}
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
        flex-grow: 0;
        flex-shrink: 0;
        .icon {
          width: 1.25em;
          height: 1.25em;
        }
      }

      .head-title {
        flex-grow: 1;
        flex-shrink: 0;
        font-weight: bold;
      }
    }

    .catg-list {
      .catg-item {
        padding: 0.6rem 0 0.6rem 0.4rem;

        & > a {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;

          .catg-left {
            margin-right: 0.4rem;
            flex-grow: 0;
            flex-shrink: 0;

            & > .icon {
              color: #9e9e9e;
              width: 1.25em;
              height: 1.25em;
            }
          }

          .catg-right {
            flex-grow: 1;
            flex-shrink: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .catg-name {
              flex-grow: 1;
              flex-shrink: 0;
            }

            .catg-count {
              flex-grow: 0;
              flex-shrink: 0;
            }
          }
        }
      }
    }
  }
}
</style>
