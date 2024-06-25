<template>
  <div :id="id"></div>
</template>

<script>
import { Line } from "@antv/g2plot";
export default {
  name: "ReportChart",
  // 模板引入
  components: {},
  props: {
    dataList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    id: {
      type: String,
      required: true,
    },
    tooltip: {
      required: false,
      default: null,
    },
  },
  // 数据
  data() {
    return {
      container: null,
      linePlot: null,
    };
  },
  // 方法
  methods: {
    chartFun() {
      const { container, dataList, id } = this;
      if (dataList.length < 1 && !id) return;
      const data = dataList;
      if (container) {
        this.container.clear();
      } else {
        if (this.linePlot) {
          this.linePlot.destroy();
        }
        let lineOptions = {
          forceFit: true,
          data,
          xField: "time", // x轴字段
          yField: "value", // y轴字段
          yAxis: {
            label: {
              // 数值格式化为千分位
              formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
          },
          seriesField: "type", // 数据系列字段
          legend: true, // 是否展示图例
          smooth: true, // 是否平滑连接点
          responsive: true,
        };
        if (this.tooltip) {
          lineOptions.tooltip = this.tooltip;
        }
        // 创建折线图实例
        this.linePlot = new Line(id, lineOptions);

        // 渲染图表
        this.linePlot.render();
      }
    },
  },
  // 创建后
  created() {},
  // 挂载后
  mounted() {
    this.$nextTick(() => {
      this.chartFun();
    });
  },
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
  watch: {
    dataList: {
      deep: true,
      handler: function (newData) {
        if (newData.length > 0) {
          this.$nextTick(() => {
            this.chartFun();
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.reportChart {
  padding: 10px 10px 20px 20px;
  background-color: #fff;
  border: 1px solid #c6c6c6;
}
::v-deep {
  .tool-tip {
    width: 160px;
    .tool-tip-title {
      display: flex;
      align-items: center;
      // justify-content: center;
      margin-top: 12px;
      i {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
      }
    }
    li {
      display: flex;
      margin: 12px 0;
      font-size: 14px;
    }
  }
}
</style>
