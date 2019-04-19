<template>
  <Header class="layout-header">
    <Menu mode="horizontal"
          :theme="themes"
          active-name="1">
      <Row type="flex"
           justify="center">
        <Col span="4">
        <div class="nav-left">
          <div class="logo">iKmoon's Blog</div>
        </div>
        </Col>
        <Col span="20">
        <nav class="nav-right">
          <MenuItem name="1">
          <Icon type="ios-paper" />
          待定内容
          </MenuItem>
          <MenuItem name="2">
          <Icon type="ios-people" />
          待定内容
          </MenuItem>
          <MenuItem name="3">
          <Icon type="ios-construct" />
          待定内容
          </MenuItem>
        </nav>
        </Col>
      </Row>
    </Menu>
  </Header>
</template>

<script>
export default {
  name: "NavHeader", //便于调试，有名字组件的话更友好的警告信息
  data() {
    return {
      themes: "light"
    };
  }
};
</script>

<style lang="scss" scoped>
.layout-header{
  background-color:#FFFFFF;
  height: 60px;
  border-bottom: 1px solid #dcdee2;
}
.logo{
  font-size:25px;
  font-weight:bold;
  float:left;
  color:#41b883;
}
.nav-right {
  float:right;
  line-height:58px;
}
</style>




