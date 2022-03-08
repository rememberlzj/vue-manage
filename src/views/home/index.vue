<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="user-info">
            <p class="name">Adminc</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-2-28</span></p>
          <p>上次登录地点：<span>浙江</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px; height: 470px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLable"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col style="margin-top: 20px" :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="'el-icon-' + item.icon"
            :style="{ background: item.color }"
          >
          </i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px; margin-bottom: 20px">
        <echart :chartData="echartData.order" style="height: 280px"/>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px; margin-right: 20px">
          <echart :chartData="echartData.user" style="height: 240px"/>
        </el-card>
        <el-card style="height: 260px">
          <echart :chartData="echartData.video" :isAxisChart="false" style="height: 240px"/>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";
import Echart from "../../components/ECharts.vue";

export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../assets/01.webp"),
      tableData: [],
      tableLable: {
        name: "手机品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      console.log(res);
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
            // smooth: true
          });
        });

        //折线图
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        //柱状图
        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map(item => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map(item => item.active),
              type: "bar",
            },
          ]

        //饼图
        this.echartData.video.series = [
            {
              data: data.videoData,
              type: "pie",
            },
          ]
      }
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    // float: left;
  }
  .user-info {
    .name {
      font-size: 36px;
      padding: 10px 30px 0px;
      margin: 0;
    }
    .access {
      padding: 10px 30px;
      margin: 0;
      color: rgb(148, 148, 148);
    }
  }
}
.login-info p {
  font-size: 14px;
  color: rgb(148, 148, 148);
}
.login-info span {
  padding-left: 20px;
}

.num {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  .el-card {
    width: 350px;
    margin-bottom: 20px;
  }
  .icon {
    display: flex;
    width: 90px;
    height: 90px;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 36px;
  }
  .detail {
    margin-left: 20px;
    .num {
      font-size: 28px;
      margin: 10px 0px;
      font-weight: 500;
    }
    .txt {
      margin: 10px 0px;
      font-size: 14px;
      color: rgb(167, 167, 167);
    }
  }
}
.graph {
  display: flex;
  .el-card {
    flex: 1;
  }
}
</style>