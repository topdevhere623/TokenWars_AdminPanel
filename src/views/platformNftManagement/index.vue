<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 140px" placeholder="输入系列名" v-model="seriesName" clearable />
      <el-input class="public-input" style="width: 140px" placeholder="输入NFT ID" v-model="Id" clearable />
      <el-select v-model="chainName" class="public-select-box" placeholder="所在链">
        <el-option v-for="(item, index) in chainList" :key="index" :label="item.chainName" :value="item.chainName" />
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> 价格区间 </span>
        <el-input
          type="number"
          style="width: 120px; border: 1px solid #dcdfe6; border-radius: 4px"
          placeholder="最低价"
          v-model="startPrice"
          clearable
        />
        <el-input
          type="number"
          style="width: 120px; border: 1px solid #dcdfe6; border-radius: 4px"
          placeholder="最高价"
          v-model="endPrice"
          clearable
        />
      </div>
      <el-select v-model="nftStatus" class="public-select-box" popper-class="public-select-box" placeholder="全部状态" clearable>
        <el-option label="已入池" value="IN_POOL"> </el-option>
        <el-option label="未入池" value="NO_POOL"> </el-option>
        <el-option label="待确认" value="WAIT"> </el-option>
        <el-option label="被领取" value="BE_CLAIMED"> </el-option>
        <el-option label="已提走" value="MENTIONED"> </el-option>
      </el-select>
      <el-select v-model="enabledStatus" class="public-select-box" popper-class="public-select-box" placeholder="全部入池状态" clearable>
        <el-option label="冻结" value="DISABLE"> </el-option>
        <el-option label="正常" value="NORMAL"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> 创建时间 </span>
        <el-date-picker
          v-model="creationTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchNftPlatformManagerList()"> 查询 </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">藏品数量</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总价值</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.priceTotal }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column prop="id" sortable="custom" label="NFT ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="nftImg" label="NFT图片" width="120px" align="center" key="2">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image style="height: 100%" :src="scope.row.nftImg" :preview-src-list="[scope.row.nftImg]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" sortable="custom" width="120" label="NFT系列名称" align="center" key="3"> </el-table-column>
      <el-table-column prop="contractAddress" label="合约" align="center" key="4"> </el-table-column>
      <el-table-column prop="projectParty" label="项目方" align="center" key="7"> </el-table-column>
      <el-table-column prop="chainName" label="所在链" align="center" key="8"> </el-table-column>
      <el-table-column prop="price" sortable="custom" width="120" :label="`当前价(${coin})`" align="center" key="9"> </el-table-column>
      <el-table-column prop="usdtPrice" sortable="custom" label="U价" align="center" key="10"> </el-table-column>
      <el-table-column prop="relevancyBoxNumber" sortable="custom" label="关联盲盒" align="center" key="12"> </el-table-column>
      <el-table-column prop="openNumber" sortable="custom" label="被开次数" align="center" key="13"> </el-table-column>
      <el-table-column prop="outNumber" sortable="custom" label="提走次数" align="center" key="14"> </el-table-column>
      <el-table-column prop="refunds" sortable="custom" label="总退款" align="center" key="15"> </el-table-column>
      <el-table-column prop="nftStatus" sortable="custom" label="当前状态" align="center" key="16">
        <template slot-scope="scope">
          <span style="color: #05a8f0" v-if="scope.row.nftStatus == 'IN_POOL'">已入池</span>
          <span style="color: #ec5706" v-if="scope.row.nftStatus == 'NO_POOL'">未入池</span>
          <span style="color: #000" v-if="scope.row.nftStatus == 'WAIT'">待确认</span>
          <span style="color: #31ce0b" v-if="scope.row.nftStatus == 'BE_CLAIMED'">被领取</span>
          <span style="color: #bbbbbb" v-if="scope.row.nftStatus == 'MENTIONED'">已提出</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" sortable="custom" width="140" label="创建时间" align="center" key="18">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="enabledStatus" label="能否入池" align="center" key="19">
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.enabledStatus == 'DISABLE'">冻结</span>
          <span style="color: #21ae04" v-else>正常</span>
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
