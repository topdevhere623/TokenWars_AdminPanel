import config from "@/config/env";
/**
 * @description: 链配置
 */
export const chainOptions = {
  test: {
    97: {
      name: "BSC",
      chainId: "97",
      method: "wallet_addEthereumChain",
      chainParmas: {
        chainId: "0x61",
        chainName: "Binance Smart Chain Testnet",
        nativeCurrency: {
          name: "tBNB",
          symbol: "tBNB",
          decimals: 18,
        },
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        blockExplorerUrls: ["https://testnet.bscscan.com"],
      },
    },
    4: {
      name: "ETH",
      chainId: "4",
      method: "wallet_switchEthereumChain",
      chainParmas: {
        chainId: "0x4",
      },
    },
    65: {
      name: "OKEX",
      chainId: "65",
      method: "wallet_addEthereumChain",
      chainParmas: {
        chainId: "0x41",
        chainName: "OKExChain Testnet",
        nativeCurrency: {
          name: "OKT",
          symbol: "OKT",
          decimals: 18,
        },
        rpcUrls: ["https://exchaintestrpc.okex.org"],
        blockExplorerUrls: ["https://www.oklink.com/okexchain-test"],
      },
    },
  },
  main: {
    56: {
      name: "BSC",
      chainId: "56",
      method: "wallet_addEthereumChain",
      chainParmas: {
        chainId: "0x38",
        chainName: "Binance Smart Chain Mainnet",
        nativeCurrency: {
          name: "BNB",
          symbol: "BNB",
          decimals: 18,
        },
        rpcUrls: ["https://bsc-dataseed.binance.org"],
        blockExplorerUrls: ["https://bscscan.com"],
      },
    },
    1: {
      name: "ETH",
      chainId: "1",
      method: "wallet_switchEthereumChain",
      chainParmas: {
        chainId: "0x1",
      },
    },
    66: {
      name: "OKEX",
      chainId: "66",
      method: "wallet_addEthereumChain",
      chainParmas: {
        chainId: "0x42",
        chainName: "OKExChain Mainnet",
        nativeCurrency: {
          name: "OKT",
          symbol: "OKT",
          decimals: 18,
        },
        rpcUrls: ["https://exchainrpc.okex.org"],
        blockExplorerUrls: ["https://www.oklink.com/okexchain"],
      },
    },
  },
}[config.ENV == "dev" ? "test" : "main"];

export const chainList = {
  test: [
    { chainName: "Goerli", chainId: 5, type: "Test" },
    { chainName: "Ethereum", chainId: 1, type: "Main" },
  ],
  main: [{ chainName: "Ethereum", chainId: 1 }],
}[config.ENV == "dev" ? "test" : "main"];

/**
 * @description: 链列表
 */
export const chainData = {
  test: { BSC: 97, ETHEREUM: 5, OKC: 65 },
  main: { BSC: 56, ETHEREUM: 1, OKC: 66 },
}[config.ENV == "dev" ? "test" : "main"];

/**
 * @description: 链浏览器
 */
export const chainUrlList = {
  test: [
    { chainName: "Mumbai", blockExplorerUrls: "https://mumbai.polygonscan.com/" },
    { chainName: "BSC_TEST", blockExplorerUrls: "https://testnet.bscscan.com/" },
    { chainName: "OKT_TEST", blockExplorerUrls: "https://www.oklink.com/oktc-test/" },
    { chainName: "BASE", blockExplorerUrls: "https://basescan.org/" },
    { chainName: "BSC", blockExplorerUrls: "https://bscscan.com/" },
    { chainName: "OKT", blockExplorerUrls: "https://www.oklink.com/cn/oktc/" },
  ],
  main: [
    { chainName: "polygon", blockExplorerUrls: "https://polygonscan.com/" },
    { chainName: "BASE", blockExplorerUrls: "https://basescan.org/" },
    { chainName: "BSC", blockExplorerUrls: "https://bscscan.com/" },
    { chainName: "OKT", blockExplorerUrls: "https://www.oklink.com/cn/oktc/" },
    { chainName: "ThunderCore", blockExplorerUrls: "https://viewblock.io/thundercore/" },
  ],
}[config.ENV != "main" ? "test" : "main"];

/**
 * @description NFT查询
 */

export const getNftAddress = {
  test: "https://testnets-api.opensea.io/api/v1/asset_contract/",
  main: "https://api.opensea.io/api/v1/asset_contract/",
};

/**
 * @description: 代币地址
 */
export const tokenAddrList = {
  test: {
    BSC: "0xDF074b08910c38D7Cf6550a4A3fF4590080A1c33",
    ETHEREUM: "0x0000000000000000000000000000000000000000",
    OKC: "0xfA5d51aaBAf744cABEa5cF2F85Be25135c88b054",
  },
  main: {
    BSC: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    ETHEREUM: "0x0000000000000000000000000000000000000000",
    OKC: "0xef71ca2ee68f45b9ad6f72fbdb33d707b872315c",
  },
}[config.ENV == "dev" ? "test" : "main"];

/**
 * @description: 合约地址
 */
export const contractList = {
  test: {
    BSC: "0x81be4bfeE7D6c5F1374905B9E4FB37598e52E356",
    ETHEREUM: "0x00ede99e6AaDA1FA874e2c34D0294b8D23e0B869",
    OKC: "0x5B9582Eb1bb1d76079ef3f652c5aF0D5b35BB636",
  },
  main: {
    BSC: "0xEEB7B5e87249F2eA5bF8A08C36539318243Acd4e",
    ETHEREUM: "0x1dC02fAdD520e73eB2Fbb1589E3d4BE357665b81",
    OKC: "0x1dC02fAdD520e73eB2Fbb1589E3d4BE357665b81",
  },
}[config.ENV == "dev" ? "test" : "main"];

//     /**
//      * @description: 连接钱包
//      */
//     async handleWallet() {
//       if (!this.getConnect) {
//         this.walletConnect()
//           .then((event) => {
//             // 取得链
//             this.currentChainId().then((event) => {
//               this.chain = parseInt(event, 16);
//             });
//           })
//           .catch((error) => {
//             this.$message.error("请链接钱包!");
//           });
//       } else {
//         // 取得链
//         this.currentChainId().then((event) => {
//           this.chain = parseInt(event, 16);
//         });
//       }
//     },
//     /**
//  * @description: 切换链
//  * @param {object} chain: 链
//  */
//     async switchChain(type) {
//       const {
//         chainList, //链ID列表
//         linkType,
//       } = this;
//       // 取得链
//       let auditChain = chainList[linkType || "BSC"]; // 默认是BSC链
//       const { method, chainParmas } = chainOptions[auditChain];
//       if (window.ethereum) {
//         await window.ethereum
//           .request({
//             method: method,
//             params: [chainParmas],
//           })
//           .then((res, event) => {
//             // 取得链
//             this.currentChainId().then((res) => {
//               if (res == chainParmas.chainId) {
//                 this.chain = auditChain;
//                 this.$wallet.chainId = parseInt(res, 16);
//                 window.sessionStorage["chain"] = auditChain;
//                 console.log("网络切换成功,当前链:" + (linkType || "BSC"));
//                 return;
//               }
//               console.log("取消网络切换");
//             });
//           })
//           .catch((e) => {
//             console.log(e, "失败==========");
//           });
//       }
//     },
//     /**
//      * @description 创建NFT
//      */
//     async createNFT(item) {
//       const address = await this.NFTContracts.methods
//         .createERC721(
//           this.defaultAccount, //该nft的管理员
//           start,
//           end,
//           contractConfig[this.chain][item.price_link_type][item.price_unit], //定价token
//           contractConfig[this.chain].inAddress, //接收付款地址
//           maxSupply, //该nft最大发行量
//           item.title, //名称
//           item.introduction, //简称
//           baseUri //baseUri
//         )
//         .send({ from: this.defaultAccount })
//         .on("error", (error) => {
//           console.log(error, 'error-------------------')
//           errorHandler(error);
//           this.fullscreenLoading = false;
//         });

//       return address;
//     },
