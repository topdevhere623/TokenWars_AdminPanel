<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 220px" placeholder="输入订单号" v-model="orderNum" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="输入 用户ID/昵称" v-model="userName" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="输入票号" v-model="num" clearable />
      <el-select class="public-input" v-model="winningStatus" placeholder="中奖状态" clearable style="width: 120px">
        <el-option label="已中奖" value="YES" />
        <el-option label="未中奖" value="NO" />
      </el-select>
      <el-select class="public-input" v-model="status" placeholder="全部状态" clearable style="width: 120px">
        <el-option label="待开奖" value="TO_BE_AWARDED" />
        <el-option label="已开奖" value="AWARDED" />
        <el-option label="已退款" value="REFUNDED" />
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> 消费区间 </span>
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
      <div class="public-date-box">
        <span class="demonstration"> 交易时间 </span>
        <el-date-picker
          v-model="transactionTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchOneNftLotteryOrdersManagerList()">
        查询
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">订单数</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.numberOfOrders }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总票数</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.numberOfUnpacks }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总金额</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalConsumption }}</div>
        </div>
        <!-- <div class="remittance-item">
          <div class="title">总返奖</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalRebates }}</div>
        </div> -->
        <div class="remittance-item">
          <div class="title">总佣金</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalCommission }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column sortable="custom" prop="orderNum" label="订单号" align="center" key="1"> </el-table-column>
      <el-table-column prop="image" label="NFT图" align="center" key="3">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image style="height: 100%" v-if="scope.row.orderType == 'LIMITED_PRICE_COIN'" :src="ethPic" :preview-src-list="[ethPic]">
            </el-image>
            <el-image style="height: 100%" v-else :src="scope.row.image" :preview-src-list="[scope.row.image]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="name" label="商品" align="center" key="4">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == 'LIMITED_PRICE_COIN'">
            {{ scope.row.price ? `${scope.row.price} ${"ETH" || scope.row.coinName}` : "--" }}
          </span>
          <span v-else>{{ `${scope.row.name} #${scope.row.orderId}` }}</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="tickets" label="票数" align="center" key="5"> </el-table-column>
      <el-table-column sortable="custom" label="票号" align="center" key="6">
        <template slot-scope="scope">
          {{ `${scope.row.startNumbers}-${scope.row.endNumbers}` }}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="下单用户" align="center" key="7">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userIsTest == 'INNER' ? 'red' : '#000' }">{{ scope.row.userId || "--" }}</p>
          <p :style="{ color: scope.row.userIsTest == 'INNER' ? 'red' : '#000' }">{{ scope.row.username || "--" }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="expenditure" label="推广信息" align="center" key="8">
        <template slot-scope="scope">
          <span v-if="scope.row.twitterInfo" @click="openPromotion(scope.row)" style="color: #05a8f0; cursor: pointer">查看</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="expenditure" label="消费" align="center" key="9"> </el-table-column>
      <el-table-column sortable="custom" prop="winningStatus" label="中奖" align="center" key="10">
        <template slot-scope="scope">
          <span v-if="scope.row.winningStatus == 'YES'" style="color: #67c23a">已中奖</span>
          <span v-else>未中奖</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentChannel" label="消费渠道" align="center" key="11"> </el-table-column>
      <el-table-column prop="expenditureSerialId" label="消费流水号" align="center" key="14"> </el-table-column>
      <el-table-column prop="refundSerialId" label="退款流水号" align="center" key="15"> </el-table-column>
      <el-table-column sortable="custom" prop="status" label="状态" align="center" key="17" fixed="right">
        <template slot-scope="scope">
          <span style="color: #05a8f0" v-if="scope.row.status == 'TO_BE_AWARDED'">待开奖</span>
          <span style="color: #31ce0b" v-if="scope.row.status == 'REFUNDED'">已退款</span>
          <span style="color: #bbbbbb" v-if="scope.row.status == 'AWARDED'">已开奖</span>
        </template>
      </el-table-column>
      <el-table-column sortable="custom" prop="paymentTime" width="140px" label="交易时间" align="center" key="18" fixed="right">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.paymentTime, "YYYY-MM-DD HH:mm:ss") }}
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
    <el-dialog title="推广信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="ruleForm" label-width="80px">
        <el-form-item label="ID" prop="address">
          <el-input readonly v-model="twitterData.tweetId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户" prop="address">
          <el-input readonly v-model="twitterData.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="address">
          <el-input readonly v-model="twitterData.tweetUrl" autocomplete="off">
            <template slot="append">
              <el-button @click="openUrl(twitterData.tweetUrl)">前往</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="内容" prop="address">
          <div v-html="twitterData.content"></div>
        </el-form-item>
      </el-form>
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
      orderNum: null,
      userName: null,
      num: null,
      winningStatus: null,
      status: null,
      startPrice: null,
      endPrice: null,
      startNumbers: null,
      endNumbers: null,
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
      twitterData: {},
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
      let startTxtime = null;
      let endTxTime = null;
      let startConfirmTime = null;
      let endConfirmTime = null;

      if (transactionTime && transactionTime[0]) {
        startTxtime = timeForStr(transactionTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (transactionTime && transactionTime[1]) {
        endTxTime = timeForStr(transactionTime[1], "YYYY-MM-DD HH:mm:ss");
      }
      return {
        orderNum: this.orderNum,
        userName: this.userName,
        winningStatus: this.winningStatus,
        status: this.status,
        num: this.num,
        startPrice: this.startPrice,
        endPrice: this.endPrice,
        startNumbers: this.startNumbers,
        endNumbers: this.endNumbers,
        startTxtime,
        endTxTime,
      };
    },
    // 加载列表
    async fetchOneNftLotteryOrdersManagerList(isSearch = true) {
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
      const res = await this.$http.getOneNftLotteryOrdersManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getOneNftLotteryOrdersStatistics(data);
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

      this.fetchOneNftLotteryOrdersManagerList();
    },
    // 上架和下架
    operatingNft(row) {
      this.$confirm(`确定要${row.upAndDown == "down" ? "上架" : "下架"}一元购活动『${row.seriesName || row.id}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = await this.$http.updateOneNftOrders({
            id: row.id,
            upAndDown: row.upAndDown == "down" ? "up" : "down",
          });
          if (res) {
            this.fetchOneNftLotteryOrdersManagerList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    openPromotion(event) {
      const { twitterInfo } = event;
      this.twitterData = twitterInfo;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchOneNftLotteryOrdersManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchOneNftLotteryOrdersManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchOneNftLotteryOrdersManagerList();
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
