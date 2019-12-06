<template>
  <div class="hot-wrap">
    <div class="hot-head">
      <i class="head-icon">
        <svg-icon name="article" />
      </i>
      <span class="head-title">热门文章</span>
    </div>
    <div class="hot-list">
      <div class="hot-item">
        <div class="hot-left">1</div>
        <div class="hot-right">
          <nuxt-link to="/#">
            列表1
          </nuxt-link>
        </div>
      </div>
      <div class="hot-item">
        <div class="hot-left">2</div>
        <div class="hot-right">
          <nuxt-link to="/#">
            列表1
          </nuxt-link>
        </div>
      </div>
      <div class="hot-item">
        <div class="hot-left">3</div>
        <div class="hot-right">
          <nuxt-link to="/#">
            列表1
          </nuxt-link>
        </div>
      </div>
      <div class="hot-item">
        <div class="hot-left">4</div>
        <div class="hot-right">
          <nuxt-link to="/#">
            列表1
          </nuxt-link>
        </div>
      </div>
      <div class="hot-item">
        <div class="hot-left">5</div>
        <div class="hot-right">
          <nuxt-link to="/#">
            列表1
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotList',
  data () {
    return {
      hotsList: []
    }
  }
}
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
      border-bottom: 1px solid $border-frame;

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

    .hot-list {
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
        .hot-right {
          flex-grow: 1;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
