<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <div class="remittance-box"></div>
      <div class="handler-box">
        <p class="switch-box">
          自动切换<el-switch v-model="isBreak" active-color="#13ce66" inactive-color="#ff4949" @change="isBreakChange"></el-switch>
          {{ isBreak ? "开" : "关" }}
        </p>
        <el-button type="primary" icon="el-icon-refresh" @click="getTableList"> 刷新 </el-button>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="chainId" label="链ID" align="center"> </el-table-column>
      <el-table-column prop="chainName" label="链名称" align="center"> </el-table-column>
      <el-table-column prop="gasToken" label="GAS代币" align="center"> </el-table-column>
      <el-table-column prop="estimatedGas" label="预估gas" align="center"> </el-table-column>
      <el-table-column prop="estimatedGasPrice" label="预估gas u价" align="center"> </el-table-column>
      <el-table-column prop="congestionPercentage" label="拥堵百分比" align="center"> </el-table-column>
      <el-table-column prop="responseTime" label="响应时间" align="center"> </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.status == 'ACTIVATE'" style="color: #67c23a">使用中</p>
          <p v-else style="color: #d0d0d0">挂起</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span style="color: #d0d0d0" class="publick-button" v-if="scope.row.status == 'ACTIVATE'"> 切换此链 </span>
          <span class="blueColor publick-button cursor" @click="operatingFunc(scope.row)" v-else>切换此链 </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr } from "@/utils";
export default {
  name: "lotteryChainManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      tableData: null,
      isBreak: false,
    };
  },
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 加载列表
    async getTableList() {
      const res = await this.$http.lotteryChainPageList();
      if (res) {
        this.tableData = res;
      }
    },
    async getIsBreak() {
      const res = await this.$http.lotteryChainGetIsBreak();
      if (res) {
        res === "true" ? (this.isBreak = true) : (this.isBreak = false);
      }
    },
    async isBreakChange() {
      const res = await this.$http.lotteryChainIsBreak({ isBreak: this.isBreak });
      if (res) {
        this.getTableList();
        this.getIsBreak();
      }
    },
    operatingFunc(row) {
      this.$confirm(`确定要切换到${row.chainName}链吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.lotteryChainUpdateStatus({
            id: row.id,
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
  },
  // 创建后
  created() {
    this.getTableList();
    this.getIsBreak();
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
  margin-bottom: 20px;
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
.switch-box {
  display: flex;
  align-items: center;
  gap: 10px;
}
.handler-box {
  display: flex;
  align-items: center;
  gap: 40px;
}
</style>
