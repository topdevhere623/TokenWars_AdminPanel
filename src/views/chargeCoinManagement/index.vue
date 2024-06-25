<template>
  <div class="page-wrapper">
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="币ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="img" label="图标" width="120px" align="center" key="2">
        <template slot-scope="scope">
          <div style="width: 40px; height: 40px">
            <el-image style="height: 100%" :src="scope.row.img" :preview-src-list="[scope.row.img]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="coinName" label="币种名" align="center" key="3"> </el-table-column>
      <el-table-column prop="chainName" label="支持链" align="center" key="5"> </el-table-column>
      <el-table-column prop="gasWalletAddress" label="状态" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.isDisable == false" style="color: #67c23a">启用</p>
          <p v-else style="color: #f56c6c">禁用</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" key="15">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="handleEdit(scope.row)">编辑</span>
          <span class="blueColor publick-button cursor" @click="operatingFunc(scope.row, 'close')" v-if="scope.row.isDisable == false">
            禁用
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
    <el-dialog
      v-if="showDialog"
      title="编辑币种"
      :visible.sync="showDialog"
      width="740px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" class="add-form" :rules="rules" :model="ruleForm" label-width="60px">
        <el-form-item label="代币">
          <p style="line-height: 28px">{{ row.coinName }}</p>
        </el-form-item>
        <el-form-item label="图标" prop="img" :rules="rules.select">
          <el-upload
            :action="uploadUrl"
            :class="{ hide: hideUpload }"
            :on-change="handleChange"
            :on-success="handleUpload"
            :file-list="fileImg"
            :multiple="false"
            :limit="1"
            accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/gif,image/webp"
            list-type="picture-card"
            :before-upload="handleBefore"
            :on-remove="handleRemove"
            :on-exceed="handExceed"
            :headers="uploadHeader"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table :data="ruleForm?.chainList" style="width: 100%" border>
        <el-table-column prop="chainName" label="链" align="center" key="1"> </el-table-column>
        <el-table-column prop="minPrice" label="默认归集阈值" align="center" key="2">
          <template slot-scope="scope">
            <el-input v-model="scope.row.minPrice" type="number" autocomplete="off" class="danger"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="minimumWithdrawalAmount" label="强制归集阈值" align="center" key="3">
          <template slot-scope="scope">
            <el-input v-model="scope.row.minimumWithdrawalAmount" type="number" autocomplete="off" class="danger"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="gas" label="gas" align="center" key="4"> </el-table-column>
        <el-table-column prop="id" label="状态" align="center" key="5">
          <template slot-scope="scope">
            <p v-if="scope.row.isDisplay == false" style="color: #67c23a">已启用</p>
            <p v-else style="color: #f56c6c">已停止</p>
          </template>
        </el-table-column>
        <el-table-column prop="assetBalance" label="操作" align="center" key="6">
          <template slot-scope="scope">
            <span
              class="blueColor publick-button cursor"
              @click="saveFunc(scope.row, 'close', scope.$index)"
              v-if="scope.row.isDisplay == false"
            >
              停用
            </span>
            <span class="blueColor publick-button cursor" @click="saveFunc(scope.row, 'open', scope.$index)" v-else>启用 </span>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";
import { chainList } from "@/utils/chain";
export default {
  name: "ExternalTokenManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      showDialog: false,
      page: 1,
      size: 20,
      subTableData: [],
      tableData: null,
      baseUserPage: null,
      uploadUrl: "",
      fileImg: [],
      limitCount: 1,
      hideUpload: false,
      uploadHeader: {
        certificate: sessionStorage.getItem("token"),
      },
      ruleForm: {},
      rules: {
        select: [{ required: true, message: "请选择", trigger: ["blur", "change"] }],
        blur: [{ required: true, message: "请输入", trigger: ["blur", "change"] }],
      },
      chainList: chainList,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    timeForStr: timeForStr,
    // 加载列表
    async getTableList(isSearch = true) {
      const { size } = this;
      let _page = this.page;
      const data = {
        ...{
          size: size,
          page: _page,
        },
      };
      const res = await this.$http.transferCoinPageList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }
    },
    handleEdit(row) {
      this.row = row;
      this.getSubTableData();
    },
    async getSubTableData() {
      let res = await this.$http.transferCoinPageInfo({
        coin: this.row.coinName,
      });
      if (res) {
        this.ruleForm = res;
        this.hideUpload = true;
        this.fileImg = [{ url: res.img }];
        this.showDialog = true;
      }
    },
    // 删除
    handleDel(row) {
      this.$confirm(`确定要删除系列『${row.seriesName || row.id}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = await this.$http.externalCoinDelete({
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
    handleClose(done) {
      this.fileImg = [];
      this.$refs["ruleForm"].clearValidate();

      if (done) {
        done();
        return;
      }

      this.showDialog = false;
    },
    handleUpload(res) {
      if (res.code == 200) {
        this.fileImg.push({ url: res.data });
        this.ruleForm.img = res.data;
        return;
      }
      this.$message.error("上传失败");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error("文件过大，文件大小小于2M");
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
      this.$message.error("文件只能上传一个");
    },
    setFun(row) {},
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.fileImg.length == 0) {
            this.$message.error("请上传图片！");
            return;
          }

          let ruleForm = {
            ...this.ruleForm,
            id: this.row.id,
          };

          let res = await this.$http.transferCoinUpdate({ ...ruleForm });
          if (res) {
            this.handleClose();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("操作成功！");
            this.getTableList();
            this.fileImg = [];
          }
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
    saveFunc(row, type, index) {
      this.$confirm(`确定要${type == "open" ? `启用` : "停用"}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          row.isDisplay = type == "open" ? false : true;
          let ruleForm = {
            ...this.ruleForm,
            id: this.row.id,
          };
          let res = await this.$http.transferCoinUpdate({ ...ruleForm });
          if (res) {
            this.getTableList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    operatingFunc(row, type) {
      this.$confirm(`确定要${type == "open" ? `启用` : "停用"}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.transferCoinModifyState({ coin: row.coinName, isDisable: type == "open" ? false : true });
          if (res) {
            this.getTableList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
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
        this.$message.success("操作成功");
      }
    },
  },

  // 创建后
  created() {
    this.getTableList();
    this.uploadUrl = config.api + "/file/upload/image";
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
