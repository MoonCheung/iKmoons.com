<template>
  <aside class="aside">
    <div class="aside-one">我是侧边栏</div>
  </aside>
</template>

<script>
export default {
  name: 'VSidebar'
}
</script>

<style lang="scss" scoped>
.aside {
  width: 304px;
  min-width: 304px;
  margin-left: 1.143rem;
  background-color: blue;
  &-one {
    color: #fff;
  }
}
</style>
