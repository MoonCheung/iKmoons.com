<template>
  <div class="navbar-search">
    <div class="control has-icons-right">
      <input class="input"
             type="text"
             placeholder="搜索文章" />
      <span class="search-icon">
        <svg-icon name="search" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search'
}
</script>

<style lang="scss" scoped>
.navbar-search {
  flex: 0 0 240px;
  .control {
    position: relative;

    &.has-icons-right {
      & > .input {
        width: 100%;
        box-shadow: none;
        font-size: 1rem;
        height: 2.5em;
        line-height: 1.5em;
        border-radius: 0.143rem;
        background-color: $form-bg-color;
        padding-bottom: calc(0.5em - 1px);
        padding-left: calc(0.75em - 1px);
        padding-right: calc(2em - 1px);
        padding-top: calc(0.5em - 1px);
        border: 0.071rem solid transparent;
      }

      & > .search-icon {
        position: absolute;
        right: 0;
        width: 2em;
        height: 2.5em;
        pointer-events: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        & > .icon {
          color: $accent-color;
          font-size: 0.5rem;
        }
      }
    }
  }
}
</style>
