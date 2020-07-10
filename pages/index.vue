<template>
  <div :class="[isMobile ? 'mobileMain-wrap' : 'main-wrap']">
    <header class="header">
      <div class="container">
        <div class="card" v-for="(item, index) in catgList" :key="index">
          <div class="card-wrap">
            <nuxt-link
              class="card-link"
              :to="`/catg/${item.categoryname}`"
              :title="item.categoryname"
              no-prefetch
            >
              <img class="card-img" :src="item.link" alt="item.name" />
              <div class="card-item">
                <i class="card-icon">
                  <svg-icon :name="item.name" />
                </i>
                <span class="card-title">{{ item.categoryname }}</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </header>
    <section class="section">
      <div class="container">
        <div class="media" v-for="(item, index) in allArtList" :key="index">
          <div v-if="!isMobile" class="media-left">
            <figure class="image">
              <img :src="item.banner" alt="Placeholder image" />
            </figure>
          </div>
          <div class="media-content">
            <nuxt-link
              class="media-link"
              :to="`/article/${item.id}`"
              :title="item.title"
              no-prefetch
            >
              <h2 class="link-head">{{ item.title }}</h2>
              <div class="link-content">{{ item.desc }}</div>
            </nuxt-link>
            <div class="media-level">
              <div v-if="!isMobile" class="level-left">
                <i class="left-icon">
                  <svg-icon name="catg-small" />
                </i>
                <span>{{ item.catg }}</span>
                <span>{{ item.pv }}&nbsp;次阅读</span>
                <span>{{ item.like }}&nbsp;人喜欢</span>
                <span>{{ item | filterComments }}&nbsp;评论</span>
              </div>
              <div v-else class="level-left">
                <i class="left-icon">
                  <svg-icon name="read" />
                </i>
                <span>{{ item.pv }}&nbsp;&nbsp;</span>
                <i class="left-icon">
                  <svg-icon name="like" />
                </i>
                <span>{{ item.like }}&nbsp;&nbsp;</span>
                <i class="left-icon">
                  <svg-icon name="huifu" />
                </i>
                <span>{{ item | filterComments }}</span>
              </div>
              <div class="level-right">
                <i class="right-icon">
                  <svg-icon name="time" />
                </i>
                <time class="right-time">
                  {{ item.cdate }}
                </time>
                <span class="right-origin" :style="originState(item.origin)">
                  {{ item.origin }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button v-if="!noMore" class="btn" :class="artLoadMore" @click="fetchMoreArt">
          下一页
        </button>
        <button v-else class="btn is-light">
          {{ noMore }}
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { mixin } from '@/utils/index';

export default {
  name: 'Home',
  scrollToTop: true,
  fetch({ store }) {
    return Promise.all([store.dispatch('articles/fetchAllArt')]);
  },
  mixins: [mixin],
  // 计算属性
  computed: {
    ...mapState({
      isMobile: state => state.global.isMobile,
      catgList: state => state.catg.list.catgList
    }),
    ...mapGetters({
      allArtList: 'articles/artList',
      loadMore: 'articles/loadMore',
      noMore: 'articles/noMore'
    }),
    artLoadMore() {
      return this.loadMore == false ? 'is-light' : 'is-loading';
    }
  },
  // 该方法被混入Vue实例当中
  methods: {
    fetchMoreArt() {
      this.$store.dispatch('articles/fetchMoreArt');
    }
  },
  // 实例销毁之后调用
  destroyed() {
    this.fetchMoreArt();
  }
};
</script>

<style lang="scss" scoped>
.main-wrap {
  width: $part-width-size;
  min-width: $part-width-size;

  .header {
    & > .container {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: space-between;
    }

    .card {
      width: $card-width;
      height: 100%;

      &-wrap {
        overflow: hidden;
        border-radius: $radius-size;
        height: $card-height;

        & > .card-link {
          // TODO：有重复
          position: relative;
          bottom: 10%;
          display: inline-block;

          .card-img {
            position: relative;
            display: block;
            right: 10%;
            overflow: hidden;
            width: 100%;
            height: auto;
            min-width: calc(100% + 2.5em);
            transition: transform ease 0.4s;
          }

          .card-item {
            position: absolute;
            left: 35%;
            bottom: 16%;
            z-index: 1;
            text-align: center;

            & > .card-icon {
              display: block;

              & > .icon {
                color: #fff;
              }
            }
            .card-title {
              margin: 1rem 0;
              color: $primary-color-text;
              display: inline-block;
            }
          }

          &:hover,
          &:active {
            & > .card-img {
              transform: translateX(1em);
            }
          }

          &::after {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }

  .section {
    & > .container {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: flex-start;
    }

    .media {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 0.428rem;
      margin-bottom: 0.428rem;
      border-bottom: 0.071rem dashed $border-frame;

      &-left {
        overflow: hidden;
        margin-right: 0.429rem;
        border: 0.286rem solid #dcdfe6;

        .image {
          & > img {
            width: 160px;
            height: 110px;
            object-fit: cover;
            transition: transform ease 0.4s;
          }
        }
      }

      &-content {
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .media-link {
          flex: 1 0 0;

          .link-head {
            font-size: 1.143rem;
            padding: 0.429rem 0;
            transition: margin 0.25s;
          }

          .link-content {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: $spacing-evenSize * 4;
          }

          .link-content,
          .link-content:hover {
            color: $secondary-text-color;
          }

          &:hover,
          &:active {
            & > .link-head {
              margin-left: 0.571rem;
              text-decoration: underline;
            }
          }
        }

        .media-level {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 0.143rem;

          .level-left {
            flex: 1 0 0;
            @extend .level-right;

            .left-icon {
              display: inline-flex;

              & > .icon {
                width: 1em;
                height: 1em;
              }
            }
            .left-icon ~ span {
              @extend .left-icon;
              margin-left: 0.286rem;
            }
          }
          .level-right {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 0.857rem;

            .right-icon {
              @extend .right-time;
              margin-right: 0.286rem;

              & > .icon {
                width: 1em;
                height: 1em;
              }
            }
            .right-time {
              display: inline-flex;
              margin-right: $spacing-evenSize * 2;
            }

            .right-origin {
              display: inline-block;
              padding-top: calc(0.3em - 1px);
              padding-bottom: calc(0.3em - 1px);
              padding-left: calc(0.5em - 1px);
              padding-right: calc(0.5em - 1px);
            }
          }
        }
      }

      &:hover,
      &:active {
        background-color: var(--grey-lightest);
        .media-left {
          overflow: hidden;
          .image {
            & > img {
              transform: scale(1.1);
            }
          }
        }
      }
    }
  }
}

// 移动端样式
.mobileMain {
  &-wrap {
    .header {
      margin-bottom: $spacing-evenSize * 2;

      & > .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .card {
          &-wrap {
            overflow: hidden;
            margin: 0 0.286em;
            border-radius: $radius-size;

            & > .card-link {
              position: relative;
              display: inline-block;

              .card-img {
                width: 100%;
                height: 100%;
                background-size: cover;
              }

              .card-item {
                position: absolute;
                left: 50%;
                bottom: 50%;
                width: 100%;
                z-index: 1;
                text-align: center;
                transform: scale(0.9) translate(-55.5%, 60%);

                & > .card-icon {
                  display: block;

                  & > .icon {
                    color: #fff;
                    width: 1.45em;
                    height: 1.45em;
                  }
                }
                & > .card-title {
                  margin: 0.286rem 0;
                  color: $primary-color-text;
                  display: inline-block;
                }
              }
              &::after {
                position: absolute;
                content: '';
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.2);
              }
            }
          }

          &:first-of-type {
            padding-left: 0.143em;
          }

          &:last-of-type {
            padding-right: 0.143em;
          }
        }
      }
    }

    .section {
      padding: 0.857rem 0.857rem 0 0.857rem;
      & > .container {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
      }

      .media {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 0.571rem;
        padding-bottom: 0.571rem;
        border-bottom: 0.071rem dashed $border-frame;

        &-left {
          margin-right: 0.429rem;

          .image {
            & > img {
              width: 220px;
              height: 140px;
            }
          }
        }

        &-content {
          flex: 1 0 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .media-link {
            flex: 1 0 0;

            .link-head {
              font-size: 1.143rem;
              padding: 0.429rem 0;
            }

            .link-content {
              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              margin-bottom: $spacing-evenSize * 4;
            }

            .link-content,
            .link-content:hover {
              color: $secondary-text-color;
            }
          }

          .media-level {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-bottom: 0.143rem;

            .level-left {
              flex: 1 0 0;
              @extend .level-right;

              .left-icon {
                display: inline-flex;

                & > .icon {
                  width: 1em;
                  height: 1em;
                }
              }
              .left-icon ~ span {
                @extend .left-icon;
                margin-left: 0.286rem;
              }
            }

            .level-right {
              display: flex;
              flex-direction: row;
              align-items: center;
              font-size: 0.857rem;

              .right-icon {
                @extend .right-time;
                margin-right: 0.286rem;

                & > .icon {
                  width: 1em;
                  height: 1em;
                }
              }
              .right-time {
                display: inline-flex;
                margin-right: $spacing-evenSize * 2;
              }

              .right-origin {
                display: inline-block;
                padding-top: calc(0.3em - 1px);
                padding-bottom: calc(0.3em - 1px);
                padding-left: calc(0.5em - 1px);
                padding-right: calc(0.5em - 1px);
              }
            }
          }
        }
      }
    }
  }
}
</style>
