<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter the series name"
        v-model="seriesName"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter NFT ID"
        v-model="Id"
        clearable
      />
      <el-select v-model="chainName" class="public-select-box" placeholder="Chain">
        <el-option
          v-for="(item, index) in chainList"
          :key="index"
          :label="item.chainName"
          :value="item.chainName"
        />
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> Price range </span>
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
      <el-select
        v-model="nftStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All states"
        clearable
      >
        <el-option label="Have entered the pool" value="IN_POOL"> </el-option>
        <el-option label="Not entering the pool" value="NO_POOL"> </el-option>
        <el-option label="to be confirmed" value="WAIT"> </el-option>
        <el-option label="Be obtained" value="BE_CLAIMED"> </el-option>
        <el-option label="Have taken away" value="MENTIONED"> </el-option>
      </el-select>
      <el-select
        v-model="enabledStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All entering the pool"
        clearable
      >
        <el-option label="freeze" value="DISABLE"> </el-option>
        <el-option label="normal" value="NORMAL"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> Creation time </span>
        <el-date-picker
          v-model="creationTime"
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
        @click="fetchNftPlatformManagerList()"
      >
        Inquire
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Number of collections</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">total value</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.priceTotal }}</div>
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
      <el-table-column prop="id" sortable="custom" label="nft ID" align="center" key="1">
      </el-table-column>
      <el-table-column
        prop="nftImg"
        label="NFT picture"
        width="120px"
        align="center"
        key="2"
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
      <el-table-column
        prop="seriesName"
        sortable="custom"
        width="120"
        label="NFT series name"
        align="center"
        key="3"
      >
      </el-table-column>
      <el-table-column prop="contractAddress" label="contract" align="center" key="4">
      </el-table-column>
      <el-table-column prop="projectParty" label="Project party" align="center" key="7">
      </el-table-column>
      <el-table-column prop="chainName" label="Chain" align="center" key="8">
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        width="120"
        :label="`The current price ($ {coin})`"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column
        prop="usdtPrice"
        sortable="custom"
        label="U price"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="relevancyBoxNumber"
        sortable="custom"
        label="Associated blind box"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="openNumber"
        sortable="custom"
        label="Number of times"
        align="center"
        key="13"
      >
      </el-table-column>
      <el-table-column
        prop="outNumber"
        sortable="custom"
        label="Take the number of times"
        align="center"
        key="14"
      >
      </el-table-column>
      <el-table-column
        prop="refunds"
        sortable="custom"
        label="Total refund"
        align="center"
        key="15"
      >
      </el-table-column>
      <el-table-column
        prop="nftStatus"
        sortable="custom"
        label="Current state"
        align="center"
        key="16"
      >
        <template slot-scope="scope">
          <span style="color: #05a8f0" v-if="scope.row.nftStatus == 'IN_POOL'"
            >Have entered the pool</span
          >
          <span style="color: #ec5706" v-if="scope.row.nftStatus == 'NO_POOL'"
            >Not entering the pool</span
          >
          <span style="color: #000" v-if="scope.row.nftStatus == 'WAIT'"
            >to be confirmed</span
          >
          <span style="color: #31ce0b" v-if="scope.row.nftStatus == 'BE_CLAIMED'"
            >Be obtained</span
          >
          <span style="color: #bbbbbb" v-if="scope.row.nftStatus == 'MENTIONED'"
            >Proposed</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        width="140"
        label="Creation time"
        align="center"
        key="18"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="enabledStatus"
        label="Can you enter the pool"
        align="center"
        key="19"
      >
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.enabledStatus == 'DISABLE'"
            >freeze</span
          >
          <span style="color: #21ae04" v-else>normal</span>
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
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import { chainList } from "@/utils/chain";
export default {
  name: "PlatformNftManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null, // NFT Id
      seriesName: null, // 系列名
      projectParty: null, // 项目方
      chainName: null, // 链名称
      startPrice: null, // 开始价格
      endPrice: null, // 结束价格
      nftStatus: null, // NFT状态
      enabledStatus: null, // 入池状态
      creationTime: null, // 创建时间
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,
      chainList: chainList,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { creationTime } = this;
      let startTime = null;
      let endTime = null;
      if (creationTime && creationTime[0]) {
        startTime = timeForStr(creationTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (creationTime && creationTime[1]) {
        endTime = timeForStr(creationTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        id: this.Id, // NFT Id
        seriesName: this.seriesName, // 系列名
        projectParty: this.projectParty, // 项目方
        chainName: this.chainName,
        startPrice: this.startPrice,
        endPrice: this.endPrice,
        nftStatus: this.nftStatus,
        enabledStatus: this.enabledStatus,
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

      this.fetchNftPlatformManagerList();
    },
    // 加载列表
    async fetchNftPlatformManagerList(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size, coin, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          coin: coin,
          userType: userType,
          size: size,
          page: _page,
        },
        ...sortData,
        ...search,
      };
      const res = await this.$http.getNftPlatformManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getNftPlatformManagerStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchNftPlatformManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchNftPlatformManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchNftPlatformManagerList();
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
