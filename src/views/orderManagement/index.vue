<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter order number"
        v-model="orderNumber"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter the name of the blind box"
        v-model="boxName"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter user ID/Nick name"
        v-model="obscureField"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter Hash"
        v-model="hash"
        clearable
      />
      <div class="public-date-box">
        <span class="demonstration"> Consumer </span>
        <el-input
          type="number"
          style="width: 120px; border: 1px solid #dcdfe6; border-radius: 4px"
          placeholder="Minimum price"
          v-model="startPrice"
          clearable
        />
        <el-input
          type="number"
          style="width: 120px; border: 1px solid #dcdfe6; border-radius: 4px"
          placeholder="Highest price"
          v-model="endPrice"
          clearable
        />
      </div>
      <div class="public-date-box">
        <span class="demonstration"> transaction hour </span>
        <el-date-picker
          v-model="transactionTime"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> Completion time of transaction </span>
        <el-date-picker
          v-model="transactionCompleteTime"
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
        @click="fetchOrderManagerList()"
      >
        Inquire
      </el-button>

      <el-button
        type="primary"
        icon="el-icon-download"
        class="public-search"
        @click="dailyStatsExcel()"
      >
        Daily statistical data export
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">number of order</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.orderNumber }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Number of open boxes</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.openBoxNumber }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total consumption</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.consumeTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total commission</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.rebatesPrices }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total return value</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.lotteryPrices }}
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
        prop="orderNumber"
        sortable="custom"
        label="order number"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column prop="boxImg" width="120" label="Blind box" align="center" key="2">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image
              style="height: 100%"
              :src="scope.row.boxImg"
              :preview-src-list="[scope.row.boxImg]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="boxName"
        width="120"
        sortable="custom"
        label="Blind Box Name"
        align="center"
        key="3"
      >
      </el-table-column>
      <el-table-column
        prop="buyNumber"
        width="120"
        sortable="custom"
        label="Number"
        align="center"
        key="4"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        width="120"
        sortable="custom"
        label="user"
        align="center"
        key="5"
      >
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
        prop="buyPrice"
        width="120"
        sortable="custom"
        :label="`Consumption ($ {Coin})`"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column width="120" label="Return prize" align="center" key="8">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="handleView(scope.row)">
            Check
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="realPrice"
        width="120"
        sortable="custom"
        :label="`Return value ($ {coin})`"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column
        prop="refundPrice"
        width="120"
        sortable="custom"
        :label="`Refund amount ($ {coin})`"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column
        prop="rebatesPrice"
        width="120"
        sortable="custom"
        :label="`Commission ($ {coin})`"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="buySource"
        width="120"
        label="Consumer channel"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column prop="hash" width="120" label="Draw chain" align="center" key="12">
        <template slot-scope="scope">
          <chainExplorerSkip
            :chain="scope.row.lotteryChainType"
            :address="`tx/${scope.row.hash}`"
            >{{ scope.row.lotteryChainType }}</chainExplorerSkip
          >
        </template>
      </el-table-column>
      <el-table-column prop="hash" width="120" label="harsh" align="center" key="13">
      </el-table-column>
      <el-table-column
        prop="flowId"
        width="120"
        label="serial number"
        align="center"
        key="14"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="140"
        sortable="custom"
        label="transaction hour"
        align="center"
        key="15"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="traTime"
        width="140"
        sortable="custom"
        label="Completion time of transaction"
        align="center"
        key="16"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.traTime, "YYYY-MM-DD HH:mm:ss") }}
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
    <el-dialog
      title="Details"
      :visible.sync="showDialog"
      width="1200px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-table :data="revenueData" style="width: auto" height="400px" border>
        <el-table-column prop="orderNumber" label="order number" align="center" key="1">
        </el-table-column>
        <el-table-column prop="boxName" label="Blind Box Name" align="center" key="2">
        </el-table-column>
        <el-table-column
          prop="nftImg"
          label="Prize picture"
          align="center"
          width="120"
          key="3"
        >
          <template slot-scope="scope">
            <div style="width: 100px; height: 100px">
              <el-image
                style="height: 100%"
                :src="scope.row.nftImg"
                :preview-src-list="[scope.row.nftImg]"
              >
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="seriesName" label="Prize series" align="center" key="4">
        </el-table-column>
        <el-table-column prop="id" label="id" align="center" key="5"> </el-table-column>
        <el-table-column
          prop="price"
          :label="`Awards value ($ {coin})`"
          align="center"
          key="6"
        >
        </el-table-column>
        <el-table-column prop="userSelect" label="User choice" align="center" key="7">
          <template slot-scope="scope">
            <span v-if="scope.row.userSelect == 'RECLAIM'">Recycle</span>
            <span v-if="scope.row.userSelect == 'HOLD'">hold</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="realPrice"
          :label="`Actual value (${coin})`"
          align="center"
          key="8"
        >
        </el-table-column>
        <el-table-column
          prop="lotteryStatus"
          label="NFT delivery situation"
          align="center"
          key="9"
        >
          <template slot-scope="scope">
            <span style="color: #d2d2d2" v-if="scope.row.lotteryStatus == 'RECLAIMED'"
              >Recycled</span
            >
            <span style="color: #ff0707" v-if="scope.row.lotteryStatus == 'FAIL'"
              >Failed to deliver</span
            >
            <span style="color: #09912e" v-if="scope.row.lotteryStatus == 'SUCCESS'"
              >paid</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="traTime"
          width="140"
          label="transaction hour"
          align="center"
          key="10"
        >
          <template slot-scope="scope">
            {{ timeForStr(scope.row.traTime, "YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr, exportExcel } from "@/utils";
import pagination from "@/mixins/pagination";
import chainExplorerSkip from "@/components/chainExplorerSkip";
import config from "@/config/env";

export default {
  name: "OrderManagement",
  // 模板引入
  components: { chainExplorerSkip },
  // 数据
  data() {
    return {
      orderNumber: null,
      boxName: null,
      obscureField: null,
      hash: null,
      startPrice: null,
      endPrice: null,
      transactionTime: null, // 交易时间
      transactionCompleteTime: null, // 交易完成时间
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,

      showDialog: false,
      revenueData: null,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { transactionTime, transactionCompleteTime } = this;
      let startTime = null;
      let endTime = null;
      let finishStartTime = null;
      let finishEndTime = null;
      if (transactionTime && transactionTime[0]) {
        startTime = timeForStr(transactionTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (transactionTime && transactionTime[1]) {
        endTime = timeForStr(transactionTime[1], "YYYY-MM-DD HH:mm:ss");
      }
      if (transactionCompleteTime && transactionCompleteTime[0]) {
        finishStartTime = timeForStr(transactionCompleteTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (transactionCompleteTime && transactionCompleteTime[1]) {
        finishEndTime = timeForStr(transactionCompleteTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        orderNumber: this.orderNumber,
        boxName: this.boxName,
        obscureField: this.obscureField,
        hash: this.hash,
        startPrice: this.startPrice,
        endPrice: this.endPrice,
        startTime,
        endTime,
        finishStartTime,
        finishEndTime,
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

      this.fetchOrderManagerList();
    },
    // 用户列表导出
    dailyStatsExcel() {
      const search = this.searchFun();
      const urlStr = config.api + "/user/dailyStatsExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          startDate: search.startTime,
          endDate: search.endTime,
          userType: userType,
        },
        ...search,
      };
      if (search.startTime == null) {
        alert("The start time of the transaction time must be filled in");
        return;
      }

      exportExcel(urlStr, data, "Daily data statistics");
    },
    // 加载列表
    async fetchOrderManagerList(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size, coin, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          userType: userType,
          coin: coin,
          size: size,
          page: _page,
        },
        ...sortData,
        ...search,
      };
      const res = await this.$http.getOrderManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getOrderManagerStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    async handleView(event) {
      const res = await this.$http.getBoxLotteryList({
        orderId: event.id,
        page: 1,
        size: 9999,
      });
      if (res) {
        this.revenueData = res.records;
        this.showDialog = true;
      }
    },
    handleClose(done) {
      if (done) {
        done();
        return;
      }

      this.showDialog = false;
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchOrderManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchOrderManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchOrderManagerList();
  },
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
