<template>
  <div :class="[isMobile? 'mobileArt-wrap':'art-wrap']">
    <v-like v-if="!isMobile"
            :item="artDeil"
            :itemLen="artDeilLen"
            :isLike="isLikedArt"></v-like>
    <div ref="artMain"
         class="art-main">
      <span class="art-origin"
            :style="originState(artDeil.origin)">{{artDeil.origin}}</span>
      <div class="art-head">
        <h1 class="head-title">{{artDeil.title}}</h1>
        <div class="head-level">
          <i class="level-icon">
            <svg-icon name="catg-small" />
          </i>
          <span>{{artDeil.catg}}</span>
          <span>{{artDeil.pv}}&nbsp;次阅读</span>
          <span>{{artDeil.like}}&nbsp;人喜欢</span>
          <span>{{artDeilLen}}&nbsp;评论</span>
        </div>
      </div>
      <div ref="artBody"
           class="art-body">
        <img class="body-img"
             :src="artDeil.banner == ''? 'https://dummyimage.com/740x400/68a382/fff':artDeil.banner"
             art="article banner" />
        <!-- markdown-it解析 -->
        <div class="markdown-body"
             v-html="$md.render(artDeil.content)"></div>
      </div>
      <div class="art-foot">
        <div class="foot-one">发布时间: <span>{{getFormatDate}}</span></div>
        <div class="foot-two">相关标签:
          <nuxt-link class="two-tag"
                     :to="`/tags/${item}`"
                     v-for="item in artDeil.tag"
                     :key="item.id">{{item}}
          </nuxt-link>
        </div>
        <div class="foot-three">版权声明:
          <span>自由转载-署名-非商用&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <a rel="license"
             target="_blank"
             class="foot-link"
             href="http://creativecommons.org/licenses/by-nc/3.0/cn/">CC BY-NC 3.0 CN</a>
        </div>
      </div>
      <div class="art-share"
           v-if="isMobile">
        <div class="share-meta"
             :class="[isLikedArt? 'isliked' : '']"
             :badge="artDeil.like"
             @click.stop.prevent="likeParentArtPages(artDeil.id)">
          <i class="like-icon">
            <svg-icon name="like" />
          </i>
        </div>
        <div class="share-level">
          <span class="share-item"
                @click.prevent="onCopyPageLink">
            <svg-icon name="links" />
          </span>
          <span class="share-item"
                @click="onShareWeixin('wechatFriend')">
            <svg-icon name="weixin" />
          </span>
          <span class="share-item"
                @click="onShareFriend('wechatTimeline')">
            <svg-icon name="friend" />
          </span>
          <span class="share-item"
                @click="onShareWeibos('weibo')">
            <svg-icon name="weibo" />
          </span>
        </div>
      </div>
    </div>
    <v-comment :list="artDeil.comments"
               :listLen="artDeilLen"></v-comment>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { formatDate, mixin } from '@/utils/index';
import VLike from '@/components/widget/like';
import VComment from '@/components/common/comment';
import { localLikeHistory } from '@/service/storage';
import apiMap from '@/config/api.config';
import { plyrConfig } from '@/config/app.config';

export default {
  name: 'ArtDeil',
  fetch ({ store, params }) {
    return Promise.all([
      store.dispatch('articles/getArtDeil', params)
    ])
  },
  components: {
    VComment,
    VLike
  },
  head () {
    const { artDeil } = this;
    return {
      title: artDeil.title
    }
  },
  mixins: [mixin],
  data () {
    return {
      // 用户点赞历史
      likeHistory: {
        article: [],
        comment: [],
        reply: []
      }
    }
  },
  computed: {
    ...mapState({
      isMobile: state => state.global.isMobile,
    }),
    ...mapGetters({
      artDeil: 'articles/artDeil',
      artDeilLen: 'articles/artDeilLen'
    }),
    getFormatDate () {
      return formatDate(this.artDeil.cdate, "yyyy年MM月dd日");
    },
    isLikedArt () {
      return this.likeHistory.article.includes(this.artDeil.id)
    },
    url () {
      const path = this.$route.fullPath;
      return `${apiMap.DOMAIN}${path}`
    }
  },
  // TODO：有存在Bug待处理
  // activated () {
  //   this.initUserLikeHistory();
  // },
  created () {
    this.$on('likeArtPage', function (elem) {
      this.commonLikedArt(elem);
    })
    this.$on('onShareWeibo', function (elem) {
      this.commonShare(elem);
    })
    this.$on('likeArtComment', function (elem) {
      const param = {
        id: elem[0],
        type: elem[1]
      }
      this.$store.dispatch('articles/fetchLikeComment', param).then(res => {
        if (elem[1] === 'comment') {
          this.likeHistory.comment.push(res.id);
          localLikeHistory.set(this.likeHistory);
        } else if (elem[1] === 'reply') {
          this.likeHistory.reply.push(res.id);
          localLikeHistory.set(this.likeHistory);
        }
      });
    });
  },
  mounted () {
    this.initUserLikeHistory();
    this.initPlayer();
  },
  methods: {
    initPlayer () {
      Array.from(document.querySelectorAll('#player')).map(p => new Plyr(p, plyrConfig));
    },
    // 初始化用户点赞历史
    initUserLikeHistory () {
      const likeHistorys = localLikeHistory.get();
      !likeHistorys ? localLikeHistory.set(this.likeHistory) : (this.likeHistory = likeHistorys)
    },
    // 复制链接地址方法
    onCopyPageLink () {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.value = this.url;
      input.select();
      if (document.execCommand("Copy")) {
        this.$toast.info('链接地址复制成功');
      } else {
        this.$toast.error('链接地址复制失败');
      }
      document.body.removeChild(input);
    },
    // 分享微信好友方法
    onShareWeixin (command) {
      this.commonShare(command);
    },
    // 分享微信朋友圈方法
    onShareFriend (command) {
      this.commonShare(command);
    },
    // 分享微博方法
    onShareWeibos (command) {
      this.commonShare(command);
    },
    // 点赞父级文章方法
    likeParentArtPages (elem) {
      this.commonLikedArt(elem);
    },
    // 通用共享方法
    commonShare (command) {
      nativeShare.setShareData({
        icon: this.artDeil.banner,
        link: this.url,
        title: this.artDeil.title + ' - 作者:MoonCheung',
        desc: this.artDeil.desc,
        from: '@MoonCheung',
      })
      // 处理错误机制
      try {
        nativeShare.call(command);
      } catch (err) {
        // 如果不支持，你可以在这里做降级处理
        console.error(`提示错误:`, err.message);
        this.$toast.error('建议更换别的浏览器分享，同时感谢关注我的文章');
      }
    },
    // 通用点赞方法
    commonLikedArt (param) {
      if (this.isLikedArt) {
        this.$toast.info('你已点赞过!');
        return false;
      }
      this.$store.dispatch('articles/fetchLikeArt', param).then(res => {
        this.likeHistory.article.push(res.id);
        localLikeHistory.set(this.likeHistory);
      });
    }
  },
  // 实例销毁之前调用
  beforeDestroy () {
    // 销毁实例并垃圾收集任何元素
    Array.from(document.querySelectorAll('#player')).map(p => {
      const players = new Plyr(p);
      players.destroy();
    });
  }
}
</script>

<style lang="scss" scoped>
.art {
  &-wrap {
    width: $part-width-size;
    min-width: $part-width-size;
  }

  &-main {
    padding: 0.857rem;
    display: flex;
    overflow: hidden;
    position: relative;
    flex-direction: column;
    justify-content: space-between;

    .art-origin {
      position: absolute;
      display: inline-block;
      top: -0.4em;
      left: -2em;
      width: 6em;
      height: 3em;
      line-height: 4em;
      text-align: center;
      font-size: 0.857rem;
      transform: rotate(-45deg);
    }

    .art-head,
    .art-foot {
      flex: 0 0;
    }

    .art-head {
      .head-title {
        text-align: center;
        color: $primary-text-color;
      }
      .head-level {
        display: flex;
        margin: 1rem 0;
        user-select: none;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .level-icon {
          display: inline-flex;
          align-self: flex-start;

          & > .icon {
            width: 1em;
            height: 1em;
          }
        }

        .level-icon ~ span {
          display: inline-flex;
          align-self: center;
          font-size: 0.857rem;
          margin-left: 0.286rem;
        }
      }
    }

    .art-body {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-bottom: 0.857rem;
      border-bottom: 0.071rem dashed $border-frame;

      .body-img {
        width: 100%;
        margin-bottom: $spacing-evenSize * 4;
        border: 0.429rem solid $border-frame;
      }

      & > .markdown-body {
        color: $primary-text-color;
        font-size: 1rem;

        /deep/ p {
          overflow: hidden;
          & > img {
            display: block;
            max-width: 96%;
            position: relative;
            margin: 0 auto;
            border: 0.429rem solid #dcdfe6;
          }
        }

        // 代码高亮显示
        /deep/ .hljs {
          background-color: #23241f;
        }
      }
    }

    .art-foot {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      padding: 0.6rem;
      margin-top: 0.857rem;
      background-color: var(--grey-lighter);
      border-left: 0.286rem solid var(--grey-light);

      .foot-one,
      .foot-two,
      .foot-three {
        flex: 0 0 22px;
        line-height: 22px;
        font-weight: $weight-normal;
      }

      .foot-two {
        .two-tag:first-of-type::before {
          content: " ";
        }
        .two-tag::before {
          content: " , ";
        }
      }
    }

    .art-share {
      display: flex;
      align-items: center;
      flex-direction: column;

      .share-meta {
        flex: 1 0 100%;
        text-align: center;
        position: relative;
        margin: 1.714rem 0;
        padding: calc(0.45em - 1px);

        & > .like-icon {
          display: inline-block;
        }

        // 已点赞样式
        &.isliked {
          .like-icon {
            & > .icon {
              color: var(--green);
            }
          }
        }
        &.isliked::after {
          color: #fff;
          background-color: var(--green);
        }
      }

      .share-meta::after {
        content: attr(badge);
        position: absolute;
        top: 0;
        left: 74%;
        text-align: center;
        line-height: 1;
        border-radius: 0.7rem;
        white-space: nowrap;
        transform: scale(0.75);
        transform-origin: left top;
        padding-top: calc(0.25em - 1px);
        padding-left: calc(0.5em - 1px);
        padding-right: calc(0.5em - 1px);
        padding-bottom: calc(0.25em - 1px);
        background-color: var(--grey-lighter);
      }

      .share-level {
        flex: 0 0 100%;
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;

        & > .share-item {
          flex: 1 0;
          line-height: 0;
          padding: 0.286rem;
          margin: 0 0.571rem;
          text-align: center;
          background-color: var(--grey-lighter);

          & > .icon {
            width: 1.45em;
            height: 1.45em;
          }
        }

        & > .share-item:active,
        & > .share-item:visited {
          background-color: var(--grey-light);
        }

        & > .share-item:first-child {
          margin-left: 0;
        }
        & > .share-item:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

// 移动端文章
.mobileArt {
  &-wrap {
    width: auto;
    min-width: auto;
  }
}
</style>

