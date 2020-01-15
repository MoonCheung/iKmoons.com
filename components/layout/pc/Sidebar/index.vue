<template>
  <div class="aside"
       v-if="!isMobile">
    <aside-hot :list="hotArtList" />
    <affix>
      <aside-catg v-if="noChildPage" />
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
      tagList: state => state.tags.list.tagList,
      isMobile: state => state.global.isMobile
    }),
    noChildPage () {
      return ['archive', 'article-id', 'catg-name', 'tags-name'].includes(this.$route.name);
    }
  }
}
</script>

<style lang="scss" scoped>
.aside {
  width: $side-width-size;
  min-width: $side-width-size;
  margin-left: $spacing-evenSize * 8;
}
</style>
