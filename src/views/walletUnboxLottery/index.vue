<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="输入ID、用户ID、钱包地址"
        v-model="obscureField"
        clearable
      />
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="链"
      >
        <el-option label="ETH" value="ETH"> </el-option>
        <el-option label="测试网" value="Goerli"> </el-option>
      </el-select>
      <el-select
        v-model="coin"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="币种"
      >
        <el-option label="ETH" value="ETH"> </el-option>
        <el-option label="BNB" value="BNB"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> 创建时间 </span>
        <el-date-picker
          v-model="changeCreateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> 账变时间 </span>
        <el-date-picker
          v-model="changeUpdateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd"
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
        @click="getTableList()"
      >
        查询
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总钱包数</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalWalletNum }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总余额</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalAssetBalance }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总平台转入</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalUserIn }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总抽奖次数</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalCollectionAmount }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总GAS</div>
          <div class="val">
            {{ statisticsData && statisticsData.totalPlatformInGas }}
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="ID" align="center"> </el-table-column>
      <el-table-column
        prop="walletAddress"
        label="地址"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="userName" label="所属用户" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.userId }}</p>
          <p>{{ scope.row.userName }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="chainName" label="链" align="center">
      </el-table-column>
      <el-table-column prop="coin" label="币种" align="center">
      </el-table-column>
      <el-table-column prop="assetBalance" label="余额" align="center">
      </el-table-column>
      <el-table-column prop="platformIn" label="平台转入" align="center">
      </el-table-column>
      <el-table-column prop="lotteryNum" label="抽奖次数" align="center">
      </el-table-column>
      <el-table-column prop="lotteryGas" label="GAS" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="最后账变时间" align="center">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.updateTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="资产详情" align="center">
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
export default {
  name: "walletUnboxLottery",
  // 模板引入
  components: { chainExplorerSkip },
  // 数据
  data() {
    return {
      Id: null, // Id
      obscureField: null, // 用户ID/昵称
      coin: null, //币种
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
      const res = await this.$http.getWalleBoxLotteryList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const statisticsData = await this.$http.getWalletBoxLotteryStatistics(
        data
      );
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
