<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 140px;" placeholder="输入盲盒ID" v-model="Id" clearable />
      <el-input class="public-input" style="width: 140px;" placeholder="输入盲盒名称" v-model="boxName" clearable />
      <el-select v-model="externalStatus" class="public-select-box" popper-class="public-select-box" placeholder="外部状态"
        clearable>
        <el-option label="正常" value="NORMAL">
        </el-option>
        <el-option label="数量不足" value="NUMBER">
        </el-option>
      </el-select>
      <el-select v-model="boxStatus" class="public-select-box" popper-class="public-select-box" placeholder="全部状态"
        clearable>
        <el-option label="关闭" value="DISABLE">
        </el-option>
        <el-option label="正常" value="NORMAL">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchBoxManagerList()">
        查询
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="盲盒ID" align="center" key="1">
      </el-table-column>
      <el-table-column prop="boxName" width="120" label="盲盒名称" align="center" key="3">
      </el-table-column>
      <el-table-column prop="totalWeight" label="总权重" align="center" key="4">
      </el-table-column>
      <el-table-column prop="sales" label="销量" align="center" key="5">
      </el-table-column>
      <el-table-column prop="grossIncome" :label="`总消费(${coin})`" align="center" key="6">
      </el-table-column>
      <el-table-column prop="totalExpenditure" :label="`总中奖(${coin})`" align="center" key="7">
      </el-table-column>
      <el-table-column prop="adjust" label="中奖修正" align="center" key="10"></el-table-column>
      <el-table-column prop="pastTraPrice" width="120" label="实际返还率" align="center" key="11">
        <template slot-scope="scope">
          {{ `${new bigNumber(actualReturn(scope.row) || 0).multipliedBy(100).toFixed(2)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="expectRate" label="期望返还率" align="center" key="12">
        <template slot-scope="scope">
          {{ `${new bigNumber(scope.row.expectRate || 0).multipliedBy(100).toFixed(2)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="openNumber" width="120" label="抽奖返还率（以十连抽为准）" align="center" key="13">
        <template slot-scope="scope">
          {{ `${new bigNumber(paybackRate(scope.row) || 0).multipliedBy(100).toFixed(2)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="bloodPoolsStatus" label="状态" align="center" key="19">
        <template slot-scope="scope">
          <span style="color: #EC5706;" v-if="scope.row.bloodPoolsStatus == 'FALSE'">关闭</span>
          <span style="color: #21AE04;" v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center" width="110" key="20" fixed="right">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="onEbit(scope.row)">
            编辑
          </span>
          <span class="blueColor publick-button cursor" @click="operatingNft(scope.row)">
            {{ scope.row.bloodPoolsStatus == 'FALSE' ? '开启' : '关闭' }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="baseUserPage && baseUserPage.total" background @size-change="handleSizeChange"
      @current-change="handleCurrentChange" :current-page="page" :page-sizes="pagination.pageSizes" :page-size="size"
      layout=" sizes, prev, pager, next, jumper" :total="baseUserPage.total" class="public-pagination">
    </el-pagination>
    <el-dialog title="编辑中奖修正" :visible.sync="showDialog" width="540px" :close-on-click-modal="false"
      :before-close="handleClose">
      <el-form ref="ruleForm" class="add-form" :rules="rules" :model="ruleForm" label-width="130px">
        <el-form-item label="中奖修正" prop="adjust">
          <el-input type="number" v-model.number="ruleForm.adjust" style="width: 300px" placeholder="请输入中奖修正">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr } from '@/utils';
import pagination from '@/mixins/pagination';
export default {
  name: 'BloodPoolManagement',
  // 模板引入
  components: {
  },
  // 数据
  data() {
    return {
      Id: null, // NFT Id
      boxName: null, // 系列名
      externalStatus: null, // 异常状态
      boxStatus: null, // 盲盒状态
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,

      showDialog: false,
      ruleForm: { adjust: null },
      rules: {
        adjust: [
          { required: true, message: "请输入中奖修正", trigger: ["blur", "change"] },
        ],
      }
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      return {
        id: this.Id, // 盲盒Id
        boxName: this.boxName, // 盲盒名
        externalStatus: this.externalStatus,
        boxStatus: this.boxStatus
      };
    },
    // 加载列表
    async fetchBoxManagerList(isSearch = true) {
      const search = this.searchFun();
      const { size, coin, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          coin: coin,
          userType: userType,
          size: size,
          page: _page,
        },
        ...search,
      };
      const res = await this.$http.getBoxManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }
    },
    // 编辑中奖修正
    onEbit(row) {
      this.ruleForm.adjust = row.adjust;
      this.ruleForm.id = row.id;
      this.showDialog = true;
    },
    // 关闭/开启
    operatingNft(row) {
      this.$confirm(`确定要${row.bloodPoolsStatus == 'FALSE' ? '开启' : '关闭'}『${row.boxName || row.id}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = null;
          if (row.bloodPoolsStatus == 'FALSE') {
            // 开启
            res = await this.$http.boxManagerOpen({
              id: row.id
            });
          } else {
            // 关闭
            res = await this.$http.boxManagerClose({
              id: row.id
            });
          }
          if (res) {
            this.fetchBoxManagerList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let ruleForm = { ...this.ruleForm };
          let res = await this.$http.boxManagerWinningRevision({ ...ruleForm });

          if (res) {
            this.handleClose();
            this.fetchBoxManagerList();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("操作成功！");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    actualReturn(row) {
      const { totalExpenditure, adjust, grossIncome } = row;
      const expenditure = new bigNumber(totalExpenditure || 0).plus(adjust);
      if (!grossIncome) return 0;
      return new bigNumber(expenditure || 0).dividedBy(grossIncome);
    },
    paybackRate(row) {
      const { expectRate } = row;
      const expectRates = new bigNumber(expectRate || 0).multipliedBy(expectRate);
      const actualReturnVal = this.actualReturn(row);
      if (!actualReturnVal) return 0;
      return new bigNumber(expectRates || 0).dividedBy(actualReturnVal);
    },
    handleClose(done) {
      if (done) {
        done()
        return
      }
      this.showDialog = false
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchBoxManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchBoxManagerList(false);
    },
  },
  // 创建后
  created() {
    this.fetchBoxManagerList();
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
  mounted() { },
  // 更新后
  updated() { },
  // 销毁
  beforeDestroy() { },
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

  &>div {
    min-width: 200px;
  }
}

.remittance-more {
  display: flex;
}
</style>
