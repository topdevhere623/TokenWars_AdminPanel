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
        placeholder="Enter user ID, wallet address"
        v-model="userId"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter the Flashing ID, HASH, Gold Stream Water Number"
        v-model="keyword"
        clearable
      />
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
        v-model="chainType"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All recharge chain"
        clearable
      >
        <el-option
          v-for="(item, index) in chainDrop"
          :key="index"
          :label="item.chain"
          :value="item.chain"
        >
        </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> Account change time </span>
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
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total flowing water</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalNumberOfFlows }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total recharge number</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalRechargeQuantity }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total score</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalUpperScore }}</div>
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
      <el-table-column prop="id" label="serial number" align="center" key="1">
      </el-table-column>
      <el-table-column prop="userId" width="120" label="User ID" align="center" key="2">
      </el-table-column>
      <el-table-column prop="coin" label="Recharge currency" align="center" key="3">
      </el-table-column>
      <el-table-column prop="chainType" label="Recharge chain" align="center" key="4">
      </el-table-column>
      <el-table-column prop="amount" label="Quantity of recharge" align="center" key="5">
      </el-table-column>
      <el-table-column prop="criditAmount" label="Quantity" align="center" key="6">
      </el-table-column>
      <el-table-column prop="flashId" label="Flash ID" align="center" key="7">
      </el-table-column>
      <el-table-column prop="hash" label="hash" align="center" key="8"> </el-table-column>
      <el-table-column prop="address" label="Wallet address" align="center" key="9">
      </el-table-column>
      <el-table-column
        prop="afId"
        label="Gold Stream Water Number"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="Account change time"
        align="center"
        key="11"
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
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import { element } from "screenfull";
export default {
  name: "CashManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null, // NFT Id
      userId: null, // 系列名
      keyword: null, // 闪兑ID，hash，金流流水号
      coin: null, // 币种
      chainType: null, // 链
      changeTime: null, // 账变时间
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,

      coinDrop: [],
      chainDrop: [],
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
        userIdOrAddress: this.userId, // 用户id or 钱包地址
        keyword: this.keyword, // 闪兑ID，hash，金流流水号
        coin: this.coin, // 币种
        chainType: this.chainType, // 充值链
        createStartTime: startTime,
        createEndTime: endTime,
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
      const res = await this.$http.getRechargeList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getRechargeStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 获取充值币种
    async fetchCoin() {
      const res = await this.$http.getCoinList({ page: 1, size: 999 });
      if (res) {
        let coin = [];
        const { records } = res;
        // records.forEach(element => {
        //   if (coin.findIndex(e => e.oldCoinName == element.oldCoinName) <= -1) {
        //     coin.push(element);
        //   }
        // })

        // this.coinDrop = coin;
        this.coinDrop = records;
      }
    },
    // 格式化流水来源
    async fetchChain() {
      const res = await this.$http.getChainList({ page: 1, size: 999 });
      if (res) {
        // let chain = [];
        // const { records } = res;
        // records.forEach(element => {
        //   if (chain.findIndex(e => e.chain == element.chain) <= -1) {
        //     chain.push(element);
        //   }
        // })
        this.chainDrop = res.records;
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
    this.fetchChain();
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
