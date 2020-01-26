<template>
  <div :class="[isMobile? 'mobileAbout-wrap':'about-wrap']">
    <div class="about-main">
      <div class="about-info">
        <header class="info-head">
          <img class="info-image"
               src="https://static.ikmoons.com/头像.png"
               alt="head portrait" />
          <p class="info-name">{{about.name}}</p>
        </header>
        <div class="info-middleLine">
          <h2 class="middleLine-text">关于我</h2>
        </div>
        <div class="info-wrap">
          <ul class="info-list">
            <li>
              <i class="info-icon">
                <svg-icon class="me"
                          name="me" />
              </i>
              <span class="info-desc">{{about.desc}}</span>
            </li>
            <li>
              <i class="info-icon">
                <svg-icon class="hobby"
                          name="love" />
              </i>
              <span class="info-desc">
                <span v-for="(item,index) in about.hobby"
                      :key="index">{{item.name}}</span>
              </span>
            </li>
            <li>
              <i class="info-icon">
                <svg-icon class="tech"
                          name="maintain" />
              </i>
              <span class="info-desc">
                <span v-for="(item,index) in about.skill"
                      :key="index">{{item.name}}</span>
              </span>
            </li>
            <li>
              <i class="info-icon">
                <svg-icon class="tag"
                          name="tag" />
              </i>
              <span class="info-desc">
                <span v-for="(item,index) in about.tags"
                      :key="index">{{item.name}}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="about-chart">
        <img class="chart-image"
             src="http://ghchart.rshah.org/MoonCheung"
             alt="My github chart" />
      </div>
    </div>
    <aside class="about-aside">
      <div class="about-con">
        <div class="con-middleLine">
          <h2 class="middleLine-head">联系我</h2>
        </div>
        <div class="con-wrap">
          <ul class="con-list">
            <li class="con-item">
              <a class="con-link"
                 href="mailto:salvador23@163.com">
                <svg-icon name="email" />
              </a>
            </li>
            <li class="con-item">
              <a class="con-link"
                 target="_blank"
                 href="https://github.com/MoonCheung">
                <svg-icon name="github" />
              </a>
            </li>
            <li class="con-item">
              <a class="con-link"
                 target="_blank"
                 href="https://juejin.im/user/57df412ba0bb9f0058a3f23a">
                <svg-icon name="juejin" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { constant } from '@/config/app.config'

export default {
  name: 'About',
  data () {
    return {
      about: constant.about
    }
  },
  head () {
    return {
      title: "关于"
    }
  },
  computed: {
    ...mapState({
      isMobile: state => state.global.isMobile
    })
  }
}
</script>

<style lang="scss" scoped>
.about {
  &-wrap {
    width: $width-size;
    min-width: $width-size;
    color: $secondary-text-color;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    // 两边横线中间文字效果
    @include middleText();
  }

  &-main {
    flex: 1 0;
    display: flex;
    flex-direction: column;

    .about-info {
      background-color: var(--white-bis);
      padding: 1.429rem 1.143rem 0 1.143rem;
      margin-bottom: 1rem;

      .info {
        &-head {
          text-align: center;

          .info-image {
            width: 18%;
            border-radius: 50%;
            border: 0.286rem solid $border-frame;
          }
          .info-name {
            margin: 0.714rem 0;
            font-weight: $weight-bold;
          }
        }

        &-wrap {
          .info-list {
            list-style: none;

            & > li {
              margin: 0.857rem 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;

              .info-icon {
                align-self: center;
                display: inline-flex;
                margin-right: 0.714rem;

                & > .icon {
                  width: 1.25em;
                  height: 1.25em;
                }

                & > .me {
                  color: var(--cyan);
                }
                & > .hobby {
                  color: var(--red);
                }
                & > .tech {
                  color: var(--turquoise);
                }
                & > .tag {
                  color: var(--green);
                }
              }

              .info-desc {
                flex: 1 0 0;
                user-select: none;
                font-weight: $weight-normal;
              }
            }
          }
        }
      }
    }

    .about-chart {
      background-color: var(--white-bis);
      padding: 1.429rem 1.143rem;

      & > .chart-image {
        width: 100%;
      }
    }
  }

  &-aside {
    flex: 0 0 320px;
    margin-left: 1.143rem;

    .about-con {
      background-color: var(--white-bis);
      padding: 1.429rem 1.143rem 1.143rem 1.143rem;

      .con {
        &-wrap {
          .con-list {
            padding-top: 0.571rem;
            list-style: none;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            .con-item {
              margin: 0 0.714rem;

              .con-link {
                display: inline-flex;
                .icon {
                  width: 1.5em;
                  height: 1.5em;
                }
              }
            }
          }
        }
      }
    }
  }
}

// 移动端样式
.mobileAbout {
  &-wrap {
    color: $secondary-text-color;
    display: flex;
    padding: 0 $spacing-evenSize * 6;
    flex-direction: column;
    justify-content: flex-start;

    // 两边横线中间文字效果
    @include middleText();

    .about-main {
      .about-chart {
        padding: $spacing-evenSize * 4;
        margin-bottom: 1rem;
      }
    }

    .about-aside {
      flex-basis: 0;
      margin-left: 0;
    }
  }
}
</style>
