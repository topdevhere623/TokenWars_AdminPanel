<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter ID, nickname, mailbox search"
        v-model="obscureField"
        clearable
      />
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
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="dialogVisible = true"
      >
        Add to
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Always score up and down</div>
          <div class="val">
            {{ statisticsData?.scores }}
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="userId" label="id" align="center" key="1">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userId || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="Nick name" align="center" key="2">
      </el-table-column>
      <el-table-column prop="email" label="Mail" align="center" key="3">
      </el-table-column>
      <el-table-column prop="assetBalance" label="Balance" align="center" key="4">
      </el-table-column>
      <el-table-column
        prop="score"
        label="Always score up and down"
        align="center"
        key="5"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.score || "--" }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="Winning coefficient" align="center" key="5">
        <template slot-scope="scope">
          <p>{{ scope.row.lotteryCoefficient || "--" }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="assetBalance"
        label="Prohibit withdrawal"
        align="center"
        key="6"
      >
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.isWithdrawal"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"
            active-value="TRUE"
            inactive-value="FALSE"
            @change="mandatoryReviwUpdateFunc(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="assetBalance" label="Prohibit take" align="center" key="7">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.isTake"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"
            active-value="TRUE"
            inactive-value="FALSE"
            @change="mandatoryReviwUpdateFunc(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="assetBalance"
        label="Prohibit one dollar purchase"
        align="center"
        key="8"
      >
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.isOneDollarBuy"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"
            active-value="TRUE"
            inactive-value="FALSE"
            @change="mandatoryReviwUpdateFunc(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="operate" align="center" width="280" key="9">
        <template slot-scope="scope">
          <span
            class="blueColor publick-button cursor"
            @click="operatingScore(scope.row)"
          >
            Up and down
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="operatingCoefficient(scope.row)"
          >
            Winning coefficient
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="operatingMarket(scope.row, 'remove')"
          >
            Remove
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="operatingMarket(scope.row)"
            v-if="scope.row.userType !== 'INNER'"
          >
            Transfer test account
          </span>
          <span class="blueColor publick-button cursor" @click="operatingPwd(scope.row)">
            change Password
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
      title="添加强制审核名单"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="720px"
      top="5vh"
    >
      <div class="search-box">
        <el-input
          class="public-input"
          style="width: 520px"
          placeholder="Enter ID, nickname, mailbox search"
          v-model="searchObscureField"
          clearable
          @input="searchAddData"
        />
      </div>
      <el-table
        ref="multipleTable"
        :data="searchTableData"
        height="550"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="id" align="center" key="1">
          <template slot-scope="scope">
            <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
              {{ scope.row.id || "--" }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="Nick name" align="center" key="2">
        </el-table-column>
        <el-table-column prop="email" label="Mail" align="center" key="3">
        </el-table-column>
        <el-table-column prop="assetBalance" label="Balance" align="center" key="4">
          <template slot-scope="scope">
            <span>{{
              (scope.row.usdtLastPrice * scope.row.assetBalance).toFixed(2)
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="searchBaseUserPage && searchBaseUserPage.total"
        background
        @size-change="searchHandleSizeChange"
        @current-change="searchHandleCurrentChange"
        :current-page="pageTwo"
        :page-sizes="pagination.pageSizes"
        :page-size="sizeTwo"
        layout=" sizes, prev, pager, next, jumper"
        :total="searchBaseUserPage.total"
        class="public-pagination"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveFunc">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="上下分"
      :visible.sync="showUpDownDialog"
      width="440px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div>
        <el-input-number v-model="score" style="width: 100%"></el-input-number>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="updateScore()">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Winning coefficient"
      :visible.sync="dialogCoefficientVisible"
      width="440px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div>
        <el-input
          v-model="lotteryCoefficient"
          placeholder="Please enter the winning coefficient"
          style="width: 100%"
        ></el-input>
        <p class="tip">The coefficient cannot be less than 1</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="updateCoefficient()">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog title="change Password" :visible.sync="dialogVisiblePwd" width="30%">
      <el-form ref="ruleFormPwd" :model="ruleFormPwd" label-width="120px" :rules="rules">
        <el-form-item label="New Password" prop="password" :rules="rules.blur">
          <el-input
            v-model="ruleFormPwd.password"
            placeholder="Please enter a new password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePwd = false">Cancel</el-button>
        <el-button type="primary" @click="savePwdFunc">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { debounce } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "mandatoryAudit",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      obscureField: null,
      searchObscureField: null,
      page: 1,
      size: 20,
      pageTwo: 1,
      sizeTwo: 20,
      tableData: null,
      baseUserPage: null,
      searchTableData: null,
      searchBaseUserPage: null,
      dialogVisible: false,
      showUpDownDialog: false,
      dialogCoefficientVisible: false,
      dialogVisiblePwd: false,
      multipleSelection: [],
      statisticsData: {},
      userId: null,
      row: {},
      score: null,
      lotteryCoefficient: null,
      ruleFormPwd: {
        password: "",
      },
      rules: {
        blur: [{ required: true, message: "please enter", trigger: "blur" }],
      },
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    onSearch() {},
    // 加载列表
    async getTableListFunc(isSearch = true) {
      const { size, obscureField } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        size: size,
        page: _page,
        obscureField,
      };
      const res = await this.$http.mandatoryReviewPageList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
        if (_page > 1 && this.tableData?.length == 0) {
          this.getTableListFunc(true);
        }
      }
      delete data.size;
      delete data.page;
      const statisticsData = await this.$http.mandatoryReviwHeaderDataTotal(data);
      if (statisticsData) {
        this.statisticsData = statisticsData;
      }
    },

    async getSearchTableData(isSearch = true) {
      const { sizeTwo, searchObscureField } = this;
      let _page = this.pageTwo;
      if (isSearch) {
        this.pageTwo = 1;
        _page = 1;
      }
      const data = {
        size: sizeTwo,
        page: _page,
        coin: this.coin,
        obscureField: searchObscureField,
      };
      const res = await this.$http.getUserlist(data);
      if (res) {
        this.searchBaseUserPage = res;
        this.searchTableData = res.records;
      }
    },
    searchAddData() {
      debounce(this.getSearchTableData(true), 1000);
    },
    // 打开上下分弹窗
    operatingScore(row) {
      this.userId = row.userId;
      this.showUpDownDialog = true;
    },
    operatingCoefficient(row) {
      this.row = row;
      this.lotteryCoefficient = row.lotteryCoefficient;
      this.dialogCoefficientVisible = true;
    },
    handleClose(done) {
      this.score = null;
      this.userId = "";
      if (done) {
        done();
        return;
      }
      this.showUpDownDialog = false;
      this.dialogCoefficientVisible = false;
    },
    operatingPwd(row) {
      this.row = row;
      this.dialogVisiblePwd = true;
    },
    // 更新分数
    async updateScore() {
      const res = await this.$http.upAndDown({
        id: this.userId,
        amount: this.score,
        coin: this.coin,
      });

      if (res) {
        this.getTableListFunc(false);
        this.handleClose();
        this.$message.success("Successful operation");
      }
    },

    savePwdFunc() {
      this.$refs.ruleFormPwd.validate(async (valid) => {
        if (valid) {
          let res = await this.$http.mandatoryReviwUpdatePassword({
            id: this.row.id,
            ...this.ruleFormPwd,
          });
          if (res) {
            this.dialogVisiblePwd = false;
            this.$refs["ruleFormPwd"].resetFields();
            this.getTableListFunc(false);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    operatingMarket(row, type) {
      let tip =
        type == "remove"
          ? `Are you sure to remove ${row.username}?`
          : `Are you sure to convert ${row.username} into a test account? It is irreversible after turning, please do it carefully`;
      this.$confirm(tip, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "info",
      })
        .then(async () => {
          let res = null;
          if (type == "remove") {
            res = await this.$http.mandatoryReviewRemove({
              id: row.id,
            });
          } else {
            res = await this.$http.mandatoryReviwTransferTestAccount({
              userId: row.userId,
            });
          }
          console.log(res);
          if (res) {
            this.getTableListFunc(false);
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async updateCoefficient() {
      if (this.lotteryCoefficient < 1) {
        this.$message.error("The coefficient cannot be less than 1");
        return;
      }
      const res = await this.$http.mandatoryReviwUpdate({
        id: this.row?.id,
        lotteryCoefficient: this.lotteryCoefficient,
      });

      if (res) {
        this.getTableListFunc(false);
        this.handleClose();
        this.$message.success("Successful operation");
      }
    },
    async mandatoryReviwUpdateFunc(row) {
      const res = await this.$http.mandatoryReviwUpdate({
        id: row.id,
        isWithdrawal: row.isWithdrawal,
        isTake: row.isTake,
        isOneDollarBuy: row.isOneDollarBuy,
      });
      if (res) {
        this.getTableListFunc(false);
        this.$message.success("Successful operation");
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection() {
      this.multipleSelection = [];
      this.$refs.multipleTable.clearSelection();
    },
    async saveFunc() {
      const userIds = this.multipleSelection.map((x) => x.id);
      const res = await this.$http.mandatoryReviewAdd({ userIds });
      if (res) {
        if (this.searchObscureField) {
          this.searchObscureField = null;
          this.getSearchTableData(true);
        }
        this.$message.success("Successful operation");
        this.dialogVisible = false;
        this.toggleSelection();
        this.getTableListFunc();
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableListFunc();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableListFunc(false);
    },
    searchHandleSizeChange(val) {
      this.sizeTwo = val;
      this.getSearchTableData();
    },
    searchHandleCurrentChange(val) {
      this.pageTwo = val;
      this.getSearchTableData(false);
    },
  },
  computed: {
    coin() {
      return this.$store.getters.coinConfig;
    },
  },
  // 创建后
  created() {
    this.getTableListFunc();
    this.getSearchTableData();
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
.tip {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}
</style>
