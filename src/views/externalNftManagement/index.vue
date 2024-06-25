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
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter token ID"
        v-model="tokenId"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Input project party"
        v-model="projectParty"
        clearable
      />
      <el-select
        v-model="chainName"
        class="public-select-box"
        placeholder="Chain"
        clearable
      >
        <el-option
          v-for="(item, index) in chainList"
          :key="index"
          :label="item.chainName"
          :value="item.chainName"
        />
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> 价格区间 </span>
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
        <el-option label="unavailable" value="NO_AVAILABLE"> </el-option>
      </el-select>
      <el-select
        v-model="enabledStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All frozen state"
        clearable
      >
        <el-option label="freeze" value="DISABLE"> </el-option>
        <el-option label="normal" value="NORMAL"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> Last time </span>
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
        @click="fetchNftExternalManagerList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="public-search"
        @click="nftExternalFlushed()"
      >
        refresh
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Number of collections</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.collNumberTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Always open</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.openNumberTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">total value</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.priceTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Always take away</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.outNumberTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total refund</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.refundsTotal }}
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
      <el-table-column prop="id" sortable="custom" label="nft ID" align="center" key="1">
      </el-table-column>
      <el-table-column prop="tokenId" label="token Id" align="center" key="2">
      </el-table-column>
      <el-table-column
        prop="nftImg"
        label="NFT picture"
        width="120px"
        align="center"
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
      <el-table-column
        prop="seriesName"
        sortable="custom"
        width="120"
        label="NFT series name"
        align="center"
        key="4"
      >
      </el-table-column>
      <el-table-column prop="contractAddress" label="contract" align="center" key="5">
      </el-table-column>
      <el-table-column prop="projectParty" label="Project party" align="center" key="6">
      </el-table-column>
      <el-table-column prop="nftSource" label="source" align="center" key="7">
      </el-table-column>
      <el-table-column prop="userName" label="Subordinate" align="center" key="8">
      </el-table-column>
      <el-table-column prop="chainName" label="Chain" align="center" key="9">
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        width="120"
        :label="`Current price ($ {'eth'})`"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        :label="`The current price ($ {coin})`"
        align="center"
        key="16"
        width="100px"
      >
        <template slot-scope="scope">
          {{ (scope.row.usdtLastPrice * scope.row.price).toFixed(4) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="relevancyBoxNumber"
        sortable="custom"
        label="Associated blind box"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="openNumber"
        sortable="custom"
        label="Number of times"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="outNumber"
        sortable="custom"
        label="Take the number of times"
        align="center"
        key="13"
      >
      </el-table-column>
      <el-table-column
        prop="refunds"
        sortable="custom"
        label="Total refund"
        align="center"
        key="14"
      >
      </el-table-column>
      <el-table-column prop="nftStatus" label="Current state" align="center" key="15">
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
          <span style="color: #bbbbbb" v-if="scope.row.nftStatus == 'NO_AVAILABLE'"
            >unavailable</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="refreshTime"
        sortable="custom"
        width="140"
        label="Refresh last time"
        align="center"
        key="16"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.refreshTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="prizeTime"
        sortable="custom"
        width="140"
        label="Last time"
        align="center"
        key="17"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.prizeTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="enabledStatus"
        sortable="custom"
        label="Can you enter the pool"
        align="center"
        key="18"
      >
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.enabledStatus == 'DISABLE'"
            >freeze</span
          >
          <span style="color: #21ae04" v-else>normal</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="operate"
        align="center"
        width="110"
        key="19"
        fixed="right"
      >
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="operatingNft(scope.row)">
            {{ scope.row.enabledStatus == "DISABLE" ? "Ban" : "freeze" }}
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
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import { chainList } from "@/utils/chain";
export default {
  name: "ExternalNftManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null,
      tokenId: null, // NFT Id
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
        Id: this.Id,
        tokenId: this.tokenId, // NFT Id
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

      this.fetchNftExternalManagerList();
    },
    // 加载列表
    async fetchNftExternalManagerList(isSearch = true) {
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
      const res = await this.$http.getNftExternalManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getNftExternalManagerStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 刷新
    async nftExternalFlushed() {
      const res = await this.$http.nftExternalFlushed();
      if (res) {
        this.fetchNftExternalManagerList();
        this.$message.success("Successful operation");
      }
    },
    // 冻结/解禁
    operatingNft(row) {
      this.$confirm(
        `Determine${row.enabledStatus == "DISABLE" ? "Ban" : "freeze"}NFT series『${
          row.seriesName || row.id
        }?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          let res = null;
          if (row.enabledStatus == "DISABLE") {
            // 解禁
            res = await this.$http.nftExternalThaw({
              id: row.id,
            });
          } else {
            // 冻结
            res = await this.$http.ntExternalFreeze({
              id: row.id,
            });
          }
          if (res) {
            this.fetchNftExternalManagerList();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchNftExternalManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchNftExternalManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchNftExternalManagerList();
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
