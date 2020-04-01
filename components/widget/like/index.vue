<template>
  <div class="art-fixed">
    <div class="fixed-widget"
         :class="[isLike? 'isliked' : '']"
         :badge="item.like"
         @click.stop.prevent="likeArtPage(item.id)">
      <i class="like-icon">
        <svg-icon name="like" />
      </i>
    </div>
    <div class="fixed-widget"
         :badge="itemLen"
         v-show="isWidget"
         @click.stop="scrollToComment">
      <i class="comment-icon">
        <svg-icon name="comment" />
      </i>
    </div>
    <div class="fixed-share">分享</div>
    <div class="fixed-share-widget"
         ref="refWeibo"
         @click.stop.prevent="onShareWeibo('weibo')">
      <i class="weibo-icon">
        <svg-icon name="weibo" />
      </i>
    </div>
    <div class="fixed-share-widget"
         ref="refWechat"
         @mousemove="onShareWechat('enter')"
         @mouseout="onShareWechat('outer')">
      <i class="weixin-icon">
        <svg-icon name="weixin" />
      </i>
      <img class="wechat-qr-code-img"
           v-show="isQrCode"
           alt="qrcode" />
    </div>
  </div>
</template>

<script>
import qrcode from 'qrcode-generator';

export default {
  name: 'Like',
  props: {
    item: {
      type: Object,
      default: () => { }
    },
    itemLen: {
      type: Number,
      default: 0
    },
    isLike: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isWidget: true,
      isQrCode: false
    }
  },
  methods: {
    // 点赞页面方法
    likeArtPage (e) {
      this.$parent.$emit('likeArtPage', e);
    },
    // 利用滚动到评论方法
    scrollToComment () {
      const artMain = this.$parent.$refs.artMain;
      const height = artMain.offsetHeight;
      const headerOffset = 45;
      const getClientRect = artMain.getBoundingClientRect().bottom;
      const offsetPosition = parseInt(getClientRect) - headerOffset;

      if (getClientRect < height) {
        const newHeight = height - getClientRect;
        const offsetRectPosition = newHeight + getClientRect + 20;

        try {
          window.scrollTo({
            top: offsetRectPosition,
            behavior: "smooth"
          });
        } catch (err) {
          if (err instanceof TypeError) {
            window.scroll(0, offsetRectPosition)
          } else {
            throw err
          }
        }
      } else {
        try {
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } catch (err) {
          if (err instanceof TypeError) {
            window.scroll(0, offsetPosition)
          } else {
            throw err
          }
        }
      }
    },
    // 微信分享方法
    onShareWechat (e) {
      const route = this.$route;
      const origin = window.location.origin;
      if (Object.is(e, 'enter')) {
        this.isQrCode = true;
        const typeNumber = 6;
        const errorCorrectionLevel = 'M';
        const refQrCode = this.$refs.refWechat;
        const imgChild = refQrCode.lastElementChild || refQrCode.lastChild;
        const qr = qrcode(typeNumber, errorCorrectionLevel);
        qr.addData(`${origin + route.path}`);
        qr.make();
        imgChild.src = qr.createDataURL();
      } else {
        this.isQrCode = false;
      }
    },
    // 微博分享方法
    onShareWeibo (e) {
      this.$parent.$emit('onShareWeibo', e);
    },
  }
}
</script>

<style lang="scss" scoped>
.art {
  &-fixed {
    position: fixed;
    z-index: 1;
    top: 12.4em;
    margin-left: -4.25em;

    .fixed {
      &-share {
        margin: 2rem 0 1rem;
        text-align: center;
        font-size: 0.857rem;
        color: $secondary-text-color;
        user-select: none;
      }

      &-widget,
      &-share-widget {
        position: relative;
        border-radius: 50%;
        width: 2.65em;
        height: 2.65em;
        cursor: pointer;
        text-align: center;
        color: $secondary-text-color;
        background-color: var(--white-bis);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);

        .like-icon,
        .comment-icon {
          display: block;
          height: 2.65em;
          line-height: 3.2em;

          & > .icon {
            width: 1.25em;
            height: 1.25em;
            color: $accent-color;

            &:hover{
              color: $accent-hover-color;
            }
          }
        }

        .weibo-icon,
        .weixin-icon {
          @extend .like-icon;

          & > .icon {
            width: 1.25em;
            height: 1.25em;
          }
        }
        .weibo-icon {
          &>.icon{
            --weibo-color-1:#9E9E9E;
            --weibo-color-2:#9E9E9E;
            --weibo-color-3:#9E9E9E;
            --weibo-color-4:#9E9E9E;

            &:hover {
              --weibo-color-1:#E71F19;
              --weibo-color-2:#F5AA15;
              --weibo-color-3:#F5AA15;
              --weibo-color-4:#040000;
            }
          }
        }

        .weixin-icon{
          &>.icon{
            --weixin-color: #9E9E9E;

            &:hover{
              --weixin-color: #24DB5A;
            }
          }
        }

        // 微信分享样式
        & > .wechat-qr-code-img {
          position: absolute;
          top: 100%;
          left: -85%;
          z-index: 1;
          margin-top: 1rem;
        }
      }

      &-widget:not(:last-of-type),
      &-share-widget:not(:last-of-type) {
        margin-bottom: 0.571rem;
      }

      &-widget::after {
        content: attr(badge);
        position: absolute;
        top: 0;
        left: 75%;
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
    }

    // 已点赞样式
    .isliked {
      .like-icon {
        & > .icon {
          color: var(--green);

          &:hover{
            color: var(--green);
          }
        }
      }
    }
    .isliked::after {
      color: #fff;
      background-color: var(--green);
    }
  }
}
</style>
