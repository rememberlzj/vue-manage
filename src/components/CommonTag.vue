<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "CommonTag",
  computed: {
    //引入vuex中tabList列表
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    // 点击相应的tag实现页面切换
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    //关闭tag时触发的函数
    handleClose(tag, index) {
      //length为关闭后，剩余tag的长度
      const length = this.tags.length - 1;
      //关闭当前tag标签
      this.close(tag);
      //判断当前点击的tag标签是否为活跃页面
      if (tag.name !== this.$route.name) {
        return;
      }
      //如果点击的为活跃页面，router向左边移动一格
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
        //如果点击的不是活跃页面，router为原页面
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>