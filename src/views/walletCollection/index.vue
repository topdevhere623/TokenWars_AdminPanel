<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="public-search"
        @click="dialogVisible = true"
      >
        添加钱包
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="gasWalletAddress" label="钱包地址" align="center">
      </el-table-column>
      <el-table-column prop="balance" label="余额" align="center">
      </el-table-column>
      <el-table-column prop="transferOutTotal" label="激活状态" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.state" style="color: #67c23a">已激活</p>
          <p v-else style="color: #909399">未激活</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span
            class="blueColor publick-button cursor"
            @click="operatingFunc(scope.row, 'activate')"
          >
            激活
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="operatingFunc(scope.row, 'del')"
          >
            删除
          </span>
          <chainExplorerSkip :chain="scope.row.chainType" hash="" />
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
    <el-dialog title="添加钱包" :visible.sync="dialogVisible" width="30%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="钱包地址" prop="address">
          <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveFunc">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import chainExplorerSkip from "@/components/chainExplorerSkip";
import bigNumber from "bignumber.js";
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "walletOneDollarLottery",
  // 模板引入
  components: { chainExplorerSkip },
  // 数据
  data() {
    return {
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      dialogVisible: false,
      ruleForm: {
        address: "",
      },
      rules: {
        address: [{ required: true, message: "请输入", trigger: "blur" }],
      },
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
      const res = await this.$http.getWalleGasList(data);
      if (res) {
        this.tableData = res;
      }
    },
    operatingFunc(row, type) {
      this.$confirm(
        `确定要${type == "del" ? `删除${row.address}钱包吗` : "激活"}吗?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          let res = null;
          if (type == "del") {
            // 删除
            res = await this.$http.sendEmailDel({
              id: row.id,
            });
          } else {
            // 激活
            res = await this.$http.sendEmailCancel({
              id: row.id,
              isCancel: 0,
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
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert("submit!");
          this.dialogVisible = false;
          this.$refs.ruleForm.resetFields();
          this.getTableList();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
</style>
