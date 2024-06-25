<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 140px;" placeholder="输入流水号" v-model="Id" clearable />
      <el-input class="public-input" style="width: 140px;" placeholder="输入用户ID" v-model="userId" clearable />
      <el-select v-model="flowSource" class="public-select-box" popper-class="public-select-box" placeholder="全部来源"
        clearable>
        <el-option label="注册" value="REG">
        </el-option>
        <el-option label="消费" value="CONSUME">
        </el-option>
        <el-option label="邀请" value="INVITE">
        </el-option>
        <el-option label="下级消费" value="DOWN_CONSUME">
        </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration">
          账变时间
        </span>
        <el-date-picker v-model="changeTime" type="datetimerange" range-separator="到" start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchAssetPointFlowList()">
        查询
      </el-button>
      <el-button type="primary" icon="el-icon-download" class="public-search" @click="onExport()">
        导出
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总流水数</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.flowNumberTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总积分产出</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.pointOutputTotal }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column prop="id" sortable="custom" label="流水号" align="center" key="1">
      </el-table-column>
      <el-table-column prop="userName" sortable="custom" width="120" label="用户" align="center" key="2">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">{{ scope.row.userId || '--' }}</p>
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">{{ scope.row.userName || '--' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="flowSource" sortable="custom" label="来源" align="center" key="3">
        <template slot-scope="scope">
          <span v-if="scope.row.flowSource == 'REG'">注册</span>
          <span v-if="scope.row.flowSource == 'CONSUME'">消费</span>
          <span v-if="scope.row.flowSource == 'INVITE'">邀请</span>
          <span v-if="scope.row.flowSource == 'DOWN_CONSUME'">下级消费</span>
        </template>
      </el-table-column>
      <el-table-column prop="downId" sortable="custom" label="下级ID" align="center" key="4">
      </el-table-column>
      <el-table-column prop="orderNumber" label="交易单号" align="center" key="5">
      </el-table-column>
      <el-table-column prop="changePoint" sortable="custom" label="数量" align="center" key="6">
      </el-table-column>
      <el-table-column prop="totalPoint" sortable="custom" label="总积分" align="center" key="7">
      </el-table-column>
      <el-table-column prop="createTime" sortable="custom" label="账变时间" align="center" key="8">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, 'YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="baseUserPage && baseUserPage.total" background @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="page" :page-sizes="pagination.pageSizes" :page-size="size"
      layout=" sizes, prev, pager, next, jumper" :total="baseUserPage.total" class="public-pagination">
    </el-pagination>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr, exportExcel } from '@/utils';
import pagination from '@/mixins/pagination';
import config from "@/config/env";
export default {
  name: 'IntegralTurnover',
  // 模板引入
  components: {
  },
  // 数据
  data() {
    return {
      Id: null, // Id
      userId: null, // 用户ID
      flowSource: null, // 来源
      changeTime: null, // 账变时间
      sortData: {
        orderBy: null,
        orderType: null
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { changeTime } = this;
      let startTime = null;
      let endTime = null;
      if (changeTime && changeTime[0]) {
        startTime = timeForStr(changeTime[0], 'YYYY-MM-DD HH:mm:ss');
      }
      if (changeTime && changeTime[1]) {
        endTime = timeForStr(changeTime[1], 'YYYY-MM-DD HH:mm:ss');
      }

      return {
        id: this.Id, // 闪兑Id
        userId: this.userId, // 用户ID
        flowSource: this.flowSource, // 来源
        startTime,
        endTime
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

      this.fetchAssetPointFlowList();
    },
    // 加载列表
    async fetchAssetPointFlowList(isSearch = true) {
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
      const res = await this.$http.getAssetPointFlowList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getAssetPointFlowStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 列表导出
    onExport() {
      const search = this.searchFun();
      const urlStr = config.api + '/asset-point-flow/exportExcel';
      const { coin, userType } = this;
      const data = {
        ...{
          coin: coin,
          userType: userType
        },
        ...search,
      };

      exportExcel(urlStr, data, "积分流水导出")
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchAssetPointFlowList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchAssetPointFlowList(false);
    },
  },
  // 创建后
  created() {
    this.fetchAssetPointFlowList();
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
  mounted() { },
  // 更新后
  updated() { },
  // 销毁
  beforeDestroy() { },
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

  &>div {
    min-width: 200px;
  }
}

.remittance-more {
  display: flex;
}
</style>
