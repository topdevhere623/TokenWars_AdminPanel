<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 140px;" placeholder="输入流水号" v-model="flowId" clearable />
      <el-input class="public-input" style="width: 140px;" placeholder="输入用户ID" v-model="userId" clearable />
      <el-input class="public-input" style="width: 140px;" placeholder="输入上级ID" v-model="upId" clearable />
      <div class="public-date-box">
        <span class="demonstration">
          账变时间
        </span>
        <el-date-picker v-model="changeTime" type="datetimerange" range-separator="到" start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchRebatesRecordList()">
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
          <div class="val">{{ aggregateQuery && aggregateQuery.flowNumbers }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总佣金</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.rebatesAmounts }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总金额</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.traAmounts }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column prop="flowId" sortable="custom" label="流水号" align="center" key="1">
      </el-table-column>
      <el-table-column prop="userName" width="120" sortable="custom" label="用户" align="center" key="2">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">{{ scope.row.userId || '--' }}</p>
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">{{ scope.row.userName || '--' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="userName" width="120" sortable="custom" label="上级" align="center" key="3">
        <template slot-scope="scope">
          <p>{{ scope.row.upId || '--' }}</p>
          <p>{{ scope.row.upUserName || '--' }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="rebatesType" sortable="custom" label="行为" align="center" key="4">
        <template slot-scope="scope">
          <span v-if="scope.row.rebatesType == 'CONSUME'">消费</span>
        </template>
      </el-table-column>
      <el-table-column prop="orderNumber" label="订单号" align="center" key="5">
      </el-table-column>
      <el-table-column prop="traAmount" sortable="custom" :label="`金额(${coin})`" align="center" key="6">
      </el-table-column>
      <el-table-column prop="rebateRate" label="返佣比例" align="center" key="7">
      </el-table-column>
      <el-table-column prop="rebatesAmount" sortable="custom" :label="`佣金(${coin})`" align="center" key="8">
      </el-table-column>
      <el-table-column prop="createTime" sortable="custom" label="账变时间" align="center" key="9">
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
  name: 'RebateRecord',
  // 模板引入
  components: {
  },
  // 数据
  data() {
    return {
      flowId: null, // Id
      userId: null, // 用户Id
      upId: null, // 上级Id
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
        flowId: this.flowId, // 流水Id
        userId: this.userId, // 用户Id
        upId: this.upId, // 来源
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

      this.fetchRebatesRecordList();
    },
    // 加载列表
    async fetchRebatesRecordList(isSearch = true) {
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
      const res = await this.$http.getRebatesRecordList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getRebatesRecordStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 列表导出
    onExport() {
      const search = this.searchFun();
      const urlStr = config.api + '/rebates-record/exportExcel';
      const { coin, userType } = this;
      const data = {
        ...{
          coin: coin,
          userType: userType
        },
        ...search,
      };

      exportExcel(urlStr, data, "返佣记录导出")
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchRebatesRecordList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchRebatesRecordList(false);
    },
  },
  // 创建后
  created() {
    this.fetchRebatesRecordList();
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
