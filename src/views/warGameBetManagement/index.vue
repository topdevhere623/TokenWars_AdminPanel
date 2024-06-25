<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 210px" placeholder="输入 用户ID/昵称" v-model="userName" clearable />
      <el-input class="public-input" style="width: 210px" placeholder="输入 局数" v-model="warBaseId" clearable />
      <el-input class="public-input" style="width: 210px" placeholder="输入订单号" v-model="orderNum" clearable />
      <el-input class="public-input" style="width: 210px" placeholder="输入金流流水号" v-model="flowId" clearable />
      <el-select class="public-input" v-model="status" placeholder="全部状态" clearable style="width: 120px">
        <el-option label="待开奖" value="WAIT" />
        <el-option label="已开奖" value="OPEN" />
        <el-option label="已退款" value="REFUNDED" />
        <el-option label="已取消" value="CANCELED" />
      </el-select>
      <div class="public-date-box">
        <span class="demonstration">交易时间</span>
        <el-date-picker
          v-model="transactionTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchWarGameTicketSalesList()"> 查询 </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">玩家数</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.userNumbers }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总投注额</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.buyPriceTotal }}
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column sortable="custom" prop="flowId" label="金流流水号" align="center" key="1"> </el-table-column>
      <el-table-column prop="userId" label="投注用户" align="center" key="7">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userId || "--" }}
          </p>
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="warBaseId" label="局数" align="center" key="9"> </el-table-column>
      <el-table-column sortable="custom" prop="buyPrice" label="消费金额" align="center" key="10"> </el-table-column>
      <el-table-column sortable="custom" prop="totalBuyPrice" label="本局总消费" align="center" key="11"> </el-table-column>
      <el-table-column prop="orderNumber" label="订单号" align="center" key="15"> </el-table-column>
      <el-table-column prop="currentStatus" label="状态" align="center" key="17" fixed="right">
        <template slot-scope="scope">
          <span style="color: #00bdff" v-if="scope.row.currentStatus == 'WAIT'"> 待开奖 </span>
          <span style="color: #05ac04" v-if="scope.row.currentStatus == 'OPEN'"> 已开奖 </span>
          <span style="color: #ff0000" v-if="scope.row.currentStatus == 'REFUNDED'"> 已退款 </span>
          <span style="color: #b7b7b7" v-if="scope.row.currentStatus == 'CANCELED'"> 已取消 </span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="lotteryTime" width="140px" label="开奖时间" align="center" key="18" fixed="right">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.lotteryTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="createTime" width="140px" label="交易时间" align="center" key="18" fixed="right">
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
