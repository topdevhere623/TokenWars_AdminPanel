<template>
  <el-container>
    <el-aside :width="`${asideWidth}px`" style="background-color: rgb(238, 241, 246)" class="width-animation nav">
      <div class="logoBox" style="background-color: #304156">
        <div class="logo-box"></div>
        <div class="config-box">
          <el-select v-model="accountType" @change="changeAccount" placeholder="展示测试账号" clearable>
            <el-option label="展示测试账号" value=""> </el-option>
            <el-option label="不展示测试账号" value="NORMAL"> </el-option>
            <el-option label="只展示测试账号" value="INNER"> </el-option>
          </el-select>
          <el-select v-model="coinConfig" @change="changeConfig" placeholder="结算币种">
            <el-option label="ETH" value="ETH"> </el-option>
            <!-- <el-option label="USDT" value="USDT">
            </el-option> -->
          </el-select>
        </div>
      </div>
      <!-- @select="selectFun" -->
      <el-menu :default-openeds="defaultList" :default-active="defaultActive" :collapse="isCollapse" class="nav-ul">
        <template v-for="(item, index) in menuList">
          <el-submenu :index="item.menuName" :key="index" v-if="item.children && item.children.length > 0">
            <template slot="title">
              <!-- <i :class="['el-icon-img', menuIcon(index)]"></i> -->
              <span>{{ item.menuName }}</span>
            </template>
            <template v-for="(i, indexs) in item.children">
              <el-menu-item :index="i.path" v-if="i.path && i.path != 'null'" :key="indexs" @click="goUrl(i.path)">{{
                i.menuName
              }}</el-menu-item>
            </template>
          </el-submenu>
          <template v-else>
            <el-menu-item :index="item.path" :key="index" v-if="item.path" @click="goUrl(item.path)">
              <!-- <i class="el-icon-menu"></i> -->
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </template>
        </template>
        <!-- <el-menu-item index="report">
          <i class="el-icon-bank-card"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="dataManagement">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">数据管理</span>
          </template>
          <el-menu-item index="userList" class="menu-list">
            <i class="el-icon-user"></i>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="invitationRebate" class="menu-list">
            <i class="el-icon-coin"></i>
            <span>邀请返佣</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="nftManagement">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">NFT管理</span>
          </template>
          <el-menu-item index="platformNftSeries" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>平台NFT系列</span>
          </el-menu-item>
          <el-menu-item index="externalNftSeries" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>外部NFT系列</span>
          </el-menu-item>
          <el-menu-item index="externalTokenManagement" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>外部代币管理</span>
          </el-menu-item>
          <el-menu-item index="externalNftManagement" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>外部NFT管理</span>
          </el-menu-item>
          <el-menu-item index="userNftList" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>用户NFT管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="platformManagement">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">平台管理</span>
          </template>
          <el-menu-item index="marketManagement" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>市场管理</span>
          </el-menu-item>
          <el-menu-item index="setting" class="menu-list">
            <i class="el-icon-s-tools"></i>
            <span>系统设置</span>
          </el-menu-item>
          <el-menu-item index="lotteryChainManagement" class="menu-list">
            <i class="el-icon-message"></i>
            <span>抽奖链管理</span>
          </el-menu-item>
          <el-menu-item index="email" class="menu-list">
            <i class="el-icon-message"></i>
            <span>群发邮件</span>
          </el-menu-item>
          <el-menu-item index="robotManagement" class="menu-list">
            <i class="el-icon-message"></i>
            <span> 机器人管理</span>
          </el-menu-item>
          <el-menu-item index="mandatoryAudit" class="menu-list">
            <i class="el-icon-stopwatch"></i>
            <span>强制审核管理</span>
          </el-menu-item>
          <el-menu-item index="activityList" class="menu-list">
            <i class="el-icon-stopwatch"></i>
            <span>活动列表</span>
          </el-menu-item>
          <el-menu-item index="activityManagement" class="menu-list">
            <i class="el-icon-stopwatch"></i>
            <span>活动管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="mallManagement">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">商城管理</span>
          </template>
          <el-menu-item index="blindBoxManagement" class="menu-list">
            <i class="el-icon-box"></i>
            <span>盲盒管理</span>
          </el-menu-item>
          <el-menu-item index="orderManagement" class="menu-list">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </el-menu-item>
          <el-menu-item index="blindBoxTest" class="menu-list">
            <i class="el-icon-box"></i>
            <span>盲盒测试</span>
          </el-menu-item>
          <el-menu-item index="nftBuyManagement" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>一元购管理</span>
          </el-menu-item>
          <el-menu-item index="nftBuyRecord" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>一元购售票记录</span>
          </el-menu-item>
          <el-menu-item index="warGameManagement" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>战争游戏管理</span>
          </el-menu-item>
          <el-menu-item index="warGameBetManagement" class="menu-list">
            <i class="el-icon-s-management"></i>
            <span>战争游戏售票管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="fundingStatistics">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">资金统计</span>
          </template>
          <el-menu-item index="cashManagement" class="menu-list">
            <i class="el-icon-s-finance"></i>
            <span>金流管理</span>
          </el-menu-item>
          <el-menu-item index="nftTransactionManagement" class="menu-list">
            <i class="el-icon-s-finance"></i>
            <span>NFT 交易管理</span>
          </el-menu-item>
          <el-menu-item index="withdrawalReview" class="menu-list">
            <i class="el-icon-stopwatch"></i>
            <span>提款审核</span>
          </el-menu-item>
          <el-menu-item index="flashManagement" class="menu-list">
            <i class="el-icon-s-order"></i>
            <span>闪兑管理</span>
          </el-menu-item>
          <el-menu-item index="rebateRecord" class="menu-list">
            <i class="el-icon-document"></i>
            <span>返佣记录</span>
          </el-menu-item>
          <el-menu-item index="integralTurnover" class="menu-list">
            <i class="el-icon-document"></i>
            <span>积分流水</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="systemManagement">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item index="accountList" class="menu-list">
            <i class="el-icon-s-finance"></i>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="permissionAssign" class="menu-list">
            <i class="el-icon-s-finance"></i>
            <span>权限管理</span>
          </el-menu-item>
          <el-menu-item index="roleList" class="menu-list">
            <i class="el-icon-stopwatch"></i>
            <span>角色管理</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="walletManagement">
          <template slot="title">
            <i class="el-icon-wallet"></i>
            <span slot="title">钱包管理</span>
          </template>
          <el-menu-item index="walletRechargeList" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>充值钱包</span>
          </el-menu-item>
          <el-menu-item index="walletUnboxLottery" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>盲盒抽奖钱包</span>
          </el-menu-item>
          <el-menu-item index="walletOneDollarLottery" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>一元购抽奖钱包</span>
          </el-menu-item>
          <el-menu-item index="walletDrawMoney" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>提款钱包</span>
          </el-menu-item>
          <el-menu-item index="walletGAS" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>GAS钱包</span>
          </el-menu-item>
          <el-menu-item index="walletNFTBuy" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>NFT购买钱包</span>
          </el-menu-item>
          <el-menu-item index="walletCollection" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>归集钱包</span>
          </el-menu-item>
          <el-menu-item index="walletCollectCoinStat" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>代币归集统计</span>
          </el-menu-item>
          <el-menu-item index="walletCollectionNFTStat" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>NFT归集统计</span>
          </el-menu-item>
          <el-menu-item index="walletNFTBuyStat" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>NFT购买统计</span>
          </el-menu-item>
          <el-menu-item index="walletGASStat" class="menu-list">
            <i class="el-icon-bank-card"></i>
            <span>GAS统计</span>
          </el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-container class="width-animation" :style="{ marginLeft: `${asideWidth}px` }">
      <el-header style="text-align: left; display: flex; justify-content: space-between; align-items: center">
        <div class="header-title">
          <div class="header-title-buttons cursor">
            <span @click="foldFun(false)" v-if="isCollapse">
              <svg-icon class-name="title-icon" icon-class="el-icon-s-unfold" />
            </span>
            <span @click="foldFun(true)" v-else>
              <svg-icon class-name="title-icon" icon-class="el-icon-s-fold" />
            </span>
          </div>
          <span class="title">{{ title }}</span>
          <span class="title title-middle colorNine" v-if="page">/</span>
          <span class="title">{{ page }}</span>
        </div>
        <div class="headerR">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link"> 基本操作<i class="el-icon-arrow-down el-icon--right"></i> </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="a">修改密码</el-dropdown-item> -->
              <el-dropdown-item command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main
        :class="{
          'home-main': path === '/home',
        }"
      >
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Aside",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      drawer: false,
      defaultList: [],
      defaultActive: "userList",
      title: "",
      page: "",
      isCollapse: false,
      asideWidth: 220,
      accountType: "",
      coinConfig: "",
      menuList: [],
      nav: [
        {
          label: "数据管理",
          page: "dataManagement",
        },
        {
          label: "NFT管理",
          page: "nftManagement",
        },
        {
          label: "首页",
          page: "home",
        },
        {
          label: "用户管理",
          page: "userList",
        },
        {
          label: "平台NFT系列",
          page: "platformNftSeries",
        },
        {
          label: "外部NFT系列",
          page: "externalNftSeries",
        },
        {
          label: "外部代币管理",
          page: "externalTokenManagement",
        },
        {
          label: "外部NFT管理",
          page: "externalNftManagement",
        },
        {
          label: "平台NFT管理",
          page: "platformNftManagement",
        },
        {
          label: "用户NFT管理",
          page: "userNftList",
        },
        {
          label: "一元购管理",
          page: "nftBuyManagement",
        },
        {
          label: "一元购售票记录",
          page: "nftBuyRecord",
        },
        {
          label: "战争游戏管理",
          page: "warGameManagement",
        },
        {
          label: "战争游戏售票管理",
          page: "warGameBetManagement",
        },
        {
          label: "banner管理",
          page: "bannerManagement",
        },
        {
          label: "公告管理",
          page: "noticeManagement",
        },
        {
          label: "市场管理",
          page: "marketManagement",
        },
        {
          label: "盲盒管理",
          page: "blindBoxManagement",
        },
        {
          label: "血池管理",
          page: "bloodPoolManagement",
        },
        {
          label: "盲盒测试",
          page: "blindBoxTest",
        },
        {
          label: "金流管理",
          page: "cashManagement",
        },
        {
          label: "兑换码管理",
          page: "redeemCodeManagement",
        },
        {
          label: "财务数据",
          page: "finance",
        },
        {
          label: "充值管理",
          page: "rechargeRecord",
        },
        {
          label: "提款审核",
          page: "withdrawalReview",
        },
        {
          label: "提款管理",
          page: "withdrawalManagement",
        },
        {
          label: "订单管理",
          page: "orderManagement",
        },
        {
          label: "闪兑管理",
          page: "flashManagement",
        },
        {
          label: "邀请返佣",
          page: "invitationRebate",
        },
        {
          label: "返佣记录",
          page: "rebateRecord",
        },
        {
          label: "积分流水",
          page: "integralTurnover",
        },
        {
          label: "系统设置",
          page: "setting",
        },
        {
          label: "抽奖链管理",
          page: "lotteryChainManagement",
        },
        {
          label: "群发邮件",
          page: "email",
        },
        {
          label: "充值钱包",
          page: "walletRechargeList",
        },
        {
          label: "盲盒抽奖钱包",
          page: "walletUnboxLottery",
        },
        {
          label: "一元购抽奖钱包",
          page: "walletOneDollarLottery",
        },
        {
          label: "提款钱包",
          page: "walletDrawMoney",
        },
        {
          label: "GAS钱包",
          page: "walletGAS",
        },
        {
          label: "NFT购买钱包",
          page: "walletNFTBuy",
        },
        {
          label: "归集钱包",
          page: "walletCollection",
        },
        {
          label: "代币归集统计",
          page: "walletCollectCoinStat",
        },
        {
          label: "NFT归集统计",
          page: "walletCollectionNFTStat",
        },
        {
          label: "NFT购买统计",
          page: "walletNFTBuyStat",
        },
        {
          label: "GAS统计",
          page: "walletGASStat",
        },
        {
          label: "NFT 交易管理",
          page: "nftTransactionManagement",
        },
        {
          label: "机器人管理",
          page: "robotManagement",
        },
        {
          label: "强制审核管理",
          page: "mandatoryAudit",
        },
        {
          label: "活动列表",
          page: "activityList",
        },
        {
          label: "活动管理",
          page: "activityManagement",
        },
        {
          label: "注册送金统计",
          page: "registrationStatistics",
        },
        {
          label: "banner管理",
          page: "bannerManagement",
        },
        {
          label: "充提链管理",
          page: "chargeChainManagement",
        },
        {
          label: "充提币管理",
          page: "chargeCoinManagement",
        },
        {
          label: "法币通道管理",
          page: "legalCurrencyManagement",
        },
        {
          label: "用户管理",
          page: "accountList",
        },
        {
          label: "权限管理",
          page: "permissionAssign",
        },
        {
          label: "角色管理",
          page: "roleList",
        },
      ],
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  // 方法
  methods: {
    changeAccount(event) {
      // 设置当前挖矿币种
      this.$store.dispatch("user/setAccountConfig", event);
      window.location.reload();
    },
    changeConfig(event) {
      // 设置当前挖矿币种
      this.$store.dispatch("user/coinConfig", event);
    },
    foldFun(data) {
      this.isCollapse = data;
      if (data) {
        this.asideWidth = 65;
      } else {
        this.asideWidth = 220;
      }
    },
    selectFun(index, indexPage) {
      const { nav } = this;
      const _title = nav.filter((item) => item.page == indexPage[0]);
      if (indexPage.length > 1) {
        const _otherTitle = nav.filter((item) => item.page === indexPage[1]);
        this.page = _otherTitle[0].label;
      } else {
        this.page = "";
      }
      this.$router.push(`/${index}`);
    },
    pageFun() {
      const { path, nav } = this;
      const dataManagement = ["userList", "invitationRebate"];

      const nftManagement = [
        "platformNftSeries",
        "externalNftSeries",
        "externalNftManagement",
        "platformNftManagement",
        "userNftList",
        "externalTokenManagement",
      ];

      const platformManagement = [
        "marketManagement",
        "setting",
        "email",
        "robotManagement",
        "lotteryChainManagement",
        "mandatoryAudit",

        "bannerManagement",
        "noticeManagement",
      ];

      const activityManagement = ["activityManagement", "activityList", "registrationStatistics"];

      const mallManagement = [
        "blindBoxManagement",
        "orderManagement",
        "blindBoxTest",
        "nftBuyManagement",
        "nftBuyRecord",
        "warGameManagement",
        "warGameBetManagement",
      ];

      const fundingStatistics = [
        "finance",
        "cashManagement",
        "redeemCodeManagement",
        "nftTransactionManagement",
        "withdrawalReview",
        "flashManagement",
        "rebateRecord",
        "integralTurnover",
      ];
      const walletManagement = [
        "walletRechargeList",
        "walletUnboxLottery",
        "walletOneDollarLottery",
        "walletDrawMoney",
        "walletGAS",
        "walletNFTBuy",
        "walletCollection",
        "walletCollectCoinStat",
        "walletCollectionNFTStat",
        "walletNFTBuyStat",
        "walletGASStat",
      ];
      const systemManagement = ["accountList", "permissionAssign", "roleList"];

      if (path === "/") {
        this.title = "首页";
        this.page = "";
      } else {
        nav.forEach((item) => {
          if (`/${item.page}` === `${path}`) {
            this.defaultActive = item.page;
            if (dataManagement.includes(item.page)) {
              this.title = "数据管理";
              this.page = item.label;
            } else if (nftManagement.includes(item.page)) {
              this.title = "NFT管理";
              this.page = item.label;
            } else if (platformManagement.includes(item.page)) {
              this.title = "平台管理";
              this.page = item.label;
            } else if (mallManagement.includes(item.page)) {
              this.title = "商城管理";
              this.page = item.label;
            } else if (fundingStatistics.includes(item.page)) {
              this.title = "资金统计";
              this.page = item.label;
            } else if (activityManagement.includes(item.page)) {
              this.title = "活动管理";
              this.page = item.label;
            } else if (walletManagement.includes(item.page)) {
              this.title = "钱包管理";
              this.page = item.label;
            } else if (systemManagement.includes(item.page)) {
              this.title = "系统管理";
              this.page = item.label;
            } else {
              this.title = item.label;
              this.page = item.label;
            }
          }
        });
      }
    },
    async getUserMenuFunc() {
      let res = await this.$http.getMenuList();
      if (res) {
        this.menuList = res;
        this.defaultList = this.menuList.map((x) => x.menuName);
      }
    },
    routeActiveFunc(val) {
      let pathSplit = val.path.split("/");
      if (pathSplit.length > 2) {
        let path = pathSplit[0] + pathSplit[1];
        this.defaultActive = path;
      } else {
        this.defaultActive = val.name;
      }
    },
    goUrl(url) {
      if (this.$route.name !== url) {
        this.$router.push({ name: url });
      }
    },
    exit() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    handleCommand(command) {
      if (command == "a") {
        // this.dialogVisible = true;
        // this.ruleForm.oldpass = "";
        // this.ruleForm.orgpass = "";
        // this.ruleForm.confirmpass = "";
      } else if (command == "b") {
        this.exit();
      }
    },
  },
  // 创建后
  created() {
    this.accountType = this.$store.getters.accountConfig;
    this.coinConfig = this.$store.getters.coinConfig;
    this.pageFun();
    this.routeActiveFunc(this.$route);
    this.getUserMenuFunc();
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
  watch: {
    path: function () {
      this.pageFun();
    },
    $route(val) {
      this.routeActiveFunc(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  height: 16px;
}

.title {
  font-size: 22px;
}

.title-middle {
  margin: 0 10px;
}

.header-title {
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
}

.header-title-buttons {
  margin-right: 20px;
}

.home-main {
  padding: 0;
}

.width-animation {
  // transition: all 0.05s;
}

.nav,
.nav-ul {
  min-height: 100vh;
}

.nav-ul {
  background-color: #304156;
}

.logoBox {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.config-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > .el-select + .el-select {
    margin-top: 10px;
  }
}
</style>

<style lang="scss">
.icon-slip {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%) rotate(0);
  transform-origin: center;
  z-index: 99;

  //   &.icon-slip-left {
  //     transform: translateY(-50%) rotate(0);
  //   }
  &.el-button {
    padding: 8px 0;
    border-radius: 0 4px 4px 0;
  }

  .svg-icon {
    min-height: 30px !important;
    min-width: 20px !important;
  }
}

.title-icon {
  font-size: 22px;
}

.el-aside {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}

.menu-list {
  display: flex;
  align-content: center;
  align-items: center;

  .title-icon {
    margin-right: 5px;
    width: 18px !important;
    height: 18px !important;
  }

  .other-icon {
    height: 16px !important;
    width: 16px !important;
  }
}
</style>
