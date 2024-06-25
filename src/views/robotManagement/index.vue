<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <div class="remittance-box">
        <div class="remittance-amount remittance-more">
          <div class="remittance-item">
            <div class="title">Number of robots</div>
            <div class="val">
              {{ statisticsData && statisticsData.botNumber }}
            </div>
          </div>
          <div class="remittance-item">
            <div class="title">Robot balance</div>
            <div class="val">
              {{ statisticsData && statisticsData.botBalance }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-button
          type="primary"
          icon="el-icon-plus"
          class="public-search"
          @click="dialogVisiblePoint = true"
        >
          Batch
        </el-button>
        <el-button
          type="primary"
          icon="el-icon-edit"
          class="public-search"
          @click="dialogVisiblePwd = true"
        >
          Batch modification password
        </el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="Blind box" name="box">
        <el-table :data="tableData" style="width: 100%" class="public-table" border>
          <el-table-column prop="boxId" label="Blind box ID" align="center">
          </el-table-column>
          <el-table-column prop="boxName" label="Blind Box Name" align="center">
          </el-table-column>
          <el-table-column prop="price" label="Single draw price" align="center">
          </el-table-column>
          <el-table-column
            prop="boxOpenNumber"
            label="Robot open box number"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="boxOpenExpenditure"
            label="Robot open box expenditure"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="boxLotteryPrice"
            label="Robot winning value"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="intervalTime" label="Intervals" align="center">
          </el-table-column>
          <el-table-column prop="oneOrder" label="Percussion" align="center">
          </el-table-column>
          <el-table-column
            prop="fiveOrder"
            label="Five -consecutive chance"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="tenOrder" label="Risk" align="center"> </el-table-column>
          <el-table-column prop="gasWalletAddress" label="state" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.botStatus == 'TRUE'" style="color: #67c23a">
                in progress
              </p>
              <p v-else style="color: #f56c6c">stopped</p>
            </template>
          </el-table-column>
          <el-table-column label="operate" align="center">
            <template slot-scope="scope">
              <span
                class="blueColor publick-button cursor"
                @click="operatingFunc(scope.row, 'close')"
                v-if="scope.row.botStatus == 'TRUE'"
              >
                closure
              </span>
              <span
                class="blueColor publick-button cursor"
                @click="operatingFunc(scope.row, 'open')"
                v-else
                >Open
              </span>
              <span class="blueColor publick-button cursor" @click="setFun(scope.row)"
                >Configuration</span
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
      </el-tab-pane>
      <el-tab-pane label="Currency war" name="war">
        <el-table :data="watTableData" style="width: 100%" class="public-table" border>
          <el-table-column prop="gameName" label="Game name" align="center">
          </el-table-column>
          <el-table-column
            prop="botJoinNum"
            label="Number of robot participation"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="botBuyTotal" label="Robotic expenditure" align="center">
          </el-table-column>
          <el-table-column prop="botIncomeTotal" label="Robotic income" align="center">
          </el-table-column>
          <el-table-column
            prop="botBigBounds"
            label="Robot contribution award"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="joinRate"
            label="Unmanned bureau participation rate"
            align="center"
          >
            <template slot-scope="scope"> {{ scope.row.joinRate }}% </template>
          </el-table-column>
          <el-table-column
            prop="minNum"
            label="Minimum number of participants"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="maxNum"
            label="The maximum number of participants"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="maxBuyTotal"
            label="Unmanned biggest note"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="peopleMaxBuyTotal"
            label="Someone's biggest note"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="maxBuyTotalDiff" label="Overturn" align="center">
            <template slot-scope="scope"> {{ scope.row.maxBuyTotalDiff }}% </template>
          </el-table-column>
          <el-table-column prop="intervalTime" label="Below" align="center">
            <template slot-scope="scope"> {{ scope.row.intervalTime }}s </template>
          </el-table-column>
          <el-table-column prop="joinTime" label="Admission time" align="center">
            <template slot-scope="scope">
              {{ `${scope.row.joinTime}(+-${scope.row.joinTimeDiff}s)` }}
            </template>
          </el-table-column>
          <el-table-column prop="botStatus" label="state" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.botStatus == 'TRUE'" style="color: #67c23a">
                in progress
              </p>
              <p v-else style="color: #f56c6c">stopped</p>
            </template>
          </el-table-column>
          <el-table-column label="operate" align="center">
            <template slot-scope="scope">
              <span
                class="blueColor publick-button cursor"
                @click="warOperatingFunc(scope.row, 'close')"
                v-if="scope.row.botStatus == 'TRUE'"
              >
                closure
              </span>
              <span
                class="blueColor publick-button cursor"
                @click="warOperatingFunc(scope.row, 'open')"
                v-else
                >Open
              </span>
              <span class="blueColor publick-button cursor" @click="warSetFun(scope.row)"
                >Configuration</span
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 盲合 -->
    <el-dialog
      title="Robot configuration"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="ruleForm" :model="ruleForm" label-width="120px" :rules="rules">
        <el-form-item label="Blind Box Name">
          <p class="infor">{{ ruleForm.boxName }}</p>
        </el-form-item>
        <el-form-item label="Single draw price">
          <p class="infor">{{ ruleForm.price }}</p>
        </el-form-item>
        <el-form-item label="Robot open box number">
          <p class="infor">{{ ruleForm.boxOpenNumber }}</p>
        </el-form-item>
        <el-form-item label="Robot open box expenditure">
          <p class="infor">{{ ruleForm.boxOpenExpenditure }}</p>
        </el-form-item>
        <el-form-item label="Robot winning value">
          <p class="infor">{{ ruleForm.boxLotteryPrice }}</p>
        </el-form-item>
        <el-form-item label="Intervals" prop="intervalTime" :rules="rules.blur">
          <el-input
            v-model.number="ruleForm.intervalTime"
            type="number"
            autocomplete="off"
          >
            <template slot="append">秒</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Percussion" prop="oneOrder" :rules="rules.blur">
          <el-input v-model.number="ruleForm.oneOrder" type="number" autocomplete="off"
            ><template slot="append">%</template></el-input
          >
        </el-form-item>
        <el-form-item
          label="Five -consecutive chance"
          prop="fiveOrder"
          :rules="rules.blur"
        >
          <el-input v-model.number="ruleForm.fiveOrder" type="number" autocomplete="off"
            ><template slot="append">%</template></el-input
          >
        </el-form-item>
        <el-form-item label="Risk" prop="tenOrder" :rules="rules.blur">
          <el-input v-model.number="ruleForm.tenOrder" type="number" autocomplete="off"
            ><template slot="append">%</template></el-input
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveFunc">Sure</el-button>
      </span>
    </el-dialog>
    <!-- 战争 -->
    <el-dialog
      title="Robot configuration"
      :close-on-click-modal="false"
      :visible.sync="warDialogVisible"
      width="30%"
    >
      <el-form ref="warRuleForm" :model="warRuleForm" label-width="120px" :rules="rules">
        <el-form-item label="Game name">
          <p class="infor">{{ warRuleForm.gameName }}</p>
        </el-form-item>
        <el-form-item label="Number of robot participation">
          <p class="infor">{{ warRuleForm.botJoinNum }}</p>
        </el-form-item>
        <el-form-item label="Machine expenditure">
          <p class="infor">{{ warRuleForm.botBuyTotal }}</p>
        </el-form-item>
        <el-form-item label="Machine income">
          <p class="infor">{{ warRuleForm.botIncomeTotal }}</p>
        </el-form-item>
        <el-form-item label="Robot contribution award">
          <p class="infor">{{ warRuleForm.botBigBounds }}</p>
        </el-form-item>
        <el-form-item label="Probability" prop="joinRate" :rules="rules.blur">
          <el-input
            v-model.number="warRuleForm.joinRate"
            type="number"
            autocomplete="off"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="Minimum number of participants"
          prop="minNum"
          :rules="rules.blur"
        >
          <el-input
            v-model.number="warRuleForm.minNum"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="The maximum number of participants"
          prop="maxNum"
          :rules="rules.blur"
        >
          <el-input
            v-model.number="warRuleForm.maxNum"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="No one's biggest betting"
          prop="maxBuyTotal"
          :rules="rules.blur"
        >
          <el-input
            v-model.number="warRuleForm.maxBuyTotal"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="Someone's biggest bet"
          prop="peopleMaxBuyTotal"
          :rules="rules.blur"
        >
          <el-input
            v-model.number="warRuleForm.peopleMaxBuyTotal"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Total betting" prop="maxBuyTotalDiff" :rules="rules.blur">
          <el-input
            v-model.number="warRuleForm.maxBuyTotalDiff"
            type="number"
            autocomplete="off"
            ><template slot="append">%</template></el-input
          >
        </el-form-item>
        <el-form-item label="Below" prop="intervalTime" :rules="rules.blur">
          <el-input
            v-model.number="warRuleForm.intervalTime"
            type="number"
            autocomplete="off"
            ><template slot="append">s</template></el-input
          >
        </el-form-item>
        <el-form-item label="Admission time" prop="joinTime" :rules="rules.blur">
          <el-input
            v-model.number="warRuleForm.joinTime"
            type="number"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Time to enter" prop="joinTimeDiff" :rules="rules.blur">
          <el-input
            v-model.number="warRuleForm.joinTimeDiff"
            type="number"
            autocomplete="off"
            ><template slot="append">s</template></el-input
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="warDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="warSaveFunc">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Batch"
      :close-on-click-modal="false"
      :visible.sync="dialogVisiblePoint"
      width="400px"
    >
      <el-form
        ref="ruleFormPoint"
        :model="ruleFormPoint"
        label-width="50px"
        :rules="rules"
      >
        <el-form-item label="Currency" prop="coin" :rules="rules.blur">
          <el-select
            v-model="ruleFormPoint.coin"
            placeholder="Please select currency"
            style="width: 300px"
          >
            <el-option label="usdt" value="USDT"> </el-option>
            <el-option label="eth" value="ETH"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Score" prop="amount" :rules="rules.blur">
          <el-input
            v-model="ruleFormPoint.amount"
            type="number"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePoint = false">Cancel</el-button>
        <el-button type="primary" @click="savePointerFunc">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Batch modification password"
      :close-on-click-modal="false"
      :visible.sync="dialogVisiblePwd"
      width="30%"
    >
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
import bigNumber from "bignumber.js";
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "walletOneDollarLottery",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      dialogVisible: false,
      dialogVisiblePoint: false,
      dialogVisiblePwd: false,
      ruleForm: {},
      ruleFormPoint: {
        coin: "USDT",
        amount: "",
      },
      ruleFormPwd: {
        password: "",
      },
      rules: {
        blur: [{ required: true, message: "please enter", trigger: "blur" }],
      },
      statisticsData: null,
      activeName: "box",
      warDialogVisible: false,
      warRuleForm: {},
      watTableData: [],
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 加载列表
    async getTableList(isSearch = true) {
      const { size } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          size: size,
          page: _page,
        },
      };
      const res = await this.$http.getBoxBotPageList(data);
      if (res) {
        this.tableData = res.records;
      }
      delete data.size;
      delete data.page;
      const statisticsData = await this.$http.boxBotHeaderDataTotal(data);
      if (statisticsData) {
        this.statisticsData = statisticsData;
      }
    },
    setFun(row) {
      this.ruleForm = row;
      this.dialogVisible = true;
    },
    operatingFunc(row, type) {
      this.$confirm(`Determine${type == "open" ? `Open` : "closure"}?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          let res = null;
          if (type == "open") {
            // 开启
            res = await this.$http.boxBotOpen({
              boxId: row.boxId,
            });
          } else {
            // 关闭
            res = await this.$http.boxBotClose({
              boxId: row.boxId,
            });
          }
          if (res) {
            this.getTableList();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    saveFunc() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let res = await this.$http.boxBotUpdate({ ...this.ruleForm });
          if (res) {
            this.dialogVisible = false;
            this.getTableList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async getWarTableList(isSearch = true) {
      const { size } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          size: size,
          page: _page,
        },
      };
      const res = await this.$http.getTokenWarPageList(data);
      if (res) {
        res.joinRate = res.joinRate * 100;
        res.maxBuyTotalDiff = res.maxBuyTotalDiff * 100;
        this.watTableData = [{ ...res }];
      }
    },
    warSetFun(row) {
      this.warRuleForm = row;
      this.warDialogVisible = true;
    },
    warOperatingFunc(row, type) {
      this.$confirm(
        `Are you sure you want $ {type == "Open"? "Open":" Turn off "}?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          let res = await this.$http.tokenWarConfig({
            botStatus: type == "open" ? "TRUE" : "FALSE",
          });
          if (res) {
            this.getWarTableList();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    warSaveFunc() {
      this.$refs.warRuleForm.validate(async (valid) => {
        if (valid) {
          let warRuleForm = { ...this.warRuleForm };
          warRuleForm.joinRate = warRuleForm.joinRate / 100;
          warRuleForm.maxBuyTotalDiff = warRuleForm.maxBuyTotalDiff / 100;
          let res = await this.$http.tokenWarConfig({ ...warRuleForm });
          if (res) {
            this.warDialogVisible = false;
            this.getWarTableList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    savePointerFunc() {
      this.$refs.ruleFormPoint.validate(async (valid) => {
        if (valid) {
          let res = await this.$http.boxBotUpAndDown({ ...this.ruleFormPoint });
          if (res) {
            this.dialogVisiblePoint = false;
            this.$refs["ruleFormPoint"].resetFields();
            this.getTableList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    savePwdFunc() {
      this.$refs.ruleFormPwd.validate(async (valid) => {
        if (valid) {
          let res = await this.$http.boxBotUpdatePassword({ ...this.ruleFormPwd });
          if (res) {
            this.dialogVisiblePwd = false;
            this.$refs["ruleFormPwd"].resetFields();
            this.getTableList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClick() {
      if (this.activeName == "box") {
        this.getTableList();
      } else {
        this.getWarTableList();
      }
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableList(false);
    },
  },
  // 创建后
  created() {
    this.getTableList();
    this.getWarTableList();
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
.public-list-inputs {
  display: flex;
  justify-content: right;
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
  display: flex;
}
.public-list-inputs {
  display: flex;
  justify-content: space-between;
}
.infor {
  line-height: 28px;
}
</style>
