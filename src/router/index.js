import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import UserList from "@/views/userList/index";
import Home from "@/views/home/index";
import aside from "@/aside.vue";

export const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    component: aside,
    children: [
      {
        path: "",
        component: Home,
        name: "home",
      },
      {
        path: "/home",
        component: () => import("@/views/home/index"),
        name: "home",
      },
      {
        /** 用户列表 */
        path: "/userList",
        component: UserList,
        name: "userList",
      },
      {
        /** 平台NFT系列 */
        path: "/platformNftSeries",
        component: () => import("@/views/platformNftSeries/index"),
        name: "platformNftSeries",
      },
      {
        /** 外部NFT系列 */
        path: "/externalNftSeries",
        component: () => import("@/views/externalNftSeries/index"),
        name: "externalNftSeries",
      },
      {
        /** 外部代币管理 */
        path: "/externalTokenManagement",
        component: () => import("@/views/externalTokenManagement/index"),
        name: "externalTokenManagement",
      },
      {
        /** 外部NFT管理 */
        path: "/externalNftManagement",
        component: () => import("@/views/externalNftManagement/index"),
        name: "externalNftManagement",
      },
      {
        /** 平台NFT管理 */
        path: "/platformNftManagement",
        component: () => import("@/views/platformNftManagement/index"),
        name: "platformNftManagement",
      },
      {
        /** 平台NFT管理 */
        path: "/userNftList",
        component: () => import("@/views/userNftList/index"),
        name: "userNftList",
      },
      {
        /** 一元购管理 */
        path: "/nftBuyManagement",
        component: () => import("@/views/nftBuyManagement/index"),
        name: "nftBuyManagement",
      },
      {
        /** 一元购收票记录 */
        path: "/nftBuyRecord",
        component: () => import("@/views/nftBuyRecord/index"),
        name: "nftBuyRecord",
      },
      {
        /** 战争游戏管理 */
        path: "/warGameManagement",
        component: () => import("@/views/warGameManagement/index"),
        name: "warGameManagement",
      },
      {
        /** 战争游戏聚合统计 */
        path: "/warGameBetManagement",
        component: () => import("@/views/warGameBetManagement/index"),
        name: "warGameBetManagement",
      },
      {
        /** 市场管理 */
        path: "/marketManagement",
        component: () => import("@/views/marketManagement/index"),
        name: "marketManagement",
      },
      {
        /** 盲盒管理 */
        path: "/blindBoxManagement",
        component: () => import("@/views/blindBoxManagement/index"),
        name: "blindBoxManagement",
      },
      {
        /** 血池管理 */
        path: "/bloodPoolManagement",
        component: () => import("@/views/bloodPoolManagement/index"),
        name: "bloodPoolManagement",
      },
      {
        /** 血池管理 */
        path: "/blindBoxTest",
        component: () => import("@/views/blindBoxTest/index"),
        name: "blindBoxTest",
      },
      {
        /** 金流管理 */
        path: "/cashManagement",
        component: () => import("@/views/cashManagement/index"),
        name: "cashManagement",
      },
      {
        /** 兑换码管理 */
        path: "/redeemCodeManagement",
        component: () => import("@/views/redeemCodeManagement/index"),
        name: "redeemCodeManagement",
      },
      {
        /** 财务数据 */
        path: "/finance",
        component: () => import("@/views/finance/index"),
        name: "Finance",
      },
      {
        /** 充值管理 */
        path: "/rechargeRecord",
        component: () => import("@/views/rechargeRecord/index"),
        name: "rechargeRecord",
      },
      {
        /** 提现审核 */
        path: "/withdrawalReview",
        component: () => import("@/views/withdrawalReview/index"),
        name: "withdrawalReview",
      },
      {
        /** 强制审核管理 */
        path: "/mandatoryAudit",
        component: () => import("@/views/mandatoryAudit/index"),
        name: "mandatoryAudit",
      },
      {
        /** 活动列表 */
        path: "/activityList",
        component: () => import("@/views/activityList/index"),
        name: "activityList",
      },
      {
        /** 活动管理 */
        path: "/activityManagement",
        component: () => import("@/views/activityManagement/index"),
        name: "activityManagement",
      },
      {
        /** 订单管理 */
        path: "/orderManagement",
        component: () => import("@/views/orderManagement/index"),
        name: "orderManagement",
      },
      {
        /** 闪兑管理 */
        path: "/flashManagement",
        component: () => import("@/views/flashManagement/index"),
        name: "flashManagement",
      },
      {
        /** 邀请返佣 */
        path: "/invitationRebate",
        component: () => import("@/views/invitationRebate/index"),
        name: "invitationRebate",
      },
      {
        /** 返佣记录 */
        path: "/rebateRecord",
        component: () => import("@/views/rebateRecord/index"),
        name: "rebateRecord",
      },
      {
        /** 积分流水 */
        path: "/integralTurnover",
        component: () => import("@/views/integralTurnover/index"),
        name: "integralTurnover",
      },
      {
        /** 系统设置 */
        path: "/setting",
        component: () => import("@/views/setting/index"),
        name: "setting",
      },
      {
        /** 群发邮件 */
        path: "/email",
        component: () => import("@/views/email/index"),
        name: "email",
      },
      {
        /** 钱包管理-充值钱包 */
        path: "/walletRechargeList",
        component: () => import("@/views/walletRechargeList/index.vue"),
        name: "walletRechargeList",
      },
      {
        /** 钱包管理-盲盒抽奖钱包 */
        path: "/walletUnboxLottery",
        component: () => import("@/views/walletUnboxLottery/index"),
        name: "walletUnboxLottery",
      },
      {
        /** 钱包管理-一元购抽奖钱包 */
        path: "/walletOneDollarLottery",
        component: () => import("@/views/walletOneDollarLottery/index"),
        name: "walletOneDollarLottery",
      },
      {
        /** 钱包管理-提款钱包 */
        path: "/walletDrawMoney",
        component: () => import("@/views/walletDrawMoney/index"),
        name: "walletDrawMoney",
      },
      {
        /** 钱包管理-GAS钱包 */
        path: "/walletGAS",
        component: () => import("@/views/walletGAS/index"),
        name: "walletGAS",
      },
      {
        /** 钱包管理-NFT购买钱包 */
        path: "/walletNFTBuy",
        component: () => import("@/views/walletNFTBuy/index"),
        name: "walletNFTBuy",
      },
      {
        /** 钱包管理-归集钱包 */
        path: "/walletCollection",
        component: () => import("@/views/walletCollection/index"),
        name: "walletCollection",
      },
      {
        /** 钱包管理-代币归集统计 */
        path: "/walletCollectCoinStat",
        component: () => import("@/views/walletCollectCoinStat/index"),
        name: "walletCollectCoinStat",
      },
      {
        /** 钱包管理-NFT归集统计 */
        path: "/walletCollectionNFTStat",
        component: () => import("@/views/walletCollectionNFTStat/index"),
        name: "walletCollectionNFTStat",
      },
      {
        /** 钱包管理-NFT购买统计 */
        path: "/walletNFTBuyStat",
        component: () => import("@/views/walletNFTBuyStat/index"),
        name: "walletNFTBuyStat",
      },
      {
        /** 钱包管理-GAS统计 */
        path: "/walletGASStat",
        component: () => import("@/views/walletGASStat/index"),
        name: "walletGASStat",
      },
      {
        /** 资金统计-NFT 交易管理 */
        path: "/nftTransactionManagement",
        component: () => import("@/views/nftTransactionManagement/index"),
        name: "nftTransactionManagement",
      },
      {
        /** 资金统计-NFT 交易管理 */
        path: "/nftTransactionManagement",
        component: () => import("@/views/nftTransactionManagement/index"),
        name: "nftTransactionManagement",
      },
      {
        /** 平台管理-机器人管理 */
        path: "/robotManagement",
        component: () => import("@/views/robotManagement/index"),
        name: "robotManagement",
      },
      {
        /** 平台管理-抽奖链管理 */
        path: "/lotteryChainManagement",
        component: () => import("@/views/lotteryChainManagement/index"),
        name: "lotteryChainManagement",
      },
      {
        /** 平台管理-banner管理 */
        path: "/bannerManagement",
        component: () => import("@/views/bannerManagement/index"),
        name: "bannerManagement",
      },
      {
        /** 平台管理-充提链管理 */
        path: "/chargeChainManagement",
        component: () => import("@/views/chargeChainManagement/index"),
        name: "chargeChainManagement",
      },
      {
        /** 平台管理-充提币管理 */
        path: "/chargeCoinManagement",
        component: () => import("@/views/chargeCoinManagement/index"),
        name: "chargeCoinManagement",
      },
      //系统管理
      {
        path: "/accountList",
        name: "accountList",
        component: () => import("@/views/systemManage/accountList"),
      },
      {
        path: "/roleList",
        name: "roleList",
        component: () => import("@/views/systemManage/roleList"),
      },
      {
        path: "/permissionAssign",
        name: "permissionAssign",
        component: () => import("@/views/systemManage/permissionAssign"),
      },
      {
        path: "/noticeManagement",
        name: "noticeManagement",
        component: () => import("@/views/noticeManagement/index"),
      },
      {
        path: "/registrationStatistics",
        name: "registrationStatistics",
        component: () => import("@/views/registrationStatistics/index"),
      },
      {
        path: "/legalCurrencyManagement",
        name: "legalCurrencyManagement",
        component: () => import("@/views/legalCurrencyManagement/index"),
      },
    ],
  },
];

const createRouter = () =>
  new VueRouter({
    scrollBehavior(to, from, savedPosition) {
      window.scrollTo(0, 0);
      return { x: 0, y: 0 };
    },
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

const router = createRouter();

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push;

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace;

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (to.name == "login" || token) {
    next();
  } else {
    next({ name: "login" });
  }
});

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
