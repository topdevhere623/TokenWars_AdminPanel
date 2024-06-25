<template>
  <el-card>
    <div slot="header" class="header-box">
      <div class="title-box">
        <h3>订单统计</h3>
      </div>
      <div class="time-box">
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          @change="getDataList"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          style="width: 100%"
        >
        </el-date-picker>
      </div>
    </div>
    <div id="container-bar"></div>
  </el-card>
</template>

<script>
import { Bar } from "@antv/g2plot";
export default {
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      sortedMap: [
        { type: "总盈利", key: "totalProfit" },
        { type: "总佣金", key: "totalRebates" },
        { type: "总返奖", key: "totalReal" },
        { type: "总消费", key: "totalBuy" },
        { type: "总订单", key: "count" },
      ],
      dataList: [],
      dateTime: null,
      bar: null,
    };
  },
  // 方法
  methods: {
    chartFun() {
      const data = this.dataList;
      if (this.bar) {
        this.bar.destroy();
      }
      this.bar = new Bar("container-bar", {
        data,
        xField: "value",
        yField: "type",
        seriesField: "type",
        legend: {
          position: "top-left",
        },
      });

      this.bar.render();
    },
    async getDataList() {
      if (this.dateTime) {
        var [startDate, endDate] = this.dateTime;
      } else {
        var [startDate, endDate] = ["", ""];
      }
      const res = await this.$http.getHomeOrderChart({ startDate, endDate, userType: this.$store.getters.accountConfig || "" });
      if (res) {
        this.dataList = this.sortedMap.map((x) => {
          return { ...x, value: res[x.key] };
        });
        this.chartFun();
      }
    },
  },
  // 创建后
  created() {
    this.getDataList();
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.report-table-box {
  height: 100%;
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .time-box {
    width: 360px;
  }
}
</style>
