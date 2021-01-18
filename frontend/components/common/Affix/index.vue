<template>
  <div class="affix"
       :class="{'isFixed': fixed}"
       ref="sticty">
    <slot></slot>
  </div>
</template>

<script>
import { isBrowser } from '@/config/env.config';

export default {
  name: 'Affix',
  data () {
    return {
      fixed: false
    }
  },
  mounted () {
    if (isBrowser) {
      window.addEventListener('scroll', this.scrollToFixed, true)
    }
  },
  methods: {
    scrollToFixed () {
      const scrollTop = document.documentElement.scrollTop;
      const height = this.$parent.$children[0].$el.offsetHeight
      const headerOffset = 18;
      const offsetPosition = height + headerOffset;

      if (scrollTop >= offsetPosition) {
        this.fixed = true;
      } else {
        this.fixed = false;
      }
    }
  },
  // 实例销毁之前调用
  beforeDestory () {
    window.removeEventListener("scroll", this.scrollToFixed)
  }
}
</script>

<style lang="scss" scoped>
.affix {
  &.isFixed {
    position: fixed;
    top: 60px;
    width: 304px;
    max-width: 304px;
  }
}
</style>
