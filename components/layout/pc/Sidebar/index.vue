<template>
  <div class="aside">
    <aside-hot :list="hotArtList" />
    <affix>
      <aside-catg v-show="noChildPage" />
      <aside-tag :list="tagList" />
    </affix>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AsideHot from './Aside/asideHot';
import AsideCatg from './Aside/asideCatg';
import AsideTag from './Aside/asideTag';
import Affix from '@/components/common/Affix';

export default {
  name: 'VAside',
  components: {
    AsideHot,
    AsideCatg,
    AsideTag,
    Affix
  },
  computed: {
    ...mapState({
      hotArtList: state => state.articles.hot.hotArtList,
      tagList: state => state.tags.list.tagList
    }),
    noChildPage () {
      return ['archive', 'article-id', 'catg-name', 'tags-name'].includes(this.$route.name);
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  width: 304px;
  min-width: 304px;
  margin-left: 1.143rem;
}
</style>
