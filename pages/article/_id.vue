<template>
  <div :class="[isMobile? 'mobileArt-wrap':'art-wrap']">
    <v-like v-if="!isMobile"
            :item="artDeil"
            :itemLen="artDeilLen"
            :isLike="isLikedArt"></v-like>
    <div ref="artMain"
         class="art-main">
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
    </div>
    <v-comment :list="artDeil.comments"
               :listLen="artDeilLen"></v-comment>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { formatDate } from '@/utils/index';
import VLike from '@/components/common/like';
import VComment from '@/components/common/comment';
import { localLikeHistory } from '@/service/storage';

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
  },
  // TODO：有存在Bug待处理
  // activated () {
  //   this.initUserLikeHistory();
  // },
  created () {
    this.$on('likeArtPage', function (elem) {
      if (this.isLikedArt) {
        this.$toast.info('你已点赞过!');
        return false;
      }
      this.$store.dispatch('articles/fetchLikeArt', elem).then(res => {
        this.likeHistory.article.push(res.id);
        localLikeHistory.set(this.likeHistory);
      });
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
    })
  },
  mounted () {
    this.initUserLikeHistory();
    this.dynamicMarkdownWidth();
  },
  methods: {
    // 初始化用户点赞历史
    initUserLikeHistory () {
      const likeHistorys = localLikeHistory.get();
      !likeHistorys ? localLikeHistory.set(this.likeHistory) : (this.likeHistory = likeHistorys)
    },
    // 动态markdown元素宽度
    dynamicMarkdownWidth () {
      const artBody = this.$refs.artBody;
      const markBody = artBody.lastChild;
      markBody.style.width = `${artBody.clientWidth}px`;
    }
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
    flex-direction: column;
    justify-content: space-between;

    .art-head,
    .art-foot {
      flex: 0 0 0;
    }

    .art-head {
      .head-title {
        text-align: center;
      }
      .head-level {
        display: flex;
        margin: 1rem 0;
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
      flex: 1 0 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding-bottom: 0.857rem;
      border-bottom: 0.071rem dashed $border-frame;

      .body-img {
        width: 100%;
        margin-bottom: $spacing-evenSize * 4;
        border: 0.429rem solid $border-frame;
      }

      & > .markdown-body {
        /deep/ p {
          & > img {
            width: 100%;
            border: 0.429rem solid #dcdfe6;
          }
        }

        /deep/ ul,
        /deep/ ol {
          padding: 0 2em;
        }

        /deep/ & > .ql-syntax {
          padding: 0.5em;
          color: var(--white);
          border-radius: 0.143rem;
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

