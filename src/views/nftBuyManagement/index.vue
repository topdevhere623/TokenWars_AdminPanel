<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter the series name"
        v-model="orderNum"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter NFT ID"
        v-model="tokenId"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter the hanging single user"
        v-model="userName"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter the winning user"
        v-model="winningUsers"
        clearable
      />
      <el-select
        v-model="statusStr"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All states"
        clearable
      >
        <el-option label="in progress" value="IN_PROGRESS"> </el-option>
        <el-option label="Winning" value="DRAWN"> </el-option>
        <el-option label="Cancelled" value="CANCELLED"> </el-option>
        <el-option label="over" value="CLOSED"> </el-option>
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

      <div class="public-date-box">
        <span class="demonstration"> Added time </span>
        <el-date-picker
          v-model="addedTime"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> End Time </span>
        <el-date-picker
          v-model="endTimes"
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
        @click="fetchOneNftOrdersManagerList()"
      >
        Inquire
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total NFT number</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalNumberOfCollections }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total number</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalNumberOfTimesItWasOpened }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">total value</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalValue }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total number of users</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalEngagedUsers }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total sales</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalNumberSold }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total sale amount</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalAmountSold }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total user income</div>
          <div class="val">
            {{
              aggregateQuery &&
              (aggregateQuery.totalAmountSold - aggregateQuery.serviceFeeTotal).toFixed(2)
            }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total handling fee</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.serviceFeeTotal }}</div>
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
      <el-table-column
        prop="id"
        sortable="custom"
        label="Hang single ID"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column prop="seriesName" label="Series name" align="center" key="2">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == 'LIMITED_PRICE_COIN'">{{
            `${scope.row.price} ${"ETH" || scope.row.coinName}`
          }}</span>
          <span v-else>{{ `${scope.row.seriesName || "--"}` }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="nftImage"
        label="NFT diagram"
        align="center"
        width="120"
        key="3"
      >
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image
              style="height: 100%"
              v-if="scope.row.orderType == 'LIMITED_PRICE_COIN'"
              :src="ethPic"
              :preview-src-list="[ethPic]"
            >
            </el-image>
            <el-image
              style="height: 100%"
              v-else
              :src="scope.row.nftImage"
              :preview-src-list="[scope.row.nftImg]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="tokenId" label="nft ID" align="center" key="4">
      </el-table-column>
      <el-table-column prop="contractAddress" label="contract" align="center" key="5">
      </el-table-column>
      <el-table-column prop="details" label="NFT information" align="center" key="6">
      </el-table-column>
      <el-table-column prop="userId" label="Hanging single user" align="center" key="7">
        <template slot-scope="scope">
          <p
            :style="{
              color: scope.row.pendingOrderUserIsTest == 'INNER' ? 'red' : '#000',
            }"
          >
            {{ scope.row.userId || "--" }}
          </p>
          <p
            :style="{
              color: scope.row.pendingOrderUserIsTest == 'INNER' ? 'red' : '#000',
            }"
          >
            {{ scope.row.pendingOrderUser || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderType"
        sortable="custom"
        label="Single type"
        align="center"
        key="8"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == 'LIMITED_TIME'">Limited time</span>
          <span v-if="scope.row.orderType == 'LIMITED_PRICE'">Limit price</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        label="value(USDT)"
        align="center"
        key="9"
      >
        <template slot-scope="scope">
          {{ (scope.row.ticketPrice * scope.row.limitNum).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="limitDay"
        sortable="custom"
        label="limit"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="limitDay"
        sortable="custom"
        label="Free ticket"
        align="center"
        key="12"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.sendTicketsNum">{{
            `${scope.row.numberOfTicketsSend || 0}/${scope.row.sendTicketsNum || 0}`
          }}</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        sortable="custom"
        label="time left"
        align="center"
        key="13"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.endTime && scope.row.currentStatus == 'IN_PROGRESS'">
            {{ getRemainingTime(scope.row.endTime) }}
          </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="userTotal"
        sortable="custom"
        label="Participate in the number of users"
        align="center"
        key="14"
      >
      </el-table-column>
      <el-table-column
        prop="numberOfTicketsSold"
        sortable="custom"
        label="Number of tickets"
        align="center"
        key="15"
      >
      </el-table-column>
      <el-table-column
        prop="numberOfTicketsSold"
        sortable="custom"
        label="User income"
        align="center"
        key="16"
      >
        <template slot-scope="scope">
          <span>
            {{ (scope.row.expenditure - scope.row.serviceFee).toFixed(2) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="serviceFee"
        sortable="custom"
        label="Handling fee"
        align="center"
        key="17"
      >
      </el-table-column>
      <el-table-column prop="txid" label="Hash on the chain" align="center" key="18">
      </el-table-column>
      <el-table-column prop="winningAddress" label="Winning user" align="center" key="19">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.winningUsernameIsTest ? 'red' : '#000' }">
            {{ scope.row.winningUserId || "--" }}
          </p>
          <p :style="{ color: scope.row.winningUsernameIsTest ? 'red' : '#000' }">
            {{ scope.row.winningUsername || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="currentStatus"
        sortable="custom"
        label="Current state"
        align="center"
        key="20"
        fixed="right"
      >
        <template slot-scope="scope">
          <span style="color: #05a8f0" v-if="scope.row.currentStatus == 'IN_PROGRESS'"
            >in progress</span
          >
          <span style="color: #31ce0b" v-if="scope.row.currentStatus == 'DRAWN'"
            >Winning</span
          >
          <span style="color: #bbbbbb" v-if="scope.row.currentStatus == 'CANCELLED'"
            >Cancelled</span
          >
          <span style="color: #ff0000" v-if="scope.row.currentStatus == 'CLOSED'"
            >over</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="listingTime"
        sortable="custom"
        width="140px"
        label="Added time"
        align="center"
        key="21"
        fixed="right"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.listingTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        width="140px"
        sortable="custom"
        label="End Time"
        align="center"
        key="22"
        fixed="right"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.endTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="operate"
        align="center"
        width="110"
        key="23"
        fixed="right"
      >
        <template slot-scope="scope">
          <span
            v-if="
              scope.row.currentStatus == 'IN_PROGRESS' &&
              scope.row.currentStatus !== 'CANCELLED'
            "
            class="blueColor publick-button cursor"
            @click="operatingNft(scope.row)"
          >
            {{ scope.row.upAndDown == "down" ? "" : "Get off the shelves" }}
          </span>
          <chainExplorerSkip
            :chain="scope.row.chainType"
            :address="`tx/${scope.row.txid}`"
            v-if="scope.row.currentStatus == 'DRAWN'"
          />
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
import dayjs from "dayjs";
import bigNumber from "bignumber.js";
import { accurateDecimal, timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import chainExplorerSkip from "@/components/chainExplorerSkip";

export default {
  name: "NftBuyManagement",
  // 模板引入
  components: {
    chainExplorerSkip,
  },
  // 数据
  data() {
    return {
      orderNum: null,
      tokenId: null,
      userName: null,
      winningUsers: null,
      startPrice: null,
      endPrice: null,
      statusStr: null,
      addedTime: null,
      endTimes: null,
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
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    accurateDecimal: accurateDecimal,
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    /**
     * @description: 排序
     */
    sortChange({ column, prop, order }) {
      this.sortData.orderBy = prop;
      this.sortData.orderType = order == "descending" ? "DESC" : "ASC";

      if (!order) {
        this.sortData.orderType = null;
      }

      this.fetchOneNftOrdersManagerList();
    },
    getRemainingTime(time) {
      const currentTime = dayjs(this.baseUserPage.localDateTime);
      const endTime = dayjs(time);
      const diffInMilliseconds = endTime.diff(currentTime);
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
      const days = Math.floor(diffInHours / 24);
      const hours = diffInHours % 24;
      return `${Math.floor(days)}day${Math.floor(hours)}Hour`;
    },
    searchFun() {
      let { addedTime, endTimes } = this;
      let startOrderTime = null;
      let endOrderTime = null;
      let startTime = null;
      let endTime = null;

      if (addedTime && addedTime[0]) {
        startOrderTime = timeForStr(addedTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (addedTime && addedTime[1]) {
        endOrderTime = timeForStr(addedTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      if (endTimes && endTimes[0]) {
        startTime = timeForStr(endTimes[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (endTimes && endTimes[1]) {
        endTime = timeForStr(endTimes[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        orderNum: this.orderNum,
        tokenId: this.tokenId,
        userName: this.userName,
        winningUsers: this.winningUsers,
        startPrice: this.startPrice,
        endPrice: this.endPrice,
        statusStr: this.statusStr,
        startOrderTime,
        endOrderTime,
        startTime,
        endTime,
      };
    },
    // 加载列表
    async fetchOneNftOrdersManagerList(isSearch = true) {
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
      const res = await this.$http.getOneNftOrdersManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getOneNftOrdersStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
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
            this.fetchOneNftOrdersManagerList();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchOneNftOrdersManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchOneNftOrdersManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchOneNftOrdersManagerList();
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
