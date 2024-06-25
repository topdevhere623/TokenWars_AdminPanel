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
        /** user list */
        path: "/userList",
        component: UserList,
        name: "userList",
      },
      {
        /** Platform NFT series */
        path: "/platformNftSeries",
        component: () => import("@/views/platformNftSeries/index"),
        name: "platformNftSeries",
      },
      {
        /** External NFT series */
        path: "/externalNftSeries",
        component: () => import("@/views/externalNftSeries/index"),
        name: "externalNftSeries",
      },
      {
        /** External token management */
        path: "/externalTokenManagement",
        component: () => import("@/views/externalTokenManagement/index"),
        name: "externalTokenManagement",
      },
      {
        /** External NFT management */
        path: "/externalNftManagement",
        component: () => import("@/views/externalNftManagement/index"),
        name: "externalNftManagement",
      },
      {
        /** Platform NFT management */
        path: "/platformNftManagement",
        component: () => import("@/views/platformNftManagement/index"),
        name: "platformNftManagement",
      },
      {
        /** Platform NFT management */
        path: "/userNftList",
        component: () => import("@/views/userNftList/index"),
        name: "userNftList",
      },
      {
        /** One dollar purchase management */
        path: "/nftBuyManagement",
        component: () => import("@/views/nftBuyManagement/index"),
        name: "nftBuyManagement",
      },
      {
        /** One dollar purchase ticket record */
        path: "/nftBuyRecord",
        component: () => import("@/views/nftBuyRecord/index"),
        name: "nftBuyRecord",
      },
      {
        /** War game management */
        path: "/warGameManagement",
        component: () => import("@/views/warGameManagement/index"),
        name: "warGameManagement",
      },
      {
        /** War game aggregation statistics */
        path: "/warGameBetManagement",
        component: () => import("@/views/warGameBetManagement/index"),
        name: "warGameBetManagement",
      },
      {
        /** Market management */
        path: "/marketManagement",
        component: () => import("@/views/marketManagement/index"),
        name: "marketManagement",
      },
      {
        /** Blind Box Management */
        path: "/blindBoxManagement",
        component: () => import("@/views/blindBoxManagement/index"),
        name: "blindBoxManagement",
      },
      {
        /** Blood pool management */
        path: "/bloodPoolManagement",
        component: () => import("@/views/bloodPoolManagement/index"),
        name: "bloodPoolManagement",
      },
      {
        /** Blood pool management */
        path: "/blindBoxTest",
        component: () => import("@/views/blindBoxTest/index"),
        name: "blindBoxTest",
      },
      {
        /** Gold flow management */
        path: "/cashManagement",
        component: () => import("@/views/cashManagement/index"),
        name: "cashManagement",
      },
      {
        /** Redemption code management */
        path: "/redeemCodeManagement",
        component: () => import("@/views/redeemCodeManagement/index"),
        name: "redeemCodeManagement",
      },
      {
        /** financial data */
        path: "/finance",
        component: () => import("@/views/finance/index"),
        name: "Finance",
      },
      {
        /** Recharge management */
        path: "/rechargeRecord",
        component: () => import("@/views/rechargeRecord/index"),
        name: "rechargeRecord",
      },
      {
        /** Withdrawal review */
        path: "/withdrawalReview",
        component: () => import("@/views/withdrawalReview/index"),
        name: "withdrawalReview",
      },
      {
        /** Forced audit management */
        path: "/mandatoryAudit",
        component: () => import("@/views/mandatoryAudit/index"),
        name: "mandatoryAudit",
      },
      {
        /** Events List */
        path: "/activityList",
        component: () => import("@/views/activityList/index"),
        name: "activityList",
      },
      {
        /** Activity management */
        path: "/activityManagement",
        component: () => import("@/views/activityManagement/index"),
        name: "activityManagement",
      },
      {
        /** Order management */
        path: "/orderManagement",
        component: () => import("@/views/orderManagement/index"),
        name: "orderManagement",
      },
      {
        /** Flash management */
        path: "/flashManagement",
        component: () => import("@/views/flashManagement/index"),
        name: "flashManagement",
      },
      {
        /** Invite a rebate */
        path: "/invitationRebate",
        component: () => import("@/views/invitationRebate/index"),
        name: "invitationRebate",
      },
      {
        /** Rebate */
        path: "/rebateRecord",
        component: () => import("@/views/rebateRecord/index"),
        name: "rebateRecord",
      },
      {
        /** Concentration */
        path: "/integralTurnover",
        component: () => import("@/views/integralTurnover/index"),
        name: "integralTurnover",
      },
      {
        /** System settings */
        path: "/setting",
        component: () => import("@/views/setting/index"),
        name: "setting",
      },
      {
        /** group email */
        path: "/email",
        component: () => import("@/views/email/index"),
        name: "email",
      },
      {
        /** Wallet management-recharge bag */
        path: "/walletRechargeList",
        component: () => import("@/views/walletRechargeList/index.vue"),
        name: "walletRechargeList",
      },
      {
        /** Wallet Management-Blind Box Raise Wallet */
        path: "/walletUnboxLottery",
        component: () => import("@/views/walletUnboxLottery/index"),
        name: "walletUnboxLottery",
      },
      {
        /** Wallet Management-One dollar purchase raffle wallet */
        path: "/walletOneDollarLottery",
        component: () => import("@/views/walletOneDollarLottery/index"),
        name: "walletOneDollarLottery",
      },
      {
        /** Wallet Management-ADB wallet */
        path: "/walletDrawMoney",
        component: () => import("@/views/walletDrawMoney/index"),
        name: "walletDrawMoney",
      },
      {
        /** Wallet Management-Gas Wallet */
        path: "/walletGAS",
        component: () => import("@/views/walletGAS/index"),
        name: "walletGAS",
      },
      {
        /** Wallet Management-NFT Purchase Wallet */
        path: "/walletNFTBuy",
        component: () => import("@/views/walletNFTBuy/index"),
        name: "walletNFTBuy",
      },
      {
        /** Wallet Management-Collection Wallet */
        path: "/walletCollection",
        component: () => import("@/views/walletCollection/index"),
        name: "walletCollection",
      },
      {
        /** Wallet Management-tokens Collection Statistics */
        path: "/walletCollectCoinStat",
        component: () => import("@/views/walletCollectCoinStat/index"),
        name: "walletCollectCoinStat",
      },
      {
        /** Wallet Management-NFT Collection Statistics */
        path: "/walletCollectionNFTStat",
        component: () => import("@/views/walletCollectionNFTStat/index"),
        name: "walletCollectionNFTStat",
      },
      {
        /** Wallet Management-NFT purchase statistics */
        path: "/walletNFTBuyStat",
        component: () => import("@/views/walletNFTBuyStat/index"),
        name: "walletNFTBuyStat",
      },
      {
        /** Wallet Management-GAS Statistics */
        path: "/walletGASStat",
        component: () => import("@/views/walletGASStat/index"),
        name: "walletGASStat",
      },
      {
        /** Fund Statistics -NFT transaction management */
        path: "/nftTransactionManagement",
        component: () => import("@/views/nftTransactionManagement/index"),
        name: "nftTransactionManagement",
      },
      {
        /** Fund Statistics -NFT transaction management */
        path: "/nftTransactionManagement",
        component: () => import("@/views/nftTransactionManagement/index"),
        name: "nftTransactionManagement",
      },
      {
        /** Platform Management-Robot Management */
        path: "/robotManagement",
        component: () => import("@/views/robotManagement/index"),
        name: "robotManagement",
      },
      {
        /** Platform management-draw chain management */
        path: "/lotteryChainManagement",
        component: () => import("@/views/lotteryChainManagement/index"),
        name: "lotteryChainManagement",
      },
      {
        /** Platform Management-Banner Management */
        path: "/bannerManagement",
        component: () => import("@/views/bannerManagement/index"),
        name: "bannerManagement",
      },
      {
        /** Platform management-chain chain management */
        path: "/chargeChainManagement",
        component: () => import("@/views/chargeChainManagement/index"),
        name: "chargeChainManagement",
      },
      {
        /** Platform Management-Management Coin Management */
        path: "/chargeCoinManagement",
        component: () => import("@/views/chargeCoinManagement/index"),
        name: "chargeCoinManagement",
      },
      //系Unified management
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

// Get the prototype object push function
const originalPush = VueRouter.prototype.push;

// Get the prototype object replace function
const originalReplace = VueRouter.prototype.replace;

// Modify the push function in the prototype object
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// Modify the replace function in the prototype object
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
  router.matcher = newRouter.matcher; // resetRouter
}

export default router;
