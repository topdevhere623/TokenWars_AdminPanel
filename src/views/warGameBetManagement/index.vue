<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 210px"
        placeholder="enter User ID/Nick name"
        v-model="userName"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 210px"
        placeholder="enter Number of stations"
        v-model="warBaseId"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 210px"
        placeholder="Enter order number"
        v-model="orderNum"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 210px"
        placeholder="Enter gold flow water number"
        v-model="flowId"
        clearable
      />
      <el-select
        class="public-input"
        v-model="status"
        placeholder="All states"
        clearable
        style="width: 120px"
      >
        <el-option label="To be awarded" value="WAIT" />
        <el-option label="Winning" value="OPEN" />
        <el-option label="refunded" value="REFUNDED" />
        <el-option label="Cancelled" value="CANCELED" />
      </el-select>
      <div class="public-date-box">
        <span class="demonstration">transaction hour</span>
        <el-date-picker
          v-model="transactionTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchWarGameTicketSalesList()"
      >
        Inquire
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Number of players</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.userNumbers }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total injection</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.buyPriceTotal }}
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
        sortable="custom"
        prop="flowId"
        label="Gold Stream Water Number"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column prop="userId" label="Betting user" align="center" key="7">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userId || "--" }}
          </p>
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="warBaseId"
        label="Number of stations"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="buyPrice"
        label="Amount of consumption"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="totalBuyPrice"
        label="General Consumption of the Bureau"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column prop="orderNumber" label="order number" align="center" key="15">
      </el-table-column>
      <el-table-column
        prop="currentStatus"
        label="state"
        align="center"
        key="17"
        fixed="right"
      >
        <template slot-scope="scope">
          <span style="color: #00bdff" v-if="scope.row.currentStatus == 'WAIT'">
            To be awarded
          </span>
          <span style="color: #05ac04" v-if="scope.row.currentStatus == 'OPEN'">
            Winning
          </span>
          <span style="color: #ff0000" v-if="scope.row.currentStatus == 'REFUNDED'">
            refunded
          </span>
          <span style="color: #b7b7b7" v-if="scope.row.currentStatus == 'CANCELED'">
            Cancelled
          </span>
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="lotteryTime"
        width="140px"
        label="Lottery time"
        align="center"
        key="18"
        fixed="right"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.lotteryTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="createTime"
        width="140px"
        label="transaction hour"
        align="center"
        key="18"
        fixed="right"
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
import { accurateDecimal, timeForStr, openUrl } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "NftBuyRecord",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      orderNum: null,
      flowId: null,
      userName: null,
      warBaseId: null,
      status: null,
      transactionTime: null,
      page: 1,
      size: 20,
      tableData: null,
      aggregateQuery: null,
      baseUserPage: null,
      sortData: {
        orderBy: null,
        orderType: null,
      },
      ethPic: require("@/assets/images/create_eth.webp"),
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    accurateDecimal: accurateDecimal,
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    openUrl: openUrl,
    searchFun() {
      let { transactionTime } = this;
      let startTime = null;
      let endTime = null;

      if (transactionTime && transactionTime[0]) {
        startTime = timeForStr(transactionTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (transactionTime && transactionTime[1]) {
        endTime = timeForStr(transactionTime[1], "YYYY-MM-DD HH:mm:ss");
      }
      return {
        orderNumber: this.orderNum,
        flowId: this.flowId,
        warBaseId: this.warBaseId,
        obscureField: this.userName,
        currentStatus: this.status,
        startTime,
        endTime,
      };
    },
    // 加载列表
    async fetchWarGameTicketSalesList(isSearch = true) {
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
      const res = await this.$http.getWarGameTicketSalesList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getWarGameTicketSalesStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    sortChange({ column, prop, order }) {
      this.sortData.orderBy = prop;
      this.sortData.orderType = order == "descending" ? "DESC" : "ASC";
      if (!order) {
        this.sortData.orderType = null;
      }

      this.fetchWarGameTicketSalesList();
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchWarGameTicketSalesList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchWarGameTicketSalesList(false);
    },
  },
  // 创建后
  created() {
    this.fetchWarGameTicketSalesList();
  },
  // 计算属性
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
