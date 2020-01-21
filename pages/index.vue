<template>
  <div :class="[isMobile? 'mobileMain-wrap' : 'main-wrap']">
    <header class="header">
      <div class="container">
        <div class="card"
             v-for="(item,index) in catgList"
             :key="index">
          <div class="card-wrap">
            <nuxt-link class="card-link"
                       :to="`/catg/${item.categoryname}`"
                       no-prefetch>
              <img class="card-img"
                   :src="item.link"
                   alt="item.name" />
              <div class="card-item">
                <i class="card-icon">
                  <svg-icon :name="item.name" />
                </i>
                <span class="card-title">{{item.categoryname}}</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </header>
    <section class="section">
      <div class="container">
        <div class="media"
             v-for="(item,index) in allArtList"
             :key="index">
          <div v-if="!isMobile"
               class="media-left">
            <figure class="image">
              <img :src="item.banner == ''? 'https://dummyimage.com/220x140/7a657a/fff':item.banner"
                   alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <nuxt-link class="media-link"
                       :to="`/article/${item.id}`"
                       no-prefetch>
              <h2 class="link-head">{{item.title}}</h2>
              <div class="link-content">{{item.desc}}</div>
            </nuxt-link>
            <div class="media-level">
              <div v-if="!isMobile"
                   class="level-left">
                <i class="left-icon">
                  <svg-icon name="catg-small" />
                </i>
                <span>{{item.catg}}</span>
                <span>{{item.pv}}&nbsp;次阅读</span>
                <span>{{item.like}}&nbsp;人喜欢</span>
                <span>{{item | filterComments }}&nbsp;评论</span>
              </div>
              <div v-else
                   class="level-left">
                <i class="left-icon">
                  <svg-icon name="read" />
                </i>
                <span>{{item.pv}}&nbsp;&nbsp;</span>
                <i class="left-icon">
                  <svg-icon name="like" />
                </i>
                <span>{{item.like}}&nbsp;&nbsp;</span>
                <i class="left-icon">
                  <svg-icon name="huifu" />
                </i>
                <span>{{item | filterComments}}</span>
              </div>
              <div class="level-right">
                <i class="right-icon">
                  <svg-icon name="time" />
                </i>
                <time class="right-time">
                  {{item.cdate}}
                </time>
              </div>
            </div>
          </div>
        </div>
        <button v-if="!noMore"
                class="btn"
                :class="artLoadMore"
                @click="fetchMoreArt">
          下一页
        </button>
        <button v-else
                class="btn is-light">
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
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('articles/fetchAllArt')
    ])
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
    artLoadMore () {
      return this.loadMore == false ? "is-light" : "is-loading";
    }
  },
  // 该方法被混入Vue实例当中
  methods: {
    fetchMoreArt () {
      this.$store.dispatch('articles/fetchMoreArt');
    },
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
          display: inline-block;

          .card-img {
            width: 100%;
            height: 100%;
          }

          .card-item {
            position: absolute;
            left: 35%;
            bottom: 14%;
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
            font-size: 0.857rem;
            display: flex;
            flex-direction: row;
            align-items: center;

            .left-icon {
              display: inline-flex;
              align-self: flex-start;
              & > .icon {
                width: 1em;
                height: 1em;
              }
            }
            .left-icon ~ span {
              display: inline-flex;
              margin-left: 0.286rem;
            }
          }
          .level-right {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 0.857rem;

            .right-icon {
              display: inline-flex;
              margin-right: 0.286rem;

              & > .icon {
                width: 1em;
                height: 1em;
              }
            }
            .right-time {
              display: inline-flex;
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
                text-align: center;
                transform: translate(-50%, 50%);

                & > .card-icon {
                  display: block;

                  & > .icon {
                    color: #fff;
                    width: 1.45em;
                    height: 1.45em;
                  }
                }
                .card-title {
                  margin: 0.286rem 0;
                  color: $primary-color-text;
                  display: inline-block;
                }
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
              font-size: 0.857rem;
              display: flex;
              flex-direction: row;
              align-items: center;

              .left-icon {
                display: inline-flex;
                align-self: flex-start;
                & > .icon {
                  width: 1em;
                  height: 1em;
                }
              }
              .left-icon ~ span {
                display: inline-flex;
                margin-left: 0.286rem;
              }
            }

            .level-right {
              display: flex;
              flex-direction: row;
              align-items: center;
              font-size: 0.857rem;

              .right-icon {
                display: inline-flex;
                margin-right: 0.286rem;

                & > .icon {
                  width: 1em;
                  height: 1em;
                }
              }
              .right-time {
                display: inline-flex;
              }
            }
          }
        }
      }
    }
  }
}
</style>
