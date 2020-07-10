<template>
  <div class="tag-wrap">
    <div class="tag-head">
      <i class="head-icon">
        <svg-icon name="tag" />
      </i>
      <span class="head-title">标签</span>
    </div>
    <div class="tag-all">
      <span class="tag-item" v-for="(item, index) in list" :key="index">
        <nuxt-link :to="`/tags/${item.tagname}`">
          <span class="tag-name">{{ item.tagname }}</span>
          <i class="tag-count">[ {{ item.tagNum == undefined ? 0 : item.tagNum.count }} ]</i>
        </nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagList',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.tag {
  &-wrap {
    padding: 0.6rem;

    .tag-head {
      padding: 0.2rem;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 0.071rem solid $border-frame;

      .head-icon {
        flex: 0 1;
        margin-right: 0.4rem;
        .icon {
          width: 1.25em;
          height: 1.25em;
          color: $accent-color;
        }
      }

      .head-title {
        flex: 1 1;
        font-weight: bold;
      }
    }

    .tag-all {
      padding: 0.6rem 0;

      .tag-item {
        display: inline-block;
        padding: 0.4rem;
        margin: 0 0.4rem 0.4rem 0;
        border-radius: $radius-size * 2;
        border: 0.071rem solid $border-frame;

        .tag-count {
          font-style: normal;
          font-size: 0.857rem;
        }

        &:hover,
        &:active {
          background-color: var(--grey-lightest);
        }
      }
    }
  }
}
</style>
