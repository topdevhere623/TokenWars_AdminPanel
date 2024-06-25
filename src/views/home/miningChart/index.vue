<template>
  <div class="mining-chart report-public-content">
    <div class="report-public-header">
      <h2>{{ $t('report.miningUser') }}</h2>
      <el-select
        v-model="day"
        :placeholder="$t('public.select')"
        class="public-select-box"
        popper-class="public-select-box"
        @change="dayChangeFun"
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
    <div class="mining-chart-content">
      <p class="mining-chart-content-title colorSeven">
        {{ $t('report.miningUser') }}
      </p>
      <div
        id="miningChart"
        v-loading="loading"
        :element-loading-text="$t('public.noData')"
        :class="{ 'miningChart-loading': loading }"
      ></div>
    </div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';

import { options } from '../day';
export default {
  name: 'MiningChart',
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      options: options,
      day: 7,
      container: null,
      timer: null,
      chartDataShow: [],
      loading: false,
    };
  },
  // 方法
  methods: {
    dayChangeFun() {
      this.mainChartDataRegTotalApi();
    },
    clearTimerFun() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    chartFun() {
      const { container, chartDataShow } = this;
      if (chartDataShow.length < 1) return;
      if (container) {
        this.container.clear();
      } else {
        this.container = new Chart({
          container: 'miningChart',
          autoFit: true,
          height: 220,
        });
      }
      const chart = this.container;
      chart.coordinate('theta', {
        radius: 0.75,
      });
      chart.data(chartDataShow);
      chart.scale('percent', {
        formatter: (val) => {
          val = val * 100 + '%';
          return val;
        },
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart
        .interval()
        .adjust('stack')
        .position('count')
        .color('item')
        .label('count', (val) => {
          const opacity = val > 0 ? 1 : 0;
          return {
            offset: '-30%',
            autoRotate: false,
            style: {
              opacity,
              fill: '#424952',
              textAlign: 'center',
              fontSize: 13,
              shadowBlur: 1,
              shadowColor: 'rgba(0, 0, 0, .45)',
            },
          };
        })
        .tooltip('item*count', (item, count) => {
          return {
            name: item,
            value: count,
          };
        });

      chart.interaction('element-active');
      chart.render();
    },
    async mainChartDataRegTotalApi() {
      this.clearTimerFun();
      const { day } = this;
      const res = await this.$http.mainChartDataRegTotal({ day });
      if (res) {
        const { mpNumber = 0, mpNewNumber = 0 } = res;
        const oldUsers = Number(Number(mpNumber) - Number(mpNewNumber));
        if (mpNewNumber < 1 && oldUsers < 1) {
          this.loading = true;
          const { container } = this;
          if (container) {
            this.container.clear();
          }
          return;
        } else {
          this.loading = false;
        }
        this.chartDataShow = [
          {
            item: this.$t('report.mpNewNumber'),
            count: Number(mpNewNumber),
            // percent: Object.proportion(res.mpNewNumber, res.mpNumber),
          },
          {
            item: this.$t('report.oldUsers'),
            count: oldUsers,
            // percent: Object.proportion(
            //   res.mpNumber - res.mpNewNumber,
            //   res.mpNumber
            // ),
          },
        ];
        this.timer = setTimeout(() => {
          this.chartFun();
        }, 100);
      }
    },
  },
  // 创建后
  created() {
    this.mainChartDataRegTotalApi();
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {
    this.clearTimerFun();
  },
};
</script>

<style lang="scss" scoped>
.mining-chart {
  min-width: 423px;
  width: 33%;
  height: 423px;
  // margin-left: 10px;
}
.mining-chart-content {
  width: 373px;
  height: 266px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  position: relative;
}
.mining-chart-content-title {
  font-size: 18px;
  line-height: 40px;
  text-align: center;
}
.miningChart-loading {
  height: 220px;
}
</style>
<style lang="scss">
.mining-chart-content {
  .el-loading-spinner .el-loading-text {
    color: #777;
  }
  .el-loading-spinner .path {
    stroke: #777;
  }
}
#miningChart {
  .el-loading-mask {
    z-index: 10 !important;
  }
}
</style>
