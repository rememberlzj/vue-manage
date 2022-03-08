<template>
  <div class="common-table">
    <!-- stripe：斑马纹显示表格 -->
    <el-table :data="tableData" height="90%" stripe v-loading="config.loading">
      <!-- - show-overflow-tooltip:超出一行的内容点点点显示 -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
        <el-button size="mini" @click="handelEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handelDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 设置分页
        - :total="config.total":设置总页数
        - :current-page.sync="config.page"：设置当前页数
        - @current-change：绑定当前页事件，获取用户选择的页数
      -->
    <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  // 接收父组件传来的数据
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {};
  },
  methods: {
     // 向父组件传入编辑事件
    handelEdit(row) {
      this.$emit("edit", row);
    },
     // 向父组件传入删除事件
    handelDelete(row) {
      this.$emit("del", row);
    },
    //改变当前页数时，向父组件发送当前页数
    changePage(page) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scoped>
.common-table {
  height: 700px;
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0px;
    right: 20px;
  }
}
</style>