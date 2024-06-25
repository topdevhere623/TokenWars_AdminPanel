<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 220px" placeholder="输入ID、名称" v-model="Id" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="输入市场名称" v-model="marketName" clearable />
      <el-select v-model="marketStatus" class="public-select-box" popper-class="public-select-box" placeholder="全部状态" clearable>
        <el-option label="封停" value="DISABLE"> </el-option>
        <el-option label="正常" value="NORMAL"> </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchMarketManagerList()"> 查询 </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="市场ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="marketName" label="市场名称" align="center" key="2"> </el-table-column>
      <el-table-column prop="chainName" label="所在链" align="center" key="3"> </el-table-column>
      <el-table-column prop="contractAddress" label="合约" align="center" key="4"> </el-table-column>
      <el-table-column prop="id" label="操作" align="center" width="110" key="17">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="operatingMarket(scope.row)">
            {{ scope.row.marketStatus == "DISABLE" ? "解禁" : "冻结" }}
          </span>
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
import pagination from "@/mixins/pagination";
export default {
  name: "MarketManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null,
      marketName: null,
      marketStatus: null,
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    onSearch() {},
    // 加载列表
    async fetchMarketManagerList(isSearch = true) {
      const { size } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        id: this.Id,
        marketName: this.marketName,
        marketStatus: this.marketStatus,
        size: size,
        page: _page,
      };
      const res = await this.$http.getMarketManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }
    },
    // 冻结/解禁
    operatingMarket(row) {
      this.$confirm(`确定要${row.marketStatus == "DISABLE" ? "解禁" : "冻结"}市场『${row.marketName || row.id}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = null;
          if (row.marketStatus == "DISABLE") {
            // 解禁
            res = await this.$http.marketThaw({
              id: row.id,
            });
          } else {
            // 冻结
            res = await this.$http.marketFreeze({
              id: row.id,
            });
          }
          if (res) {
            this.fetchMarketManagerList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchMarketManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchMarketManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchMarketManagerList();
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
