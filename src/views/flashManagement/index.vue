<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Input flashing ID/Order ID"
        v-model="Id"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter user ID/Nick name"
        v-model="obscureField"
        clearable
      />
      <el-select
        v-model="sellCoin"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All sell currency"
        clearable
      >
        <el-option label="eth" value="ETH"> </el-option>
        <el-option label="usdt" value="USDT"> </el-option>
      </el-select>
      <el-select
        v-model="flashPlaform"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All flashing platform"
        clearable
      >
        <el-option label="Okx" value="OKX"> </el-option>
      </el-select>
      <el-select
        v-model="flashStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="state"
        clearable
      >
        <el-option label="success" value="TRUE"> </el-option>
        <el-option label="fail" value="FAIL"> </el-option>
        <el-option label="Hang up" value="FALSE"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> transaction hour </span>
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
        @click="fetchFlashManagerList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchFlashManagerListExport()"
      >
        Export
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">number of order</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.orderNumbers }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total selling coins</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.sellPrices }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total buying currency</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.buyPrices }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total handling fee</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.feePrices }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total difference</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.diffPrices }}</div>
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
      <el-table-column
        prop="userName"
        width="120"
        sortable="custom"
        label="user"
        align="center"
        key="2"
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
      <el-table-column prop="sellCoin" label="Currency" align="center" key="3">
      </el-table-column>
      <el-table-column
        prop="sellNum"
        sortable="custom"
        label="Sell ​​currency"
        align="center"
        key="4"
      >
      </el-table-column>
      <el-table-column
        prop="realRate"
        sortable="custom"
        label="Actual exchange rate"
        align="center"
        key="5"
      >
      </el-table-column>
      <el-table-column
        prop="showRate"
        sortable="custom"
        label="Display exchange rate"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column prop="buyCoin" label="Buy currency" align="center" key="7">
      </el-table-column>
      <el-table-column
        prop="buyNum"
        sortable="custom"
        label="Purchase quantity"
        align="center"
        key="8"
      >
      </el-table-column>
      <el-table-column
        prop="fee"
        sortable="custom"
        label="Handling fee"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column prop="feeCoin" label="Fees" align="center" key="10">
      </el-table-column>
      <el-table-column
        prop="flashPlaform"
        label="Flashing platform"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="flashPlaform"
        label="Redemption price"
        align="center"
        key="11"
      >
        <template slot-scope="scope">
          {{ scope.row.userNum + " " + scope.row.userCoin }}
        </template>
      </el-table-column>
      <el-table-column prop="flashPlaform" label="state" align="center" key="11">
        <template slot-scope="scope">
          <p v-if="scope.row.flashStatus == 'TRUE'" style="color: #67c23a">success</p>
          <p v-else-if="scope.row.flashStatus == 'FAIL'" style="color: #f56c6c">fail</p>
          <p v-else style="color: #e6a23c">Hang up</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="flashPlaform"
        label="Flashing platform"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="plaformOrderId"
        label="Platform order ID"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        label="transaction hour"
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
  name: "FlashManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null, // Id
      obscureField: null, // 用户ID/昵称
      flashPlaform: null, // 闪兑平台
      flashStatus: null, //状态
      sellCoin: null, // 卖出币种
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
        id: this.Id, // 闪兑Id
        obscureField: this.obscureField, // 用户ID/昵称
        sellCoin: this.sellCoin, // 币种
        flashPlaform: this.flashPlaform, // 流水状态
        flashStatus: this.flashStatus,
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

      this.fetchFlashManagerList();
    },
    // 加载列表
    async fetchFlashManagerList(isSearch = true) {
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
      const res = await this.$http.getFlashManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getFlashManagerStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    async fetchFlashManagerListExport(isSearch = true) {
      const search = this.searchFun();
      const { sortData, userType } = this;
      const data = {
        ...{
          userType: userType,
        },
        ...sortData,
        ...search,
      };

      const urlStr = config.api + "/flash-manager/pageListExport";
      exportExcel(urlStr, data, "Flashing Management Export");
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchFlashManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchFlashManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchFlashManagerList();
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
