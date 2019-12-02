<template>
  <div>
    <v-navbar />
    <nuxt />
    <v-footer />
  </div>
</template>

<script>
import VNavbar from './Navbar/index';
import VFooter from './Footer/index';
// import VSidebar from './Sidebar/index';

export default {
  name: 'PcIndex',
  components: {
    VNavbar,
    VFooter,
    // VSidebar
  }
}
</script>
