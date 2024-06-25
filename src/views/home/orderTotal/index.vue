<template>
  <el-card>
    <div slot="header" class="header-box">
      <div class="title-box">
        <h3>Order statistics</h3>
      </div>
      <div class="time-box">
        <el-date-picker
          v-model="dateTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          @change="getDataList"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="to"
          start-placeholder="start date"
          end-placeholder="Ending date"
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
            text: "The last week",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "The last month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "The last three months",
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
        { type: "Total profitability", key: "totalProfit" },
        { type: "Total commission", key: "totalRebates" },
        { type: "Total return", key: "totalReal" },
        { type: "Total consumption", key: "totalBuy" },
        { type: "General order", key: "count" },
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
      const res = await this.$http.getHomeOrderChart({
        startDate,
        endDate,
        userType: this.$store.getters.accountConfig || "",
      });
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
