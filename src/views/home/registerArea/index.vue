<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title-box">
        <h3>Registered area</h3>
        <el-select
          v-model="day"
          :placeholder="$t('public.select')"
          @change="getDataList"
          style="width: 135px"
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
    <div class="report-table-box">
      <div id="container-register"></div>
    </div>
  </el-card>
</template>

<script>
import { Pie, Bar } from "@antv/g2plot";
import { options } from "../day";
export default {
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      dataList: [],
      options: options,
      day: "SEVEN",
      bar: null,
      piePlot: null,
    };
  },
  // 方法
  methods: {
    async getDataList() {
      const res = await this.$http.getHomeRegionChart({
        timeLimit: this.day,
        userType: this.$store.getters.accountConfig || "",
      });
      if (res) {
        this.dataList = res.map((x) => {
          x.type = `${x.country || "other"}:${x.registerNum}`;
          return x;
        });
        this.chartFun();
      }
    },
    chartFun() {
      const data = this.dataList;
      if (this.piePlot) {
        this.piePlot.destroy();
      }
      this.piePlot = new Pie("container-register", {
        appendPadding: 10,
        data,
        angleField: "registerNum",
        colorField: "type",
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: "inner",
          offset: "-50%",
          style: {
            textAlign: "center",
            fontSize: 14,
          },
        },
        interactions: [{ type: "element-selected" }, { type: "element-active" }],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
            content: "Registered area",
          },
        },
        tooltip: {
          customContent: (title, items) => {
            if (items && items[0]) {
              let data = items[0].data;
              return `
                <div class="tool-tip">
                  <p class="tool-tip-title"><i style="background:${items[0].color}"></i>${
                data.country || "other"
              }</p>
                  <ul>
                    <li>
                      <p class="label">register:</p>
                      <p class="label">${data.registerNum}</p>
                    </li>
                    <li>
                      <p class="label">Log in:</p>
                      <p class="label">${data.loginNum}</p>
                    </li>
                    <li>
                      <p class="label">top up:</p>
                      <p class="label">${data.rechargeAmount}</p>
                    </li>
                    <li>
                      <p class="label">Consumption:</p>
                      <p class="label">${data.consumeAmount}</p>
                    </li>
                  </ul>
                </div>
            `;
            }
          },
        },
      });
      this.piePlot.render();
    },
  },
  // 创建后
  created() {},
  // 挂载后
  mounted() {
    this.getDataList();
  },
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.report-table-box {
  min-height: 300px;
}
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep {
  .tool-tip {
    width: 160px;
    .tool-tip-title {
      display: flex;
      align-items: center;
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
