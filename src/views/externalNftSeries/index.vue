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
      <el-input
        class="public-input"
        style="width: 120px"
        placeholder="Input project party"
        v-model="projectParty"
        clearable
      />
      <!-- <el-select class="public-input" v-model="accountInfo" style="width: 120px">
        <el-option label="全部状态" value="ETH" />
        <el-option label="待审核" value="ETH" />
        <el-option label="未通过" value="ETH" />
        <el-option label="售卖中" value="ETH" />
        <el-option label="已出售" value="ETH" />
        <el-option label="已下架" value="ETH" />
      </el-select> -->
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
        @click="fetchNftExternalList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="handleAdd()"
      >
        Create NFT
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="public-search"
        @click="nftExternalFlushed()"
      >
        refresh
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total series</div>
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
        label="Series ID"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column
        prop="seriesImg"
        label="Series diagram"
        width="120px"
        align="center"
        key="2"
      >
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image
              style="height: 100%"
              :src="scope.row.seriesImg"
              :preview-src-list="[scope.row.seriesImg]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" label="Series name" align="center" key="3">
      </el-table-column>
      <el-table-column prop="contractAddress" label="contract" align="center" key="4">
      </el-table-column>
      <el-table-column prop="projectParty" label="Project party" align="center" key="5">
      </el-table-column>
      <el-table-column prop="marketName" label="market" align="center" key="6">
      </el-table-column>
      <el-table-column prop="chainName" label="Chain" align="center" key="7">
      </el-table-column>
      <el-table-column
        prop="issuanceNumber"
        sortable="custom"
        label="issue number"
        align="center"
        key="8"
      >
      </el-table-column>
      <el-table-column
        prop="inBoxNumber"
        sortable="custom"
        width="120"
        label="Number of income boxes"
        align="center"
        key="9"
      >
      </el-table-column>
      <el-table-column
        prop="floorPrice"
        sortable="custom"
        width="120"
        :label="`Floor price ($ {'eth'})`"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        :label="`Floor price ($ {coin})`"
        align="center"
        key="16"
        width="100px"
      >
        <template slot-scope="scope">
          {{ (scope.row.usdtLastPrice * scope.row.floorPrice).toFixed(4) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="releaseTime"
        sortable="custom"
        width="140"
        label="publish time"
        align="center"
        key="11"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.releaseTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="relevancyBoxNumber"
        sortable="custom"
        label="Associated blind box"
        align="center"
        key="12"
      >
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
          <span class="blueColor publick-button cursor" @click="approve(scope.row)">
            Authorize
          </span>
          <span class="blueColor publick-button cursor" @click="handleEdit(scope.row)">
            edit
          </span>
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
      :title="operatingType == 1 ? 'Create NFT' : 'Edit NFT'"
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
        <el-form-item label="Series name" prop="seriesName">
          <el-input
            v-model="ruleForm.seriesName"
            style="width: 300px"
            placeholder="Please enter the series name"
          />
        </el-form-item>
        <el-form-item label="Contract address" prop="contractAddress">
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
        <el-form-item label="Series pictures" prop="seriesImg">
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
        <el-form-item label="Chain" prop="chainId">
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
        <el-form-item label="Choose the market" prop="marketNames">
          <el-checkbox-group v-model="ruleForm.marketNames">
            <el-checkbox
              v-for="(item, index) in markes"
              :label="item.marketName"
              :key="index"
              border
            >
              {{ item.marketName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="NFT type" prop="seriesNftType">
          <el-select v-model="ruleForm.seriesNftType" style="width: 300px">
            <el-option label="isC721" value="ERC721" />
            <el-option label="isC1155" value="ERC1155" />
          </el-select>
        </el-form-item>
        <el-form-item label="Keyword" prop="keywords">
          <el-input
            :disabled="operatingType != 1"
            v-model="ruleForm.keywords"
            style="width: 300px"
            placeholder="Please enter the name"
          />
        </el-form-item>
        <el-form-item label="Project party">
          <el-input
            v-model="ruleForm.projectParty"
            style="width: 300px"
            placeholder="Please enter the name"
          />
        </el-form-item>
        <el-form-item label="Total distribution" prop="issuanceNumber">
          <el-input
            type="number"
            v-model.number="ruleForm.issuanceNumber"
            style="width: 300px"
            placeholder="Please enter the total amount of distribution"
          />
        </el-form-item>
        <el-form-item label="describe">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4 }"
            placeholder="Please enter the description"
            v-model="ruleForm.remark"
          ></el-input>
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
import nft721Abi from "@/contracts/721.json";
import nft1155Abi from "@/contracts/1155.json";
import contractInfo from "@/config/sign.js";
import Web3 from "web3";
export default {
  name: "ExternalNftSeries",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      walletAddress: "",
      showDialog: false,
      operatingType: false,
      obscureField: null,
      projectParty: null,
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
        chainId: null, //链ID
        marketNames: [], //市场ID
        seriesName: null, //系列名称
        seriesImg: null, //系列图片
        contractAddress: null, //合约地址
        keywords: null, //关键字
        projectParty: null, //项目方
        issuanceNumber: null, //发行数量
        seriesNftType: "", // NFT类型
      },
      rules: {},
      markes: [],
      chainList: chainList,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    timeForStr: timeForStr,
    async fetchMarketManagerList() {
      const res = await this.$http.getMarketManagerList({
        page: 1,
        size: 9999,
      });
      if (res) {
        this.markes = res.records;
      }
    },
    // 连接小狐狸
    async connectMetaMask() {
      const _that = this;
      let web3 = new Web3(window.ethereum);
      let ethereum = window.ethereum;
      if (typeof ethereum === "undefined") {
        //没安装MetaMask钱包打开MetaMask链接
        openUrl(`https://metamask.app.link/dapp/${window.location.origin}`);
      } else {
        //如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
        ethereum
          .enable()
          .then(async (accounts) => {
            web3 = new Web3(window.ethereum);
            //如果用户同意了登录请求，你就可以拿到用户的账号
            web3.eth.defaultAccount = accounts[0];
            _that.walletAddress = accounts[0];
          })
          .catch((reason) => {
            //如果用户拒绝了登录请求
            if (reason === "User rejected provider access") {
              // 用户拒绝登录后执行语句；
            } else {
              // 本不该执行到这里，但是真到这里了，说明发生了意外
              ElMessage.error(t("airdrop.failedTips"));
            }
          });
      }
    },
    async approve(item) {
      await this.connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const is1155 = item.seriesNftType == "ERC1155";
      const web3 = new Web3(window.ethereum);
      const token = item.contractAddress; //nft合约地址
      const walletAddress = this.walletAddress; //当前连接的钱包地址
      let nftContract = new web3.eth.Contract(is1155 ? nft1155Abi : nft721Abi, token);
      const nftHelpAddress = contractInfo.nftHelpAddress;
      // 授权判断
      let isApproved = await nftContract.methods
        .isApprovedForAll(walletAddress, nftHelpAddress)
        .call();
      if (!isApproved) {
        //授权
        await nftContract.methods
          .setApprovalForAll(nftHelpAddress, true)
          .send({ from: walletAddress });
      } else {
        this.$message.success("isApproved");
      }
    },
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
        projectParty: this.projectParty,
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

      this.fetchNftExternalList();
    },
    // 加载列表
    async fetchNftExternalList(isSearch = true) {
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
      const res = await this.$http.getNftExternalList(data);
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
    async nftExternalFlushed() {
      const res = await this.$http.nftExternalFlushed();
      if (res) {
        this.fetchNftExternalList();
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
        marketNames: row.marketNames.split(","),
      };

      this.fileImg = [{ url: row.seriesImg }];
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
          let res = await this.$http.nftExternalDel({
            id: row.id,
          });
          if (res) {
            this.fetchNftExternalList();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleClose(done) {
      this.ruleForm = {
        chainId: null, //链ID
        marketNames: [], //市场ID
        seriesName: null, //系列名称
        seriesImg: null, //系列图片
        contractAddress: null, //合约地址
        keywords: null, //关键字
        projectParty: null, //项目方
        issuanceNumber: null, //发行数量
        seriesNftType: "", // NFT类型
      };

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
        this.ruleForm.seriesImg = res.data;
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

          const { marketNames } = this.ruleForm;
          let ruleForm = {
            ...this.ruleForm,
            marketNames: marketNames && marketNames.join(","),
          };

          let res = null;
          if (this.operatingType == 1) {
            ruleForm.marketNames = marketNames && marketNames.join(",");
            ruleForm.seriesImg = this.fileImg[0].url;
            res = await this.$http.nftExternalAdd({ ...ruleForm });
          } else {
            res = await this.$http.nftExternalUpdate({ ...ruleForm });
          }
          if (res) {
            this.handleClose();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("Successful operation!");
            this.fetchNftExternalList();
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
            this.ruleForm.seriesImg = nftData.image_url; // Nft图片
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
      this.fetchNftExternalList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchNftExternalList(false);
    },
  },
  // 创建后
  created() {
    this.fetchNftExternalList();
    this.fetchMarketManagerList();
    this.uploadUrl = config.api + "/file/upload/image";

    this.rules = {
      chainId: [
        {
          required: true,
          message: "Please select the chain",
          trigger: ["blur", "change"],
        },
      ],
      marketNames: [
        {
          required: true,
          message: "Please choose the market",
          trigger: ["blur", "change"],
        },
      ],
      seriesName: [
        {
          required: true,
          message: "Please enter the series name",
          trigger: ["blur", "change"],
        },
      ],
      seriesImg: [
        {
          required: true,
          message: "Please select NFT pictures",
          trigger: ["blur", "change"],
        },
      ],
      seriesNftType: [
        {
          required: true,
          message: "Please select NFT type",
          trigger: ["blur", "change"],
        },
      ],
      contractAddress: [
        {
          required: true,
          message: "Please enter the contract address",
          trigger: ["blur", "change"],
        },
      ],
      keywords: [
        {
          required: true,
          message: "Please enter key words",
          trigger: ["blur", "change"],
        },
      ],
      issuanceNumber: [
        {
          required: true,
          message: "Please enter the number of issuance",
          trigger: ["blur", "change"],
        },
      ],
    };
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
