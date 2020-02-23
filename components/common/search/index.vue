<template>
  <div class="navbar-search">
    <div class="control has-icons-right">
      <input class="input"
             type="text"
             ref="searchInput"
             v-model.trim="keyName"
             placeholder="搜索文章"
             @keyup.enter="onChangeSearch" />
      <span v-if="isSearch"
            class="search-icon"
            @click.stop="onChangeSearch">
        <svg-icon name="search" />
      </span>
      <span v-else
            class="search-icon"
            @click.stop="onCloseSearch">
        <svg-icon name="close" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      keyName: ''
    }
  },
  props: {
    isSearch: {
      type: Boolean,
      required: true
    }
  },
  // 侦听器
  watch: {},
  // 该方法被混入实例当中
  methods: {
    onChangeSearch () {
      if (!this.keyName) {
        return;
      }
      this.$router.push(`/search/${this.keyName}`);
      this.keyName = "";
    },
    onCloseSearch () {
      const searchMap = this.$refs.searchInput;
      this.$parent.$emit('onCloseSearch', [searchMap]);
    }
  },
  // 实例销毁之前调用
  beforeDestroy () {
    this.onChangeSearch()
  }
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
        background-color: var(--grey-lightest);
        padding-bottom: calc(0.5em - 1px);
        padding-left: calc(0.75em - 1px);
        padding-right: calc(2em - 1px);
        padding-top: calc(0.5em - 1px);
        border: 0.071rem solid transparent;
      }

      & > .input::placeholder {
        color: var(--grey-light);
      }

      & > .input:focus {
        background-color: $form-bg-color;
      }

      & > .search-icon {
        position: absolute;
        right: 0;
        width: 2em;
        height: 2.5em;
        cursor: pointer;
        pointer-events: auto;
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
