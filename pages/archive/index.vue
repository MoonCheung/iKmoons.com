<template>
  <div class="archive-wrap">
    <div class="archive-main">
      <header class="archive-head">
        <i class="head-icon">
          <svg-icon name="record" />
        </i>
        <div class="head-name">归档</div>
        <div class="head-count">目前共计&nbsp;25&nbsp;篇文章</div>
      </header>
      <article class="archive-list">文章列表</article>
    </div>
  </div>
</template>

<script>

export default {
  name: "Archive"
}
</script>

<style lang="scss" scoped>
.archive {
  &-wrap {
    width: 760px;
    min-width: 760px;

    .archive-main {
      display: flex;
      padding: 0.714rem;
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
      // TODO: 暂时写文章列表样式
      // .archive-list {}
    }
  }
}
</style>
