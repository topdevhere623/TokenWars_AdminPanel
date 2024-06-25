import Vue from "vue";
import { getToken, setToken, removeToken } from '@/utils/auth'
import { setSessionStore } from '@/utils'
import router, { resetRouter } from '@/router'
import wallet from "@/utils/global.wallet.js";
import contract from "@/utils/global.contract.js";
import { tokenAddrList, contractList } from "@/utils/chain";

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  accountConfig: '',
  coinConfig: 'USDT',

  //Wallet address
  account: null,
  //Link state
  isConnect: false,
  //Chain ID
  chainId: null,
  //Permissions bytes32
  applyRole: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ACCOUNT_CONFIG: (state, payload) => {
    state.accountConfig = payload
    setSessionStore("accountConfig", payload);
  },
  SET_COIN_CONFIG: (state, payload) => {
    state.coinConfig = payload
    setSessionStore("coinConfig", payload);
  },

  /**
   * @description: 更新钱包地址
   */
  SET_ACCOUNT(state, payload) {
    state.account = payload;
  },
  /**
   * @description: 获取当前链Id
   */
  SET_CHAIN_ID(state, payload) {
    state.chainId = payload;
  },
  /**
   * @description: 更新钱包连接状态
   */
  SET_IS_CONNECT(state, payload) {
    state.isConnect = payload;
  },
  /**
   * @description: 更新权限Bytes32
   */
  SET_APPLY_ROLE(state, payload) {
    state.applyRole = payload;
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  },
  setAccountConfig({ commit }, payload) {
    commit('SET_ACCOUNT_CONFIG', payload)
  },
  coinConfig({ commit }, payload) {
    commit('SET_COIN_CONFIG', payload)
  },

  /**
 * @description: 链接状态更新
 */
  listening({ commit }, event) {
    if (event.isc) {
      commit("SET_IS_CONNECT", true);
      commit("SET_ACCOUNT", event.account);
    } else {
      commit("SET_IS_CONNECT", false);
      commit("SET_ACCOUNT", undefined);
    }
  },
  /**
   * @description: 链接钱包
   */
  walletConnect() {
    var wallet = Vue.prototype.$wallet;
    return new Promise((resolve, reject) => {
      wallet.connect().then((success) => {
        resolve(success);
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  },
  /**
   * @description: 获取当前链
   */
  currentChainId({ commit },) {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        window.ethereum
          .request({ method: 'eth_chainId' }).then((chainId) => {
            commit("SET_CHAIN_ID", chainId);
            window.sessionStorage["chain"] = parseInt(chainId, 16);
            resolve(chainId)
          });
      } else {
        reject(false)
      }
    })
  },
  /**
   * @description: 断开钱包
   */
  disWalletConnect({ state }) {
    if (!state.isConnect) return
    var wallet = Vue.prototype.$wallet;
    wallet.close().then((success) => {
      if (!success) console.log("error");
      Vue.prototype.$contract = new contract();
    });
  },
  /**
   * @description: 授权
   */
  approve({ }, event) {
    var contract = Vue.prototype.$contract;
    return new Promise((resolve, reject) => {
      contract
        .send("IERC20")
        .action("approve", [contractList[event.chain], event.amount])
        .then((res) => {
          resolve(res)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },
  /**
   * @description: 获取授权金额
   */
  allowance({ state }, event) {
    var contract = Vue.prototype.$contract;
    return new Promise((resolve, reject) => {
      contract
        .call("IERC20")
        .action("allowance", [state.account, contractList[event]])
        .then((res) => {
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
    })
  },
  /**
   * @description: 打款
   */
  makePayment({ }, event) {
    console.log(event)
    const { walletAddr, amount, chain, amountVal } = event;
    var contract = Vue.prototype.$contract;
    return new Promise((resolve, reject) => {
      if (chain == "ETHEREUM") {
        console.log("Ethereum main chain transfer")
        // Ethereum main chain transfer
        contract
          .send("MultiSenders")
          .action("multisendEther", [walletAddr, amount], amountVal)
          .then((res) => {
            console.log(res);
            resolve(res)
          }).catch((error) => {
            console.log(error)
            reject(error)
          });
        return
      }

      console.log("Other chain token transfer")
      // 其他链代币转账
      contract
        .send("MultiSenders")
        .action("multisendERC20", [tokenAddrList[chain], walletAddr, amount])
        .then((res) => {
          console.log(res);
          resolve(res)
        }).catch((error) => {
          console.log(error)
          reject(error)
        });

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
