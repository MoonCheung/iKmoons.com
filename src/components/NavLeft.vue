<template>
  <Sider :style="{background: bg ,
                  maxWidth: maxWid, 
                  width: wid,
                  height: hg}">
    <Menu active-name="1"
          width="auto"
          :open-names="['1']"
          accordion>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-analytics" />
          控制面板
        </template>
        <MenuItem name="1-1">
        <Icon type="ios-analytics" />
        系统概览
        </MenuItem>
        <MenuItem name="1-2">
        <Icon type="ios-analytics" />
        发布文章
        </MenuItem>
        <MenuItem name="1-3">
        <Icon type="ios-analytics" />
        文章列表
        </MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-analytics" />
          版本控制
        </template>
        <MenuItem name="2-1">
        <Icon type="ios-analytics" />
        发布版本
        </MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-analytics" />
          评论管理
        </template>
        <MenuItem name="3-1">
        <Icon type="ios-analytics" />
        评论列表
        </MenuItem>
      </Submenu>
    </Menu>
  </Sider>

</template>

<script>
export default {
  name: "NavLeft",
  data() {
    return {
      bg: "#fff",
      maxWid: "220px",
      wid: "220px",
      // br: "1px solid #dcdee2",
      hg: "100%"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>

