<template>
  <div class="page-wrapper">
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="链ID" align="center"> </el-table-column>
      <el-table-column prop="chain" label="链名" align="center"> </el-table-column>
      <!-- <el-table-column prop="price" label="全称" align="center"> </el-table-column> -->
      <el-table-column prop="rpc" label="rpc" align="center">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="openRpc(scope.row)">{{ scope.row.rpc }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gas" label="提款手续费" align="center"> </el-table-column>
      <el-table-column prop="chainCoin" label="手续费币种" align="center"> </el-table-column>
      <el-table-column prop="confirmTheHeight" label="几次确认" align="center"> </el-table-column>
      <el-table-column prop="minGasForce" label="触发强制归集gas(USDT）" align="center" width="120px">
        <template slot-scope="scope">
          <p style="color: #f56c6c">{{ scope.row.minGasForce }}</p>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.isDisplay == false" style="color: #67c23a">已启用</p>
          <p v-else style="color: #f56c6c">已停止</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="setFun(scope.row)">配置</span>
          <span class="blueColor publick-button cursor" @click="operatingFunc(scope.row, 'close')" v-if="scope.row.isDisplay == false">
            停用
          </span>
          <span class="blueColor publick-button cursor" @click="operatingFunc(scope.row, 'open')" v-else>启用 </span>
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
    <el-dialog title="充提链配置" :visible.sync="dialogVisible" width="40%">
      <el-form ref="ruleForm" :model="ruleForm" label-width="150px" :rules="rules">
        <el-form-item label="提款手续费gas" prop="gas" :rules="rules.blur">
          <el-input v-model="ruleForm.gas" type="number" autocomplete="off"> </el-input>
        </el-form-item>
        <el-form-item label="确认次数" prop="confirmTheHeight" :rules="rules.blur">
          <el-input v-model.number="ruleForm.confirmTheHeight" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="触发强制归集GAS" prop="minGasForce" :rules="rules.blur">
          <el-input v-model="ruleForm.minGasForce" type="number" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFunc">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="切换rpc" :visible.sync="rpcDialogVisible" width="30%">
      <div class="rpc-box">
        <p>主要</p>
        <div class="rpc-item">
          <el-radio v-model="rpcVal" label="1">{{ row?.rpcUrl1 }}</el-radio>
        </div>
        <p class="mgr-t">备用</p>
        <div class="rpc-item">
          <div>
            <el-radio v-model="rpcVal" label="2">{{ row?.rpcUrl2 }}</el-radio>
            <el-radio v-model="rpcVal" label="3">{{ row?.rpcUrl3 }}</el-radio>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rpcDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="rpcSaveFunc">确 定</el-button>
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
      rpcDialogVisible: false,
      ruleForm: {},
      rules: {
        blur: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      row: null,
      rpcVal: null,
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
      const res = await this.$http.transferChainPageList(data);
      if (res) {
        this.tableData = res.records;
      }
    },
    setFun(row) {
      this.ruleForm = row;
      this.dialogVisible = true;
    },
    operatingFunc(row, type) {
      this.$confirm(`确定要${type == "open" ? `启用` : "停用"}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.transferChainUpdate({
            id: row.id,
            isDisplay: type == "open" ? false : true,
          });
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
          let res = await this.$http.transferChainUpdate({ ...this.ruleForm });
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
    async rpcSaveFunc(row) {
      let res = await this.$http.transferChainUpdate({ id: this.row.id, rpcNum: this.rpcVal });
      if (res) {
        this.rpcDialogVisible = false;
        this.getTableList();
      }
    },
    openRpc(row) {
      this.row = row;
      this.rpcVal = String(row.rpcNum);
      this.rpcDialogVisible = true;
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
.rpc-box {
  p {
    margin-bottom: 5px;
  }
  .mgr-t {
    margin-top: 20px;
  }
  .rpc-item {
    background: #eee;
    padding: 10px;

    label {
      display: block;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
