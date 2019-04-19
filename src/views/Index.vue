<template>
  <Layout class="layout">
    <nav-header></nav-header>
    <Layout>
      <Row type="flex"
           justify="space-between">
        <Col span="3">
        <nav-left></nav-left>
        </Col>
        <Col span="21">
        <!-- <Layout> -->
        <!-- <router-view></router-view> -->
        <Breadcrumb :style="{margin: '10px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Content :style="{padding: '24px', height: '100vh', background: '#fff'}">
          Content
        </Content>
        <!-- </Layout> -->
        </Col>
      </Row>
    </Layout>

  </Layout>
</template>

<script>
import NavHeader from "@/components/NavHeader";
import NavLeft from "@/components/NavLeft";

export default {
  name: "Index",
  components: {
    NavHeader,
    NavLeft
  }
};
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  overflow: hidden;
  height: 100vh
}
</style>




