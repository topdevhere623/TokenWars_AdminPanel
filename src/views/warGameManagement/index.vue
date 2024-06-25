<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 220px" placeholder="输入局数" v-model.number.trim="gameNum" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="输入订单号" v-model="orderNum" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="输入 用户ID/昵称" v-model="userName" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="输入hash" v-model="transactionId" clearable />
      <el-select class="public-input" v-model="status" placeholder="全部状态" clearable style="width: 120px">
        <el-option label="待开奖" value="WAIT" />
        <el-option label="已开奖" value="OPEN" />
        <el-option label="已退款" value="REFUNDED" />
        <el-option label="已取消" value="CANCELED" />
      </el-select>
      <el-select class="public-input" v-model="bigPrizeStatus" placeholder="是否大奖" clearable style="width: 120px">
        <el-option label="是" value="TRUE" />
        <el-option label="否" value="FALSE" />
      </el-select>

      <div class="public-date-box">
        <span class="demonstration">交易时间</span>
        <el-date-picker
          v-model="transactionTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchWarGameList()"> 查询 </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">轮数</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.numberOfRounds }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总投注额</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.currentBankroll }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总冠军收入</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalWinerIncome }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总手续费</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalHandlingFee }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总大奖积累</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalAwardAccumulation }}
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column sortable="custom" prop="id" label="局数" align="center" key="1"> </el-table-column>
      <el-table-column prop="orderNumber" width="140px" label="订单号" align="center" key="3"></el-table-column>
      <el-table-column sortable="custom" prop="jackpot" label="奖池" align="center" key="4"> </el-table-column>
      <el-table-column sortable="custom" prop="participant" label="参与者" align="center" key="5">
        <template slot-scope="scope">
          <div style="cursor: pointer; color: #00bdff" @click="openParticipant(scope.row)">
            {{ scope.row.participant }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="openId" label="中奖ID" align="center" key="6"> </el-table-column>
      <el-table-column prop="userId" label="中奖用户" align="center" key="7">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.winerUserType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.winerUserId || "--" }}
          </p>
          <p :style="{ color: scope.row.winerUserType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.winerUserName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="winerBuyPrice" label="冠军消费" sortable="custom" align="center" key="8"> </el-table-column>
      <el-table-column sortable="custom" prop="winerMultipleRate" label="中奖倍率" align="center" key="9"> </el-table-column>
      <el-table-column sortable="custom" prop="winerIncome" label="冠军收入" align="center" key="10"> </el-table-column>
      <el-table-column prop="warFee" label="战争手续费" align="center" key="11"> </el-table-column>
      <el-table-column prop="inBigPrize" label="入奖池" align="center" key="14"> </el-table-column>
      <el-table-column prop="totalBigPrize" label="大奖累计" sortable="custom" align="center" key="15"> </el-table-column>
      <el-table-column prop="totalBigPrize" label="是否大奖" sortable="custom" align="center" key="16">
        <template slot-scope="scope">
          {{ scope.row.bigPrizeStatus == "TRUE" ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="currentStatus" label="状态" align="center" key="17" fixed="right">
        <template slot-scope="scope">
          <span style="color: #00bdff" v-if="scope.row.currentStatus == 'WAIT'"> 待开奖 </span>
          <span style="color: #05ac04" v-if="scope.row.currentStatus == 'OPEN'"> 已开奖 </span>
          <span style="color: #ff0000" v-if="scope.row.currentStatus == 'REFUNDED'"> 已退款 </span>
          <span style="color: #b7b7b7" v-if="scope.row.currentStatus == 'CANCELED'"> 已取消 </span>
        </template>
      </el-table-column>
      <el-table-column prop="lotteryTime" width="140px" label="开奖时间" align="center" key="18" fixed="right">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.lotteryTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="hash" width="140px" label="开奖hash" align="center" key="19" fixed="right"> </el-table-column>
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
    <el-dialog title="参与者" :visible.sync="dialogVisible" width="30%">
      <div class="public-list-inputs">
        <el-input class="public-input" style="width: 200px" placeholder="输入玩家昵称/ID" v-model="openId" clearable />
        <el-button type="primary" icon="el-icon-search" class="public-search" @click="openParticipant()"> 查询 </el-button>
      </div>
      <el-table :data="participantData" style="width: 100%" border>
        <el-table-column prop="userId" label="参与者" align="center" key="1">
          <template slot-scope="scope">
            <p
              :style="{
                color: scope.row.userIsTest == 'INNER' ? 'red' : '#000',
              }"
            >
              {{ scope.row.userId || "--" }}
            </p>
            <p
              :style="{
                color: scope.row.userIsTest == 'INNER' ? 'red' : '#000',
              }"
            >
              {{ scope.row.userName || "--" }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="buyPrice" label="投注额" align="center" key="2"> </el-table-column>
        <el-table-column prop="createTime" label="中奖ID" align="center" key="3">
          <template slot-scope="scope">
            <span>{{ `${scope.row.startNumber} - ${scope.row.endNumber}` }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { accurateDecimal, timeForStr, openUrl } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "NftBuyRecord",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      gameNum: null,
      orderNum: null,
      userName: null,
      status: null,
      bigPrizeStatus: null,
      transactionId: null,
      transactionTime: null,
      page: 1,
      size: 20,
      tableData: null,
      aggregateQuery: null,
      baseUserPage: null,
      sortData: {
        orderBy: null,
        orderType: null,
      },
      ethPic: require("@/assets/images/create_eth.webp"),
      dialogVisible: false,
      participantData: {},
      openId: null,
      row: {},
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    accurateDecimal: accurateDecimal,
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    openUrl: openUrl,
    searchFun() {
      let { transactionTime } = this;
      let startTime = null;
      let endTime = null;

      if (transactionTime && transactionTime[0]) {
        startTime = timeForStr(transactionTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (transactionTime && transactionTime[1]) {
        endTime = timeForStr(transactionTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        id: this.gameNum,
        orderNumber: this.orderNum,
        obscureField: this.userName,
        hash: this.transactionId,
        currentStatus: this.status,
        bigPrizeStatus: this.bigPrizeStatus,
        startTime,
        endTime,
      };
    },
    // 加载列表
    async fetchWarGameList(isSearch = true) {
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
      const res = await this.$http.getWarGameList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getWarGameStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    sortChange({ column, prop, order }) {
      this.sortData.orderBy = prop;
      this.sortData.orderType = order == "descending" ? "DESC" : "ASC";
      if (!order) {
        this.sortData.orderType = null;
      }

      this.fetchWarGameList();
    },
    // 参与者列表
    async openParticipant(row) {
      if (row) {
        this.row = row;
      }
      let res = await this.$http.getWarGameParticipant({
        id: this.row.id,
        openId: this.openId,
      });
      if (res) {
        this.participantData = res;
        this.dialogVisible = true;
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchWarGameList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchWarGameList(false);
    },
  },
  // 创建后
  created() {
    this.fetchWarGameList();
  },
  // 计算属性
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
