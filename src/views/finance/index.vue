<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <div class="public-date-box">
        <span class="demonstration"> 时间 </span>
        <el-date-picker
          v-model="changeTime"
          type="daterange"
          range-separator="到"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="userAddressPaymentInformationExcel()"
      >
        用户地址收款信息导出
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="userAddressBalanceInformation()"
      >
        用户地址余额信息导出
      </el-button>
    </div>
  </div>
</template>

<script>
import { timeForStr, exportExcel } from "@/utils";
import config from "@/config/env";
export default {
  name: "Finance",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      changeTime: null,
    };
  },
  // 方法
  methods: {
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { changeTime } = this;
      let startDate = null;
      let endDate = null;
      if (changeTime && changeTime[0]) {
        startDate = timeForStr(changeTime[0], "YYYY-MM-DD");
      }
      if (changeTime && changeTime[1]) {
        endDate = timeForStr(changeTime[1], "YYYY-MM-DD");
      }

      return {
        startDate,
        endDate,
      };
    },
    async userAddressPaymentInformationExcel() {
      const search = this.searchFun();
      const data = {
        ...{
          // userType: userType,
        },
        ...search,
      };

      if (data.startDate == null) {
        alert("起始日期必填！")
        return;
      }

      const urlStr = config.api + "/finance/userAddressPaymentInformationExcel";
      exportExcel(urlStr, data, "用户地址收款信息");
    },
    async userAddressBalanceInformation() {
      const search = this.searchFun();
      const data = {
        ...{
          // userType: userType,
        },
        ...search,
      };

      const urlStr = config.api + "/finance/userAddressBalanceInformation";
      exportExcel(urlStr, data, "用户地址余额信息");
    },
  },
  // 创建后
  created() {},
  computed: {
    coin() {
      return this.$store.getters.coinConfig;
    },
    userType() {
      return this.$store.getters.accountConfig;
    },
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
.remittance-box {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.remittance-amount {
  padding: 20px 0;
  border: 1px solid #666;
  text-align: center;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 50px;
  margin-bottom: 10px;

  .val {
    padding: 10px;
    padding-bottom: 0;
  }

  & > div {
    min-width: 200px;
  }
}

.remittance-more {
  display: flex;
}
</style>
