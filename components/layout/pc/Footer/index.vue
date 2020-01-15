<template>
  <footer class="footer">
    <div class="container">
      <p class="foot-text">Copyright&nbsp;©&nbsp;{{getYearTime}}&nbsp;<a href="http://www.ikmoons.com"
           alt="My blog">MoonCheung</a>.保留所有权利</p>
      <p class="foot-text">Powered&nbsp;By&nbsp;<a href="https://zh.nuxtjs.org/"
           target="_blank"
           alt="Nuxt. Js's official website">Nuxt.js</a>，Designed&nbsp;By&nbsp;<a href="http://www.ikmoons.com"
           alt="My blog">MoonCheung</a></p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'VFooter',
  computed: {
    ...mapGetters({
      getYearTime: 'global/getYearTime'
    })
  }
}
</script>

<style lang="scss" scoped>
.footer {
  & > .container {
    margin: 0 auto;
    user-select: none;
    position: relative;

    & > .foot-text {
      color: $secondary-text-color;

      &:not(:last-of-type) {
        margin-bottom: $spacing-evenSize * 2;
      }
    }
  }
}
</style>
