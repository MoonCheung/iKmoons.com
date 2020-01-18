<template>
  <div>
    <pc-index v-if="!isMobile" />
    <mobile-index v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PcIndex from '@/components/layout/pc/index';
import MobileIndex from '@/components/layout/mobile/index';

export default {
  components: {
    PcIndex,
    MobileIndex
  },
  computed: {
    ...mapState({
      isMobile: state => state.global.isMobile
    })
  }
}
</script>


