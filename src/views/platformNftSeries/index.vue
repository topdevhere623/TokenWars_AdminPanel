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
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchNftPlatformList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="showDialog = true"
      >
        Create NFT
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total collection</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="public-table"
      @sort-change="sortChange"
      border
    >
      <el-table-column prop="id" sortable="custom" label="nft ID" align="center" key="1">
      </el-table-column>
      <el-table-column
        prop="seriesImg"
        label="NFT diagram"
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
      <el-table-column prop="seriesType" label="type" align="center" key="3">
        <template slot-scope="scope">
          {{ scope.row.seriesType == "COIN" ? "币" : "图" }}
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" label="Series name" align="center" key="4">
      </el-table-column>
      <el-table-column prop="chainType" label="Chain" align="center" key="5">
      </el-table-column>
      <el-table-column prop="tokenId" label="tokenId" align="center" key="6">
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        :label="`value(${'eth'})`"
        align="center"
        key="7"
      >
        <template slot-scope="scope">
          {{ scope.row.seriesType == "COIN" ? scope.row.price : "--" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        :label="`Value ($ {coin})`"
        align="center"
        key="8"
        width="100px"
      >
        <template slot-scope="scope">
          {{
            scope.row.seriesType == "COIN"
              ? (scope.row.usdtLastPrice * scope.row.price).toFixed(4)
              : scope.row.price
          }}
        </template>
      </el-table-column>
      <el-table-column prop="contractAddress" label="contract" align="center" key="9">
      </el-table-column>
      <el-table-column
        prop="relevancyBoxNumber"
        sortable="custom"
        label="Associated blind box"
        align="center"
        key="10"
      >
      </el-table-column>
      <el-table-column
        prop="openNumberTotal"
        sortable="custom"
        label="Quantity"
        align="center"
        key="11"
      >
      </el-table-column>
      <el-table-column
        prop="openPriceTotal"
        sortable="custom"
        label="Global value"
        align="center"
        key="12"
      >
      </el-table-column>
      <el-table-column
        prop="sellNumberTotal"
        sortable="custom"
        label="Resale quantity"
        align="center"
        key="13"
      >
      </el-table-column>
      <el-table-column
        prop="sellPriceTotal"
        sortable="custom"
        label="Total value of resale"
        align="center"
        key="14"
      >
      </el-table-column>
      <el-table-column
        prop="outNumberTotal"
        sortable="custom"
        label="Quantity"
        align="center"
        key="15"
      >
      </el-table-column>
      <el-table-column
        prop="relevancyUserNumber"
        sortable="custom"
        label="User hold"
        align="center"
        key="16"
      >
      </el-table-column>
      <el-table-column
        prop="relevancyFoundryNumber"
        sortable="custom"
        label="Casting quantity"
        align="center"
        key="17"
      >
      </el-table-column>
      <el-table-column
        prop="reclaimRate"
        sortable="custom"
        label="Recycling ratio"
        align="center"
        key="18"
      >
        <template slot-scope="scope">
          {{
            `${new bigNumber(scope.row.reclaimRate || 0).multipliedBy(100).toFixed(2)}%`
          }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="operate" align="center" key="19">
        <template slot-scope="scope">
          <span
            class="blueColor publick-button cursor"
            @click="approve(scope.row)"
            v-if="scope.row.seriesType == 'PIC'"
          >
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
        <el-form-item label="name" prop="seriesName">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            v-model="ruleForm.seriesName"
            style="width: 300px"
            placeholder="Please enter the name"
          />
        </el-form-item>
        <el-form-item label="type" prop="seriesType">
          <el-select
            :disabled="operatingType != 1"
            v-model="ruleForm.seriesType"
            style="width: 300px"
            placeholder="Please choose the type"
          >
            <el-option label="currency" value="COIN" />
            <el-option label="picture" value="PIC" />
          </el-select>
        </el-form-item>
        <el-form-item label="Contract address" prop="contractAddress">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            v-model="ruleForm.contractAddress"
            style="width: 300px"
            placeholder="Please enter the contract address"
          >
            <template slot="append">
              <el-button @click="fetchNftSeries()">Inquire</el-button>
            </template></el-input
          >
        </el-form-item>
        <template v-if="ruleForm.seriesType !== 'COIN'">
          <el-form-item label="tokenId" prop="tokenId">
            <el-input
              :disabled="operatingType != 1"
              v-model="ruleForm.tokenId"
              style="width: 300px"
              placeholder="Please enter tokenId"
            />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="Currency" prop="seriesCoin">
            <el-select
              :disabled="operatingType != 1"
              v-model="ruleForm.seriesCoin"
              style="width: 300px"
            >
              <el-option label="eth" value="ETH"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item label="picture" prop="seriesImg">
          <el-upload
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            :action="uploadUrl"
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
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
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
        <el-form-item label="value" prop="price">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            type="number"
            v-model="ruleForm.price"
            style="width: 300px"
            placeholder="Please enter value"
          >
            <template slot="append">{{
              ruleForm.seriesType == "COIN" ? "ETH" : "USDT"
            }}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="Recycling ratio" prop="reclaimRate">
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
import bigNumber from "bignumber.js";
import { timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";
import { chainList } from "@/utils/chain";
import nft721Abi from "@/contracts/721.json";
import nft1155Abi from "@/contracts/1155.json";
import Web3 from "web3";
import contractInfo from "@/config/sign.js";
export default {
  name: "PlatformNftSeries",
  // 模板引入
  components: {},
  // 数据
  data() {
    var validateRate = (rule, value, callback) => {
      var patt = new RegExp(/^(100|[1-9]?\d(\.\d\d?\d?)?)$|0$/);
      if (!patt.test(value)) {
        callback(new Error("Please enter a percentage of 0-100"));
      } else {
        callback();
      }
    };
    return {
      walletAddress: "",
      showDialog: false,
      obscureField: null,
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
      operatingType: 1,
      ruleForm: {
        tokenId: undefined, // tokenId
        contractAddress: "", // 合约地址
        chainId: undefined, // 链ID
        coin: "ETH", // 币种
        seriesCoin: "ETH", // 系列币种
        price: null, // 价格
        seriesName: null, // 系列名称
        seriesType: null, // 系列类型(COIN-币，PIC-图)
        seriesImg: null, // 系列图片
        reclaimRate: null, // 回收比例
      },
      rules: {
        tokenId: [
          {
            required: true,
            message: "Please enter tokenId",
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
        chainId: [
          {
            required: true,
            message: "Please select the chain",
            trigger: ["blur", "change"],
          },
        ],
        price: [
          { required: true, message: "Please enter value", trigger: ["blur", "change"] },
        ],
        seriesName: [
          {
            required: true,
            message: "Please enter the name",
            trigger: ["blur", "change"],
          },
        ],
        seriesType: [
          {
            required: true,
            message: "Please choose the type",
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
        reclaimRate: [
          {
            required: true,
            message: "Please enter the recycling ratio",
            trigger: ["blur", "change"],
          },
          { validator: validateRate, trigger: ["blur", "change"] },
        ],
      },
      chainList: chainList,
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    /**
     * @description: 排序
     */
    sortChange({ column, prop, order }) {
      this.sortData.orderBy = prop;
      this.sortData.orderType = order == "descending" ? "DESC" : "ASC";

      if (!order) {
        this.sortData.orderType = null;
      }

      this.fetchNftPlatformList();
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
      console.log(item, "item======");
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
      console.log(isApproved, "isApproved===");
      if (!isApproved) {
        //授权
        await nftContract.methods
          .setApprovalForAll(nftHelpAddress, true)
          .send({ from: walletAddress });
      } else {
        this.$message.success("isApproved");
      }
    },
    // 加载列表
    async fetchNftPlatformList(isSearch = true) {
      const { sortData, size } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        obscureField: this.obscureField,
        ...sortData,
        size: size,
        page: _page,
      };
      const res = await this.$http.getNftPlatformList(data);
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
    handleEdit(row) {
      this.ruleForm = {
        ...row,
      };

      this.fileImg = [{ url: row.seriesImg }];
      this.ruleForm.reclaimRate = new bigNumber(this.ruleForm.reclaimRate)
        .multipliedBy(100)
        .toString();
      this.hideUpload = true;
      this.operatingType = 2;
      this.showDialog = true;
    },
    // 删除
    handleDel(row) {
      this.$confirm(
        `Are you sure to delete the series "${row.seriesname || row.id}"?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          let res = await this.$http.nftPlatformDel({
            id: row.id,
          });
          if (res) {
            this.fetchNftPlatformList(true);
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleClose(done) {
      this.operatingType = 1;
      this.ruleForm = {
        tokenId: null, // tokenId
        contractAddress: "", // 合约地址
        chainId: null, // 链ID
        coin: "ETH", // 币种
        price: null, // 价格
        seriesName: null, // 系列名称
        seriesType: null, // 系列类型(COIN-币，PIC-图)
        seriesImg: null, // 系列图片
        reclaimRate: null, // 回收比例
      };

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
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let ruleForm = { ...this.ruleForm };
          if (this.operatingType == 1) {
            if (this.fileImg.length == 0) {
              this.$message.error("Please upload the picture!");
              return;
            }
            ruleForm.seriesImg = this.fileImg[0].url;
          }
          ruleForm.reclaimRate = new bigNumber(ruleForm.reclaimRate).dividedBy(100);
          let res = null;
          if (!ruleForm.id) {
            ruleForm.seriesType == "COIN"
              ? (ruleForm.coin = "ETH")
              : (ruleForm.coin = "USDT");
            res = await this.$http.nftPlatformAdd({ ...ruleForm });
          } else {
            res = await this.$http.nftPlatformUpdate({ ...ruleForm });
          }

          if (res) {
            this.handleClose();
            this.fetchNftPlatformList();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("Successful operation!");
            this.fileImg = [];
            this.hideUpload = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchNftPlatformList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchNftPlatformList(false);
    },
  },
  // 创建后
  created() {
    this.fetchNftPlatformList();
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
