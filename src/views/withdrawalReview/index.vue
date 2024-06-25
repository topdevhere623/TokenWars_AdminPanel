<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 140px" placeholder="输入订单ID" v-model="Id" clearable />
      <el-input class="public-input" style="width: 140px" placeholder="输入用户ID" v-model="userId" clearable />
      <el-select v-model="auditStatus" class="public-select-box" popper-class="public-select-box" placeholder="全部状态" clearable>
        <el-option label="待审核" value="WAIT"> </el-option>
        <el-option label="转帐中" value="TRANSFERRING"> </el-option>
        <el-option label="转账成功" value="SUCCESS"> </el-option>
        <el-option label="转账失败" value="FAIL"> </el-option>
        <el-option label="已拒绝" value="REFUSE"> </el-option>
      </el-select>
      <el-select v-model="withdrawalType" class="public-select-box" popper-class="public-select-box" placeholder="全部类型" clearable>
        <el-option label="ETH" value="ETH"> </el-option>
        <el-option label="NFT" value="NFT"> </el-option>
        <el-option label="USDT" value="USDT"> </el-option>
      </el-select>

      <el-select v-model="outgoingChainType" class="public-select-box" popper-class="public-select-box" placeholder="全部链" clearable>
        <el-option v-for="(item, index) in chainDrop" :key="index" :label="item.chain" :value="item.chain"> </el-option>
      </el-select>

      <div class="public-date-box">
        <span class="demonstration"> 发起时间 </span>
        <el-date-picker
          v-model="applicationTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> 审核时间 </span>
        <el-date-picker
          v-model="reviewTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> 到账时间 </span>
        <el-date-picker
          v-model="receiptTime"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchAssetWithdrawalList()"> 查询 </el-button>
      <el-button type="primary" icon="el-icon-download" class="public-search" @click="onExport()"> 导出 </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总订单数</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.totalNumber }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总提款金额</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.withdrawalPrices }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总手续费</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.serviceFees }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总实际到账</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.actualArrivals }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总GAS</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.gases }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">提款账户余额</div>
          <div class="val">
            {{ aggregateQuery && aggregateQuery.withdrawalBalance }}
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column prop="flowId" label="订单ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="userName" sortable="custom" width="120" label="用户" align="center" key="2">
        <template slot-scope="scope">
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userId || "--" }}
          </p>
          <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
            {{ scope.row.userName || "--" }}
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="assetBalance" sortable="custom" width="130" :label="`用户余额`" align="center" key="3"> </el-table-column>
      <el-table-column prop="outgoingChainType" sortable="custom" width="130" :label="`链`" align="center" key="19"> </el-table-column>
      <el-table-column prop="coin" sortable="custom" width="130" :label="`币种`" align="center" key="20"> </el-table-column>
      <el-table-column prop="withdrawalPrice" sortable="custom" width="130" :label="`提款金额`" align="center" key="4"> </el-table-column>
      <el-table-column prop="userName" width="80" label="提出NFT" align="center" key="5">
        <template slot-scope="scope">
          <span
            style="color: #0e9efd; cursor: pointer"
            v-if="scope.row.withdrawalType == 'NFT'"
            @click="showWithdrawNft(scope.row.outWithdrawalNftList, 1)"
            >查看</span
          >
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="serviceFee" width="120" sortable="custom" :label="`手续费`" align="center" key="6"> </el-table-column>
      <el-table-column prop="userCoin" width="120" sortable="custom" label="目标币种" align="center" key="7"> </el-table-column>
      <el-table-column prop="actualArrival" width="120" sortable="custom" label="实际到账" align="center" key="8">
        <template slot-scope="scope">
          <span
            style="color: #0e9efd; cursor: pointer"
            v-if="scope.row.withdrawalType == 'NFT'"
            @click="showWithdrawNft(scope.row.arrivedWithdrawalnftlist, 2)"
            >查看</span
          >
          <span v-else>{{ scope.row.actualArrival }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="flowId" label="流水号" align="center" key="9"> </el-table-column>
      <el-table-column prop="hash" label="HASH" width="300" align="center" key="10"> </el-table-column>
      <el-table-column prop="gas" sortable="custom" label="GAS" align="center" key="11"> </el-table-column>
      <el-table-column prop="withdrawalWalletAddress" width="300" label="提款钱包" align="center" key="12"> </el-table-column>
      <!-- <el-table-column prop="withdrawalType" sortable="custom" label="提款类型" align="center" key="13"> </el-table-column> -->
      <el-table-column prop="createTime" sortable="custom" width="140" label="发起时间" align="center" key="14">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.createTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="auditTime" sortable="custom" width="140" label="审核时间" align="center" key="15">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.auditTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="arrivalTime" sortable="custom" width="140" label="到账时间" align="center" key="16">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.arrivalTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" sortable="custom" label="审核状态" align="center" key="17" fixed="right">
        <template slot-scope="scope">
          <span style="color: #0e9efd" v-if="scope.row.auditStatus == 'WAIT'">待审核</span>
          <span style="color: #fd770a" v-if="scope.row.auditStatus == 'TRANSFERRING'">转帐中</span>
          <span style="color: #000" v-if="scope.row.auditStatus == 'SUCCESS'">已提现</span>
          <span style="color: #ff2a07" v-if="scope.row.auditStatus == 'FAIL'">转账失败</span>
          <span style="color: #c1c1c1" v-if="scope.row.auditStatus == 'REFUSE'">已拒绝</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center" width="180" key="18" fixed="right">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="showReview(scope.row)"> 详情 </span>
          <span class="blueColor publick-button cursor" v-if="scope.row.auditStatus == 'FAIL'" @click="reTryFunc(scope.row)"> 重试 </span>
          <!-- <span
            class="blueColor publick-button cursor"
            v-if="scope.row.outWithdrawalNftList.length > 0"
            @click="withdrawNft(scope.row)"
          >
            提现NFT(授权签名)
          </span> -->
          <!-- <span
            class="blueColor publick-button cursor"
            v-if="scope.row.outWithdrawalNftList.length > 0"
            @click="withdrawNft(scope.row, true)"
          >
            提现NFT(执行)
          </span> -->
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
      :title="showNftType == 1 ? '提出NFT' : '实际到账NFT'"
      :visible.sync="showNftDialog"
      width="800px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="nft-box">
        <div class="nft-item" v-for="(item, index) in withdrawNftList" :key="index">
          <div style="min-width: 80px; height: 80px">
            <el-image style="height: 80px" :src="item.nftImg" :preview-src-list="[item.nftImg]"> </el-image>
          </div>
          <div class="info">
            <div class="nft-name">
              <span>{{ item.nftName }}&nbsp;</span>
              <span>#{{ item.tokenId }}</span>
            </div>
            <div class="nft-contract">合约：{{ item.contractAddress }}</div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="title" :visible.sync="showReviewDialog" width="600px" :close-on-click-modal="false" :before-close="handleClose">
      <div class="review-box">
        <div class="review-info">
          <div class="review-top-l">
            <div class="info-title">提现详情</div>
            <div class="info-item">
              <div class="info-item-title">订单ID：</div>
              <div class="info-item-val">{{ reviewData && reviewData.id }}</div>
            </div>
            <div class="info-item">
              <div class="info-item-title">用户ID：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.userId }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">用户余额：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.assetBalance }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">提款金额：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.withdrawalPrice }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">手续费：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.serviceFee }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">总提款：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.totalWithdrawal }}
              </div>
            </div>
            <div class="info-item" v-if="reviewType == 1">
              <div class="info-item-title">实际到账：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.actualArrival }}
              </div>
            </div>
          </div>
          <div class="review-top-r">
            <div class="info-title">用户信息</div>
            <div class="info-item">
              <div class="info-item-title">用户昵称：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.userName }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">邮箱：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.email }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">总消费：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.totalConsumps }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">总收入：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.totalRevenue }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">总充值：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.totalRecharge }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">总佣金：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.totalCommission }}
              </div>
            </div>
            <div class="info-item">
              <div class="info-item-title">目标币种：</div>
              <div class="info-item-val">
                {{ reviewData && reviewData.userCoin }}
              </div>
            </div>
          </div>
        </div>
        <div class="review-other">
          <div class="info-item" v-if="reviewType == 2">
            <div class="info-item-title">NFT信息:</div>
            <div class="info-item-val">
              <div class="nft-box">
                <div class="nft-item" v-for="(item, index) in reviewData && reviewData.outWithdrawalNftList" :key="index">
                  <div style="width: 80px; height: 80px">
                    <el-image style="height: 80px" :src="item.nftImg" :preview-src-list="[item.nftImg]"> </el-image>
                  </div>
                  <div class="info">
                    <div class="nft-name">
                      <span>{{ item.nftName }}&nbsp;</span>
                      <span>#{{ item.tokenId }}</span>
                    </div>
                    <div class="nft-contract">合约：{{ item.contractAddress }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info-title">收款信息</div>
          <div class="info-item">
            <div class="info-item-title">钱包地址：</div>
            <div class="info-item-val">
              {{ reviewData && reviewData.withdrawalWalletAddress }}
            </div>
          </div>
        </div>
        <div class="review-chain" v-if="reviewData && reviewData.auditStatus != 'WAIT' && reviewData.auditStatus != 'FAIL'">
          <div class="info-chain" @click="openLink(reviewData.hash)">
            <span>链上信息</span>
            <i class="el-icon-link"></i>
          </div>
        </div>
        <div class="review-remarks" v-if="reviewData && reviewData.auditStatus != 'WAIT' && reviewData.auditStatus != 'TRANSFERRING'">
          <span v-if="reviewData && reviewData.auditStatus == 'FAIL'">
            <span style="color: #ff0000">{{ reviewData && reviewData.remark }}</span>
          </span>
          <span v-else-if="reviewData && reviewData.auditStatus == 'REFUSE'">
            {{ `拒绝原因：${reviewData && reviewData.remark}` }}
          </span>
          <span v-else>{{ reviewData && reviewData.remark }}</span>
        </div>
        <div class="review-submit" v-if="reviewData && reviewData.auditStatus == 'WAIT'">
          <div class="info-title">拒绝原因</div>
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入拒绝原因" v-model="remark"></el-input>
          <div class="btn-box">
            <el-button size="medium" style="width: 160px" @click="submitReview(2)">拒绝</el-button>
            <el-button type="primary" style="width: 160px" size="medium" @click="submitReview(1, reviewData)">通过</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr, exportExcel, openUrl } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";
import multi from "@/contracts/multi.json";
import nft721Abi from "@/contracts/721.json";
import nft1155Abi from "@/contracts/1155.json";
import Web3 from "web3";
import dayjs from "dayjs";
import contractInfo from "@/config/sign.js";
export default {
  name: "WithdrawalReview",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null, // Id
      userId: null, // 用户Id
      auditStatus: null, // 全部状态
      withdrawalType: null, // 提款类型
      applicationTime: null, // 发起时间
      reviewTime: null, // 审核时间
      receiptTime: null, // 到账时间
      outgoingChainType:null,
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,

      /** 提出NFT相关 */
      showNftType: 1,
      showNftDialog: false,
      withdrawNftList: [],

      /** 审核相关 */
      showReviewDialog: false,
      reviewType: 1,
      reviewStatus: null,
      reviewData: null,
      remark: null,
      walletAddress: "",
      chainDrop:[]
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    async fetchChain() {
      const res = await this.$http.getChainList({ page: 1, size: 999 });
      if (res) {
        this.chainDrop = res.records;
      }
    },
    // 搜索条件
    searchFun() {
      let { applicationTime, reviewTime, receiptTime } = this;
      let createStartTime = null;
      let createEndTime = null;
      let auditStartTime = null;
      let auditEndTime = null;
      let arrivalStartTime = null;
      let arrivalEndTime = null;

      if (applicationTime && applicationTime[0]) {
        createStartTime = timeForStr(applicationTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (applicationTime && applicationTime[1]) {
        createEndTime = timeForStr(applicationTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      if (reviewTime && reviewTime[0]) {
        auditStartTime = timeForStr(reviewTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (reviewTime && reviewTime[1]) {
        auditEndTime = timeForStr(reviewTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      if (receiptTime && receiptTime[0]) {
        arrivalStartTime = timeForStr(receiptTime[0], "YYYY-MM-DD HH:mm:ss");
      }
      if (receiptTime && receiptTime[1]) {
        arrivalEndTime = timeForStr(receiptTime[1], "YYYY-MM-DD HH:mm:ss");
      }

      return {
        id: this.Id, // 订单Id
        userId: this.userId, // 用户Id
        auditStatus: this.auditStatus, // 来源
        withdrawalType: this.withdrawalType, // 提款类型
        outgoingChainType:this.outgoingChainType,
        createStartTime,
        createEndTime,
        auditStartTime,
        auditEndTime,
        arrivalStartTime,
        arrivalEndTime,
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

      this.fetchAssetWithdrawalList();
    },

    // 加载列表
    async fetchAssetWithdrawalList(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size, coin, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          // coin: coin,
          userType: userType,
          size: size,
          page: _page,
        },
        ...sortData,
        ...search,
      };
      const res = await this.$http.getAssetWithdrawalList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getAssetWithdrawalStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 列表导出
    onExport() {
      const search = this.searchFun();
      const urlStr = config.api + "/asset-withdrawal/exportExcel";
      const { coin, userType } = this;
      const data = {
        ...{
          // coin: coin,
          userType: userType,
        },
        ...search,
      };

      exportExcel(urlStr, data, "提现审核导出");
    },
    // 弹出提现nft具体信息
    showWithdrawNft(event, type) {
      this.showNftType = type;
      this.withdrawNftList = event;
      this.showNftDialog = true;
    },
    // 连接小狐狸
    async connectMetaMask() {
      const _that = this;
      let web3 = new Web3(window.ethereum);
      let ethereum = window.ethereum;
      if (typeof ethereum === "undefined") {
        _that.connectType = 0;
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
            // _that.walletStore.setWeb3(web3);
            // _that.web3 = web3;
            // const _ethBalance = new BigNumber(
            //   await _that.web3.eth.getBalance(accounts[0])
            // )
            //   .div(1e18)
            //   .toFixed(4);
          })
          .catch((reason) => {
            //如果用户拒绝了登录请求
            this.connectType = 0;
            if (reason === "User rejected provider access") {
              // 用户拒绝登录后执行语句；
            } else {
              // 本不该执行到这里，但是真到这里了，说明发生了意外
              ElMessage.error("Connection to wallet failed");
            }
          });
      }
    },
    // 弹出审核具体信息
    showReview(event) {
      this.reviewType = event.withdrawalType != "NFT" ? 1 : 2;
      this.reviewStatus = event.auditStatus;
      this.reviewData = event;
      this.showReviewDialog = true;
    },
    async reTryFunc(row) {
      let res = await this.$http.withdrawawRetry({ id: row.id });
      if (res) {
        this.fetchAssetWithdrawalList();
        this.$message.success("操作成功");
      }
    },
    async withdrawNft(item, isExcute = false) {
      await this.connectMetaMask();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const is1155 = item.outWithdrawalNftList[0].seriesNftType == "ERC1155";
      const MultiSign = contractInfo.MultiSign; //MultiSign 合约地址
      const nftHelpAddress = contractInfo.nftHelpAddress; //新的nft转账合约地址
      const web3 = new Web3(window.ethereum);
      let MultiSignContract = new web3.eth.Contract(multi, MultiSign);
      const target = nftHelpAddress;
      const token = item.outWithdrawalNftList[0].contractAddress; //nft合约地址
      const tokenIds = [parseInt(item.outWithdrawalNftList[0].tokenId)]; //nft的tokenid
      const amounts = [1]; //转账数量
      const receiver = item.withdrawalWalletAddress; //收款地址
      const orderId = "";
      const signAddressList = [
        "0x9B424522C56c2c90abb94695eeB1b148666644cF", //nft持有的地址
        "0x728a86A400D673c7286BE43AC27B0B825Ba57616",
        "0x47187c1da710f2021929c0bde8b1cdbc8b3f115c",
      ];
      const predecessorAddress = signAddressList[0]; //nft持有的地址
      const walletAddress = this.walletAddress; //当前连接的钱包地址
      const predeBytes32 = web3.utils.asciiToHex(predecessorAddress).toString();
      const predecessor = predeBytes32.substring(0, 66);
      let nftContract = new web3.eth.Contract(is1155 ? nft1155Abi : nft721Abi, token);

      // 授权判断
      let isApproved = await nftContract.methods.isApprovedForAll(walletAddress, nftHelpAddress).call();
      if (!isApproved) {
        //授权
        await nftContract.methods.setApprovalForAll(nftHelpAddress, true).send({ from: walletAddress });
      } else {
        this.$message.success("isApproved");
      }
      let transferNFTArgs = [
        //1155
        token,
        predecessorAddress,
        tokenIds, //tokenid
        amounts, //数量
        receiver, //收款地址
        orderId,
        "0x",
      ];

      // 1155 transferNFT 函数的 ABI
      let nftHelpAbi = [
        {
          inputs: [
            {
              internalType: "address",
              name: "token",
              type: "address",
            },
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "uint256[]",
              name: "tokenIds",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "amounts",
              type: "uint256[]",
            },
            {
              internalType: "address",
              name: "receiver",
              type: "address",
            },
            {
              internalType: "string",
              name: "orderId",
              type: "string",
            },
            {
              internalType: "bytes",
              name: "data",
              type: "bytes",
            },
          ],
          name: "transfer1155",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      if (item.outWithdrawalNftList[0].seriesNftType == "ERC721") {
        transferNFTArgs = [
          //721
          token,
          predecessorAddress,
          tokenIds, //tokenid
          receiver, //收款地址
          orderId,
        ]; //721参数
        nftHelpAbi = [
          {
            inputs: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "address",
                name: "from",
                type: "address",
              },
              {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
              },
              {
                internalType: "address",
                name: "receiver",
                type: "address",
              },
              {
                internalType: "string",
                name: "orderId",
                type: "string",
              },
            ],
            name: "transferNFT",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
        ];
      }
      // if (item.type != "ERC1155") {
      //   transferNFTArgs = [];
      //   nftHelpAbi = [];
      // }
      const calldata = web3.eth.abi.encodeFunctionCall(nftHelpAbi[0], transferNFTArgs);
      const salt = web3.utils.asciiToHex(dayjs().unix().toString());
      const delay = 1;
      // // 查询是否签名
      // const isSignId = await MultiSignContract.methods
      //   .hashOperation(target, calldata, predecessor, salt, delay)
      //   .call();
      // //创建日程
      // let signCount = 0; //签名数量
      // signAddressList.forEach(async (item) => {
      //   let isSigned = await MultiSignContract.methods
      //     .schedules(isSignId, item)
      //     .call();
      //   if (isSigned) {
      //     signCount++;
      //   }
      // });
      if (isExcute) {
        //执行日程
        MultiSignContract.methods.execute(target, 0, calldata, predecessor, salt).send({
          from: walletAddress,
        });
      } else {
        // console.log("target", target);
        // console.log("calldata", calldata);
        // console.log("predecessor", predecessor);
        // console.log("salt", salt);
        // console.log("delay", delay);
        //签名日程
        const _that = this;
        await MultiSignContract.methods
          .signToSchedule(target, calldata, predecessor, salt, delay)
          .send({
            from: walletAddress,
          })
          .on("transactionHash", async function (hash) {
            console.log(hash, "hash====");
            const data = {
              ids: [item.id], //提款ID集合
              appleHash: hash, //申请hash
            };
            const res = await _that.$http.withdrawawSign(data);
            _that.fetchAssetWithdrawalList();
          });
      }
    },
    async submitReview(type, row) {
      let res = null;
      if (type == 1) {
        // 通过
        if (row.withdrawalType != "NFT") {
          res = await this.$http.withdrawalApproved({
            id: this.reviewData.id,
          });
        } else {
          const data = {
            ids: [row.id], //提款ID集合
            appleHash: "test", //申请hash
          };
          res = await this.$http.withdrawawSign(data);
        }

        // this.withdrawNft(row);
      } else {
        // 拒绝
        if (!this.remark) {
          this.$message.error("请输入拒绝理由");
          return;
        }

        res = await this.$http.withdrawalRefuse({
          id: this.reviewData.id,
          remark: this.remark,
        });
      }

      if (res) {
        this.handleClose();
        this.fetchAssetWithdrawalList();
        this.$message.success("操作成功");
      }
    },
    // 跳链上
    openLink(url) {
      let chain = "";
      openUrl(chain + url);
    },
    handleClose(done) {
      /** NFT提现相关 */
      this.withdrawNftList = null;
      this.showNftType = 1;

      /** 审核相关 */
      this.reviewType = 1;
      this.reviewStatus = null;
      this.reviewData = null;

      if (done) {
        done();
        return;
      }

      this.showNftDialog = false;
      this.showReviewDialog = false;
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchAssetWithdrawalList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchAssetWithdrawalList(false);
    },
  },
  // 创建后
  created() {
    this.fetchAssetWithdrawalList();
    this.fetchChain();
  },
  computed: {
    coin() {
      return this.$store.getters.coinConfig;
    },
    userType() {
      return this.$store.getters.accountConfig;
    },
    title() {
      const { reviewType, reviewStatus } = this;
      if (reviewType == 1) {
        if (reviewStatus == "WAIT") {
          return "提款审核（待审核）";
        } else if (reviewStatus == "TRANSFERRING") {
          return "提款审核（转帐中）";
        } else if (reviewStatus == "SUCCESS") {
          return "提款审核（转账成功）";
        } else if (reviewStatus == "FAIL") {
          return "提款审核（转账失败）";
        }
        {
          return "提款审核（已拒绝）";
        }
      } else {
        if (reviewStatus == "WAIT") {
          return "提NFT审核（待审核）";
        } else if (reviewStatus == "TRANSFERRING") {
          return "提NFT审核（转帐中）";
        } else if (reviewStatus == "SUCCESS") {
          return "提NFT审核（转账成功）";
        } else if (reviewStatus == "FAIL") {
          return "提NFT审核（转账失败）";
        }
        {
          return "提NFT审核（已拒绝）";
        }
      }
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

.nft-box {
  & > div + div {
    margin-top: 10px;
  }
}

.nft-item {
  display: flex;
  align-items: center;

  .info {
    padding: 0 4px;
    padding-left: 10px;

    .nft-name {
      width: 380px;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span {
        display: inline-block;
        max-width: 50%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .nft-contract {
      font-size: 14px;
      padding: 10px 0 0;
    }
  }
}

.review-box {
  & > div {
    padding-bottom: 10px;
  }

  & > div + div {
    padding-top: 10px;
    border-top: 1px solid #333333;
  }
}

.review-info {
  display: flex;

  & > div {
    flex: 1;

    & > div + div {
      margin-top: 10px;
    }
  }
}

.info-title {
  font-size: 20px;
  font-weight: bold;
  color: #a1a1a1;
}

.info-item {
  display: flex;

  & > div + div {
    padding-left: 4px;
  }
}

.review-other {
  & > div + div {
    margin-top: 10px;
  }
}

.info-chain {
  font-size: 20px;
  font-weight: bold;
  color: #000;

  & > span {
    padding-right: 4px;
  }
}

.review-submit {
  .info-title {
    color: #000;
    padding-bottom: 10px;
  }

  .btn-box {
    padding-top: 10px;
  }
}

.info-item-val {
  .nft-box {
    padding-left: 20px;
  }
}
</style>
