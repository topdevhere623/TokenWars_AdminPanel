import S from "../utils/service";

/**
 * @description Log in
 */
export const sysUserLogin = (obj) => S.post("sys-user/login", obj);
export const sysUserGetCode = (obj) => S.get("sys-user/getCode", obj, "blob");
/**
 * @description Corner list
 */
export const sysRoleList = (obj) => S.get("sys-role/list", obj);

/**
 * @description user list
 */
export const getUserlist = (obj) => S.get("/user/pageList", obj);
export const getUserDataTotal = (obj) => S.get("/user/headerDataTotal", obj);
export const accountFreeze = (obj) => S.get("/user/freeze", obj); //
export const accountThaw = (obj) => S.get("/user/thaw", obj); //Lifting
export const importInner = (obj) => S.post("/user/importInner", obj); //ImportTestAccount
export const upAndDown = (obj) => S.post("/user/upAndDown", obj); //UpAndLowerPart
export const importBatchUpAndDown = (obj) => S.post("/user/importBatchUpAndDown", obj); //ExcelImportTestTopDownAccountNumber
export const batchUpAndDown = (obj) => S.post("/user/batch/upAndDown", obj); //BatchUpAndDownPoints
export const closeGoogleValidate = (obj) => S.get("/user/close/google/validate", obj); //StopTheSecondaryVerification
export const userCheckAdopt = (obj) => S.get("/user/checkAdopt", obj); //VerifyAccount

/**
 * @description NFT系列
 */
export const getNftExternalList = (obj) => S.get("/nft-external-series/pageList", obj); //OuterNftList
export const getNftExternalStatistics = (obj) => S.get("/nft-external-series/headerDataTotal", obj); //ExternalNftStatistics
export const nftExternalAdd = (obj) => S.post("/nft-external-series/add", obj); //ExternalNftNewIncrease
export const nftExternalUpdate = (obj) => S.post("/nft-external-series/update", obj, true); //ExternalNftNewIncrease
export const nftExternalDel = (obj) => S.get("/nft-external-series/delete", obj); //ExternalNftDelete

export const getNftPlatformList = (obj) => S.get("/nft-platform-series/pageList", obj); //PlatformNftList
export const getNftplatformStatistics = (obj) => S.get("/nft-platform-series/headerDataTotal", obj); //PlatformNftStatistics
export const nftPlatformAdd = (obj) => S.post("/nft-platform-series/add", obj); //ExternalNftNewIncrease
export const nftPlatformUpdate = (obj) => S.post("/nft-platform-series/update", obj); //ExternalNftModification
export const nftPlatformDel = (obj) => S.get("/nft-platform-series/delete", obj); //ExternalNftDelete

export const getNftExternalManagerList = (obj) => S.get("/nft-external-manager/pageList", obj); //ExternalNftManagement
export const getNftExternalManagerStatistics = (obj) => S.get("/nft-external-manager/headerDataTotal", obj); //ExternalNftManagementStatistics
export const ntExternalFreeze = (obj) => S.get("/nft-external-manager/freeze", obj); //ExternalNftFrozen
export const nftExternalThaw = (obj) => S.get("/nft-external-manager/thaw", obj); //OuterNftLiftedTheBan
export const nftExternalFlushed = (obj) => S.get("/nft-external-manager/flushed", obj); //ExternalNftRefresh

export const getNftPlatformManagerList = (obj) => S.get("/nft-platform-manager/pageList", obj); //PlatformNftManagement
export const getNftPlatformManagerStatistics = (obj) => S.get("/nft-platform-manager/headerDataTotal", obj); //PlatformNftManagementStatistics

/**
 * @description 一元购管理
 */
export const getOneNftOrdersManagerList = (obj) => S.get("/nft/one-nft-orders/pageList", obj); //OneDollarPurchaseManagement
export const getOneNftOrdersStatistics = (obj) => S.get("/nft/one-nft-orders/statistics", obj); //OneYuanPurchaseStatistics
export const updateOneNftOrders = (obj) => S.post("/nft/one-nft-orders/updateUpAndDown", obj); //OneYuanPurchaseUpdate
export const getOneNftLotteryOrdersManagerList = (obj) => S.get("/nft/one-nft-lottery-orders/pageList", obj); //OneDollarPurchaseTicketRecord
export const getOneNftLotteryOrdersStatistics = (obj) => S.get("/nft/one-nft-lottery-orders/statistics", obj); //OneDollarPurchaseTicketStatistics

export const getServiceCharge = (obj) => S.get("/nft/one-nft-orders/getServiceCharge", obj); //GetAOneDollarServiceFee
export const updateServiceCharge = (obj) => S.get("/nft/one-nft-orders/updateServiceCharge", obj); //SetAOneDollarPurchaseServiceFee

export const getTicketExceeding = (obj) => S.get("/nft/one-nft-orders/getOneEthLimitPremium", obj); //GetTheUpperLimitOfAOneDollarPurchasePremium
export const updateTicketExceeding = (obj) => S.get("/nft/one-nft-orders/updateOneEthLimitPremium", obj); //SetAOneDollarPurchasePremiumLimit

export const getTicketNftDays = (obj) => S.get("/nft/one-nft-orders/getOneNFTLimitDay", obj); //GetOneYuanToBuyNftDaysUpperLimit
export const updateTicketNftDays = (obj) => S.get("/nft/one-nft-orders//Updateonenftlimitday ",Obj); //SetUpOneYuanToBuyNftDaysUpperLimit

export const getTicketCoinDays = (obj) => S.get("/nft/one-nft-orders/getOneEthLimitDay", obj); //GetTheUpperLimitOfTheNumberOfDaysOfOneDollarPurchase
export const updateTicketCoinDays = (obj) => S.get("/nft/one-nft-orders//UpdateOneethitday ",Obj); //SetUpTheUpperLimitOfTheNumberOfDaysOfOneDollarPurchase

export const getUserNftList = (obj) => S.get("/nft/nft-user-data/pageList", obj); //UserNftList

/**
 * @description 市场管理
 */
export const getMarketManagerList = (obj) => S.get("/market-manager/pageList", obj); //MarketManagementList
export const marketFreeze = (obj) => S.get("/market-manager/freeze", obj); //MarketFrozen
export const marketThaw = (obj) => S.get("/market-manager/thaw", obj); //MarketLifting

/**
 * @description 盲盒管理
 */
export const getBoxManagerList = (obj) => S.get("/box-manager/pageList", obj); //BlindBoxManagementList
export const getBoxManagerStatistics = (obj) => S.get("/box-manager/headerDataTotal", obj); //BlindBoxManagementStatistics
export const boxManagerAdd = (obj) => S.post("/box-manager/add", obj); //BlindBoxNewlyAdded
export const boxManagerUpdate = (obj) => S.post("/box-manager/update", obj, true); //BlindBoxUpdate
export const boxManagerFreeze = (obj) => S.get("/box-manager/freeze", obj); //BlindBoxManagementFrozen
export const boxManagerThaw = (obj) => S.get("/box-manager/thaw", obj); //BlindBoxManagementSolution
export const boxManagerDelete = (obj) => S.get("/box-manager/delete", obj); //BlindBoxManagementDelete
export const boxManagerWinningRevision = (obj) => S.get("/box-manager/update/adjust", obj); //BlindBoxWinningCorrection
export const boxManagerOpen = (obj) => S.get("/box-manager/open", obj); //BloodPoolOpening
export const boxManagerClose = (obj) => S.get("/box-manager/close", obj); //BloodPoolClosed
export const calculationPlatformNft = (obj) => S.post("/box-manager/calcNft", obj); //CalculateTheNumberOfInternalNft

/**
 * @description 盲盒测试
 */
export const getBlindBoxTest = (obj) => S.get("/test/box", obj); //StartTesting
export const getBlindBoxFastTest = (obj) => S.get("/test/boxBack", obj); //QuickTest
export const blindBoxReset = (obj) => S.get("/test/reset", obj); //Reset

/**
 * @description 金流管理
 */
export const getAssetFlowList = (obj) => S.get("/asset-flow/pageList", obj); //GoldStreamManagementList
export const getAssetFlowStatistics = (obj) => S.get("/asset-flow/headerDataTotal", obj); //GoldStreamManagementStatistics

/**
 * @description 充值管理
 */
export const getChainList = (obj) => S.get("/transfer-chain-config/pageList", obj); //ChainList
export const getCoinList = (obj) => S.get("/transfer-coin-config/pageList", obj); //CurrencyList
export const getRechargeList = (obj) => S.get("/wallet-withdrawal/getAddressRechargePage", obj); //GoldStreamManagementList
export const getRechargeStatistics = (obj) => S.get("/wallet-withdrawal/getAddressRechargeStatistics", obj); //GoldStreamManagementStatistics

/**
 * @description 提款审核
 */
export const getAssetWithdrawalList = (obj) => S.get("/asset-withdrawal/pageList", obj); //AdWithdrawalReviewList
export const getAssetWithdrawalStatistics = (obj) => S.get("/asset-withdrawal/headerDataTotal", obj); //AdReviewStatistics
export const withdrawalApproved = (obj) => S.get("/asset-withdrawal/approved", obj); //ReviewAndPassStatistics
export const withdrawalRefuse = (obj) => S.get("/asset-withdrawal/refuse", obj); //ReviewRejectionStatistics
export const withdrawawSign = (obj) => S.post("/asset-withdrawal/nft/apple", obj); //AWithdrawalSignature
export const withdrawawRetry = (obj) => S.get("/asset-withdrawal/retry", obj); //AWithdrawalReviewAndReExamination
/**
 * @description 订单管理
 */
export const getOrderManagerList = (obj) => S.get("/order-manager/pageList", obj); //OrderManagementList
export const getOrderManagerStatistics = (obj) => S.get("/order-manager/headerDataTotal", obj); //OrderManagementStatistics
export const getBoxLotteryList = (obj) => S.get("/box-lottery/pageList", obj); //DetailsDetails

/**
 * @description 邀请返佣
 */
export const getRebatesBaseList = (obj) => S.get("/rebates-base/pageList", obj); //InviteTheListOfCommissionReturns
export const getRebatesBaseStatistics = (obj) => S.get("/rebates-base/headerDataTotal", obj); //InviteToReturnCommissionStatistics
export const getRebatesBaseDownList = (obj) => S.get("/rebates-base/down/pageList", obj); //InviteLowerLevelLists
export const getRebatesBaseDownStatistics = (obj) => S.get("/rebates-base/down/headerDataTotal", obj); //InviteLowerLevelStatistics
export const setRebateRate = (obj) => S.get("/rebates-base/set/rebateRate", obj); //RefugeeProportionUpdate

/**
 * @description 返佣记录
 */
export const getRebatesRecordList = (obj) => S.get("/rebates-record/pageList", obj); //ReturnToRecordList
export const getRebatesRecordStatistics = (obj) => S.get("/rebates-record/headerDataTotal", obj); //RebateRecordStatistics

/**
 * @description 闪兑管理
 */
export const getFlashManagerList = (obj) => S.get("/flash-manager/pageList", obj); //FlashManagementList
export const getFlashManagerStatistics = (obj) => S.get("/flash-manager/headerDataTotal", obj); //FlashingManagementStatistics

/**
 * @description 积分流水
 */
export const getAssetPointFlowList = (obj) => S.get("/asset-point-flow/pageList", obj); //FocusFlowWaterList
export const getAssetPointFlowStatistics = (obj) => S.get("/asset-point-flow/headerDataTotal", obj); //ConflictFlowStatistics

/**
 * @description 系统设置
 */
export const getPointConfig = (obj) => S.get("/system-setting/findPointSetting", obj); //PointConfigurationQuery
export const pointConfigSet = (obj) => S.post("/system-setting/pointSetting", obj); //PointConfigurationChanges
export const getWithdrawalConfig = (obj) => S.get("/system-setting/findWithdrawalSetting", obj); //RequestConfigurationQuery
export const withdrawalConfigSet = (obj) => S.post("/system-setting/withdrawalSetting", obj); //RequestConfigurationChanges
export const getRecycleConfig = (obj) => S.get("/system-setting/findReclaimSetting", obj); //NftRecyclingConfigurationQuery
export const recycleConfigSet = (obj) => S.post("/system-setting/reclaimSetting", obj); //NftRecyclingConfigurationChanges
export const getSystemWalletList = (obj) => S.get("/system-wallet/pageList", obj); //CollectWalletList
export const systemWalletActive = (obj) => S.get("/system-wallet/activate", obj); //CollectWalletActivation
export const systemWalletAdd = (obj) => S.post("/system-wallet/add", obj); //CollectNewWalletsNew
export const systemWalletDel = (obj) => S.get("/system-wallet/delete", obj); //CollectWalletDelete
export const getInviteSetting = (obj) => S.get("/system-setting/findBaseSetting", obj); //InviteTextQuery
export const inviteSet = (obj) => S.post("/system-setting/baseSetting", obj); //InviteTextSettings

export const setWarGameSetting = (obj) => S.post("/system-setting/warGameSetting", obj); //InviteTextSettings
export const getWarGameSetting = (obj) => S.get("/system-setting/findWarGameSetting", obj); //InviteTextSettings

export const findActivityGameSetting = (obj) => S.get("/system-setting/findActivityGameSetting", obj); //GamingActivityFlowRatioSettingQuery
export const setActivityGameSetting = (obj) => S.post("/system-setting/activityGameSetting", obj); //GamingActivityRunningWaterRatioSettings
/**
 * @description 群发邮件
 */
export const getSendEmailList = (obj) => S.get("/send-email-content/emailList", obj); //MailboxList
export const getSendEmailPageList = (obj) => S.get("/send-email-content/pageList", obj); //PaglingQuerySendingList
export const getSendEmailUserList = (obj) => S.get("/send-email-content/userList", obj); //SendMailUserVerification,TheUserIdWillReturnToTheUserForDetails
export const sendEmailSave = (obj) => S.post("/send-email-content/save", obj); //SendEmail
export const getSendEmailUserTotal = (obj) => S.get("/send-email-content/getUserTotal", obj); //GetTheTotalUserQuantity
export const sendEmailDel = (obj) => S.get("/send-email-content/del", obj); //Delete
export const sendEmailCancel = (obj) => S.get("/send-email-content/isCancel", obj); //Cancel
export const getSendMailUser = (obj) => S.get("/send-email-content/getSendMailUser", obj); //ViewSendEmailUsers

/**
 * @description 钱包管理-充值钱包
 */
export const getWalletRechargeList = (obj) => S.get("/wallet-recharge/pageList", obj); //EquactEnvelopes
export const getWalletRechargeStatistics = (obj) => S.get("/wallet-recharge/headerDataTotal", obj); //EquactBagStatistics

/**
 * @description 钱包管理-盲盒抽奖钱包
 */
export const getWalleBoxLotteryList = (obj) => S.get("/wallet-box-lottery/pageList", obj);
export const getWalletBoxLotteryStatistics = (obj) => S.get("/wallet-box-lottery/headerDataTotal", obj);

/**
 * @description 钱包管理-一元购抽奖钱包
 */
export const getWalleOneDallarLotteryList = (obj) => S.get("/wallet-one-dollar/pageList", obj);

/**
 * @description 钱包管理-出账钱包
 */
export const getWalleWithdrawalList = (obj) => S.get("/wallet-withdrawal/findList", obj);

/**
 * @description 钱包管理-GAS钱包
 */
export const getWalleGasList = (obj) => S.get("/wallet-gas/findList", obj);

/**
 * @description 钱包管理-NFT购买
 */
export const getWalleBuyNftList = (obj) => S.get("/wallet-buy-nft/findList", obj);

/**
 * @description 资金统计-NFT 交易管理
 */
export const getNftFlowPageList = (obj) => S.get("/nft-flow/pageList", obj);

/**
 * @description 机器人
 */
export const getBoxBotPageList = (obj) => S.get("/box-bot/pageList", obj);
export const boxBotOpen = (obj) => S.get("/box-bot/open", obj);
export const boxBotClose = (obj) => S.get("/box-bot/close", obj);
export const boxBotUpdate = (obj) => S.post("/box-bot/add", obj);
export const boxBotHeaderDataTotal = (obj) => S.get("/box-bot/headerDataTotal", obj);
export const boxBotUpAndDown = (obj) => S.get("/box-bot/upAndDown", obj);
export const boxBotUpdatePassword = (obj) => S.post("/box-bot/batch/updatePassword", obj);
export const getTokenWarPageList = (obj) => S.get("/token-war-bot/findOne", obj);
export const tokenWarConfig = (obj) => S.post("/token-war-bot/config", obj);

/**
 * @description 外部代币管理
 */
export const externalCoinPageList = (obj) => S.get("/coin-external-series/pageList", obj);
export const externalCoinAdd = (obj) => S.post("/coin-external-series/add", obj);
export const externalCoinRefresh = (obj) => S.get("/coin-external-series/refresh", obj);
export const externalCoinDelete = (obj) => S.get("/coin-external-series/delete", obj);

/**
 * @description 抽奖链管理
 */
export const lotteryChainPageList = (obj) => S.get("/lottery-chain/pageList", obj);
export const lotteryChainUpdateStatus = (obj) => S.get("/lottery-chain/updateStatus", obj);
export const lotteryChainGetIsBreak = (obj) => S.get("/lottery-chain/getIsBreak", obj);
export const lotteryChainIsBreak = (obj) => S.get("/lottery-chain/setIsBreak", obj);

/**
 * @description 强制审核管理
 */
export const mandatoryReviewPageList = (obj) => S.get("/mandatory-review/pageList", obj);
export const mandatoryReviewAdd = (obj) => S.post("/mandatory-review/add", obj);
export const mandatoryReviewRemove = (obj) => S.get("/mandatory-review/remove", obj);
export const mandatoryReviwUpdate = (obj) => S.get("/mandatory-review/update", obj);
export const mandatoryReviwTransferTestAccount = (obj) => S.get("/mandatory-review/transferTestAccount", obj);
export const mandatoryReviwHeaderDataTotal = (obj) => S.get("/mandatory-review/headerDataTotal", obj);
export const mandatoryReviwUpdatePassword = (obj) => S.post("/mandatory-review/updatePassword", obj);

/**
 * @description 活动管理
 */
export const activityManagerPageList = (obj) => S.get("/activity-manager/pageList", obj);
export const activityHeaderDataTotal = (obj) => S.get("/activity-manager/headerDataTotal", obj);
export const activityManagerAdd = (obj) => S.post("/activity-manager/add", obj);
export const activityManagerUpdate = (obj) => S.post("/activity-manager/update", obj);
export const activityManagerAdvanceStart = (obj) => S.get("/activity-manager/advanceStart", obj);
export const activityManagerAdvanceEnd = (obj) => S.get("/activity-manager/advanceEnd", obj);
export const activityManagerDetailPageList = (obj) => S.get("/activity-manager/detail/pageList", obj);
export const activityManagerDetailHeaderDataTotal = (obj) => S.get("/activity-manager/detail/headerDataTotal", obj);
export const activityManagerRemove = (obj) => S.get("/activity-manager/remove", obj);

/**
 * @description 活动列表
 */
export const activityFindList = (obj) => S.get("/activity/findList", obj);

/**
 * @description banner
 */
export const bannerAdd = (obj) => S.post("/banner-data/add", obj);
export const bannerUpdate = (obj) => S.post("/banner-data/update", obj, true);
export const bannerList = (obj) => S.get("/banner-data/pageList", obj);
export const bannerDelete = (obj) => S.get("/banner-data/delete", obj);

/**
 * @description 充提链/币
 */
export const transferChainPageList = (obj) => S.get("/transfer-chain-config/pageList", obj);
export const transferChainUpdate = (obj) => S.post("/transfer-chain-config/update", obj);
export const transferCoinPageList = (obj) => S.get("/transfer-coin-config/pageList", obj);
export const transferCoinUpdate = (obj) => S.post("/transfer-coin-config/updateInfo", obj);
export const transferCoinPageInfo = (obj) => S.get("/transfer-coin-config/pageInfo", obj);
export const transferCoinModifyState = (obj) => S.post("/transfer-coin-config/modifyState", obj);

/**
 * @description 权限
 */
export const userList = (obj) => S.get("/sys-user/list", obj);
export const userDelete = (obj) => S.get("/sys-user/delete", obj);
export const userAdd = (obj) => S.post("/sys-user/add", obj);
export const userEdit = (obj) => S.post("/sys-user/update", obj);
export const roleList = (obj) => S.get("/sys-role/list", obj);
export const roleAdd = (obj) => S.post("/sys-role/add", obj);
export const roleUpdate = (obj) => S.post("/sys-role/update", obj);
export const roleDown = (obj) => S.get("/sys-role/downBox", obj);
export const menuList = (obj) => S.get("/sys-menu/treeList", obj);
export const addMenu = (obj) => S.post("/sys-menu/add", obj);
export const deleteMenu = (obj) => S.get("/sys-menu/delete", obj);
export const updateMenu = (obj) => S.post("/sys-menu/update", obj, true);
export const roleAuth = (obj) => S.post("/sys-role/addRoleMenuCorr", obj);
export const getMenuList = (obj) => S.get("/sys-menu/tree", obj);

/**
 * @description 战争游戏管理
 */
export const getWarGameList = (obj) => S.get("/token-war-base/pageList", obj); //WarGameManagement
export const getWarGameStatistics = (obj) => S.get("/token-war-base/headerDataTotal", obj); //WarGameAggregationStatistics
export const getWarGameTicketSalesList = (obj) => S.get("/token-war-detail/pageList", obj); //WarGameTicketManagement
export const getWarGameTicketSalesStatistics = (obj) => S.get("/token-war-detail/headerDataTotal", obj); //WarGameTicketAggregationStatistics
export const getWarGameParticipant = (obj) => S.get("/token-war-detail/findList", obj); //ParticipantsInformation

/**
 * @description 首页
 */
export const getHomeTodaysData = (obj) => S.get("/home-statistics/todaysData", obj, "", true); //今日数据
export const getHomeCashFlowDetection = (obj) => S.get("/home-statistics/cashFlowDetection", obj, "", true); //金流检测曲线图
export const getHomeDataChart = (obj) => S.get("/home-statistics/dataChart", obj, "", true); //数据图表
export const getHomeRetainedData = (obj) => S.get("/home-statistics/retainedData", obj, "", true); //留存数据
export const getHomeRegisteredUserChart = (obj) => S.get("/home-statistics/registeredUserChart", obj, "", true); //注册用户图表
export const getHomeOrderChart = (obj) => S.get("/home-statistics/orderChart", obj, "", true); //订单统计图表
export const getHomeRegionChart = (obj) => S.get("/home-statistics/regionChart", obj, "", true); //地区图表
export const getHomeBoxRanking = (obj) => S.get("/home-statistics/boxRanking", obj, "", true); //盲盒排行榜
export const getHomeOneNftRanking = (obj) => S.get("/home-statistics/oneNftRanking", obj, "", true); //竞赛排行榜
export const getHomeUserRegionStatisticsChart = (obj) => S.get("/home-statistics/userRegionStatisticsChart", obj, "", true); //用户地区统计图表

/**
 * @description 公告管理
 */
export const getAnnouncementList = (obj) => S.get("/announcement/announcementList", obj); //AnnouncementList
export const getAnnouncementInfo = (obj) => S.get("/announcement/queryAnnouncement", obj); //QueryAnnouncementDetails
export const saveAnnouncement = (obj) => S.post("/announcement/saveAnnouncement", obj, true); //SaveAnnouncement
export const updateAnnouncement = (obj) => S.post("/announcement/updateAnnouncement", obj, true); //ModifyTheAnnouncement
export const deleteAnnouncement = (obj) => S.get("/announcement/deleteAnnouncement", obj); //DeleteTheAnnouncement
export const setIsForcedSwitch = (obj) => S.get("/announcement/isForcedSwitch", obj); //WhetherToRemindYou
export const setIsImportantSwitch = (obj) => S.get("/announcement/isImportantSwitch", obj); //WhetherItIsAnImportantAnnouncement

/**
 * @description Fiat currency management
 */
export const getLegalPageList = (obj) => S.get("/legal-currency-recharge/pageList", obj); //List of farewell channel management list
export const setLegalupdateStatus = (obj) => S.get("/legal-currency-recharge/updateStatus", obj); //Third -party rechargeable enabled and stopped

/**
 * @description Redemption code management
 */
export const getRedeemPageList = (obj) => S.get("/redeem-code-info/pageList", obj); //Redemption code management list
export const getRedeemHeaderDataTotal = (obj) => S.get("/redeem-code-info/headerDataTotal", obj); //Data statistics of the redemption code list
export const redeemHeaderAdd = (obj) => S.post("/redeem-code-info/add", obj); //Create the exchange code
export const redeemBatchInvalidation = (obj) => S.get("redeem-code-info/batchInvalidation", obj); //Failure
export const redeeminvalid = (obj) => S.get("/redeem-code-info/invalid", obj); //ASingleFailure
export const getFindRedeemTextSetting = (obj) => S.get("system-setting/findRedeemTextSetting", obj); //GetChannelConfiguration
export const setRedeemTextSetting = (obj) => S.post("system-setting/redeemTextSetting", obj); //ConfigurationChannel

/**
 * @description Register to send gold statistics
 */
export const getBounsPageList = (obj) => S.get("/bouns/pageList", obj); //Register to send gold list
export const getBounsHeaderDataTotal = (obj) => S.get("/bouns/headerDataTotal", obj); //Statistics of registering money
