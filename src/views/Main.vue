<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <common-header></common-header>
        </el-header>
        <!-- tag页面跳转功能区域 -->
        <common-tag />
        <el-main>
          <!-- main主要内容区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonTag from "../components/CommonTag.vue";

export default {
  name: "Home",
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>
<style lang="less" scoped>
.el-header {
  height: 49px;
  background: rgb(75, 75, 75);
}
.el-main {
  background-color: #eee;
}
</style>