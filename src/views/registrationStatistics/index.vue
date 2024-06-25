<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter user ID, nickname, mailbox"
        v-model="obscureField"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter gold flow ID"
        v-model="flowId"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Input source"
        v-model="sourceNum"
        clearable
      />
      <div class="public-date-box">
        <span class="demonstration"> Registration time </span>
        <el-date-picker
          v-model="regTime"
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
        Export Excel
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total account number</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalPeopleNumber }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总 remittance</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalBouns }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total recharge</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalRecharge }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total consumption</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalCumption }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Recharge rate</div>
          <div class="val" v-if="aggregateQuery?.totalPeopleNumber > 0">
            {{
              aggregateQuery &&
              (
                (aggregateQuery?.totalRechargePeopleNumber /
                  aggregateQuery?.totalPeopleNumber) *
                100
              ).toFixed(2)
            }}%
          </div>
          <div class="val" v-else>0%</div>
        </div>
        <div class="remittance-item">
          <div class="title">Consumption rate</div>
          <div class="val" v-if="aggregateQuery?.totalPeopleNumber > 0">
            {{
              aggregateQuery &&
              (
                (aggregateQuery?.totalCumptionPeopleNumber /
                  aggregateQuery?.totalPeopleNumber) *
                100
              ).toFixed(2)
            }}%
          </div>
          <div class="val" v-else>0%</div>
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
      <el-table-column prop="userId" width="120" label="User ID" align="center" key="1">
      </el-table-column>
      <el-table-column
        prop="userName"
        width="120"
        label="Nick name"
        align="center"
        key="2"
      >
        <template slot-scope="scope">
          <!-- <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userId || "--" }}
          </p> -->
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="sourceNum" width="120" label="source" align="center" key="3">
      </el-table-column>
      <el-table-column prop="email" width="120" label="Mail" align="center" key="4">
      </el-table-column>
      <el-table-column prop="upId" width="120" label="Superior ID" align="center" key="5">
      </el-table-column>
      <el-table-column
        prop="inviteCode"
        width="120"
        label="Invitation code"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column prop="traPrice" width="120" label="Amount" align="center" key="7">
      </el-table-column>
      <el-table-column prop="flowId" width="120" label="Golden ID" align="center" key="8">
      </el-table-column>
      <el-table-column prop="recharge" width="120" label="top up" align="center" key="9">
      </el-table-column>
      <el-table-column
        prop="consumption"
        width="120"
        label="Consumption"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="drawing"
        width="120"
        label="Withdraw"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="Get the gold time"
        align="center"
        key="12"
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
      flowId: null,
      obscureField: null,
      sourceNum: null,
      regTime: null, // 交易时间
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
      let { regTime } = this;
      let regStartTime = null;
      let regEndTime = null;
      if (regTime && regTime[0]) {
        regStartTime = timeForStr(regTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (regTime && regTime[1]) {
        regEndTime = timeForStr(regTime[1], "YYYY-MM-DD HH:mm:ss");
      }
      return {
        obscureField: this.obscureField,
        flowId: this.flowId,
        sourceNum: this.sourceNum,
        regStartTime,
        regEndTime,
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
      const urlStr = config.api + "/bouns/exportExcel";
      const { coin, userType } = this;
      const data = {
        ...search,
      };

      exportExcel(urlStr, data, "Register to send gold statistics");
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
          size: size,
          page: _page,
        },
        ...search,
      };
      const res = await this.$http.getBounsPageList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getBounsHeaderDataTotal(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
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
