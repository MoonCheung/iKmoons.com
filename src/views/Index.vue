<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png" />
    <div>{{ name }}</div>
  </div>
</template>

<script>
// @是/src的别名

export default {
  name: "Index",
  components: {},
  data() {
    return {
      name: "hello 安装iview成功"
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

