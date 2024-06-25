import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './icons'; // icon
import './assets/css/index.css';
import './assets/css/common.scss';
import Cookies from 'js-cookie';
import i18n from './lang';

import 'normalize.css/normalize.css'; // a modern alternative to CSS resets

import * as Fetch from '@/service/fetch';
import selfFunc from '@/utils/common';
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss';

import '@/styles/index.scss'; // global css

import * as filters from './filters'; // 全局 filters

// 原型(链)上添加 Function
import prototype from './prototype';
import contract from "./utils/global.contract.js";

Vue.use(ElementUI, { size: 'mini', zIndex: 3000 });

Vue.prototype.$http = Fetch;

Vue.prototype.$selfFunc = selfFunc;

Vue.config.productionTip = false;
Vue.prototype.$contract = new contract();

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
