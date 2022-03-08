<template>
  <div class="user">
    <!-- 点击新增时弹出的dislog，属性的内容 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
    <!-- 将封装好的form表单添加到弹窗中 -->
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <!-- 弹窗添加操作按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 创建 ‘新增’ 以及 ‘搜索’ 功能 -->
    <div class="mange-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form
        :formLabel="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <!-- 
      Table表格组件
        - :tableData="tableData"：给子组件CommonTable传递表格数据
        - :tableLabel="tableLabel"：给子组件CommonTable传递表格列名结构
        - @changePage：接收CommonTable子组件发送的changePage事件，获取当前用户点击的页数
        - @edit="editUser":接收CommonTable子组件发送的编辑表格事件
        - @del="delUser":接受CommonTable子组件发送的删除表格事件
     -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";

import { getUser } from "../../api/data";

export default {
  name: "user",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      //编辑dislog弹出框的属性
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      //弹出框数据对象的绑定
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
    };
  },
  methods: {
    //点击dislog中的确定时，实现的操作
    confirm() {
      //判断operateType，edit为对数据进行编辑
      if (this.operateType === "edit") {
        //眺转到api/mock中对应的地点，调用相应的函数
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
        //如果时add，就增加一组数据
      } else {
        //眺转到api/mock中对应的地点，调用相应的函数
        this.$http.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
          // console.log(res);
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      //使用 添加的功能时，要重置表单中的数据内容，使其为空
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    editUser(row) {
      // 设置弹窗类型为编辑
      this.operateType = "edit";
      // 显示表单弹窗
      this.isShow = true;
      // 将子组件表格内容传入父组件表单
      this.operateForm = row;
    },
    delUser(row) {
      // 插入MessageBox弹框控件
      this.$confirm("此操作将永久删除该组件,是否继续", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warnimg",
      }).then(() => {
        // 1.请求删除接口，将id作为参数传给接口。删除数据
        let id = row.id
        // 此处是传递到mock.js中的/user/del
        this.$http.get("/user/del", {
            params: { id },
          })
          .then(() => {
            // 2.处理删除接口返回的数据
            this.$message({
              type: "success",
              message: "删除成功"
            })
            //刷新表格数据
            this.getList()
          });
      });
    },
    // 请求table表格数据，同时也具有刷新表格数据的功能
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ""
      //眺转和使用mock.js中的/user/getUser
      getUser({
          page: this.config.page,
          name
      }).then(({ data: res }) => {
        // 请求接口返回的数据赋值给tableData
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item
        })
          this.config.total = res.count,
          this.config.loading = false
      });
    },
  },
  //在页面加载时就刷新表格数据
  created() {
    //刷新表格数据的函数
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.mange-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>