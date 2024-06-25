<template>
  <div class="page-wrapper">
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column
        prop="walletAddress"
        label="address"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="chainType" label="chain" align="center"> </el-table-column>
      <el-table-column prop="balance" label="Balance" align="center">
        <template slot-scope="scope">
          {{ scope.row.balance + scope.row.coin }}
        </template>
      </el-table-column>
      <el-table-column prop="transferOutTotal" label="Always transfer" align="center">
        <template slot-scope="scope">
          {{ scope.row.transferInTotal || 0 + scope.row.coin }}
        </template>
      </el-table-column>
      <el-table-column prop="totalConsumption" label="Total consumption" align="center">
        <template slot-scope="scope">
          {{ scope.row.totalConsumption + scope.row.coin }}
        </template>
      </el-table-column>
      <el-table-column prop="gasTotal" label="Total Gas" align="center">
        <template slot-scope="scope">
          {{ scope.row.gasTotal + scope.row.coin }}
        </template>
      </el-table-column>
      <el-table-column prop="traNumber" label="Number of transactions" align="center">
      </el-table-column>
      <el-table-column prop="collNumber" label="Collect quantity" align="center">
      </el-table-column>
      <el-table-column label="Asset details" align="center">
        <template slot-scope="scope">
          <chainExplorerSkip :chain="scope.row.chainType" hash="" />
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
  name: "walletOneDollarLottery",
  // 模板引入
  components: { chainExplorerSkip },
  // 数据
  data() {
    return {
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 加载列表
    async getTableList(isSearch = true) {
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
      };
      const res = await this.$http.getWalleBuyNftList(data);
      if (res) {
        this.tableData = res;
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
