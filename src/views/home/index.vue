<template>
  <div class="report-box">
    <card></card>
    <dataChart class="mg" :typeList="goldFlowSearch" @change="changeTypeCash" :dataList="goldFlowDataList" defaultTime="TWENTYFOURHOUR">
      金流监测
    </dataChart>
    <dataChart class="mg" :typeList="dataDrawSearch" :dataList="dataDrawDataList" @change="changeTypeChart"> 数据图表 </dataChart>
    <dataChart class="mg" :typeList="retainedSearch" :dataList="retainedDataList" :tooltip="retainedChartTooltip" @change="changeTypeKeep">
      留存数据
    </dataChart>
    <div class="mg flex">
      <registerChart class="register-chart"></registerChart>
      <orderTotal class="order-total"></orderTotal>
      <registerArea class="register-area"></registerArea>
    </div>
    <div class="table-total-box">
      <rankNft class="sub-table"></rankNft>
      <rankRace class="sub-table"></rankRace>
      <rankArea class="sub-table"></rankArea>
    </div>
  </div>
</template>

<script>
import dataChart from "./dataChart";
import registerChart from "./registerChart";
import rankNft from "./rankNft";
import rankRace from "./rankRace";
import rankArea from "./rankArea";
import orderTotal from "./orderTotal";
import registerArea from "./registerArea";
import card from "./card";
export default {
  name: "Report",
  // 模板引入
  components: {
    dataChart,
    registerChart,
    card,
    rankNft,
    rankRace,
    rankArea,
    orderTotal,
    registerArea,
  },
  // 数据
  data() {
    return {
      goldFlowSearch: [
        { type: "BALANCE", name: "余额" },
        { type: "POINT", name: "积分" },
      ],
      goldFlowDataList: [],
      dataDrawSearch: [
        { type: "PEOPLES", name: "人数" },
        { type: "RECHARGE", name: "充值" },
        { type: "CONSUME", name: "消费" },
        { type: "REVENUE", name: "收入" },
        { type: "WITHDRAWALS", name: "提款" },
      ],
      dataDrawDataList: [],
      retainedSearch: [
        { type: "CILIU", name: "次留" },
        { type: "SEVEN", name: "7日" },
        { type: "FOURTEEN", name: "14日" },
        { type: "THIRTY", name: "30日" },
      ],
      coin: ["ETH", "USDT", "WETH", "OKT"],
      retainedDataList: [],
      retainedChartTooltip: null,
    };
  },
  computed: {
    userType() {
      return this.$store.getters.accountConfig || "";
    },
  },
  // 方法
  methods: {
    dataFormat(arrObj) {
      let allProperties = [];
      let arr = JSON.parse(JSON.stringify(arrObj));
      for (let i = 0; i < arr.length; i++) {
        let properties = Object.keys(arr[i]);
        allProperties = allProperties.concat(properties);
      }

      let uniqueProperties = Array.from(new Set(allProperties));

      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < uniqueProperties.length; j++) {
          let property = uniqueProperties[j];
          if (!arr[i].hasOwnProperty(property)) {
            arr[i][property] = 0;
          }
        }
      }
      return arr;
    },
    //金流监测
    async changeTypeCash(data) {
      let assetType = this.goldFlowSearch[0].type;
      let timeLimit = "TWENTYFOURHOUR";
      if (data) {
        assetType = data.type;
        timeLimit = data.day;
      }
      const res = await this.$http.getHomeCashFlowDetection({ assetType, timeLimit, userType: this.userType });
      if (res) {
        const formatRes = this.dataFormat(res);
        const newArray = [];
        formatRes.forEach((obj) => {
          for (let key in obj) {
            if (key !== "time") {
              const newObject = {
                type: key,
                value: obj[key],
                time: obj.time,
              };
              newArray.push(newObject);
            }
          }
        });
        this.goldFlowDataList = newArray;
      }
    },
    // 数据图表
    async changeTypeChart(data) {
      let type = this.dataDrawSearch[0].type;

      let timeLimit = "SEVEN";
      if (data) {
        type = data.type;
        timeLimit = data.day;
      }
      const res = await this.$http.getHomeDataChart({ type, timeLimit, userType: this.userType });
      if (res) {
        if (type == this.dataDrawSearch[0].type) {
          const newArray = [];
          res.forEach((obj) => {
            for (let key in obj) {
              if (key !== "time") {
                const newObject = {
                  type:
                    key === "recharge"
                      ? "充值"
                      : key === "consume"
                      ? "消费"
                      : key === "login"
                      ? "登录"
                      : key === "register"
                      ? "注册"
                      : key === "withdrawals"
                      ? "提款"
                      : "其他",
                  value: obj[key],
                  time: obj.time,
                };
                newArray.push(newObject);
              }
            }
          });
          this.dataDrawDataList = newArray;
        } else {
          const formatRes = this.dataFormat(res);
          const newArray = [];
          formatRes.forEach((obj) => {
            for (let key in obj) {
              if (key !== "time") {
                const newObject = {
                  type: key === "totalAmount" ? "总计" : key,
                  value: obj[key],
                  time: obj.time,
                };
                newArray.push(newObject);
              }
            }
          });
          this.dataDrawDataList = newArray;
        }
      }
    },
    // 留存数据
    async changeTypeKeep(data) {
      let retainedDimension = this.retainedSearch[0].type;
      let timeLimit = "SEVEN";
      if (data) {
        retainedDimension = data.type;
        timeLimit = data.day;
      }
      const res = await this.$http.getHomeRetainedData({ retainedDimension, timeLimit, userType: this.userType });
      if (res) {
        this.retainedDataList = res.map((x) => {
          let obj = {
            type: "留存比例",
            value: x.proportion,
            time: x.dayTime,
            ...x,
          };
          return obj;
        });
        this.retainedChartTooltip = {
          customContent: (title, items) => {
            if (items && items[0]) {
              let data = items[0].data;
              return `
                <div class="tool-tip">
                  <p class="tool-tip-title">${data.time}</p>
                  <ul>
                    <li>
                      <p class="label">留存：</p>
                      <p class="label">${data.value + "%"}</p>
                    </li>
                    <li>
                      <p class="label">注册人数：</p>
                      <p class="label">${data.registerNum}</p>
                    </li>
                    <li>
                      <p class="label">登录人数：</p>
                      <p class="label">${data.loginNum}</p>
                    </li>
                  </ul>
                </div>
            `;
            }
          },
        };
      }
    },
  },
  // 创建后
  created() {
    this.changeTypeCash();
    this.changeTypeChart();
    this.changeTypeKeep();
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
.report-par {
  display: flex;
  justify-content: space-between;
}
.mg {
  margin: 20px 0;
}
.flex {
  display: flex;
  gap: 20px;
  align-items: stretch;
}
.register-chart {
  flex: 1;
}
.order-total {
  flex: 1;
}
.register-area {
  flex: 1;
}
</style>
<style lang="scss">
.report-public-content {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.public-leaderboard {
  width: 33%;
  min-width: 423px;
  height: 423px;
  color: #333;
  margin-bottom: 0;
}

.report-public-header {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
}

.leaderboard-table {
  background: none;
  margin-top: 10px;

  tr,
  th.el-table__cell {
    background: none;
    color: #333;
  }
}

.public-leaderboard-table-header {
  font-weight: 600;
}
.table-total-box {
  display: flex;
  gap: 20px;
  .sub-table {
    flex: 1;
  }
}
</style>
