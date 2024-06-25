<template>
  <div class="page-wrapper">
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="channelName" label="Channel name" align="center" key="5">
      </el-table-column>
      <el-table-column prop="gasWalletAddress" label="Proportion of fees" align="center">
        <template slot-scope="scope">
          <p>{{ scope.row.fee * 100 }}%</p>
        </template>
      </el-table-column>
      <el-table-column prop="gasWalletAddress" label="状态" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.status == 'TRUE'" style="color: #67c23a">Open up</p>
          <p v-else style="color: #f56c6c">Disable</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" key="15">
        <template slot-scope="scope">
          <span
            class="blueColor publick-button cursor"
            @click="operatingFunc(scope.row, 'close')"
            v-if="scope.row.status == 'TRUE'"
          >
            Disable
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="operatingFunc(scope.row, 'open')"
            v-else
            >Open up
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
export default {
  name: "ExternalTokenManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      tableData: null,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    timeForStr: timeForStr,
    // 加载列表
    async getTableList(isSearch = true) {
      const res = await this.$http.getLegalPageList();
      if (res) {
        this.tableData = res;
      }
    },
    operatingFunc(row, type) {
      this.$confirm(`Determine${type == "open" ? `Open up` : "Stop"}?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.setLegalupdateStatus({
            id: row.id,
            status: type == "open" ? true : false,
          });
          if (res) {
            this.getTableList();
            this.$message.success("Successful operation");
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
  },
  // 计算属性
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
.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
/deep/ .el-table .cell {
  line-height: 30px;
  .el-switch {
    height: 26px;
    line-height: 26px;
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
  display: flex;
}
.danger {
  ::v-deep .el-input__inner {
    color: #f56c6c;
  }
}
</style>
