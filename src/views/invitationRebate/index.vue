<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter user ID/Nick name"
        v-model="obscureField"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Email"
        v-model="email"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter the invitation code"
        v-model="inviteCode"
        clearable
      />
      <div class="public-date-box">
        <span class="demonstration"> Last receipt time </span>
        <el-date-picker
          v-model="lastPickUpTime"
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
        @click="fetchRebatesBaseList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
        class="public-search"
        @click="onExport()"
      >
        Export
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Subordinate quantity</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.downNumber }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total commission</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.rebatesAmountTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Uncontrolled commissions</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.noReceiveAmounts }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Receive commission</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.receiveAmounts }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">total points</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.pointAmountTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total points</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.extraPointAmountTotal }}
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
      <el-table-column
        prop="userName"
        sortable="custom"
        width="120"
        label="user"
        align="center"
        key="1"
      >
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.id || "--" }}
          </p>
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="email" width="120" label="Mail" align="center" key="2">
      </el-table-column>
      <el-table-column
        prop="inviteCode"
        width="120"
        label="Invitation code"
        align="center"
        key="3"
      >
      </el-table-column>
      <el-table-column
        prop="clickNumber"
        sortable="custom"
        width="120"
        label="The number of clicks"
        align="center"
        key="4"
      >
      </el-table-column>
      <el-table-column
        prop="downIdNumber"
        sortable="custom"
        width="120"
        label="Subordinate quantity"
        align="center"
        key="5"
      >
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="showDown(scope.row)">
            {{ scope.row.downIdNumber || 0 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalConsumption"
        sortable="custom"
        width="120"
        label="Total consumption"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column
        prop="rebateRate"
        sortable="custom"
        width="120"
        label="Division ratio"
        align="center"
        key="7"
      >
        <template slot-scope="scope">
          {{ `${new bigNumber(scope.row.rebateRate).multipliedBy(100)}%` }}
        </template>
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        sortable="custom"
        width="120"
        label="Total commission"
        align="center"
        key="8"
      >
      </el-table-column>
      <el-table-column
        prop="receiveAmount"
        sortable="custom"
        width="120"
        label="Receive commission"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column
        prop="noReceiveAmount"
        sortable="custom"
        width="120"
        label="Uncontrolled commissions"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="pointAmount"
        sortable="custom"
        width="120"
        label="Total registration points"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="extraPointAmount"
        sortable="custom"
        width="120"
        label="Total points"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="lastReceiveTime"
        sortable="custom"
        width="140"
        label="Last receipt time"
        align="center"
        key="13"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.lastReceiveTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="120"
        sortable="custom"
        label="operate"
        align="center"
        key="14"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button @click="setRatio(scope.row)">Set the commission ratio</el-button>
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
    <el-dialog
      title="Lower -level details"
      :visible.sync="showDownDialog"
      width="1200px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="public-list-inputs">
        <el-input
          class="public-input"
          style="width: 140px"
          placeholder="Enter user ID/Nick name"
          v-model="downObscureField"
          clearable
        />
        <el-input
          class="public-input"
          style="width: 140px"
          placeholder="Email"
          v-model="downEmail"
          clearable
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          class="public-search"
          @click="fetchRebatesBaseDownList()"
        >
          Inquire
        </el-button>

        <el-button
          type="primary"
          icon="el-icon-download"
          class="public-search"
          @click="onDownExport()"
        >
          Export
        </el-button>
      </div>
      <div class="remittance-box">
        <div class="remittance-amount remittance-more">
          <div class="remittance-item">
            <div class="title">Total number</div>
            <div class="val">
              {{ downAggregateQuery && downAggregateQuery.downNumber }}
            </div>
          </div>
          <div class="remittance-item">
            <div class="title">Total number</div>
            <div class="val">
              {{ downAggregateQuery && downAggregateQuery.traNumberTotal }}
            </div>
          </div>
          <div class="remittance-item">
            <div class="title">Total consumption</div>
            <div class="val">
              {{ downAggregateQuery && downAggregateQuery.totalConsumptions }}
            </div>
          </div>
          <div class="remittance-item">
            <div class="title">Total commission</div>
            <div class="val">
              {{ downAggregateQuery && downAggregateQuery.rebatesAmountTotal }}
            </div>
          </div>
        </div>
      </div>
      <el-table
        :data="downData"
        @sort-change="sortSubChange"
        style="width: auto"
        height="400px"
        border
      >
        <el-table-column prop="userName" width="120" label="user" align="center" key="1">
          <template slot-scope="scope">
            <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
              {{ scope.row.id || "--" }}
            </p>
            <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
              {{ scope.row.userName || "--" }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="email" width="120" label="mail" align="center" key="2">
        </el-table-column>
        <el-table-column prop="inviteCode" label="invitation code" align="center" key="3">
        </el-table-column>
        <el-table-column
          prop="traNumber"
          sortable="custom"
          label="number of transactions"
          align="center"
          key="4"
        >
        </el-table-column>
        <el-table-column
          prop="totalConsumptions"
          sortable="custom"
          label="amount of consumption"
          align="center"
          key="5"
        >
        </el-table-column>
        <el-table-column
          prop="rebateRate"
          label="commission ratio"
          align="center"
          key="6"
        >
          <template slot-scope="scope">
            {{ `${new bigNumber(scope.row.rebateRate).multipliedBy(100)}%` }}
          </template>
        </el-table-column>
        <el-table-column
          prop="totalAmount"
          sortable="custom"
          label="commission"
          align="center"
          key="7"
        >
        </el-table-column>
        <el-table-column
          prop="pointAmountTotal"
          sortable="custom"
          label="register"
          align="center"
          key="8"
        >
        </el-table-column>
        <el-table-column
          prop="extraPointAmountTotal"
          sortable="custom"
          label="extra points"
          align="center"
          key="9"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="140"
          sortable="custom"
          label="registration time"
          align="center"
          key="10"
        >
          <template slot-scope="scope">
            {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="downBaseUserPage && downBaseUserPage.total"
        background
        @size-change="handleDownSizeChange"
        @current-change="handleDownCurrentChange"
        :current-page="downPage"
        :page-sizes="pagination.pageSizes"
        :page-size="downSize"
        layout=" sizes, prev, pager, next, jumper"
        :total="downBaseUserPage.total"
        class="public-pagination"
      >
      </el-pagination>
    </el-dialog>
    <el-dialog
      width="440px"
      :close-on-click-modal="false"
      title="Set the commission ratio"
      :visible.sync="showSetRatio"
      append-to-body
      :before-close="handleClose"
    >
      <el-form ref="seriesForm" class="add-form" :model="ratioForm" label-width="80px">
        <el-form-item label="proportion" prop="ratio">
          <el-input style="width: 300px" type="number" v-model="ratioForm.ratio">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="submitRatio()">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr, exportExcel, accurateDecimal } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";

export default {
  name: "invitationRebate",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      obscureField: null,
      email: null,
      inviteCode: null,
      lastPickUpTime: null, // 交易时间
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,

      /** 设置分佣比例 */
      showSetRatio: false,
      ratioForm: {
        ratio: null,
      },
      userSet: {},
      timer: null,

      /** 下级相关 */
      upId: null,
      downInviteCode: null,
      showDownDialog: false,
      downObscureField: null,
      downEmail: null,
      downPage: 1,
      downSize: 20,
      downData: null,
      downBaseUserPage: null,
      downAggregateQuery: null,
      sortSubData: {
        orderBy: null,
        orderType: null,
      },
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { lastPickUpTime } = this;
      let startTime = null;
      let endTime = null;
      if (lastPickUpTime && lastPickUpTime[0]) {
        startTime = timeForStr(lastPickUpTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (lastPickUpTime && lastPickUpTime[1]) {
        endTime = timeForStr(lastPickUpTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        obscureField: this.obscureField,
        email: this.email,
        inviteCode: this.inviteCode,
        startPrice: this.startPrice,
        endPrice: this.endPrice,
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

      this.fetchRebatesBaseList();
    },

    // 加载列表
    async fetchRebatesBaseList(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size, coin, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          userType: userType,
          coin: coin,
          size: size,
          page: _page,
        },
        ...this.sortData,
        ...search,
      };
      const res = await this.$http.getRebatesBaseList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getRebatesBaseStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    showDown(event) {
      this.upId = event.id;
      this.downInviteCode = event.inviteCode;
      this.fetchRebatesBaseDownList();
      this.showDownDialog = true;
    },
    sortSubChange({ column, prop, order }) {
      this.sortSubData.orderBy = prop;
      this.sortSubData.orderType = order == "descending" ? "DESC" : "ASC";

      if (!order) {
        this.sortSubData.orderType = null;
      }

      this.fetchRebatesBaseDownList();
    },
    async fetchRebatesBaseDownList(isSearch = true) {
      const search = {
        obscureField: this.downObscureField,
        email: this.downEmail,
        inviteCode: this.downInviteCode,
        upId: this.upId,
      };

      const { downSize, coin, userType, sortSubData } = this;
      let _page = this.downPage;
      if (isSearch) {
        this.downPage = 1;
        _page = 1;
      }
      const data = {
        ...{
          userType: userType,
          coin: coin,
          size: downSize,
          page: _page,
        },
        ...this.sortSubData,
        ...search,
      };
      const res = await this.$http.getRebatesBaseDownList(data);
      if (res) {
        this.downBaseUserPage = res;
        this.downData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getRebatesBaseDownStatistics(data);
      if (resAggregateQuery) {
        this.downAggregateQuery = resAggregateQuery;
      }
    },
    setRatio(event) {
      this.showSetRatio = true;
      this.userSet = event;
      this.ratioForm.ratio = accurateDecimal(
        Number(new bigNumber(event.rebateRate).multipliedBy(100)),
        4
      );
    },
    async submitRatio() {
      const {
        ratioForm: { ratio },
        userSet: { id },
      } = this;

      if (ratio == null || ratio == "" || ratio == undefined) {
        this.$message.error("Please enter the commission ratio");
        return;
      }

      if (ratio <= 0) {
        this.$message.error("The proportion of commission cannot be 0 or below");
        return;
      }

      const res = await this.$http.setRebateRate({
        rebateRate: accurateDecimal(Number(new bigNumber(ratio).div(100)), 4),
        userId: id,
      });

      if (res) {
        this.handleClose();
        this.fetchRebatesBaseList();
        this.$message.success("Successful operation");
      }
    },
    // 列表导出
    onExport() {
      const search = this.searchFun();
      const urlStr = config.api + "/rebates-base/exportExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          coin: coin,
          userType: userType,
        },
        ...search,
      };

      exportExcel(urlStr, data, "Invite list export");
    },
    // 下级列表导出
    onDownExport() {
      const search = {
        obscureField: this.downObscureField,
        email: this.downEmail,
        upId: this.upId,
      };
      const urlStr = config.api + "/rebates-base/down/exportExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          coin: coin,
          userType: userType,
        },
        ...search,
      };

      exportExcel(urlStr, data, "Invite subordinates list to export");
    },
    handleClose(done) {
      this.userSet = {};
      this.ratioForm = {
        ratio: null,
      };
      if (done) {
        done();
        return;
      }

      this.showDownDialog = false;
      this.showSetRatio = false;
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchRebatesBaseList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchRebatesBaseList(false);
    },
    handleDownSizeChange(val) {
      this.downSize = val;
      this.fetchRebatesBaseDownList();
    },
    handleDownCurrentChange(val) {
      this.downPage = val;
      this.fetchRebatesBaseDownList(false);
    },
  },
  // 创建后
  created() {
    this.fetchRebatesBaseList();
  },
  watch: {
    "ratioForm.ratio"(newV, oldV) {
      if (!newV) return;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (newV < 0) {
          this.ratioForm.ratio = 0;
        } else if (newV > 100) {
          this.ratioForm.ratio = 100;
        }
      }, 300);
    },
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
