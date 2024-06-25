<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 220px" placeholder="输入ID、名称" v-model="obscureField" clearable />
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchNftPlatformList()"> 查询 </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" class="public-search" @click="showDialog = true"> 创建NFT </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总藏品数</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.collNumberTotal }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" @sort-change="sortChange" border>
      <el-table-column prop="id" sortable="custom" label="NFT ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="seriesImg" label="NFT图" width="120px" align="center" key="2">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image style="height: 100%" :src="scope.row.seriesImg" :preview-src-list="[scope.row.seriesImg]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seriesType" label="类型" align="center" key="3">
        <template slot-scope="scope">
          {{ scope.row.seriesType == "COIN" ? "币" : "图" }}
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" label="系列名称" align="center" key="4"> </el-table-column>
      <el-table-column prop="chainType" label="所在链" align="center" key="5"> </el-table-column>
      <el-table-column prop="tokenId" label="tokenId" align="center" key="6"> </el-table-column>
      <el-table-column prop="price" sortable="custom" :label="`价值(${'ETH'})`" align="center" key="7">
        <template slot-scope="scope">
          {{ scope.row.seriesType == "COIN" ? scope.row.price : "--" }}
        </template>
      </el-table-column>
      <el-table-column prop="price" sortable="custom" :label="`价值(${coin})`" align="center" key="8" width="100px">
        <template slot-scope="scope">
          {{ scope.row.seriesType == "COIN" ? (scope.row.usdtLastPrice * scope.row.price).toFixed(4) : scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="contractAddress" label="合约" align="center" key="9"> </el-table-column>
      <el-table-column prop="relevancyBoxNumber" sortable="custom" label="关联盲盒" align="center" key="10"> </el-table-column>
      <el-table-column prop="openNumberTotal" sortable="custom" label="开出数量" align="center" key="11"> </el-table-column>
      <el-table-column prop="openPriceTotal" sortable="custom" label="开出总价值" align="center" key="12"> </el-table-column>
      <el-table-column prop="sellNumberTotal" sortable="custom" label="转卖数量" align="center" key="13"> </el-table-column>
      <el-table-column prop="sellPriceTotal" sortable="custom" label="转卖总价值" align="center" key="14"> </el-table-column>
      <el-table-column prop="outNumberTotal" sortable="custom" label="提出数量" align="center" key="15"> </el-table-column>
      <el-table-column prop="relevancyUserNumber" sortable="custom" label="用户持有" align="center" key="16"> </el-table-column>
      <el-table-column prop="relevancyFoundryNumber" sortable="custom" label="铸造数量" align="center" key="17"> </el-table-column>
      <el-table-column prop="reclaimRate" sortable="custom" label="回收比例" align="center" key="18">
        <template slot-scope="scope">
          {{ `${new bigNumber(scope.row.reclaimRate || 0).multipliedBy(100).toFixed(2)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center" key="19">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="approve(scope.row)" v-if="scope.row.seriesType == 'PIC'"> 授权 </span>
          <span class="blueColor publick-button cursor" @click="handleEdit(scope.row)"> 编辑 </span>
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
      :title="operatingType == 1 ? '创建NFT' : '编辑NFT'"
      :visible.sync="showDialog"
      width="540px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" class="add-form" :rules="rules" :model="ruleForm" label-width="130px">
        <el-form-item label="名称" prop="seriesName">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            v-model="ruleForm.seriesName"
            style="width: 300px"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item label="类型" prop="seriesType">
          <el-select :disabled="operatingType != 1" v-model="ruleForm.seriesType" style="width: 300px" placeholder="请选择类型">
            <el-option label="币" value="COIN" />
            <el-option label="图" value="PIC" />
          </el-select>
        </el-form-item>
        <el-form-item label="合约地址" prop="contractAddress">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            v-model="ruleForm.contractAddress"
            style="width: 300px"
            placeholder="请输入合约地址"
          >
            <template slot="append">
              <el-button @click="fetchNftSeries()">查询</el-button>
            </template></el-input
          >
        </el-form-item>
        <template v-if="ruleForm.seriesType !== 'COIN'">
          <el-form-item label="tokenId" prop="tokenId">
            <el-input :disabled="operatingType != 1" v-model="ruleForm.tokenId" style="width: 300px" placeholder="请输入tokenId" />
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="币种" prop="seriesCoin">
            <el-select :disabled="operatingType != 1" v-model="ruleForm.seriesCoin" style="width: 300px">
              <el-option label="ETH" value="ETH"></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item label="图片" prop="seriesImg">
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
        <el-form-item label="所在链" prop="chainId">
          <el-select :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1" v-model="ruleForm.chainId" style="width: 300px">
            <el-option v-for="(item, index) in chainList" :key="index" :label="item.chainName" :value="item.chainId">
              <span style="float: left">{{ item.chainName }}</span>
              <span style="float: right; color: #8492a6">{{ item.type }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价值" prop="price">
          <el-input
            :disabled="ruleForm.seriesType !== 'COIN' && operatingType != 1"
            type="number"
            v-model="ruleForm.price"
            style="width: 300px"
            placeholder="请输入价值"
          >
            <template slot="append">{{ ruleForm.seriesType == "COIN" ? "ETH" : "USDT" }}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="回收比例" prop="reclaimRate">
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
        callback(new Error("请输入0-100的百分数"));
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
        tokenId: [{ required: true, message: "请输入tokenId", trigger: ["blur", "change"] }],
        contractAddress: [{ required: true, message: "请输入合约地址", trigger: ["blur", "change"] }],
        chainId: [{ required: true, message: "请选择链", trigger: ["blur", "change"] }],
        price: [{ required: true, message: "请输入价值", trigger: ["blur", "change"] }],
        seriesName: [{ required: true, message: "请输入名称", trigger: ["blur", "change"] }],
        seriesType: [{ required: true, message: "请选择类型", trigger: ["blur", "change"] }],
        seriesImg: [{ required: true, message: "请选择NFT图片", trigger: ["blur", "change"] }],
        reclaimRate: [
          { required: true, message: "请输入回收比例", trigger: ["blur", "change"] },
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
      let isApproved = await nftContract.methods.isApprovedForAll(walletAddress, nftHelpAddress).call();
      console.log(isApproved, "isApproved===");
      if (!isApproved) {
        //授权
        await nftContract.methods.setApprovalForAll(nftHelpAddress, true).send({ from: walletAddress });
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
      this.ruleForm.reclaimRate = new bigNumber(this.ruleForm.reclaimRate).multipliedBy(100).toString();
      this.hideUpload = true;
      this.operatingType = 2;
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
          let res = await this.$http.nftPlatformDel({
            id: row.id,
          });
          if (res) {
            this.fetchNftPlatformList(true);
            this.$message.success("操作成功");
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
          this.$message.error("查询失败，请检查合约地址是否正确");
        })
        .catch((error) => {
          this.$message.error("查询失败，请检查合约地址是否正确");
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
              this.$message.error("请上传图片！");
              return;
            }
            ruleForm.seriesImg = this.fileImg[0].url;
          }
          ruleForm.reclaimRate = new bigNumber(ruleForm.reclaimRate).dividedBy(100);
          let res = null;
          if (!ruleForm.id) {
            ruleForm.seriesType == "COIN" ? (ruleForm.coin = "ETH") : (ruleForm.coin = "USDT");
            res = await this.$http.nftPlatformAdd({ ...ruleForm });
          } else {
            res = await this.$http.nftPlatformUpdate({ ...ruleForm });
          }

          if (res) {
            this.handleClose();
            this.fetchNftPlatformList();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("操作成功！");
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
