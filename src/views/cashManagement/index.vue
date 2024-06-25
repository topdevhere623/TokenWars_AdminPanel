<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="输入流水号"
        v-model="Id"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="输入用户ID"
        v-model="userId"
        clearable
      />
      <el-select
        v-model="flowType"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="全部金流状态"
        clearable
      >
        <el-option label="奖励" value="REWARD"> </el-option>
        <el-option label="扣款" value="DEDUCTIONS"> </el-option>
        <el-option label="收入" value="REVENUE"> </el-option>
        <el-option label="消费" value="CONSUME"> </el-option>
        <el-option label="充值" value="RECHARGE"> </el-option>
        <el-option label="提现" value="WITHDRAWALS"> </el-option>
        <el-option label="手续费" value="FEE"> </el-option>
        <!-- <el-option label="挂单" value="PENDING_ORDERS">
        </el-option> -->
        <el-option label="退款" value="REFUND"> </el-option>
        <el-option label="补偿" value="COMPENSATE"> </el-option>
        <el-option label="消耗" value="CONSUME_COIN"> </el-option>
        <el-option label="获得" value="OBTAIN"> </el-option>
        <el-option label="兑换卡" value="REDEEM_CARD"> </el-option>
        <el-option label="送金" value="REG_BOUNS"> </el-option>
      </el-select>
      <el-select
        v-model="coin"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="全部币种"
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
        placeholder="全部来源"
        clearable
      >
        <el-option label="平台" value="PLATFORM"> </el-option>
        <el-option label="钱包" value="WALLET"> </el-option>
        <el-option label="返佣" value="REBATES"> </el-option>
        <el-option label="余额" value="BALANCE"> </el-option>
        <el-option label="回收" value="RECLAIM"> </el-option>
        <el-option label="挂单" value="PENDING_ORDERS"> </el-option>
        <el-option label="一元购" value="ONE_DOLLAR"> </el-option>
        <el-option label="提现" value="WITHDRAWALS"> </el-option>
        <el-option label="活动" value="ACTIVITY"> </el-option>
        <el-option label="盲盒" value="BOX"> </el-option>
        <el-option label="闪兑" value="FLASH_EXCHANGE"> </el-option>
        <el-option label="货币战争" value="WAR_GAME"> </el-option>
        <el-option label="兑换卡" value="REDEEM_CARD"> </el-option>
        <el-option label="礼品卡" value="GIFT_CARD"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration">账变时间</span>
        <el-date-picker
          v-model="changeTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchAssetFlowList()"
      >
        查询
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchAssetFlowListExport()"
      >
        导出
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总流水数</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.flowNumberTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总ETH金额</div>
          <div class="val">
            {{ (aggregateQuery && aggregateQuery.amountTotal) || 0 }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总USDT金额</div>
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
        label="流水号"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column
        prop="userId"
        sortable="custom"
        width="120"
        label="用户ID"
        align="center"
        key="3"
      >
      </el-table-column>
      <el-table-column
        prop="flowType"
        sortable="custom"
        label="金流类型"
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
        label="金流来源"
        align="center"
        key="5"
      >
        <template slot-scope="scope">
          {{ formatSource(scope.row.flowSource) }}
        </template>
      </el-table-column>
      <el-table-column prop="flashId" label="闪兑Id" align="center" key="6">
      </el-table-column>
      <el-table-column prop="hash" label="Hash" align="center" key="7">
      </el-table-column>
      <el-table-column
        prop="walletAddress"
        label="钱包地址"
        align="center"
        key="8"
      >
      </el-table-column>
      <el-table-column prop="coin" label="金流币种" align="center" key="9">
      </el-table-column>
      <el-table-column
        prop="traPrice"
        sortable="custom"
        label="金额"
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
        label="余额"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        label="账变时间"
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
      exportExcel(urlStr, data, "金流管理导出");
    },
    // 格式化流水类型
    formatType(event) {
      if (!event) return "";
      if (event == "REWARD") {
        return "奖励";
      } else if (event == "DEDUCTIONS") {
        return "扣款";
      } else if (event == "REVENUE") {
        return "收入";
      } else if (event == "CONSUME") {
        return "消费";
      } else if (event == "RECHARGE") {
        return "充值";
      } else if (event == "WITHDRAWALS") {
        return "提现";
      } else if (event == "FEE") {
        return "手续费";
      } else if (event == "PENDING_ORDERS") {
        return "挂单";
      } else if (event == "REFUND") {
        return "退款";
      } else if (event == "COMPENSATE") {
        return "补偿";
      } else if (event == "CONSUME_COIN") {
        return "消耗";
      } else if (event == "OBTAIN") {
        return "获得";
      } else if (event == "REDEEM_CARD") {
        return "兑换卡";
      } else if (event == "REG_BOUNS") {
        return "送金";
      }
    },
    // 格式化流水来源
    formatSource(event) {
      if (!event) return "";
      if (event == "PLATFORM") {
        return "平台";
      } else if (event == "WALLET") {
        return "钱包";
      } else if (event == "REBATES") {
        return "返佣";
      } else if (event == "BALANCE") {
        return "余额";
      } else if (event == "RECLAIM") {
        return "回收";
      } else if (event == "PENDING_ORDERS") {
        return "挂单";
      } else if (event == "WITHDRAWALS") {
        return "提现";
      } else if (event == "ONE_DOLLAR") {
        return "一元购";
      } else if (event == "ACTIVITY") {
        return "活动";
      } else if (event == "BOX") {
        return "盲盒";
      } else if (event == "FLASH_EXCHANGE") {
        return "闪兑";
      } else if (event == "WAR_GAME") {
        return "货币战争";
      } else if (event == "REDEEM_CARD") {
        return "兑换卡";
      } else if (event == "GIFT_CARD") {
        return "礼品卡";
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
