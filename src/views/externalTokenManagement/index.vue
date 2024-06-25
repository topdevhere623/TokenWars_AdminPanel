<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 220px"
        placeholder="Enter ID, name"
        v-model="obscureField"
        clearable
      />
      <div class="public-date-box">
        <span class="demonstration"> add time </span>
        <el-date-picker
          v-model="addTime"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="getTableList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="handleAdd()"
      >
        Token
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="public-search"
        @click="refreshFunc()"
      >
        refresh
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total currency</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">total value</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @sort-change="sortChange"
      class="public-table"
      border
    >
      <el-table-column
        prop="id"
        sortable="custom"
        label="Token ID"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column
        prop="coinImage"
        label="Token map"
        width="120px"
        align="center"
        key="2"
      >
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image
              style="height: 100%"
              :src="scope.row.coinImage"
              :preview-src-list="[scope.row.coinImage]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" label="Token name" align="center" key="3">
      </el-table-column>
      <el-table-column prop="contractAddress" label="contract" align="center" key="4">
      </el-table-column>
      <el-table-column prop="chainName" label="Chain" align="center" key="5">
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        label="quantity"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        label="ETH value"
        align="center"
        key="7"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        :label="`${Coin} Value`"
        align="center"
        key="16"
      >
        <template slot-scope="scope">
          {{ (scope.row.usdtLastPrice * scope.row.price).toFixed(4) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="relevancyBoxNumber"
        sortable="custom"
        label="Associated blind box"
        align="center"
        key="8"
      >
      </el-table-column>
      <el-table-column
        prop="openNumber"
        sortable="custom"
        width="120"
        label="Number of times"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column
        prop="reclaimRate"
        sortable="custom"
        width="120"
        label="Recycling ratio"
        align="center"
        key="10"
      >
        <template slot-scope="scope">
          {{ scope.row.reclaimRate * 100 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        sortable="custom"
        width="140"
        label="add time"
        align="center"
        key="13"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="refreshTime"
        sortable="custom"
        width="140"
        label="Refresh last time"
        align="center"
        key="14"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.refreshTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="operate" align="center" key="15">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor"> Detail </span>
          <span class="blueColor publick-button cursor" @click="handleDel(scope.row)">
            delete
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
      v-if="showDialog"
      :title="operatingType == 1 ? 'Token' : 'Tokens'"
      :visible.sync="showDialog"
      width="540px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleForm"
        class="add-form"
        :rules="rules"
        :model="ruleForm"
        label-width="130px"
      >
        <el-form-item label="name" prop="seriesName" :rules="rules.blur">
          <el-input
            v-model="ruleForm.seriesName"
            style="width: 300px"
            placeholder="Please enter the name"
          />
        </el-form-item>
        <el-form-item label="Contract address" prop="contractAddress" :rules="rules.blur">
          <el-input
            :disabled="operatingType != 1"
            v-model="ruleForm.contractAddress"
            style="width: 300px"
            placeholder="Please enter the contract address"
          >
            <template slot="append">
              <el-button @click="fetchNftSeries()">Inquire</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="Currency" prop="coinName" :rules="rules.select">
          <el-select
            :disabled="operatingType != 1"
            v-model="ruleForm.coinName"
            style="width: 300px"
          >
            <el-option label="eth" value="ETH"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="picture" prop="coinImage" :rules="rules.select">
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
        <el-form-item label="Chain" prop="chainId" :rules="rules.select">
          <el-select
            :disabled="operatingType != 1"
            v-model="ruleForm.chainId"
            style="width: 300px"
          >
            <el-option
              v-for="(item, index) in chainList"
              :key="index"
              :label="item.chainName"
              :value="item.chainId"
            >
              <span style="float: left">{{ item.chainName }}</span>
              <span style="float: right; color: #8492a6">{{ item.type }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="value" prop="price" :rules="rules.blur">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            type="number"
            v-model="ruleForm.price"
            style="width: 300px"
            placeholder="Please enter value"
          >
            <template slot="append">{{ ruleForm.coin }}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Recycling ratio" prop="reclaimRate" :rules="rules.blur">
          <el-input
            type="number"
            v-model="ruleForm.reclaimRate"
            style="width: 300px"
            placeholder="Please enter the recycling ratio"
          >
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="submitForm()">Sure</el-button>
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
        select: [
          { required: true, message: "please choose", trigger: ["blur", "change"] },
        ],
        blur: [{ required: true, message: "please enter", trigger: ["blur", "change"] }],
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
        this.$message.success("Successful operation");
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
      this.$confirm(`OK to delete the series『${row.seriesName || row.id}』?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "info",
      })
        .then(async () => {
          let res = await this.$http.externalCoinDelete({
            id: row.id,
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
      this.$message.error("upload failed");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error("The file is too large, and the file size is less than 2M");
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
      this.$message.error("File can only upload one");
    },
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.fileImg.length == 0) {
            this.$message.error("Please upload the picture!");
            return;
          }

          let ruleForm = {
            ...this.ruleForm,
          };

          let res = null;
          if (this.operatingType == 1) {
            ruleForm.chainName = this.chainList.filter(
              (x) => x.chainId == ruleForm.chainId
            )[0].chainName;
            ruleForm.coinImage = this.fileImg[0].url;
            ruleForm.reclaimRate = ruleForm.reclaimRate / 100;
            res = await this.$http.externalCoinAdd({ ...ruleForm });
          } else {
            res = await this.$http.nftExternalUpdate({ ...ruleForm });
          }
          if (res) {
            this.handleClose();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("Successful operation!");
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
        this.$message.warning("Please select the network");
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
            certificate: sessionStorage.getItem("token"),
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
          this.$message.error(
            "Inquiry fails, please check whether the contract address is correct"
          );
        })
        .catch((error) => {
          this.$message.error(
            "Inquiry fails, please check whether the contract address is correct"
          );
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
