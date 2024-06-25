<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter the series name"
        v-model="seriesName"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="enter NFT ID"
        v-model="tokenId"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Contract address"
        v-model="contractAddress"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Subordinate"
        v-model="projectOwner"
        clearable
      />
      <el-select
        v-model="source"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All sources"
        clearable
      >
        <el-option label="Buy" value="BUY"> </el-option>
        <el-option label="Turn in" value="TRANSFER"> </el-option>
      </el-select>
      <el-select
        v-model="currentStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All states"
        clearable
      >
        <el-option label="Stand up" value="STANDBY"> </el-option>
        <el-option label="One -dollar purchase" value="ONE_YUAN_PURCHASE"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> add time </span>
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
        @click="fetchUserNftList()"
      >
        Inquire
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total collection</div>
          <div class="val">{{ baseUserPage && baseUserPage.total }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="order number" align="center" key="1">
      </el-table-column>
      <el-table-column prop="nftImage" label="NFT diagram" align="center" key="3">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image
              style="height: 100%"
              :src="scope.row.nftImage"
              :preview-src-list="[scope.row.nftImg]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderId" label="merchandise" align="center" key="4">
        <template slot-scope="scope">
          {{ `${scope.row.name} ${scope.row.orderId}` }}
        </template>
      </el-table-column>
      <el-table-column prop="tickets" label="Vote" align="center" key="5">
      </el-table-column>
      <el-table-column label="Ticket number" align="center" key="6">
        <template slot-scope="scope">
          {{ `${scope.row.startNumbers} ${scope.row.endNumbers}` }}
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="Hanging single user" align="center" key="7">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userIsTest ? 'red' : '#000' }">
            {{ scope.row.userId || "--" }}
          </p>
          <p :style="{ color: scope.row.userIsTest ? 'red' : '#000' }">
            {{ scope.row.userName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="expenditure" label="Consumption" align="center" key="8">
      </el-table-column>
      <el-table-column prop="winningStatus" label="Return prize" align="center" key="9">
        <template slot-scope="scope">
          <span v-if="scope.row.winningStatus == 'YES'">View the award</span>
          <span v-else>Undeval</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymentChannel"
        label="Consumer channel"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="walletAddress"
        label="Wallet address"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column prop="txid" label="hash" align="center" key="13">
      </el-table-column>
      <el-table-column
        prop="expenditureSerialId"
        label="Consumer flow number"
        align="center"
        key="14"
      >
      </el-table-column>
      <el-table-column prop="refundSerialId" label="Return" align="center" key="15">
      </el-table-column>
      <el-table-column prop="status" label="state" align="center" key="17" fixed="right">
        <template slot-scope="scope">
          <span style="color: #05a8f0" v-if="scope.row.status == 'TO_BE_AWARDED'"
            >To be awarded</span
          >
          <span style="color: #31ce0b" v-if="scope.row.status == 'REFUNDED'"
            >refunded</span
          >
          <span style="color: #bbbbbb" v-if="scope.row.status == 'AWARDED'">Winning</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="paymentTime"
        width="140px"
        label="Payment time"
        align="center"
        key="18"
        fixed="right"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.paymentTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="transactionTime"
        width="140px"
        label="Completion time of transaction"
        align="center"
        key="19"
        fixed="right"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.transactionTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="confirmationTime"
        width="140px"
        label="confirm the time"
        align="center"
        key="20"
        fixed="right"
      >
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
      this.$confirm(
        `Determine${
          row.upAndDown == "down" ? "Put on the shelves" : "Get off the shelves"
        }One -dollar purchase event『${row.seriesName || row.id}』?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          let res = await this.$http.updateOneNftOrders({
            id: row.id,
            upAndDown: row.upAndDown == "down" ? "up" : "down",
          });
          if (res) {
            this.fetchUserNftList();
            this.$message.success("Successful operation");
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
