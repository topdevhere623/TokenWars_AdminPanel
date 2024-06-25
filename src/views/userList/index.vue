<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter ID, nickname, mailbox, wallet address"
        v-model="obscureField"
        clearable
      />
      <el-input
        class="public-input"
        placeholder="Superior ID"
        type="number"
        v-model.number="upId"
        clearable
      />
      <el-select
        v-model="userStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="All states"
        clearable
      >
        <el-option label="All states" value=""> </el-option>
        <el-option label="Stop" value="DISABLE"> </el-option>
        <el-option label="Restricted withdrawal" value="LIMIT_DRAW"> </el-option>
        <el-option label="normal" value="NORMAL"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> Registration time </span>
        <el-date-picker
          v-model="registrationTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration">last login time:</span>
        <el-date-picker
          v-model="loginedTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchUserlist(true)"
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
        icon="el-icon-upload2"
        class="public-search"
        @click="showDialog = true"
      >
        Import test number
      </el-button>
      <el-link
        icon="el-icon-download"
        type="primary"
        @click="downloadExcel('SIGN_ACCOUNT')"
        class="download-module"
        >Download template</el-link
      >
      <el-upload
        class="upload-demo"
        action="/"
        :on-change="importBatchUpAndDownFunc"
        :auto-upload="false"
        :show-file-list="false"
      >
        <el-button icon="el-icon-upload2" type="primary" class="public-search"
          >In batches</el-button
        >
      </el-upload>
      <el-link
        icon="el-icon-download"
        type="primary"
        @click="downloadExcel('BATCH_UP_AND_DOWN')"
        class="download-module"
        >Download template</el-link
      >
      <el-button
        type="primary"
        icon="el-icon-download"
        class="public-search"
        @click="onExportCountry()"
      >
        Export national data
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
        class="public-search"
        @click="onExportUser()"
      >
        Export user recharge data
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total number of users</div>
          <div class="val">
            {{ aggregateQuery?.userNumberTotal }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total recharge</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.totalRecharges, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">General reward</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.totalRewards, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总 remittance</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.bounsTotal, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total income amount</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.revenueTotal, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total consumption amount</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.consumeTotal, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Cumulative withdrawal</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.estimateDrawBanlanceTotal, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total deduction</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.totalDeuctions, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total refund</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.totalRefund, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total balance</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.assetBalanceUTotal, 2) }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">total points</div>
          <div class="val">
            {{ aggregateQuery?.assetPointBalanceTotal }}
          </div>
        </div>

        <div class="remittance-item">
          <div class="title">Total exchange code</div>
          <div class="val">
            {{ aggregateQuery?.totalRedeemCard }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">Total assets</div>
          <div class="val">
            {{ accurateDecimal(aggregateQuery?.estimateBanlanceTotal, 2) }}
          </div>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="public-table"
      border
      @sort-change="sortChange"
    >
      <el-table-column
        prop="id"
        sortable="custom"
        label="User ID/Nick name"
        align="center"
        width="110"
        key="0"
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
      <el-table-column prop="upId" label="Superior ID" align="center" width="110" key="2">
      </el-table-column>
      <el-table-column prop="email" label="Mail" align="center" width="200" key="3">
      </el-table-column>
      <el-table-column
        prop="totalRecharges"
        sortable="custom"
        label="Total recharge(USDT)"
        align="center"
        width="120"
        key="4"
      >
      </el-table-column>
      <el-table-column
        prop="totalConsumps"
        sortable="custom"
        label="Total consumption(USDT)"
        align="center"
        width="120"
        key="5"
      >
      </el-table-column>
      <el-table-column
        prop="totalRevenues"
        sortable="custom"
        label="Total revenue(USDT)"
        align="center"
        width="120"
        key="6"
      >
      </el-table-column>
      <el-table-column
        prop="totalRewards"
        sortable="custom"
        label="General reward(USDT)"
        align="center"
        width="120"
        key="7"
      >
      </el-table-column>
      <el-table-column
        prop="totalBouns"
        sortable="custom"
        label="总 remittance(USDT)"
        align="center"
        width="120"
        key="8"
      >
      </el-table-column>
      <el-table-column
        prop="totalDeuctions"
        sortable="custom"
        label="Total deduction(USDT)"
        align="center"
        width="120"
        key="9"
      >
      </el-table-column>

      <el-table-column
        prop="totalRefund"
        sortable="custom"
        label="Total refund(USDT)"
        align="center"
        width="120"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="redeemCard"
        sortable="custom"
        label="Exchanges"
        align="center"
        width="120"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="buyBoxNumbers"
        sortable="custom"
        label="Buy the number of blind boxes"
        align="center"
        width="120"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="totalCollects"
        sortable="custom"
        label="Obtain a collection"
        align="center"
        width="110"
        key="13"
      >
      </el-table-column>
      <el-table-column
        prop="remainderCollects"
        sortable="custom"
        label="Remaining collections"
        align="center"
        width="110"
        key="14"
      >
      </el-table-column>
      <el-table-column
        prop="assetBalanceU"
        sortable="custom"
        label="Balance(USDT)"
        align="center"
        width="110"
        key="15"
      >
      </el-table-column>
      <el-table-column
        prop="estimateBanlanceTotal"
        sortable="custom"
        label="Asset estimation"
        align="center"
        width="110"
        key="21"
      >
        <template slot-scope="scope">
          <span
            class="blueColor publick-button cursor"
            @click="assetBalanceDialogFunc(scope.row)"
          >
            {{ scope.row.estimateBanlanceTotal }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="estimateDrawBanlanceTotal"
        sortable="custom"
        label="Withdraw money"
        align="center"
        width="110"
        key="14"
      >
        <template slot-scope="scope">
          <span
            class="blueColor publick-button cursor"
            @click="assetBalanceDialogFunc(scope.row, 'withdraw')"
          >
            {{ scope.row.estimateDrawBanlanceTotal }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="point"
        sortable="custom"
        label="total points"
        align="center"
        width="110"
        key="15"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        label="Registration time"
        align="center"
        width="140"
        key="16"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="lastLoginTime"
        sortable="custom"
        label="last login time"
        align="center"
        width="140"
        key="17"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.lastLoginTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="lastLoginIp"
        label="Last login IP"
        align="center"
        width="110"
        key="18"
      >
      </el-table-column>
      <el-table-column
        prop="userStatus"
        label="state"
        align="center"
        width="110"
        key="19"
      >
        <template slot-scope="scope">
          <span style="color: red" v-if="scope.row.userStatus == 'DISABLE'">Stop</span>
          <span style="color: #e6a23c" v-if="scope.row.userStatus == 'LIMIT_DRAW'"
            >Restricted withdrawal</span
          >
          <span style="color: #21ae04" v-else>normal</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="operate"
        align="center"
        width="140"
        key="20"
        fixed="right"
      >
        <template slot-scope="scope">
          <span
            class="blueColor publick-button cursor"
            @click="operatingScore(scope.row)"
          >
            Up and down
          </span>
          <span class="blueColor publick-button cursor"> Detail </span>
          <span
            class="blueColor publick-button cursor"
            @click="operatingAccount(scope.row)"
          >
            {{ scope.row.userStatus == "DISABLE" ? "Ban" : "Stop" }}
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="closeGoogle(scope.row)"
            v-if="scope.row.googleValidateStatus == 'TRUE'"
          >
            Close Google Verification
          </span>
          <span
            class="blueColor publick-button cursor"
            v-if="scope.row.checkStatus != 'TRUE' && scope.row.userStatus == 'LIMIT_DRAW'"
            @click="veriftyAccount(scope.row)"
          >
            Verification account number
          </span>
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
      :title="uploadType == 1 ? 'Import test account' : 'Import result'"
      :visible.sync="showDialog"
      :width="uploadType == 1 ? '440px' : '1200px'"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div v-if="uploadType == 1">
        <el-upload
          :action="uploadUrl"
          :class="{ hide: hideUpload }"
          :on-change="handleChange"
          :on-success="handleUpload"
          :file-list="fileExcel"
          :multiple="false"
          :limit="1"
          accept=".xls,.xlsx"
          list-type="picture-card"
          :before-upload="handleBefore"
          :on-remove="handleRemove"
          :on-exceed="handExceed"
          :headers="uploadHeader"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </div>
      <el-table :data="testData" v-else style="width: auto" border>
        <el-table-column
          prop="chainId"
          label="Chain ID"
          align="center"
          width="110"
          key="1"
        >
        </el-table-column>
        <el-table-column
          prop="walletAddress"
          label="Wallet address"
          align="center"
          key="2"
        >
        </el-table-column>
        <el-table-column
          prop="walletName"
          label="Wallet name"
          align="center"
          width="110"
          key="3"
        >
        </el-table-column>
        <el-table-column prop="remark" label="Remark" align="center" key="4">
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="Up and down"
      :visible.sync="showUpDownDialog"
      width="440px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="40px"
          class="demo-ruleForm"
        >
          <el-form-item label="Currency" prop="coin">
            <el-select
              v-model="ruleForm.coin"
              placeholder="Please select currency"
              style="width: 300px"
            >
              <el-option label="usdt" value="USDT"> </el-option>
              <el-option label="eth" value="ETH"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Score" prop="score">
            <el-input-number
              v-model="ruleForm.score"
              style="width: 300px"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="updateScore()">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="In batches"
      :visible.sync="dialogVisible"
      width="440px"
      :close-on-click-modal="false"
    >
      <div>
        <div class="amount-input">
          <p>quantity</p>
          <el-input type="number" v-model="upscoreNum" style="width: 100%"></el-input>
        </div>
        <div class="total-box">
          <p>total people:{{ upscoreList?.length }}</p>
          <p>Total score:{{ upscoreList?.length * upscoreNum }}</p>
        </div>
        <el-table :data="upscoreList" style="width: auto" border>
          <el-table-column prop="id" label="id" align="center" width="110" key="1">
          </el-table-column>
          <el-table-column prop="email" label="Mail" align="center" key="2">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="Balance"
            align="center"
            width="110"
            key="3"
          >
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="batchUpAndDownSave">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-if="assetBalanceDialog"
      title="Asset details"
      :visible.sync="assetBalanceDialog"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-table :data="assetBalanceList" style="width: 100%" border>
        <template v-if="assetDialogType == 'withdraw'">
          <el-table-column prop="coin" label="Currency" align="center" key="1">
          </el-table-column>
          <el-table-column prop="withdrawalPrice" label="Amount" align="center" key="2">
          </el-table-column>
          <el-table-column prop="serviceFee" label="Handling fee" align="center" key="3">
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column prop="assetType" label="Currency" align="center" key="4">
          </el-table-column>
          <el-table-column prop="assetBalance" label="quantity" align="center" key="5">
          </el-table-column>
          <el-table-column
            prop="conversionUsdtBalance"
            label="U price"
            align="center"
            key="6"
          >
          </el-table-column>
        </template>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="assetBalanceDialog = false">closure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { timeForStr, exportExcel, accurateDecimal } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";

export default {
  name: "UserList",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      showDialog: false,
      uploadType: 1,
      testData: [],

      showUpDownDialog: false,
      ruleForm: {
        score: 0,
        coin: "USDT",
      },

      scoreId: null,

      obscureField: null,
      upId: null,
      userStatus: null,
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      registrationTime: null,
      loginedTime: null,
      tableData: null,
      aggregateQuery: {},
      baseUserPage: null, //分页相关
      uploadUrl: "", //上传url
      fileExcel: [], //文件列表
      limitCount: 1,
      hideUpload: false,
      uploadHeader: {
        certificate: sessionStorage.getItem("token"),
      },
      dialogVisible: false,
      upscoreList: [],
      upscoreNum: "",
      assetDialogType: "",
      assetBalanceDialog: false,
      assetBalanceList: [],
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    timeForStr: timeForStr,
    accurateDecimal: accurateDecimal,
    searchFun() {
      let { registrationTime, loginedTime } = this;
      let regStartTime = null;
      let regEndTime = null;
      let lastLoginStartTime = null;
      let lastLoginEndTime = null;
      if (registrationTime && registrationTime[0]) {
        regStartTime = timeForStr(registrationTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (registrationTime && registrationTime[1]) {
        regEndTime = timeForStr(registrationTime[1], "YYYY-MM-DD HH:mm:ss");
      }
      if (loginedTime && loginedTime[0]) {
        lastLoginStartTime = timeForStr(loginedTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (loginedTime && loginedTime[1]) {
        lastLoginEndTime = timeForStr(loginedTime[1], "YYYY-MM-DD HH:mm:ss");
      }
      return {
        obscureField: this.obscureField,
        upId: this.upId,
        userStatus: this.userStatus,
        regStartTime,
        regEndTime,
        lastLoginStartTime,
        lastLoginEndTime,
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

      this.fetchUserlist();
    },
    // 加载用户列表
    async fetchUserlist(isSearch = true) {
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
          ...sortData,
          size: size,
          page: _page,
        },
        ...search,
      };
      const res = await this.$http.getUserlist(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getUserDataTotal(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 用户列表导出
    onExport() {
      const search = this.searchFun();
      const urlStr = config.api + "/user/exportExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          coin: coin,
          userType: userType,
        },
        ...search,
      };

      exportExcel(urlStr, data, "User list export");
    },
    // 用户国家导出
    onExportCountry() {
      const search = this.searchFun();
      const urlStr = config.api + "/user/dailyCountryStatsExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          startDate: search.lastLoginStartTime,
          endDate: search.lastLoginEndTime,
          userType: userType,
        },
        ...search,
      };

      if (search.lastLoginStartTime == null) {
        alert("The final time of the login time must be filled in");
        return;
      }

      exportExcel(urlStr, data, "Daily national statistical data export");
    },
    onExportUser() {
      const search = this.searchFun();
      const urlStr = config.api + "/user/userRechargeStatsExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          startDate: search.lastLoginStartTime,
          endDate: search.lastLoginEndTime,
          userType: userType,
        },
        ...search,
      };

      if (search.lastLoginStartTime == null) {
        alert("The final time of the login time must be filled in");
        return;
      }

      exportExcel(urlStr, data, "User recharge data export");
    },
    // 下载模板
    downloadExcel(name) {
      const urlStr = config.api + "/file/template/download";
      const data = {
        name,
      };
      exportExcel(urlStr, data, "User import template");
    },
    async importBatchUpAndDownFunc(file) {
      const formData = new FormData();
      formData.append("file", file.raw);
      const res = await this.$http.importBatchUpAndDown(formData);
      if (res) {
        this.upscoreList = res;
        if (this.upscoreList?.length > 0) {
          this.dialogVisible = true;
        } else {
          this.$message.error(
            "The upload data is incorrect, please upload it after confirmation!"
          );
        }
      } else {
        this.upscoreList = [];
      }
    },
    async batchUpAndDownSave() {
      if (!this.upscoreNum) {
        this.$message.error("Please enter the quantity");
        return;
      }
      const ids = this.upscoreList.map((x) => x.id);
      const res = await this.$http.batchUpAndDown({
        ids,
        amount: this.upscoreNum,
        coin: "USDT",
      });
      if (res) {
        this.dialogVisible = false;
        this.fetchUserlist();
        this.$message.success("Successful operation!");
      }
    },
    assetBalanceDialogFunc(row, type) {
      if (type == "withdraw") {
        this.assetDialogType = type;
        this.assetBalanceList = row.darwListBOS;
      } else {
        this.assetBalanceList = row.assetBOS;
      }
      this.assetBalanceDialog = true;
    },
    // 封停/解禁
    operatingAccount(row) {
      this.$confirm(
        `Determine${row.userStatus == "DISABLE" ? "Ban" : "Stop"}user『${
          row.userName || row.id
        }』?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          let res = null;
          if (row.userStatus == "DISABLE") {
            // 解禁
            res = await this.$http.accountThaw({
              id: row.id,
            });
          } else {
            // 封停
            res = await this.$http.accountFreeze({
              id: row.id,
            });
          }
          if (res) {
            this.fetchUserlist();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 关闭谷歌验证
    closeGoogle(row) {
      this.$confirm(
        `Are you sure to close the user "${
          row.username || row.id
        }" Google secondary verification?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          const res = await this.$http.closeGoogleValidate({
            id: row.id,
          });
          if (res) {
            this.fetchUserlist();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    veriftyAccount(row) {
      this.$confirm(`Are you surehinto pass the verification?`, "hint", {
        confirmButtonText: "approved",
        cancelButtonText: "Cancel",
        type: "info",
      })
        .then(async () => {
          const res = await this.$http.userCheckAdopt({
            id: row.id,
          });
          if (res) {
            this.fetchUserlist();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 打开上下分弹窗
    operatingScore(row) {
      this.scoreId = row.id;
      this.showUpDownDialog = true;
    },
    // 更新分数
    async updateScore() {
      const res = await this.$http.upAndDown({
        id: this.scoreId,
        amount: this.ruleForm.score,
        coin: this.ruleForm.coin,
      });

      if (res) {
        this.fetchUserlist();
        this.handleClose();
        this.$message.success("Successful operation");
      }
    },
    handleClose(done) {
      this.uploadType = 1;
      this.ruleForm.score = 0;
      this.scoreId = "";
      this.testData = [];
      if (done) {
        done();
        return;
      }

      this.showDialog = false;
      this.showUpDownDialog = false;
    },
    handleUpload(res) {
      this.uploadType = 2;
      this.testData = res.data;
      if (res.status == 200) {
        this.fileImg.push({ url: res.data });
        return;
      }

      this.$message.error("upload failed");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 100; // 限制小于100M
      if (!is1M) {
        _this.$message.error(
          "The file is too large, the file size is small and small is less than 100M"
        );
      }
      return is1M;
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.fileImg = [];
    },
    handExceed(fiel) {
      this.$message.error("File can only upload one");
    },
    //控制每页数量
    handleSizeChange(val) {
      this.size = val;
      this.fetchUserlist();
    },
    //翻页
    handleCurrentChange(val) {
      this.page = val;
      this.fetchUserlist(false);
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
  // 创建后
  created() {
    this.fetchUserlist();
    this.uploadUrl = config.api + "/user/importInner";
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
.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}

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
  width: 100%;
  display: flex;
  .remittance-item {
    min-width: auto;
    flex: 1;
  }
}
.amount-input {
  display: flex;
  align-items: center;
  p {
    width: 50px;
  }
}
.total-box {
  display: flex;
  margin: 15px 0;
  margin-bottom: 20px;
  p {
    margin-right: 20px;
    font-size: 18px;
    font-weight: bold;
  }
}
.download-module {
  margin-right: 20px;
}
.download-module {
  position: relative;
  top: -4px;
}
</style>
