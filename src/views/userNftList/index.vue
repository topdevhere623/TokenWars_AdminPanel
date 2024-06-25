<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 220px" placeholder="输入系列名" v-model="seriesName" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="输入 NFT ID" v-model="tokenId" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="合约地址" v-model="contractAddress" clearable />
      <el-input class="public-input" style="width: 220px" placeholder="所属用户" v-model="projectOwner" clearable />
      <el-select v-model="source" class="public-select-box" popper-class="public-select-box" placeholder="全部来源" clearable>
        <el-option label="购买" value="BUY"> </el-option>
        <el-option label="转入" value="TRANSFER"> </el-option>
      </el-select>
      <el-select v-model="currentStatus" class="public-select-box" popper-class="public-select-box" placeholder="全部状态" clearable>
        <el-option label="待命" value="STANDBY"> </el-option>
        <el-option label="一元购" value="ONE_YUAN_PURCHASE"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> 添加时间 </span>
        <el-date-picker
          v-model="creationTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchUserNftList()"> 查询 </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总藏品数</div>
          <div class="val">{{ baseUserPage && baseUserPage.total }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="订单号" align="center" key="1"> </el-table-column>
      <el-table-column prop="nftImage" label="NFT图" align="center" key="3">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image style="height: 100%" :src="scope.row.nftImage" :preview-src-list="[scope.row.nftImg]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderId" label="商品" align="center" key="4">
        <template slot-scope="scope">
          {{ `${scope.row.name} ${scope.row.orderId}` }}
        </template>
      </el-table-column>
      <el-table-column prop="tickets" label="票数" align="center" key="5"> </el-table-column>
      <el-table-column label="票号" align="center" key="6">
        <template slot-scope="scope">
          {{ `${scope.row.startNumbers} ${scope.row.endNumbers}` }}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="挂单用户" align="center" key="7">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userIsTest ? 'red' : '#000' }">{{ scope.row.userId || "--" }}</p>
          <p :style="{ color: scope.row.userIsTest ? 'red' : '#000' }">{{ scope.row.userName || "--" }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="expenditure" label="消费" align="center" key="8"> </el-table-column>
      <el-table-column prop="winningStatus" label="返奖" align="center" key="9">
        <template slot-scope="scope">
          <span v-if="scope.row.winningStatus == 'YES'">查看返奖</span>
          <span v-else>未中奖</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentChannel" label="消费渠道" align="center" key="10"> </el-table-column>
      <el-table-column prop="walletAddress" label="钱包地址" align="center" key="11"> </el-table-column>
      <el-table-column prop="txid" label="Hash" align="center" key="13"> </el-table-column>
      <el-table-column prop="expenditureSerialId" label="消费流水号" align="center" key="14"> </el-table-column>
      <el-table-column prop="refundSerialId" label="退款流水号" align="center" key="15"> </el-table-column>
      <el-table-column prop="status" label="状态" align="center" key="17" fixed="right">
        <template slot-scope="scope">
          <span style="color: #05a8f0" v-if="scope.row.status == 'TO_BE_AWARDED'">待开奖</span>
          <span style="color: #31ce0b" v-if="scope.row.status == 'REFUNDED'">已退款</span>
          <span style="color: #bbbbbb" v-if="scope.row.status == 'AWARDED'">已开奖</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentTime" width="140px" label="付款时间" align="center" key="18" fixed="right">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.paymentTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="transactionTime" width="140px" label="交易完成时间" align="center" key="19" fixed="right">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.transactionTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="confirmationTime" width="140px" label="确认时间" align="center" key="20" fixed="right">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.confirmationTime, "YYYY-MM-DD HH:mm:ss") }}
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
import { accurateDecimal, timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "UserNftList",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      seriesName: null,
      tokenId: null,
      contractAddress: null,
      projectOwner: null,
      source: null,
      currentStatus: null,
      creationTime: null,
      page: 1,
      size: 20,
      tableData: null,
      aggregateQuery: null,
      baseUserPage: null,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    accurateDecimal: accurateDecimal,
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    searchFun() {
      let { creationTime } = this;
      let startDate = null;
      let endDate = null;

      if (creationTime && creationTime[0]) {
        startDate = timeForStr(creationTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (creationTime && creationTime[1]) {
        endDate = timeForStr(creationTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        seriesName: this.seriesName,
        tokenId: this.tokenId,
        contractAddress: this.contractAddress,
        userId: this.projectOwner,
        source: this.source,
        currentStatus: this.currentStatus,
        startDate,
        endDate,
      };
    },
    // 加载列表
    async fetchUserNftList(isSearch = true) {
      const search = this.searchFun();
      const { size, userType } = this;
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
        ...search,
      };
      const res = await this.$http.getUserNftList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }
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
            this.fetchUserNftList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchUserNftList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchUserNftList(false);
    },
  },
  // 创建后
  created() {
    this.fetchUserNftList();
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
