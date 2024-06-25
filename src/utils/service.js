import config from "@/config/env";
import axios from "axios";
import qs from "qs";
import { Message, Loading } from "element-ui";
import i18n from "../lang";
import cn from "../lang/zh";
import FileSaver from "file-saver";
import router from "@/router";

// api 请求计数器
let apiNumber = 0;
// 禁用加载动画
const disabledLoading = [];
// 加载动画WW
function loading() {
  return Loading.service({
    lock: true,
    text: i18n.t("public.loading"),
    fullscreen: true,
    spinner: "el-icon-loading",
    background: "rgba(0,0,0,0.7)",
  });
}
// 关闭加载动画
function closeLoading(error) {
  const { config } = error;
  if (config) {
    if (!disabledLoading.includes(config.url)) {
      apiNumber -= 1;
    }
  } else {
    apiNumber -= 1;
  }
  if (apiNumber === 0 && config && !disabledLoading.includes(config.url)) {
    loading().close();
  }
}
function messageFun(data) {
  if (data) {
    let errorText = cn.error[data.messageKey];
    if (errorText) {
      errorText = i18n.t(`error.${data.messageKey}`);
    } else {
      errorText = data.message;
    }
    Message.error(errorText);
  } else {
    Message.error(i18n.t("error.system_busy"));
  }
}
// 直接返回数据
const returnData = ["sys-user/getCode"];
// 需要返回 localDateTime
const localDateTimeArr = ["user-miner/page", "/nft/one-nft-orders/pageList"];

let baseUrl = config.api;
let axiosConfig = {
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    project: "Web3 OS", //项目标识
  },
  timeout: 300000,
};
var instance = axios.create(axiosConfig);
var service = {
  //  与服务器进行post交互
  async post(api, sendData, emptyNoFilter) {
    if (!disabledLoading.includes(api)) {
      apiNumber += 1;
      loading();
    }
    let verify = sessionStorage.getItem("verify");
    let token = sessionStorage.getItem("token");

    if (verify) {
      instance.defaults.headers["verify"] = verify;
    }
    if (token) {
      instance.defaults.headers["certificate"] = token;
    }

    sendData = sendData || {};
    if (!emptyNoFilter) {
      for (var key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          var element = sendData[key];
          if (element === "") {
            delete sendData[key];
          }
        }
      }
    }
    let promise = new Promise(function (resolve, reject) {
      instance
        .post(api, sendData)
        .then((response) => {
          if (!disabledLoading.includes(api)) {
            apiNumber -= 1;
          }
          if (apiNumber === 0 && !disabledLoading.includes(api)) {
            loading().close();
          }
          if (response && response.status === 200) {
            if (response.headers.certificate) {
              sessionStorage.setItem("token", response.headers.certificate);
            }
            let data = response.data;
            if (Number(data.code) === 200) {
              resolve(data.data || true);
            } else if (Number(data.code) === 401) {
              messageFun(data);
              sessionStorage.removeItem("token");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              messageFun(data);
              if (data.messageKey === "certificate_invalidation" || data.messageKey === "certificate_error") {
                apiNumber = 0;
                sessionStorage.clear();
                router.push("/login");
              }
              resolve(false);
            }
          } else if (!response) {
            Message.error("请求超时，请稍后再试.");
            resolve(false);
          } else {
            Message.error("请求失败");
            resolve(false);
          }
        })
        .catch((error) => {
          closeLoading(error);
          console.log("error:", error);
          resolve(false);
        });
    });
    return promise;
  },
  async get(api, sendData, responseType = "", emptyNoFilter = false) {
    if (!disabledLoading.includes(api)) {
      apiNumber += 1;
      loading();
    }
    let verify = sessionStorage.getItem("verify");
    let token = sessionStorage.getItem("token");

    if (verify) {
      instance.defaults.headers["verify"] = verify;
    }
    if (token) {
      instance.defaults.headers["certificate"] = token;
    }
    sendData = sendData || {};
    if (!emptyNoFilter && typeof emptyNoFilter == "boolean") {
      for (var key in sendData) {
        if (sendData.hasOwnProperty(key)) {
          var element = sendData[key];
          if (element === "") {
            delete sendData[key];
          }
        }
      }
    }
    let promise = new Promise(function (resolve, reject) {
      instance
        .get(api, {
          params: sendData,
          responseType: responseType,
        })
        .then((response) => {
          if (!disabledLoading.includes(api)) {
            apiNumber -= 1;
          }
          if (apiNumber === 0 && !disabledLoading.includes(api)) {
            loading().close();
          }
          if (response && api === "default-card-config/exportTemplate") {
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            const fileExtension = ".xlsx";
            const fileName = i18n.t("aCardManagement.aCardManagementList");
            const _record = response.data;
            const blob = new Blob([_record], { type: fileType });
            FileSaver.saveAs(blob, fileName + fileExtension);
            resolve(true);
            return "";
          }
          if (returnData.includes(api)) {
            resolve(response || true);
          } else if (response && response.status === 200) {
            let data = response.data;
            if (localDateTimeArr.includes(api) && data.data && response.data.localDateTime) {
              data.data.localDateTime = response.data.localDateTime;
            }
            if (Number(data.code) === 200) {
              resolve(data.data || true);
            } else if (Number(data.code) === 401) {
              messageFun(data);
              sessionStorage.removeItem("token");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              messageFun(data);
              if (data.messageKey === "certificate_invalidation" || data.messageKey === "certificate_error") {
                apiNumber = 0;
                sessionStorage.clear();
                router.push("/login");
              }
              resolve(false);
            }
          } else if (!response) {
            Message.error("请求超时，请稍后再试.");
            resolve(false);
          } else {
            Message.error("请求失败");
            resolve(false);
          }
        })
        .catch((error) => {
          closeLoading(error);
          resolve(false);
        });
    });

    return promise;
  },
  async blob(api, sendData, title) {
    let token = sessionStorage.getItem("token");
    if (token) {
      instance.defaults.headers["certificate"] = token;
    }
    sendData = sendData || {};
    for (var key in sendData) {
      if (sendData.hasOwnProperty(key)) {
        var element = sendData[key];
        if (element === "") {
          delete sendData[key];
        }
      }
    }
    instance
      .post(api, sendData, { responseType: "blob" })
      .then((response) => {
        let blob = new Blob([response.data]);
        let url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {});
  },
};

export default service;
