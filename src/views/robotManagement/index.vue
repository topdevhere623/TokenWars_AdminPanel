<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <div class="remittance-box">
        <div class="remittance-amount remittance-more">
          <div class="remittance-item">
            <div class="title">机器人数量</div>
            <div class="val">
              {{ statisticsData && statisticsData.botNumber }}
            </div>
          </div>
          <div class="remittance-item">
            <div class="title">机器人余额</div>
            <div class="val">
              {{ statisticsData && statisticsData.botBalance }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-button type="primary" icon="el-icon-plus" class="public-search" @click="dialogVisiblePoint = true"> 批量上下分 </el-button>
        <el-button type="primary" icon="el-icon-edit" class="public-search" @click="dialogVisiblePwd = true"> 批量修改密码 </el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="盲盒" name="box">
        <el-table :data="tableData" style="width: 100%" class="public-table" border>
          <el-table-column prop="boxId" label="盲盒ID" align="center"> </el-table-column>
          <el-table-column prop="boxName" label="盲盒名称" align="center"> </el-table-column>
          <el-table-column prop="price" label="单抽价格" align="center"> </el-table-column>
          <el-table-column prop="boxOpenNumber" label="机器人开盒数" align="center"> </el-table-column>
          <el-table-column prop="boxOpenExpenditure" label="机器人开盒支出" align="center"> </el-table-column>
          <el-table-column prop="boxLotteryPrice" label="机器人中奖价值" align="center"> </el-table-column>
          <el-table-column prop="intervalTime" label="间隔时间" align="center"> </el-table-column>
          <el-table-column prop="oneOrder" label="单抽几率" align="center"> </el-table-column>
          <el-table-column prop="fiveOrder" label="五连几率" align="center"> </el-table-column>
          <el-table-column prop="tenOrder" label="十连几率" align="center"> </el-table-column>
          <el-table-column prop="gasWalletAddress" label="状态" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.botStatus == 'TRUE'" style="color: #67c23a">进行中</p>
              <p v-else style="color: #f56c6c">已停止</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span class="blueColor publick-button cursor" @click="operatingFunc(scope.row, 'close')" v-if="scope.row.botStatus == 'TRUE'">
                关闭
              </span>
              <span class="blueColor publick-button cursor" @click="operatingFunc(scope.row, 'open')" v-else>开启 </span>
              <span class="blueColor publick-button cursor" @click="setFun(scope.row)">配置</span>
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
      <el-tab-pane label="货币战争" name="war">
        <el-table :data="watTableData" style="width: 100%" class="public-table" border>
          <el-table-column prop="gameName" label="游戏名" align="center"> </el-table-column>
          <el-table-column prop="botJoinNum" label="机器人参与局数" align="center"> </el-table-column>
          <el-table-column prop="botBuyTotal" label="机器人支出" align="center"> </el-table-column>
          <el-table-column prop="botIncomeTotal" label="机器人收入" align="center"> </el-table-column>
          <el-table-column prop="botBigBounds" label="机器人贡献大奖" align="center"> </el-table-column>
          <el-table-column prop="joinRate" label="无人局参与几率" align="center">
            <template slot-scope="scope"> {{ scope.row.joinRate }}% </template>
          </el-table-column>
          <el-table-column prop="minNum" label="最小参与人数" align="center"> </el-table-column>
          <el-table-column prop="maxNum" label="最大参与人数" align="center"> </el-table-column>
          <el-table-column prop="maxBuyTotal" label="无人最大总注" align="center"> </el-table-column>
          <el-table-column prop="peopleMaxBuyTotal" label="有人最大总注" align="center"> </el-table-column>
          <el-table-column prop="maxBuyTotalDiff" label="总注偏移" align="center">
            <template slot-scope="scope"> {{ scope.row.maxBuyTotalDiff }}% </template>
          </el-table-column>
          <el-table-column prop="intervalTime" label="下注间隔" align="center">
            <template slot-scope="scope"> {{ scope.row.intervalTime }}s </template>
          </el-table-column>
          <el-table-column prop="joinTime" label="入场时机" align="center">
            <template slot-scope="scope"> {{ `${scope.row.joinTime}(+-${scope.row.joinTimeDiff}s)` }} </template>
          </el-table-column>
          <el-table-column prop="botStatus" label="状态" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.botStatus == 'TRUE'" style="color: #67c23a">进行中</p>
              <p v-else style="color: #f56c6c">已停止</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span
                class="blueColor publick-button cursor"
                @click="warOperatingFunc(scope.row, 'close')"
                v-if="scope.row.botStatus == 'TRUE'"
              >
                关闭
              </span>
              <span class="blueColor publick-button cursor" @click="warOperatingFunc(scope.row, 'open')" v-else>开启 </span>
              <span class="blueColor publick-button cursor" @click="warSetFun(scope.row)">配置</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 盲合 -->
    <el-dialog title="机器人配置" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%">
      <el-form ref="ruleForm" :model="ruleForm" label-width="120px" :rules="rules">
        <el-form-item label="盲盒名称">
          <p class="infor">{{ ruleForm.boxName }}</p>
        </el-form-item>
        <el-form-item label="单抽价格">
          <p class="infor">{{ ruleForm.price }}</p>
        </el-form-item>
        <el-form-item label="机器人开盒数">
          <p class="infor">{{ ruleForm.boxOpenNumber }}</p>
        </el-form-item>
        <el-form-item label="机器人开盒支出">
          <p class="infor">{{ ruleForm.boxOpenExpenditure }}</p>
        </el-form-item>
        <el-form-item label="机器人中奖价值">
          <p class="infor">{{ ruleForm.boxLotteryPrice }}</p>
        </el-form-item>
        <el-form-item label="间隔时间" prop="intervalTime" :rules="rules.blur">
          <el-input v-model.number="ruleForm.intervalTime" type="number" autocomplete="off">
            <template slot="append">秒</template>
          </el-input>
        </el-form-item>
        <el-form-item label="单抽几率" prop="oneOrder" :rules="rules.blur">
          <el-input v-model.number="ruleForm.oneOrder" type="number" autocomplete="off"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item label="五连几率" prop="fiveOrder" :rules="rules.blur">
          <el-input v-model.number="ruleForm.fiveOrder" type="number" autocomplete="off"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item label="十连几率" prop="tenOrder" :rules="rules.blur">
          <el-input v-model.number="ruleForm.tenOrder" type="number" autocomplete="off"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFunc">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 战争 -->
    <el-dialog title="机器人配置" :close-on-click-modal="false" :visible.sync="warDialogVisible" width="30%">
      <el-form ref="warRuleForm" :model="warRuleForm" label-width="120px" :rules="rules">
        <el-form-item label="游戏名">
          <p class="infor">{{ warRuleForm.gameName }}</p>
        </el-form-item>
        <el-form-item label="机器人参与局数">
          <p class="infor">{{ warRuleForm.botJoinNum }}</p>
        </el-form-item>
        <el-form-item label="机器支出">
          <p class="infor">{{ warRuleForm.botBuyTotal }}</p>
        </el-form-item>
        <el-form-item label="机器收入">
          <p class="infor">{{ warRuleForm.botIncomeTotal }}</p>
        </el-form-item>
        <el-form-item label="机器人贡献大奖">
          <p class="infor">{{ warRuleForm.botBigBounds }}</p>
        </el-form-item>
        <el-form-item label="参与几率" prop="joinRate" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.joinRate" type="number" autocomplete="off">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最小参与人数" prop="minNum" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.minNum" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="最大参与人数" prop="maxNum" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.maxNum" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="无人最大总下注" prop="maxBuyTotal" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.maxBuyTotal" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="有人最大总下注" prop="peopleMaxBuyTotal" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.peopleMaxBuyTotal" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总下注偏移" prop="maxBuyTotalDiff" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.maxBuyTotalDiff" type="number" autocomplete="off"
            ><template slot="append">%</template></el-input
          >
        </el-form-item>
        <el-form-item label="下注间隔" prop="intervalTime" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.intervalTime" type="number" autocomplete="off"
            ><template slot="append">s</template></el-input
          >
        </el-form-item>
        <el-form-item label="入场时机" prop="joinTime" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.joinTime" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入场时机偏移" prop="joinTimeDiff" :rules="rules.blur">
          <el-input v-model.number="warRuleForm.joinTimeDiff" type="number" autocomplete="off"
            ><template slot="append">s</template></el-input
          >
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="warDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="warSaveFunc">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量上下分" :close-on-click-modal="false" :visible.sync="dialogVisiblePoint" width="400px">
      <el-form ref="ruleFormPoint" :model="ruleFormPoint" label-width="50px" :rules="rules">
        <el-form-item label="币种" prop="coin" :rules="rules.blur">
          <el-select v-model="ruleFormPoint.coin" placeholder="请选择币种" style="width: 300px">
            <el-option label="USDT" value="USDT"> </el-option>
            <el-option label="ETH" value="ETH"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上分" prop="amount" :rules="rules.blur">
          <el-input v-model="ruleFormPoint.amount" type="number" autocomplete="off" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePoint = false">取 消</el-button>
        <el-button type="primary" @click="savePointerFunc">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="批量修改密码" :close-on-click-modal="false" :visible.sync="dialogVisiblePwd" width="30%">
      <el-form ref="ruleFormPwd" :model="ruleFormPwd" label-width="120px" :rules="rules">
        <el-form-item label="新密码" prop="password" :rules="rules.blur">
          <el-input v-model="ruleFormPwd.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblePwd = false">取 消</el-button>
        <el-button type="primary" @click="savePwdFunc">确 定</el-button>
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
        blur: [{ required: true, message: "请输入", trigger: "blur" }],
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
      this.$confirm(`确定要${type == "open" ? `开启` : "关闭"}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
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
            this.$message.success("操作成功");
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
      this.$confirm(`确定要${type == "open" ? `开启` : "关闭"}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.tokenWarConfig({
            botStatus: type == "open" ? "TRUE" : "FALSE",
          });
          if (res) {
            this.getWarTableList();
            this.$message.success("操作成功");
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
