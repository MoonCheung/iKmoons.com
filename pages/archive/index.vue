<template>
  <div :class="[isMobile? 'mobileArch-wrap' : 'archive-wrap']">
    <div class="archive-main">
      <header class="archive-head">
        <i class="head-icon">
          <svg-icon name="record" />
        </i>
        <div class="head-name">归档</div>
        <div class="head-count">目前共计&nbsp;{{archCount}}&nbsp;篇文章</div>
      </header>
      <article class="archive-list">
        <div class="list-content">
          <ul class="parent-child">
            <li class="child-one"
                v-for="oneItem in artArch"
                :key="oneItem.id">
              <h2>{{oneItem._id.year}}年</h2>
              <ul>
                <li class="child-two"
                    v-for="twoItem in oneItem.secondDate"
                    :key="twoItem.id">
                  <h4>{{twoItem.month}}月</h4>
                  <ul>
                    <li class="child-three"
                        v-for="threeItem in twoItem.items"
                        :key="threeItem.id">
                      <span class="three-date">{{threeItem.date}}</span>
                      <nuxt-link class="three-link"
                                 :to="`/article/${threeItem.id}`">{{threeItem.title}}</nuxt-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "Archive",
  fetch ({ store }) {
    return Promise.all([
      store.dispatch('articles/fetchArtArch')
    ])
  },
  computed: {
    ...mapState({
      artArch: state => state.articles.arch.artList,
      archCount: state => state.articles.arch.count,
      isMobile: state => state.global.isMobile
    })
  }
}
</script>

<style lang="scss" scoped>
.archive {
  &-wrap {
    width: $part-width-size;
    min-width: $part-width-size;
  }
  &-main {
    display: flex;
    padding: 0.857rem;
    flex-direction: column;
    justify-content: flex-start;

    .archive-head {
      display: flex;
      padding: 0.857rem 0;
      text-align: center;
      flex-direction: column;
      justify-content: center;
      border-bottom: 0.071rem solid $border-frame;

      .head {
        &-icon {
          .icon {
            width: 2.25em;
            height: 2.25em;
          }
        }

        &-name {
          font-size: $size-5;
          margin: 0.286rem 0;
          font-weight: $weight-bold;
        }
      }
    }

    .archive-list {
      .list-content {
        li + li {
          margin-top: 0.571rem;
        }

        h2,
        h4 {
          color: #363636;
          font-weight: $weight-semibold;
          line-height: 1.125rem;
        }

        h2 {
          font-size: 1.75rem;
          margin-bottom: 0.5714rem;
        }

        h4 {
          font-size: 1.25rem;
          margin-bottom: 0.8rem;
        }

        ul {
          list-style: none outside;
          margin-top: 1rem;
        }

        ul ul {
          list-style-type: none;
          margin-left: 2rem;
          margin-top: 0.714rem;
        }

        ul ul ul {
          list-style-type: disc;
        }

        .parent-child {
          .child-three {
            .three {
              &-date {
                display: inline-block;
                font-size: 0.714rem;
                color: $secondary-text-color;
              }
              &-link {
                display: inline-block;
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
  }
}

// 移动端样式
.mobileArch {
  &-wrap {
    width: auto;
    min-width: auto;
    color: $secondary-text-color;
    background-color: var(--white-bis);
  }
}
</style>
