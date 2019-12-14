<template>
  <div class="aside">
    <aside-hot />
    <affix>
      <aside-catg v-show="noChildPage" />
      <aside-tag />
    </affix>
  </div>
</template>

<script>
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
    noChildPage () {
      return ['archive', 'article-id', 'catg-id'].includes(this.$route.name);
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
