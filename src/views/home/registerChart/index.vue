<template>
  <el-card class="register-chart">
    <div slot="header" class="clearfix">
      <div class="report-public-header">
        <h3>registered user</h3>
        <el-select
          v-model="day"
          :placeholder="$t('public.select')"
          style="width: 135px"
          popper-class="public-select-box"
          @change="mainChartDataRegTotalApi"
        >
          <el-option
            v-for="item in options"
            :key="`${item.key}-${item.value}`"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="report-public-content">
      <div id="container-funnel" class="funnel-chart-container"></div>
    </div>
  </el-card>
</template>

<script>
import { Funnel } from "@antv/g2plot";

import { options } from "../day";

export default {
  name: "RegisterChart",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      options: options,
      day: "SEVEN",
      sortedMap: [
        { key: "registerNum", title: "Number of registers" },
        { key: "rechargeNum", title: "Number of recharge" },
        { key: "consumeNum", title: "Number of consumers" },
      ],
      dataList: [],
      plot: null,
    };
  },
  // 方法
  methods: {
    chartFun() {
      if (this.plot) {
        this.plot.destroy();
      }
      const data = this.dataList;

      this.plot = new Funnel("container-funnel", {
        data: data,
        xField: "title",
        yField: "count",
        conversionTag: {
          formatter: (value, datum) => {
            if (value.key == "consumeNum") {
              return `Registration-Consumption conversion rate:${value.consumeNumProportion.toFixed(
                2
              )}%`;
            } else if (value.key == "rechargeNum") {
              return `Register-recharge conversion rate:${value.rechargeProportion.toFixed(
                2
              )}%`;
            }
          },
        },
      });

      this.plot.render();
    },
    clearTimerFun() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    async mainChartDataRegTotalApi() {
      const res = await this.$http.getHomeRegisteredUserChart({
        timeLimit: this.day,
        userType: this.$store.getters.accountConfig || "",
      });
      if (res) {
        this.dataList = this.sortedMap.map((x) => {
          return { ...x, count: res[x.key], ...res };
        });
        this.chartFun();
      }
    },
  },
  // 创建后
  created() {},
  // 挂载后
  mounted() {
    this.mainChartDataRegTotalApi();
  },
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {
    this.clearTimerFun();
  },
};
</script>

<style lang="scss" scoped>
.register-chart-content {
  display: flex;
  position: relative;
  width: 100%;
  height: 350px;
}
.register-chart-number {
  min-width: 450px;
  width: calc(100% - 220px - 22.5%);
  position: absolute;
  top: 0;
  left: 0;
}
.number-list {
  height: 80px;
  font-size: 14px;
  padding: 20px;
  color: #333;
  margin-bottom: 1px;
  line-height: 20px;
  display: flex;
  :last-child {
    margin-bottom: 0;
  }
}
.register-list {
  background-color: rgba(109, 156, 252, 0.3);
}
.add-list {
  background-color: rgba(109, 227, 180, 0.3);
}
.card-list {
  background-color: rgba(123, 143, 179, 0.3);
}
.register-chart-container {
  position: absolute;
  top: 0;
  right: calc(200px + 20px);
  min-width: 300px;
  width: 45%;
}

.register-chart-percent {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 14px;
  font-weight: 600;
  width: 200px;
  color: #333;
}
.percent-text {
  position: absolute;
  // left: 10px;
  max-width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    height: 1px;
    width: 20px;
    background-color: #333333;
    margin-right: 5px;
  }
}
.percent-text-one {
  top: 72px;
  left: -5px;
}
.percent-text-two {
  top: 153px;
  left: -30px;
}
</style>
<style>
.funnel-chart-container canvas {
  background: #ccc !important;
}
</style>
