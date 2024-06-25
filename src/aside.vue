<template>
  <el-container>
    <el-aside
      :width="`${asideWidth}px`"
      style="background-color: rgb(238, 241, 246)"
      class="width-animation nav"
    >
      <div class="logoBox" style="background-color: #304156">
        <div class="logo-box"></div>
        <div class="config-box">
          <el-select
            v-model="accountType"
            @change="changeAccount"
            placeholder="Display test account"
            clearable
          >
            <el-option label="Display test account" value=""> </el-option>
            <el-option label="Do not display the test account" value="NORMAL">
            </el-option>
            <el-option label="Only display the test account" value="INNER"> </el-option>
          </el-select>
          <el-select
            v-model="coinConfig"
            @change="changeConfig"
            placeholder="Settlement currency"
          >
            <el-option label="ETH" value="ETH"> </el-option>
            <!-- <el-option label="USDT" value="USDT">
            </el-option> -->
          </el-select>
        </div>
      </div>
      <!-- @select="selectFun" -->
      <el-menu
        :default-openeds="defaultList"
        :default-active="defaultActive"
        :collapse="isCollapse"
        class="nav-ul"
      >
        <template v-for="(item, index) in menuList">
          <el-submenu
            :index="item.menuName"
            :key="index"
            v-if="item.children && item.children.length > 0"
          >
            <template slot="title">
              <!-- <i :class="['el-icon-img', menuIcon(index)]"></i> -->
              <span>{{ item.menuName }}</span>
            </template>
            <template v-for="(i, indexs) in item.children">
              <el-menu-item
                :index="i.path"
                v-if="i.path && i.path != 'null'"
                :key="indexs"
                @click="goUrl(i.path)"
                >{{ i.menuName }}</el-menu-item
              >
            </template>
          </el-submenu>
          <template v-else>
            <el-menu-item
              :index="item.path"
              :key="index"
              v-if="item.path"
              @click="goUrl(item.path)"
            >
              <!-- <i class="el-icon-menu"></i> -->
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </template>
        </template>
        <!-- <el-menu-item index="report">
          <i class="el-icon-bank-card"></i>
          <span slot="title">front page</span>
        </el-menu-item>
        <el-submenu index="dataManagement">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">Data management</span>
          </template>
          <el-menu-item index="userList" class="menu-list">
            <i class="el-icon-user"></i>
            <span>User Management</span>
          </el-menu-item>
          <el-menu-item index="invitationRebate" class="menu-list">
            <i class="el-icon-coin"></i>
            <span>Invite a rebate</span>
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
      <el-header
        style="
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
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
            <span class="el-dropdown-link">
              Basic operation<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="a">修改密码</el-dropdown-item> -->
              <el-dropdown-item command="b">Quit</el-dropdown-item>
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
          label: "Data management",
          page: "dataManagement",
        },
        {
          label: "NFT management",
          page: "nftManagement",
        },
        {
          label: "front page",
          page: "home",
        },
        {
          label: "User Management",
          page: "userList",
        },
        {
          label: "Platform NFT series",
          page: "platformNftSeries",
        },
        {
          label: "External NFT series",
          page: "externalNftSeries",
        },
        {
          label: "External tokens management",
          page: "externalTokenManagement",
        },
        {
          label: "External NFT management",
          page: "externalNftManagement",
        },
        {
          label: "Platform NFT management",
          page: "platformNftManagement",
        },
        {
          label: "User NFT management",
          page: "userNftList",
        },
        {
          label: "One dollar purchase management",
          page: "nftBuyManagement",
        },
        {
          label: "One dollar purchase ticket record",
          page: "nftBuyRecord",
        },
        {
          label: "War Game Management",
          page: "warGameManagement",
        },
        {
          label: "War game ticket management",
          page: "warGameBetManagement",
        },
        {
          label: "banner management",
          page: "bannerManagement",
        },
        {
          label: "Announcement Management",
          page: "noticeManagement",
        },
        {
          label: "Market management",
          page: "marketManagement",
        },
        {
          label: "Blind Box Management",
          page: "blindBoxManagement",
        },
        {
          label: "Blood pool management",
          page: "bloodPoolManagement",
        },
        {
          label: "Blind Box Test",
          page: "blindBoxTest",
        },
        {
          label: "Jinliu Management",
          page: "cashManagement",
        },
        {
          label: "Redemption code management",
          page: "redeemCodeManagement",
        },
        {
          label: "financial data",
          page: "finance",
        },
        {
          label: "Recharge management",
          page: "rechargeRecord",
        },
        {
          label: "Withdrawal review",
          page: "withdrawalReview",
        },
        {
          label: "Withdrawal management",
          page: "withdrawalManagement",
        },
        {
          label: "Order management",
          page: "orderManagement",
        },
        {
          label: "Flashing Management",
          page: "flashManagement",
        },
        {
          label: "inviteARebate",
          page: "invitationRebate",
        },
        {
          label: "Return record",
          page: "rebateRecord",
        },
        {
          label: "",
          page: "integralTurnover",
        },
        {
          label: "System settings",
          page: "setting",
        },
        {
          label: "Lottery Chain Management",
          page: "lotteryChainManagement",
        },
        {
          label: "group email",
          page: "email",
        },
        {
          label: "Recharge bag",
          page: "walletRechargeList",
        },
        {
          label: "Blind Box Raise Wallet",
          page: "walletUnboxLottery",
        },
        {
          label: "One yuan purchase draw wallet",
          page: "walletOneDollarLottery",
        },
        {
          label: "Withdrawal wallet",
          page: "walletDrawMoney",
        },
        {
          label: "Gas wallet",
          page: "walletGAS",
        },
        {
          label: "NFT buy wallet",
          page: "walletNFTBuy",
        },
        {
          label: "Collect wallet",
          page: "walletCollection",
        },
        {
          label: "Tokens collection statistics",
          page: "walletCollectCoinStat",
        },
        {
          label: "NFT Collection Statistics",
          page: "walletCollectionNFTStat",
        },
        {
          label: "NFT purchase statistics",
          page: "walletNFTBuyStat",
        },
        {
          label: "GAS Statistics",
          page: "walletGASStat",
        },
        {
          label: "NFT transaction management",
          page: "nftTransactionManagement",
        },
        {
          label: "Robot Management",
          page: "robotManagement",
        },
        {
          label: "Compulsory audit management",
          page: "mandatoryAudit",
        },
        {
          label: "Events List",
          page: "activityList",
        },
        {
          label: "Activity management",
          page: "activityManagement",
        },
        {
          label: "Register to send gold statistics",
          page: "registrationStatistics",
        },
        {
          label: "banner management",
          page: "bannerManagement",
        },
        {
          label: "Chain Chain Management",
          page: "chargeChainManagement",
        },
        {
          label: "Management",
          page: "chargeCoinManagement",
        },
        {
          label: "French currency channel management",
          page: "legalCurrencyManagement",
        },
        {
          label: "User Management",
          page: "accountList",
        },
        {
          label: "authority management",
          page: "permissionAssign",
        },
        {
          label: "Role management",
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

      const activityManagement = [
        "activityManagement",
        "activityList",
        "registrationStatistics",
      ];

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
        this.title = "front page";
        this.page = "";
      } else {
        nav.forEach((item) => {
          if (`/${item.page}` === `${path}`) {
            this.defaultActive = item.page;
            if (dataManagement.includes(item.page)) {
              this.title = "Data management";
              this.page = item.label;
            } else if (nftManagement.includes(item.page)) {
              this.title = "NFT management";
              this.page = item.label;
            } else if (platformManagement.includes(item.page)) {
              this.title = "Platform management";
              this.page = item.label;
            } else if (mallManagement.includes(item.page)) {
              this.title = "Mall management";
              this.page = item.label;
            } else if (fundingStatistics.includes(item.page)) {
              this.title = "Capital statistics";
              this.page = item.label;
            } else if (activityManagement.includes(item.page)) {
              this.title = "Activity management";
              this.page = item.label;
            } else if (walletManagement.includes(item.page)) {
              this.title = "Wallet management";
              this.page = item.label;
            } else if (systemManagement.includes(item.page)) {
              this.title = "System Management";
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
