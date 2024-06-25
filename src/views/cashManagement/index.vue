<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter flowing water number"
        v-model="Id"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter user ID"
        v-model="userId"
        clearable
      />
      <el-select
        v-model="flowType"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All gold flow state"
        clearable
      >
        <el-option label="award" value="REWARD"> </el-option>
        <el-option label="Deduction" value="DEDUCTIONS"> </el-option>
        <el-option label="income" value="REVENUE"> </el-option>
        <el-option label="Consumption" value="CONSUME"> </el-option>
        <el-option label="top up" value="RECHARGE"> </el-option>
        <el-option label="withdraw" value="WITHDRAWALS"> </el-option>
        <el-option label="Handling fee" value="FEE"> </el-option>
        <!-- <el-option label="Hang up" value="PENDING_ORDERS">
        </el-option> -->
        <el-option label="Refund" value="REFUND"> </el-option>
        <el-option label="compensate" value="COMPENSATE"> </el-option>
        <el-option label="Consume" value="CONSUME_COIN"> </el-option>
        <el-option label="get" value="OBTAIN"> </el-option>
        <el-option label="Exchange card" value="REDEEM_CARD"> </el-option>
        <el-option label="money transfer" value="REG_BOUNS"> </el-option>
      </el-select>
      <el-select
        v-model="coin"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All currencies"
        clearable
      >
        <el-option
          v-for="(item, index) in coinDrop"
          :key="index"
          :label="item.coinName"
          :value="item.coinName"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="flowSource"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All sources"
        clearable
      >
        <el-option label="platform" value="PLATFORM"> </el-option>
        <el-option label="wallet" value="WALLET"> </el-option>
        <el-option label="Rebate" value="REBATES"> </el-option>
        <el-option label="Balance" value="BALANCE"> </el-option>
        <el-option label="Recycle" value="RECLAIM"> </el-option>
        <el-option label="Hang up" value="PENDING_ORDERS"> </el-option>
        <el-option label="One -dollar purchase" value="ONE_DOLLAR"> </el-option>
        <el-option label="withdraw" value="WITHDRAWALS"> </el-option>
        <el-option label="Activity" value="ACTIVITY"> </el-option>
        <el-option label="Blind box" value="BOX"> </el-option>
        <el-option label="Flash" value="FLASH_EXCHANGE"> </el-option>
        <el-option label="Currency war" value="WAR_GAME"> </el-option>
        <el-option label="Exchange card" value="REDEEM_CARD"> </el-option>
        <el-option label="gift card" value="GIFT_CARD"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration">Account change time</span>
        <el-date-picker
          v-model="changeTime"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchAssetFlowList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchAssetFlowListExport()"
      >
        Export
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total flowing water</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.flowNumberTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total ETH amount</div>
          <div class="val">
            {{ (aggregateQuery && aggregateQuery.amountTotal) || 0 }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total USDT amount</div>
          <div class="val">
            {{ (aggregateQuery && aggregateQuery.amountUTotal) || 0 }}
          </div>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @sort-change="sortChange"
      class="public-table"
      border
    >
      <el-table-column
        prop="id"
        sortable="custom"
        label="serial number"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column
        prop="userId"
        sortable="custom"
        width="120"
        label="User ID"
        align="center"
        key="3"
      >
      </el-table-column>
      <el-table-column
        prop="flowType"
        sortable="custom"
        label="Golden flow"
        align="center"
        key="4"
      >
        <template slot-scope="scope">
          {{ formatType(scope.row.flowType) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="flowSource"
        sortable="custom"
        label="Sources of gold"
        align="center"
        key="5"
      >
        <template slot-scope="scope">
          {{ formatSource(scope.row.flowSource) }}
        </template>
      </el-table-column>
      <el-table-column prop="flashId" label="Flash ID" align="center" key="6">
      </el-table-column>
      <el-table-column prop="hash" label="hash" align="center" key="7"> </el-table-column>
      <el-table-column prop="walletAddress" label="Wallet address" align="center" key="8">
      </el-table-column>
      <el-table-column prop="coin" label="Category" align="center" key="9">
      </el-table-column>
      <el-table-column
        prop="traPrice"
        sortable="custom"
        label="Amount"
        align="center"
        key="10"
      >
        <template slot-scope="scope">
          {{
            scope.row.traPrice && Number(scope.row.traPrice || 0) > 0
              ? `+${scope.row.traPrice}`
              : scope.row.traPrice
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="assetBalance"
        sortable="custom"
        label="Balance"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        label="Account change time"
        align="center"
        key="13"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="baseUserPage && baseUserPage.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pagination.pageSizes"
      :page-size="size"
      layout=" sizes, prev, pager, next, jumper"
      :total="baseUserPage.total"
      class="public-pagination"
    >
    </el-pagination>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr, exportExcel } from "@/utils";
import config from "@/config/env";
import pagination from "@/mixins/pagination";
export default {
  name: "CashManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null, // NFT Id
      userId: null, // 系列名
      coin: null, // 币种
      flowType: null, // 流水状态
      flowSource: null, // 流水来源
      changeTime: null, // 账变时间
      coinDrop: [],
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { changeTime } = this;
      let startTime = null;
      let endTime = null;
      if (changeTime && changeTime[0]) {
        startTime = timeForStr(changeTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (changeTime && changeTime[1]) {
        endTime = timeForStr(changeTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        id: this.Id, // 流水号
        userId: this.userId, // 用户Id
        coin: this.coin, // 币种
        flowType: this.flowType, // 流水状态
        flowSource: this.flowSource, // 流水来源
        startTime,
        endTime,
      };
    },
    /**
     * @description: 排序
     */
    sortChange({ column, prop, order }) {
      this.sortData.orderBy = prop;
      this.sortData.orderType = order == "descending" ? "DESC" : "ASC";

      if (!order) {
        this.sortData.orderType = null;
      }

      this.fetchAssetFlowList();
    },
    // 加载列表
    async fetchAssetFlowList(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          userType: userType,
          size: size,
          page: _page,
        },
        ...sortData,
        ...search,
      };
      const res = await this.$http.getAssetFlowList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getAssetFlowStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 加载列表
    async fetchAssetFlowListExport(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          userType: userType,
          size: size,
          page: _page,
        },
        ...sortData,
        ...search,
      };

      const urlStr = config.api + "/asset-flow/pageListExport";
      exportExcel(urlStr, data, "Gold Stream Management Export");
    },
    // 格式化流水类型
    formatType(event) {
      if (!event) return "";
      if (event == "REWARD") {
        return "award";
      } else if (event == "DEDUCTIONS") {
        return "Deduction";
      } else if (event == "REVENUE") {
        return "income";
      } else if (event == "CONSUME") {
        return "Consumption";
      } else if (event == "RECHARGE") {
        return "top up";
      } else if (event == "WITHDRAWALS") {
        return "withdraw";
      } else if (event == "FEE") {
        return "Handling fee";
      } else if (event == "PENDING_ORDERS") {
        return "Hang up";
      } else if (event == "REFUND") {
        return "Refund";
      } else if (event == "COMPENSATE") {
        return "compensate";
      } else if (event == "CONSUME_COIN") {
        return "Consume";
      } else if (event == "OBTAIN") {
        return "get";
      } else if (event == "REDEEM_CARD") {
        return "Exchange card";
      } else if (event == "REG_BOUNS") {
        return "money transfer";
      }
    },
    // 格式化流水来源
    formatSource(event) {
      if (!event) return "";
      if (event == "PLATFORM") {
        return "platform";
      } else if (event == "WALLET") {
        return "wallet";
      } else if (event == "REBATES") {
        return "Rebate";
      } else if (event == "BALANCE") {
        return "Balance";
      } else if (event == "RECLAIM") {
        return "Recycle";
      } else if (event == "PENDING_ORDERS") {
        return "Hang up";
      } else if (event == "WITHDRAWALS") {
        return "withdraw";
      } else if (event == "ONE_DOLLAR") {
        return "One -dollar purchase";
      } else if (event == "ACTIVITY") {
        return "Activity";
      } else if (event == "BOX") {
        return "Blind box";
      } else if (event == "FLASH_EXCHANGE") {
        return "Flash";
      } else if (event == "WAR_GAME") {
        return "Currency war";
      } else if (event == "REDEEM_CARD") {
        return "Exchange card";
      } else if (event == "GIFT_CARD") {
        return "gift card";
      }
    },
    // 获取充值币种
    async fetchCoin() {
      const res = await this.$http.getCoinList({ page: 1, size: 999 });
      if (res) {
        const { records } = res;
        this.coinDrop = records;
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchAssetFlowList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchAssetFlowList(false);
    },
  },
  // 创建后
  created() {
    this.fetchAssetFlowList();
    this.fetchCoin();
  },
  computed: {
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
