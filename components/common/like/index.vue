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
  </div>
</template>

<script>
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
      isWidget: true
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
    }
  }
}
</script>

<style lang="scss" scoped>
.art {
  &-fixed {
    position: fixed;
    top: 12.4em;
    margin-left: -4.25em;

    .fixed {
      &-widget {
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
          display: inline-block;
          height: 2.65em;
          line-height: 3.2em;

          & > .icon {
            width: 1.25em;
            height: 1.25em;
            color: $accent-color;
          }
        }
      }
      &-widget:not(:last-of-type) {
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
