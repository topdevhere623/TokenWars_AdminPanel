import {
  getSessionStore,
  decodeStr,
} from "@/utils";
const getters = {
  // sidebar: state => state.app.sidebar,

  accountConfig(state) {
    if (state.user.accountConfig) return state.user.accountConfig;
    const localInfo = getSessionStore("accountConfig");
    if (localInfo) return localInfo;
    return null;
  },
  coinConfig(state) {
    if (state.user.coinConfig) return state.user.coinConfig;
    const localInfo = getSessionStore("coinConfig");
    if (localInfo) return localInfo;
    return null;
  },
  /**
   * @description: 获取账户信息
   */
  getAccount(state) {
    if (state.user.account) return state.user.account;
    return null;
  },
  /**
   * @description: 获取链接状态
   */
  getConnect(state) {
    return state.user.isConnect;
  },
  /**
   * @description: 获取当前链ID
   */
  getChainId(state) {
    return state.user.chainId;
  },
}
export default getters
