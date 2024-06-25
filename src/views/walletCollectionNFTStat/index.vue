<template>
  <div class="page-wrapper">
    <search
      :typeShow="['state']"
      @search="searchFun"
      @getTableList="getTableList"
    ></search>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total set number</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalWalletNum }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total Gas</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalAssetBalance }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total asset number</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalUserIn }}
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="id" align="center"> </el-table-column>
      <el-table-column
        prop="walletAddress"
        label="address"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="userName" label="Subordinate" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.userId }}</p>
          <p>{{ scope.row.userName }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="chainName" label="chain" align="center"> </el-table-column>
      <el-table-column prop="coin" label="Currency" align="center"> </el-table-column>
      <el-table-column prop="assetBalance" label="Balance" align="center">
      </el-table-column>
      <el-table-column prop="userIn" label="User transfer" align="center">
      </el-table-column>
      <el-table-column prop="platformInGas" label="Platform turn to GAS" align="center">
      </el-table-column>
      <el-table-column
        prop="collectionAmount"
        label="The amount has been collected"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="collectionSum" label="Number of collections" align="center">
      </el-table-column>
      <el-table-column prop="collectionAmountGas" label="Gas" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="Creation time" align="center">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="Last account change time" align="center">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.updateTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="Asset details" align="center">
        <template slot-scope="scope">
          <chainExplorerSkip :chain="scope.row.chainName" hash="" />
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
import chainExplorerSkip from "@/components/chainExplorerSkip";
import bigNumber from "bignumber.js";
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import search from "../walletCollectCoinStat/search.vue";
export default {
  name: "walletRechargeList",
  // 模板引入
  components: { chainExplorerSkip, search },
  // 数据
  data() {
    return {
      Id: null, // Id
      obscureField: null, // 用户ID/昵称
      chainName: "", // 卖出币种
      changeCreateTime: [], // 创建时间
      changeUpdateTime: [], // 账变时间
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      statisticsData: null,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { changeCreateTime, changeUpdateTime } = this;
      const [createStartTime, createEndTime] = changeCreateTime;
      const [updateStartTime, updateEndTime] = changeUpdateTime;
      return {
        obscureField: this.obscureField,
        chainName: this.chainName,
        createStartTime,
        createEndTime,
        updateStartTime,
        updateEndTime,
      };
    },
    // 加载列表
    async getTableList(isSearch = true) {
      const search = this.searchFun();
      const { size } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          size: size,
          page: _page,
        },
        ...search,
      };
      const res = await this.$http.getWalletRechargeList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const statisticsData = await this.$http.getWalletRechargeStatistics(data);
      if (statisticsData) {
        this.statisticsData = statisticsData;
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableList(false);
    },
  },
  // 创建后
  created() {
    this.getTableList();
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
