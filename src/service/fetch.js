import S from "../utils/service";

/**
 * @description 登录
 */
export const sysUserLogin = (obj) => S.post("sys-user/login", obj);
export const sysUserGetCode = (obj) => S.get("sys-user/getCode", obj, "blob");
/**
 * @description 角色列表
 */
export const sysRoleList = (obj) => S.get("sys-role/list", obj);

/**
 * @description 用户列表
 */
export const getUserlist = (obj) => S.get("/user/pageList", obj);
export const getUserDataTotal = (obj) => S.get("/user/headerDataTotal", obj);
export const accountFreeze = (obj) => S.get("/user/freeze", obj); // 封停
export const accountThaw = (obj) => S.get("/user/thaw", obj); // 解禁
export const importInner = (obj) => S.post("/user/importInner", obj); // 导入测试账号
export const upAndDown = (obj) => S.post("/user/upAndDown", obj); // 上下分
export const importBatchUpAndDown = (obj) => S.post("/user/importBatchUpAndDown", obj); // Excel导入测试上下分账号
export const batchUpAndDown = (obj) => S.post("/user/batch/upAndDown", obj); // 批量上下分
export const closeGoogleValidate = (obj) => S.get("/user/close/google/validate", obj); // 停止二级验证
export const userCheckAdopt = (obj) => S.get("/user/checkAdopt", obj); // 验证账号

/**
 * @description NFT系列
 */
export const getNftExternalList = (obj) => S.get("/nft-external-series/pageList", obj); // 外部nft列表
export const getNftExternalStatistics = (obj) => S.get("/nft-external-series/headerDataTotal", obj); // 外部nft统计
export const nftExternalAdd = (obj) => S.post("/nft-external-series/add", obj); // 外部nft新增
export const nftExternalUpdate = (obj) => S.post("/nft-external-series/update", obj, true); // 外部nft新增
export const nftExternalDel = (obj) => S.get("/nft-external-series/delete", obj); // 外部nft删除

export const getNftPlatformList = (obj) => S.get("/nft-platform-series/pageList", obj); // 平台nft列表
export const getNftplatformStatistics = (obj) => S.get("/nft-platform-series/headerDataTotal", obj); // 平台nft统计
export const nftPlatformAdd = (obj) => S.post("/nft-platform-series/add", obj); // 外部nft新增
export const nftPlatformUpdate = (obj) => S.post("/nft-platform-series/update", obj); // 外部nft修改
export const nftPlatformDel = (obj) => S.get("/nft-platform-series/delete", obj); // 外部nft删除

export const getNftExternalManagerList = (obj) => S.get("/nft-external-manager/pageList", obj); // 外部nft管理
export const getNftExternalManagerStatistics = (obj) => S.get("/nft-external-manager/headerDataTotal", obj); // 外部nft管理统计
export const ntExternalFreeze = (obj) => S.get("/nft-external-manager/freeze", obj); // 外部nft冻结
export const nftExternalThaw = (obj) => S.get("/nft-external-manager/thaw", obj); // 外部nft解禁
export const nftExternalFlushed = (obj) => S.get("/nft-external-manager/flushed", obj); // 外部nft刷新

export const getNftPlatformManagerList = (obj) => S.get("/nft-platform-manager/pageList", obj); // 平台nft管理
export const getNftPlatformManagerStatistics = (obj) => S.get("/nft-platform-manager/headerDataTotal", obj); // 平台nft管理统计

/**
 * @description 一元购管理
 */
export const getOneNftOrdersManagerList = (obj) => S.get("/nft/one-nft-orders/pageList", obj); // 一元购管理
export const getOneNftOrdersStatistics = (obj) => S.get("/nft/one-nft-orders/statistics", obj); // 一元购统计
export const updateOneNftOrders = (obj) => S.post("/nft/one-nft-orders/updateUpAndDown", obj); // 一元购更新
export const getOneNftLotteryOrdersManagerList = (obj) => S.get("/nft/one-nft-lottery-orders/pageList", obj); // 一元购售票记录
export const getOneNftLotteryOrdersStatistics = (obj) => S.get("/nft/one-nft-lottery-orders/statistics", obj); // 一元购售票统计

export const getServiceCharge = (obj) => S.get("/nft/one-nft-orders/getServiceCharge", obj); // 获取一元购服务费
export const updateServiceCharge = (obj) => S.get("/nft/one-nft-orders/updateServiceCharge", obj); // 设置一元购服务费

export const getTicketExceeding = (obj) => S.get("/nft/one-nft-orders/getOneEthLimitPremium", obj); // 获取一元购溢价上限
export const updateTicketExceeding = (obj) => S.get("/nft/one-nft-orders/updateOneEthLimitPremium", obj); // 设置一元购溢价上限

export const getTicketNftDays = (obj) => S.get("/nft/one-nft-orders/getOneNFTLimitDay", obj); // 获取一元购NFT天数上限
export const updateTicketNftDays = (obj) => S.get("/nft/one-nft-orders//updateOneNFTLimitDay", obj); // 设置一元购NFT天数上限

export const getTicketCoinDays = (obj) => S.get("/nft/one-nft-orders/getOneEthLimitDay", obj); // 获取一元购币种天数上限
export const updateTicketCoinDays = (obj) => S.get("/nft/one-nft-orders//updateOneEthLimitDay", obj); // 设置一元购币种天数上限

export const getUserNftList = (obj) => S.get("/nft/nft-user-data/pageList", obj); // 用户Nft列表

/**
 * @description 市场管理
 */
export const getMarketManagerList = (obj) => S.get("/market-manager/pageList", obj); // 市场管理列表
export const marketFreeze = (obj) => S.get("/market-manager/freeze", obj); // 市场冻结
export const marketThaw = (obj) => S.get("/market-manager/thaw", obj); // 市场解禁

/**
 * @description 盲盒管理
 */
export const getBoxManagerList = (obj) => S.get("/box-manager/pageList", obj); // 盲盒管理列表
export const getBoxManagerStatistics = (obj) => S.get("/box-manager/headerDataTotal", obj); // 盲盒管理统计
export const boxManagerAdd = (obj) => S.post("/box-manager/add", obj); // 盲盒新增
export const boxManagerUpdate = (obj) => S.post("/box-manager/update", obj, true); // 盲盒更新
export const boxManagerFreeze = (obj) => S.get("/box-manager/freeze", obj); // 盲盒管理冻结
export const boxManagerThaw = (obj) => S.get("/box-manager/thaw", obj); // 盲盒管理解禁
export const boxManagerDelete = (obj) => S.get("/box-manager/delete", obj); // 盲盒管理删除
export const boxManagerWinningRevision = (obj) => S.get("/box-manager/update/adjust", obj); // 盲盒中奖修正
export const boxManagerOpen = (obj) => S.get("/box-manager/open", obj); // 血池开启
export const boxManagerClose = (obj) => S.get("/box-manager/close", obj); // 血池关闭
export const calculationPlatformNft = (obj) => S.post("/box-manager/calcNft", obj); // 计算内部Nft数量

/**
 * @description 盲盒测试
 */
export const getBlindBoxTest = (obj) => S.get("/test/box", obj); // 开始测试
export const getBlindBoxFastTest = (obj) => S.get("/test/boxBack", obj); // 快速测试
export const blindBoxReset = (obj) => S.get("/test/reset", obj); // 重置

/**
 * @description 金流管理
 */
export const getAssetFlowList = (obj) => S.get("/asset-flow/pageList", obj); // 金流管理列表
export const getAssetFlowStatistics = (obj) => S.get("/asset-flow/headerDataTotal", obj); // 金流管理统计

/**
 * @description 充值管理
 */
export const getChainList = (obj) => S.get("/transfer-chain-config/pageList", obj); // 链列表
export const getCoinList = (obj) => S.get("/transfer-coin-config/pageList", obj); // 币种列表
export const getRechargeList = (obj) => S.get("/wallet-withdrawal/getAddressRechargePage", obj); // 金流管理列表
export const getRechargeStatistics = (obj) => S.get("/wallet-withdrawal/getAddressRechargeStatistics", obj); // 金流管理统计

/**
 * @description 提款审核
 */
export const getAssetWithdrawalList = (obj) => S.get("/asset-withdrawal/pageList", obj); // 提款审核列表
export const getAssetWithdrawalStatistics = (obj) => S.get("/asset-withdrawal/headerDataTotal", obj); // 提款审核统计
export const withdrawalApproved = (obj) => S.get("/asset-withdrawal/approved", obj); // 审核通过统计
export const withdrawalRefuse = (obj) => S.get("/asset-withdrawal/refuse", obj); // 审核拒绝统计
export const withdrawawSign = (obj) => S.post("/asset-withdrawal/nft/apple", obj); // 提款签名
export const withdrawawRetry = (obj) => S.get("/asset-withdrawal/retry", obj); // 提款审核重试
/**
 * @description 订单管理
 */
export const getOrderManagerList = (obj) => S.get("/order-manager/pageList", obj); // 订单管理列表
export const getOrderManagerStatistics = (obj) => S.get("/order-manager/headerDataTotal", obj); // 订单管理统计
export const getBoxLotteryList = (obj) => S.get("/box-lottery/pageList", obj); // 开奖详情

/**
 * @description 邀请返佣
 */
export const getRebatesBaseList = (obj) => S.get("/rebates-base/pageList", obj); // 邀请返佣列表
export const getRebatesBaseStatistics = (obj) => S.get("/rebates-base/headerDataTotal", obj); // 邀请返佣统计
export const getRebatesBaseDownList = (obj) => S.get("/rebates-base/down/pageList", obj); // 邀请下级列表
export const getRebatesBaseDownStatistics = (obj) => S.get("/rebates-base/down/headerDataTotal", obj); // 邀请下级统计
export const setRebateRate = (obj) => S.get("/rebates-base/set/rebateRate", obj); // 分佣比例更新

/**
 * @description 返佣记录
 */
export const getRebatesRecordList = (obj) => S.get("/rebates-record/pageList", obj); // 返佣记录列表
export const getRebatesRecordStatistics = (obj) => S.get("/rebates-record/headerDataTotal", obj); // 返佣记录统计

/**
 * @description 闪兑管理
 */
export const getFlashManagerList = (obj) => S.get("/flash-manager/pageList", obj); // 闪兑管理列表
export const getFlashManagerStatistics = (obj) => S.get("/flash-manager/headerDataTotal", obj); // 闪兑管理统计

/**
 * @description 积分流水
 */
export const getAssetPointFlowList = (obj) => S.get("/asset-point-flow/pageList", obj); // 积分流水列表
export const getAssetPointFlowStatistics = (obj) => S.get("/asset-point-flow/headerDataTotal", obj); // 积分流水统计

/**
 * @description 系统设置
 */
export const getPointConfig = (obj) => S.get("/system-setting/findPointSetting", obj); // 积分配置查询
export const pointConfigSet = (obj) => S.post("/system-setting/pointSetting", obj); // 积分配置更改
export const getWithdrawalConfig = (obj) => S.get("/system-setting/findWithdrawalSetting", obj); // 提现配置查询
export const withdrawalConfigSet = (obj) => S.post("/system-setting/withdrawalSetting", obj); // 提现配置更改
export const getRecycleConfig = (obj) => S.get("/system-setting/findReclaimSetting", obj); // NFT回收配置查询
export const recycleConfigSet = (obj) => S.post("/system-setting/reclaimSetting", obj); // NFT回收配置更改
export const getSystemWalletList = (obj) => S.get("/system-wallet/pageList", obj); // 归集钱包列表
export const systemWalletActive = (obj) => S.get("/system-wallet/activate", obj); // 归集钱包激活
export const systemWalletAdd = (obj) => S.post("/system-wallet/add", obj); // 归集钱包新增
export const systemWalletDel = (obj) => S.get("/system-wallet/delete", obj); // 归集钱包删除
export const getInviteSetting = (obj) => S.get("/system-setting/findBaseSetting", obj); // 邀请文本查询
export const inviteSet = (obj) => S.post("/system-setting/baseSetting", obj); // 邀请文本设置

export const setWarGameSetting = (obj) => S.post("/system-setting/warGameSetting", obj); // 邀请文本设置
export const getWarGameSetting = (obj) => S.get("/system-setting/findWarGameSetting", obj); // 邀请文本设置

export const findActivityGameSetting = (obj) => S.get("/system-setting/findActivityGameSetting", obj); // 游戏活动流水比例设置查询
export const setActivityGameSetting = (obj) => S.post("/system-setting/activityGameSetting", obj); // 游戏活动流水比例设置
/**
 * @description 群发邮件
 */
export const getSendEmailList = (obj) => S.get("/send-email-content/emailList", obj); // 邮箱列表
export const getSendEmailPageList = (obj) => S.get("/send-email-content/pageList", obj); // 分页查询发送列表
export const getSendEmailUserList = (obj) => S.get("/send-email-content/userList", obj); // 发送邮件用户验证,用户id存在的会返回用户详细
export const sendEmailSave = (obj) => S.post("/send-email-content/save", obj); // 发送邮件
export const getSendEmailUserTotal = (obj) => S.get("/send-email-content/getUserTotal", obj); // 获取用户总量
export const sendEmailDel = (obj) => S.get("/send-email-content/del", obj); // 删除
export const sendEmailCancel = (obj) => S.get("/send-email-content/isCancel", obj); // 取消
export const getSendMailUser = (obj) => S.get("/send-email-content/getSendMailUser", obj); // 查看发送邮箱用户

/**
 * @description 钱包管理-充值钱包
 */
export const getWalletRechargeList = (obj) => S.get("/wallet-recharge/pageList", obj); // 充值钱包分页查询
export const getWalletRechargeStatistics = (obj) => S.get("/wallet-recharge/headerDataTotal", obj); // 充值钱包统计数据

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
export const getWarGameList = (obj) => S.get("/token-war-base/pageList", obj); // 战争游戏管理
export const getWarGameStatistics = (obj) => S.get("/token-war-base/headerDataTotal", obj); // 战争游戏聚合统计
export const getWarGameTicketSalesList = (obj) => S.get("/token-war-detail/pageList", obj); // 战争游戏售票管理
export const getWarGameTicketSalesStatistics = (obj) => S.get("/token-war-detail/headerDataTotal", obj); // 战争游戏售票聚合统计
export const getWarGameParticipant = (obj) => S.get("/token-war-detail/findList", obj); // 参与者信息

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
export const getAnnouncementList = (obj) => S.get("/announcement/announcementList", obj); // 公告列表
export const getAnnouncementInfo = (obj) => S.get("/announcement/queryAnnouncement", obj); // 查询公告详情
export const saveAnnouncement = (obj) => S.post("/announcement/saveAnnouncement", obj, true); // 保存公告
export const updateAnnouncement = (obj) => S.post("/announcement/updateAnnouncement", obj, true); // 修改公告
export const deleteAnnouncement = (obj) => S.get("/announcement/deleteAnnouncement", obj); // 删除公告
export const setIsForcedSwitch = (obj) => S.get("/announcement/isForcedSwitch", obj); // 是否强提醒
export const setIsImportantSwitch = (obj) => S.get("/announcement/isImportantSwitch", obj); // 是否是重要公告

/**
 * @description 法币管理
 */
export const getLegalPageList = (obj) => S.get("/legal-currency-recharge/pageList", obj); //法币通道管理列表
export const setLegalupdateStatus = (obj) => S.get("/legal-currency-recharge/updateStatus", obj); //第三方充值启用停用

/**
 * @description 兑换码管理
 */
export const getRedeemPageList = (obj) => S.get("/redeem-code-info/pageList", obj); //兑换码管理列表
export const getRedeemHeaderDataTotal = (obj) => S.get("/redeem-code-info/headerDataTotal", obj); //兑换码列表数据统计
export const redeemHeaderAdd = (obj) => S.post("/redeem-code-info/add", obj); //创建兑换码
export const redeemBatchInvalidation = (obj) => S.get("redeem-code-info/batchInvalidation", obj); //批量失效
export const redeeminvalid = (obj) => S.get("/redeem-code-info/invalid", obj); // 单个失效
export const getFindRedeemTextSetting = (obj) => S.get("system-setting/findRedeemTextSetting", obj); // 获取渠道配置
export const setRedeemTextSetting = (obj) => S.post("system-setting/redeemTextSetting", obj); // 配置渠道

/**
 * @description 注册送金统计
 */
export const getBounsPageList = (obj) => S.get("/bouns/pageList", obj); //注册送金列表
export const getBounsHeaderDataTotal = (obj) => S.get("/bouns/headerDataTotal", obj); //注册送金数据统计
