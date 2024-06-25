<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter flowing water number"
        v-model="id"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter user ID"
        v-model="userId"
        clearable
      />
      <el-select
        v-model="flowType"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All gold flow type"
        clearable
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in flowTypeOptions"
          :key="item.value"
        >
        </el-option>
      </el-select>
      <!-- <el-select
        v-model="flowSource"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All series"
        clearable
      >
        <el-option label="平台" value="PLATFORM"> </el-option>
        <el-option label="钱包" value="WALLET"> </el-option>
        <el-option label="返佣" value="REBATES"> </el-option>
        <el-option label="余额" value="BALANCE"> </el-option>
        <el-option label="回收" value="RECLAIM"> </el-option>
      </el-select> -->
      <el-select
        v-model="flowSource"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All sources"
        clearable
      >
        <el-option
          :label="item.label"
          :value="item.value"
          v-for="item in flowSourceOptions"
          :key="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Series name"
        v-model="seriesName"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 100px"
        placeholder="Enter token id"
        v-model="tokenId"
        clearable
      />
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
    <el-table
      :data="tableData"
      style="width: 100%"
      @sort-change="sortChange"
      class="public-table"
      border
    >
      <el-table-column
        sortable="custom"
        prop="id"
        label="serial number"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column prop="userId" width="120" label="User ID" align="center" key="3">
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
        prop="flowType"
        label="Golden flow"
        align="center"
        key="4"
      >
        <template slot-scope="scope">
          {{ getTxtFunc(flowTypeOptions, scope.row.flowType) }}
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="flowSource"
        label="source"
        align="center"
        key="5"
      >
        <template slot-scope="scope">
          {{ getTxtFunc(flowSourceOptions, scope.row.flowSource) }}
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="seriesName"
        label="series"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="tokenId"
        label="token ID"
        align="center"
        key="7"
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="orderNumber"
        label="order number"
        align="center"
        key="8"
      >
      </el-table-column>
      <el-table-column prop="hash" label="hash" align="center" key="9"> </el-table-column>
      <el-table-column
        prop="walletAddress"
        label="Wallet address"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="createTime"
        label="Account change time"
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
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "CashManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      id: null, // NFT Id
      userId: null, // 系列名
      flowType: null, // 流水状态
      flowSource: null, // 流水来源
      seriesName: null,
      tokenId: null,
      changeTime: null, // 账变时间
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      flowTypeOptions: [
        { label: "Deposit", value: "DEPOSIT" },
        { label: "extract", value: "EXTRACT" },
        { label: "Sell", value: "SOLD" },
        { label: "get", value: "OBTAIN" },
      ],
      flowSourceOptions: [
        { label: "wallet", value: "WALLET" },
        { label: "in stock", value: "INVENTORY" },
        { label: "One -dollar purchase", value: "ONE_DOLLAR" },
        { label: "Blind box", value: "BOX" },
      ],
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { id, userId, flowType, flowSource, seriesName, tokenId, changeTime } = this;
      let startTime = null;
      let endTime = null;
      if (changeTime && changeTime[0]) {
        startTime = timeForStr(changeTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (changeTime && changeTime[1]) {
        endTime = timeForStr(changeTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        id,
        userId,
        flowType,
        flowSource,
        seriesName,
        tokenId,
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

      this.fetchAssetFlowList();
    },
    // 加载列表
    async fetchAssetFlowList(isSearch = true) {
      const search = this.searchFun();
      const { size, sortData, userType } = this;
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
        userType,
        ...sortData,
        ...search,
      };
      const res = await this.$http.getNftFlowPageList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }
    },
    getTxtFunc(options, value) {
      if (!value) return "";
      const matchedOption = options.find((option) => option.value === value);
      const label = matchedOption ? matchedOption.label : "";
      return label;
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
  computed: {
    userType() {
      return this.$store.getters.accountConfig;
    },
  },
  // 创建后
  created() {
    this.fetchAssetFlowList();
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
