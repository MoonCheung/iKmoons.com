<template>
  <div :class="[isMobile? 'mobileTag-wrap':'tags-wrap']">
    <div class="tags-main">
      <header class="tags-head">
        <i class="head-icon">
          <svg-icon name="tag" />
        </i>
        <div class="head-name">{{$route.params.name}}</div>
        <div class="head-count">共搜索到&nbsp;{{apptTags.tagNum.count}}&nbsp;篇文章</div>
      </header>
      <article class="tags-list">
        <div class="container">
          <div class="media"
               v-for="(item,index) in apptTagList"
               :key="index">
            <div v-if="!isMobile"
                 class="media-left">
              <figure class="image">
                <!-- TODO: 等备案出来再次需改回来 -->
                <!-- <img :src="item.banner == ''? 'https://dummyimage.com/220x140/7a657a/fff':item.banner"
                     alt="Placeholder image"> -->
                <img src='https://dummyimage.com/220x140/7a657a/fff'
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
                  <span>{{item | filterComments}}&nbsp;评论</span>
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
                    {{getFormatDate(item.cdate)}}
                  </time>
                </div>
              </div>
            </div>
          </div>
          <button v-if="!noMore"
                  class="btn"
                  :class="tagsLoadMore"
                  @click="fetchMoreTags">下一页</button>
          <button v-else
                  class="btn is-light">
            {{noMore}}
          </button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { mixin, formatDate } from '@/utils/index';

export default {
  name: 'ApptTag',
  fetch ({ store, params }) {
    return Promise.all([
      store.dispatch('tags/fetchApptTags', params)
    ])
  },
  mixins: [mixin],
  computed: {
    ...mapState({
      isMobile: state => state.global.isMobile
    }),
    ...mapGetters({
      tagList: 'tags/tagList',
      apptTagList: 'tags/apptTagList',
      loadMore: 'tags/loadMore',
      noMore: 'tags/noMore'
    }),
    apptTags () {
      return this.tagList.find(el => el.tagname === this.$route.params.name);
    },
    tagsLoadMore () {
      return this.loadMore == false ? 'is-light' : 'is-loading';
    },
    getFormatDate () {
      return param => {
        return formatDate(param, "yyyy年MM月dd日");
      }
    },
  },
  methods: {
    fetchMoreTags () {
      const tags = this.$route.params
      this.$store.dispatch('tags/fetchMoreTags', tags);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  &-wrap {
    width: $part-width-size;
    min-width: $part-width-size;
  }
  &-main {
    display: flex;
    padding: 0.857rem 0.857rem 0 0.857rem;
    flex-direction: column;
    justify-content: flex-start;

    .tags-head {
      display: flex;
      padding: 0.857rem 0;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      border-bottom: 0.071rem solid $border-frame;

      .head {
        &-icon {
          & > .icon {
            width: 2.25em;
            height: 2.25em;
            color: $accent-color;
          }
        }

        &-name {
          font-size: $size-5;
          margin: 0.286rem 0;
          font-weight: $weight-bold;
        }
      }
    }

    .tags-list {
      & > .container {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: flex-start;
      }

      .media:first-of-type {
        margin-top: 0.714rem;
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
            flex: 0 0 0;
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

// 移动端样式
.mobileTag-wrap {
  width: auto;
  min-width: auto;
  color: $secondary-text-color;
  background-color: var(--white-bis);
}
</style>

