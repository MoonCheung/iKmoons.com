<template>
  <div class="art-wrap">
    <div class="art-main">
      <div class="art-head">
        <h1 class="head-title">{{artDeil.title}}</h1>
        <div class="head-level">
          <i class="level-icon">
            <svg-icon name="catg-samll" />
          </i>
          <span>{{artDeil.catg}}</span>
          <span>{{artDeil.pv}}&nbsp;次阅读</span>
          <span>{{artDeil.like}}&nbsp;人喜欢</span>
          <span>{{artDeil.comment}}&nbsp;评论</span>
        </div>
      </div>
      <div class="art-body">
        <img class="body-img"
             :src="artDeil.banner == ''? 'https://dummyimage.com/740x400/68a382/fff':artDeil.banner"
             art="article banner" />
        <div v-html="artDeil.content"></div>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatDate } from '@/utils/index'

export default {
  name: 'ArtDeil',
  fetch ({ store, params }) {
    return Promise.all([
      store.dispatch('articles/getArtDeil', params)
    ])
  },
  computed: {
    ...mapGetters({
      artDeil: 'articles/artDeil'
    }),
    getFormatDate () {
      return formatDate(this.artDeil.cdate, "yyyy年MM月dd日");
    }
  }
}
</script>

<style lang="scss" scoped>
.art {
  &-wrap {
    width: 760px;
    min-width: 760px;
    padding: 0.857rem;
  }
  &-main {
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
        width: 730px;
        border: 0.429rem solid $border-frame;
      }
    }

    .art-foot {
      padding: 0.6rem;
      margin-top: 0.857rem;
      background-color: var(--grey-lighter);
      border-left: 0.286rem solid var(--grey-light);

      .foot-one,
      .foot-two,
      .foot-three {
        height: 22px;
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
</style>

