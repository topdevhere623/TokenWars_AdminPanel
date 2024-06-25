<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 220px" placeholder="输入ID、名称" v-model="obscureField" clearable />
      <div class="public-date-box">
        <span class="demonstration"> 添加时间 </span>
        <el-date-picker v-model="addTime" type="datetimerange" range-separator="到" start-placeholder="开始时间" end-placeholder="结束时间">
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="getTableList()"> 查询 </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" class="public-search" @click="handleAdd()"> 创建代币 </el-button>
      <el-button type="primary" icon="el-icon-refresh" class="public-search" @click="refreshFunc()"> 刷新 </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总代币项</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总价值</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column prop="id" sortable="custom" label="代币ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="coinImage" label="代币图" width="120px" align="center" key="2">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image style="height: 100%" :src="scope.row.coinImage" :preview-src-list="[scope.row.coinImage]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" label="代币名" align="center" key="3"> </el-table-column>
      <el-table-column prop="contractAddress" label="合约" align="center" key="4"> </el-table-column>
      <el-table-column prop="chainName" label="所在链" align="center" key="5"> </el-table-column>
      <el-table-column prop="price" sortable="custom" label="数量" align="center" key="6"> </el-table-column>
      <el-table-column prop="price" sortable="custom" label="ETH价值" align="center" key="7"> </el-table-column>
      <el-table-column prop="price" sortable="custom" :label="`${coin}价值`" align="center" key="16">
        <template slot-scope="scope">
          {{ (scope.row.usdtLastPrice * scope.row.price).toFixed(4) }}
        </template>
      </el-table-column>
      <el-table-column prop="relevancyBoxNumber" sortable="custom" label="关联盲盒" align="center" key="8"> </el-table-column>
      <el-table-column prop="openNumber" sortable="custom" width="120" label="被开次数" align="center" key="9"> </el-table-column>
      <el-table-column prop="reclaimRate" sortable="custom" width="120" label="回收比例" align="center" key="10">
        <template slot-scope="scope">
          {{ scope.row.reclaimRate * 100 }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" sortable="custom" width="140" label="添加时间" align="center" key="13">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="refreshTime" sortable="custom" width="140" label="上次刷新" align="center" key="14">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.refreshTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" key="15">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor"> 详情 </span>
          <span class="blueColor publick-button cursor" @click="handleDel(scope.row)"> 删除 </span>
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
      :title="operatingType == 1 ? '创建代币' : '编辑代币'"
      :visible.sync="showDialog"
      width="540px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" class="add-form" :rules="rules" :model="ruleForm" label-width="130px">
        <el-form-item label="名称" prop="seriesName" :rules="rules.blur">
          <el-input v-model="ruleForm.seriesName" style="width: 300px" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="合约地址" prop="contractAddress" :rules="rules.blur">
          <el-input :disabled="operatingType != 1" v-model="ruleForm.contractAddress" style="width: 300px" placeholder="请输入合约地址">
            <template slot="append">
              <el-button @click="fetchNftSeries()">查询</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="币种" prop="coinName" :rules="rules.select">
          <el-select :disabled="operatingType != 1" v-model="ruleForm.coinName" style="width: 300px">
            <el-option label="ETH" value="ETH"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="coinImage" :rules="rules.select">
          <el-upload
            :action="uploadUrl"
            :disabled="operatingType != 1"
            :class="{ hide: hideUpload }"
            :on-change="handleChange"
            :on-success="handleUpload"
            :file-list="fileImg"
            :multiple="false"
            :limit="1"
            accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
            list-type="picture-card"
            :before-upload="handleBefore"
            :on-remove="handleRemove"
            :on-exceed="handExceed"
            :headers="uploadHeader"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="所在链" prop="chainId" :rules="rules.select">
          <el-select :disabled="operatingType != 1" v-model="ruleForm.chainId" style="width: 300px">
            <el-option v-for="(item, index) in chainList" :key="index" :label="item.chainName" :value="item.chainId">
              <span style="float: left">{{ item.chainName }}</span>
              <span style="float: right; color: #8492a6">{{ item.type }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价值" prop="price" :rules="rules.blur">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            type="number"
            v-model="ruleForm.price"
            style="width: 300px"
            placeholder="请输入价值"
          >
            <template slot="append">{{ ruleForm.coin }}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="回收比例" prop="reclaimRate" :rules="rules.blur">
          <el-input type="number" v-model="ruleForm.reclaimRate" style="width: 300px" placeholder="请输入回收比例">
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
      walletAddress: "",
      showDialog: false,
      operatingType: false,
      obscureField: null,
      addTime: null,
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      aggregateQuery: {},
      baseUserPage: null,
      uploadUrl: "",
      fileImg: [],
      limitCount: 1,
      hideUpload: false,
      uploadHeader: {
        certificate: sessionStorage.getItem("token"),
      },
      ruleForm: {
        seriesName: null, //系列名称
        coinName: null, //币种名称
        coinImage: null, //币种图片
        contractAddress: null, //合约地址
        chainId: null, //链ID
        chainName: null, //链名称
        reclaimRate: null, //回收比率
        price: null, //ETH价格
        coin: "ETH", //ETH币种
      },
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
    searchFun() {
      let { addTime } = this;
      let startTime = null;
      let endTime = null;
      if (addTime && addTime[0]) {
        startTime = timeForStr(addTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (addTime && addTime[1]) {
        endTime = timeForStr(addTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        obscureField: this.obscureField,
        startTime,
        endTime,
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

      this.getTableList();
    },
    // 加载列表
    async getTableList(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size } = this;
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
        ...sortData,
        ...search,
      };
      const res = await this.$http.externalCoinPageList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getNftExternalStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 刷新
    async refreshFunc() {
      const res = await this.$http.externalCoinRefresh();
      if (res) {
        this.getTableList();
        this.$message.success("操作成功");
      }
    },
    handleAdd() {
      this.operatingType = 1;
      this.hideUpload = false;
      this.showDialog = true;
    },
    handleEdit(row) {
      this.ruleForm = {
        ...row,
      };

      this.fileImg = [{ url: row.coinImage }];
      this.operatingType = 2;
      this.hideUpload = true;
      this.showDialog = true;
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
        this.ruleForm.coinImage = res.data;
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
          };

          let res = null;
          if (this.operatingType == 1) {
            ruleForm.chainName = this.chainList.filter((x) => x.chainId == ruleForm.chainId)[0].chainName;
            ruleForm.coinImage = this.fileImg[0].url;
            ruleForm.reclaimRate = ruleForm.reclaimRate / 100;
            res = await this.$http.externalCoinAdd({ ...ruleForm });
          } else {
            res = await this.$http.nftExternalUpdate({ ...ruleForm });
          }
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
    /**
     * @description 查询Nft系列
     */
    fetchNftSeries() {
      const { chainId, contractAddress } = this.ruleForm;
      if (!chainId) {
        this.$message.warning("请选择网络");
        return;
      }

      let getUrl = config.api + "/nft-external-series/assetContract/goerli/";
      if (chainId == 1) {
        getUrl = config.api + "/nft-external-series/assetContract/eth/";
      }

      axios
        .get(getUrl + contractAddress, {
          responseType: "json",
          headers: {
            "X-API-KEY": "3eb9844d094945f288c104c770365ac8",
            "certificate":sessionStorage.getItem('token'),
          },
        })
        .then((res) => {
          if (res.status == 200) {
            const nftData = res.data;
            this.fileImg = [{ url: nftData.image_url }];
            this.ruleForm.seriesName = nftData.name; // 系列名称
            this.ruleForm.coinImage = nftData.image_url; // Nft图片
            this.ruleForm.keywords = nftData.collection.slug; // 关键字
            return;
          }
          this.$message.error("查询失败，请检查合约地址是否正确");
        })
        .catch((error) => {
          this.$message.error("查询失败，请检查合约地址是否正确");
          console.log(error);
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
