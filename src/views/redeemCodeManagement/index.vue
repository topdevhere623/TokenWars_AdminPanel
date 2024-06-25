<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Input card number"
        v-model="id"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter the exchange account"
        v-model="userName"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Input remarks"
        v-model="remark"
        clearable
      />
      <el-select
        v-model="cardStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All states"
        clearable
      >
        <el-option label="Be exchanged" value="1"> </el-option>
        <el-option label="Exchanged" value="2"> </el-option>
        <el-option label="Fail" value="3"> </el-option>
      </el-select>
      <el-select
        v-model="cardType"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All types"
        clearable
      >
        <el-option label="single" value="SINGLE"> </el-option>
        <el-option label="Private chat code" value="PRIVATE"> </el-option>
        <el-option label="Unlimited" value="UNLIMITED"> </el-option>
        <el-option label="gift card" value="GIFTCARD"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> Amount </span>
        <el-input
          type="number"
          style="width: 120px; border: 1px solid #dcdfe6; border-radius: 4px"
          placeholder="Minimum price"
          v-model="amountStart"
          clearable
        />
        <el-input
          type="number"
          style="width: 120px; border: 1px solid #dcdfe6; border-radius: 4px"
          placeholder="Highest price"
          v-model="amountEnd"
          clearable
        />
      </div>
      <div class="public-date-box">
        <span class="demonstration"> Creation time </span>
        <el-date-picker
          v-model="createTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> Failure time </span>
        <el-date-picker
          v-model="failureTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> Redeem time </span>
        <el-date-picker
          v-model="conversionTime"
          value-format="yyyy-MM-dd HH:mm:ss"
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
        @click="getTableListFunc()"
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
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="addFunc()"
      >
        Add to
      </el-button>
      <el-button
        type="danger"
        icon="el-icon-remove-outline"
        class="public-search"
        @click="handleBatchInvalidation()"
      >
        Failure
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="couponsFunc()"
      >
        Configuration acquisition channel
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">General Gift Code</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.redeemCodeTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Exchange number</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.redeemedNumber }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Exchange amount</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.redeemedAmountTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">balance</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.notRedeemedAmountTotal }}
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
        prop="id"
        label="card number"
        align="center"
        key="1"
      ></el-table-column>
      <el-table-column prop="cardamom" label="Dense" align="center" key="2">
      </el-table-column>
      <el-table-column prop="amount" label="Amount" align="center" key="3">
      </el-table-column>
      <el-table-column prop="cardSource" label="source" align="center" key="4">
        <template slot-scope="scope">
          <span>
            {{ scope.row.cardSource == "PLATFORM" ? "platform" : "other" }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="cardType" label="type" align="center" key="5">
        <template slot-scope="scope">
          <p>
            {{
              scope.row.cardType == "SINGLE"
                ? "single"
                : scope.row.cardType == "PRIVATE"
                ? "Private chat code"
                : scope.row.cardType == "UNLIMITED"
                ? "Unlimited"
                : "gift card"
            }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="cardStatus" label="state" align="center" key="6">
        <template slot-scope="scope">
          <p v-if="scope.row.cardStatus == 2" style="color: #67c23a">Exchanged</p>
          <p v-else-if="scope.row.cardStatus == 3" style="color: #f56c6c">Fail</p>
          <p v-else style="color: #888888">Be exchanged</p>
        </template>
      </el-table-column>
      <el-table-column prop="rebateRate" label="Exchange account" align="center" key="7">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userId || "--" }}
          </p>
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="Remark"
        align="center"
        key="20"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        width="140"
        label="Creation time"
        align="center"
        key="8"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="expirationTime"
        width="140"
        label="Failure time"
        align="center"
        key="9"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.expirationTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="redeemTime"
        width="140"
        label="Redeem time"
        align="center"
        key="10"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.redeemTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="operate" align="center" key="19">
        <template slot-scope="scope">
          <span
            v-if="scope.row.cardStatus == 1"
            class="blueColor publick-button cursor"
            @click="handleInvalid(scope.row)"
            >Fail</span
          >
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
      width="440px"
      :close-on-click-modal="false"
      title="Create the exchange code"
      :visible.sync="showAddFunc"
      append-to-body
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        class="add-form"
        :rules="rules"
        :model="ruleForm"
        label-width="80px"
      >
        <el-form-item label="Amount" prop="amount" :rules="rules.blur">
          <el-input style="width: 300px" type="number" v-model="ruleForm.amount">
            <template slot="append">U</template>
          </el-input>
        </el-form-item>
        <el-form-item label="quantity" prop="number" :rules="rules.blur">
          <el-input style="width: 300px" type="number" v-model.number="ruleForm.number">
          </el-input>
        </el-form-item>
        <el-form-item label="type" prop="cardType" :rules="rules.select">
          <el-select style="width: 300px" v-model="ruleForm.cardType" clearable>
            <el-option label="single" value="SINGLE"> </el-option>
            <el-option label="Private chat code" value="PRIVATE"> </el-option>
            <el-option label="Unlimited" value="UNLIMITED"> </el-option>
            <el-option label="gift card" value="GIFTCARD"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Validity period">
          <el-input
            style="width: 300px"
            type="number"
            v-model.number="ruleForm.validDate"
          >
            <template slot="append">sky</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Remark">
          <el-input style="width: 300px" v-model="ruleForm.remark"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="submitFunc()">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="440px"
      :close-on-click-modal="false"
      title="Channel configuration"
      :visible.sync="showCouponsFunc"
      append-to-body
      :before-close="handleClose"
    >
      <el-form
        ref="couponsForm"
        class="add-form"
        :rules="couponsRules"
        :model="couponsForm"
        label-width="80px"
      >
        <el-form-item label="Channel name" prop="channelName" :rules="rules.channelName">
          <el-input style="width: 300px" v-model="couponsForm.channelName"> </el-input>
        </el-form-item>
        <el-form-item label="Link" prop="url" :rules="rules.url">
          <el-input style="width: 300px" v-model.number="couponsForm.url"> </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="submitCouponsFunc()">Sure</el-button>
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
      id: null,
      userName: null,
      inviteCode: null,
      remark: null,
      createTime: null,
      failureTime: null,
      conversionTime: null,
      cardStatus: null,
      cardType: null,
      amountStart: null,
      amountEnd: null,
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,

      showAddFunc: false,
      ruleForm: {
        amount: null,
        number: null,
        cardType: null,
        validDate: 30,
        remark: null,
      },
      rules: {
        select: [
          { required: true, message: "please choose", trigger: ["blur", "change"] },
        ],
        blur: [{ required: true, message: "please enter", trigger: ["blur", "change"] }],
      },
      showCouponsFunc: false,
      couponsForm: {
        channelName: null,
        url: null,
      },
      couponsRules: {
        channelName: [
          { required: true, message: "please enter", trigger: ["blur", "change"] },
        ],
        url: [{ required: true, message: "please enter", trigger: ["blur", "change"] }],
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

      if (this.createTime) {
        var [createTimeStart, createTimeEnd] = this.createTime;
      }
      if (this.failureTime) {
        var [expirationTimeStart, expirationTimeEnd] = this.failureTime;
      }
      if (this.conversionTime) {
        var [redeemTimeStart, redeemTimeEnd] = this.conversionTime;
      }

      return {
        id: this.id,
        userName: this.userName,
        remark: this.remark,
        cardStatus: this.cardStatus,
        cardType: this.cardType,
        amountStart: this.amountStart,
        amountEnd: this.amountEnd,
        createTimeStart,
        createTimeEnd,
        expirationTimeStart,
        expirationTimeEnd,
        redeemTimeStart,
        redeemTimeEnd,
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

      this.getTableListFunc();
    },

    // 加载列表
    async getTableListFunc(isSearch = true) {
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
      const res = await this.$http.getRedeemPageList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getRedeemHeaderDataTotal(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 失效
    handleInvalid(event) {
      this.$confirm("Are you sure to perform this operation?", "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "info",
      })
        .then(async () => {
          const res = await this.$http.redeeminvalid({
            redeemId: event.id,
          });
          if (res) {
            this.getTableListFunc();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 批量失效
    handleBatchInvalidation() {
      this.$confirm("Are you sure to perform this operation?", "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "info",
      })
        .then(async () => {
          const search = this.searchFun();
          const res = await this.$http.redeemBatchInvalidation({
            ...search,
          });
          if (res) {
            this.getTableListFunc();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    addFunc(event) {
      this.showAddFunc = true;
    },
    async submitFunc() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let ruleForm = { ...this.ruleForm };
          const res = await this.$http.redeemHeaderAdd({ ...ruleForm });

          if (res) {
            this.handleClose();
            this.getTableListFunc();
            this.$message.success("Successful operation");
          }
        }
      });
    },
    // 列表导出
    onExport() {
      const search = this.searchFun();
      const urlStr = config.api + "/redeem-code-info/exportExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          coin: coin,
          userType: userType,
        },
        ...search,
      };

      exportExcel(urlStr, data, "Export of the redemption code list");
    },
    // 加载渠道配置
    async getFindRedeemTextSetting() {
      const res = await this.$http.getFindRedeemTextSetting();
      if (res) {
        this.couponsForm = {
          ...res,
        };
        this.$forceUpdate();
      }
    },
    couponsFunc() {
      this.getFindRedeemTextSetting();
      this.showCouponsFunc = true;
    },
    // 渠道配置
    async submitCouponsFunc() {
      this.$refs.couponsForm.validate(async (valid) => {
        if (valid) {
          let couponsForm = { ...this.couponsForm };
          const res = await this.$http.setRedeemTextSetting({ ...couponsForm });

          if (res) {
            this.handleClose();
            this.getFindRedeemTextSetting();
            this.$message.success("Successful operation");
          }
        }
      });
    },
    handleClose(done) {
      if (done) {
        done();
        return;
      }

      this.showAddFunc = false;
      this.showCouponsFunc = false;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableListFunc();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableListFunc(false);
    },
  },
  // 创建后
  created() {
    this.getTableListFunc();
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
