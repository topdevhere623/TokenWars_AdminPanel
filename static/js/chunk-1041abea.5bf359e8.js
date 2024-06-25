(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1041abea"],{"14e59":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page-wrapper"},[t("div",{staticClass:"public-list-inputs"},[t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter flowing water number",clearable:""},model:{value:e.Id,callback:function(t){e.Id=t},expression:"Id"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter user ID, wallet address",clearable:""},model:{value:e.userId,callback:function(t){e.userId=t},expression:"userId"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter the Flashing ID, HASH, Gold Stream Water Number",clearable:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),t("el-select",{staticClass:"public-select-box",attrs:{"popper-class":"public-select-box",placeholder:"All currencies",clearable:""},model:{value:e.coin,callback:function(t){e.coin=t},expression:"coin"}},e._l(e.coinDrop,(function(e,n){return t("el-option",{key:n,attrs:{label:e.coinName,value:e.coinName}})})),1),t("el-select",{staticClass:"public-select-box",attrs:{"popper-class":"public-select-box",placeholder:"All recharge chain",clearable:""},model:{value:e.chainType,callback:function(t){e.chainType=t},expression:"chainType"}},e._l(e.chainDrop,(function(e,n){return t("el-option",{key:n,attrs:{label:e.chain,value:e.chain}})})),1),t("div",{staticClass:"public-date-box"},[t("span",{staticClass:"demonstration"},[e._v(" Account change time ")]),t("el-date-picker",{attrs:{type:"datetimerange","range-separator":"arrive","start-placeholder":"Starting time","end-placeholder":"End Time"},model:{value:e.changeTime,callback:function(t){e.changeTime=t},expression:"changeTime"}})],1),t("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.fetchAssetFlowList()}}},[e._v(" Inquire ")])],1),t("div",{staticClass:"remittance-box"},[t("div",{staticClass:"remittance-amount remittance-more"},[t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total flowing water")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.totalNumberOfFlows))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total recharge number")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.aggregateQuery&&e.aggregateQuery.totalRechargeQuantity)+" ")])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total score")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.totalUpperScore))])])])]),t("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""},on:{"sort-change":e.sortChange}},[t("el-table-column",{key:"1",attrs:{prop:"id",label:"serial number",align:"center"}}),t("el-table-column",{key:"2",attrs:{prop:"userId",width:"120",label:"User ID",align:"center"}}),t("el-table-column",{key:"3",attrs:{prop:"coin",label:"Recharge currency",align:"center"}}),t("el-table-column",{key:"4",attrs:{prop:"chainType",label:"Recharge chain",align:"center"}}),t("el-table-column",{key:"5",attrs:{prop:"amount",label:"Quantity of recharge",align:"center"}}),t("el-table-column",{key:"6",attrs:{prop:"criditAmount",label:"Quantity",align:"center"}}),t("el-table-column",{key:"7",attrs:{prop:"flashId",label:"Flash ID",align:"center"}}),t("el-table-column",{key:"8",attrs:{prop:"hash",label:"hash",align:"center"}}),t("el-table-column",{key:"9",attrs:{prop:"address",label:"Wallet address",align:"center"}}),t("el-table-column",{key:"10",attrs:{prop:"afId",label:"Gold Stream Water Number",align:"center"}}),t("el-table-column",{key:"11",attrs:{prop:"createTime",label:"Account change time",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.timeForStr(t.row.createTime,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])})],1),e.baseUserPage&&e.baseUserPage.total?t("el-pagination",{staticClass:"public-pagination",attrs:{background:"","current-page":e.page,"page-sizes":e.pagination.pageSizes,"page-size":e.size,layout:" sizes, prev, pager, next, jumper",total:e.baseUserPage.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1)},r=[],l=n("c7eb"),s=n("5530"),c=n("1da1"),i=n("901e"),o=n.n(i),u=n("ed08"),h=n("1b80"),p=(n("93bf"),{name:"CashManagement",components:{},data:function(){return{Id:null,userId:null,keyword:null,coin:null,chainType:null,changeTime:null,sortData:{orderBy:null,orderType:null},page:1,size:20,tableData:null,baseUserPage:null,aggregateQuery:null,coinDrop:[],chainDrop:[]}},mixins:[h["a"]],methods:{bigNumber:o.a,timeForStr:u["h"],searchFun:function(){var e=this.changeTime,t=null,n=null;return e&&e[0]&&(t=Object(u["h"])(e[0],"YYYY-MM-DD HH:mm:ss")),e&&e[1]&&(n=Object(u["h"])(e[1],"YYYY-MM-DD HH:mm:ss")),{id:this.Id,userIdOrAddress:this.userId,keyword:this.keyword,coin:this.coin,chainType:this.chainType,createStartTime:t,createEndTime:n}},sortChange:function(e){e.column;var t=e.prop,n=e.order;this.sortData.orderBy=t,this.sortData.orderType="descending"==n?"DESC":"ASC",n||(this.sortData.orderType=null),this.fetchAssetFlowList()},fetchAssetFlowList:function(){var e=arguments,t=this;return Object(c["a"])(Object(l["a"])().mark((function n(){var a,r,c,i,o,u,h,p,d;return Object(l["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=!(e.length>0&&void 0!==e[0])||e[0],r=t.searchFun(),c=t.sortData,i=t.size,o=t.userType,u=t.page,a&&(t.page=1,u=1),h=Object(s["a"])(Object(s["a"])(Object(s["a"])({},{userType:o,size:i,page:u}),c),r),n.next=8,t.$http.getRechargeList(h);case 8:return p=n.sent,p&&(t.baseUserPage=p,t.tableData=p.records),delete h.size,delete h.page,n.next=14,t.$http.getRechargeStatistics(h);case 14:d=n.sent,d&&(t.aggregateQuery=d);case 16:case"end":return n.stop()}}),n)})))()},fetchCoin:function(){var e=this;return Object(c["a"])(Object(l["a"])().mark((function t(){var n,a;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getCoinList({page:1,size:999});case 2:n=t.sent,n&&([],a=n.records,e.coinDrop=a);case 4:case"end":return t.stop()}}),t)})))()},fetchChain:function(){var e=this;return Object(c["a"])(Object(l["a"])().mark((function t(){var n;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getChainList({page:1,size:999});case 2:n=t.sent,n&&(e.chainDrop=n.records);case 4:case"end":return t.stop()}}),t)})))()},handleSizeChange:function(e){this.size=e,this.fetchAssetFlowList()},handleCurrentChange:function(e){this.page=e,this.fetchAssetFlowList(!1)}},created:function(){this.fetchAssetFlowList(),this.fetchCoin(),this.fetchChain()},computed:{userType:function(){return this.$store.getters.accountConfig}},mounted:function(){},updated:function(){},beforeDestroy:function(){}}),d=p,b=(n("c80a"),n("2877")),g=Object(b["a"])(d,a,r,!1,null,"71027293",null);t["default"]=g.exports},5541:function(e,t,n){},"93bf":function(e,t,n){
/*!
* screenfull
* v5.2.0 - 2021-11-03
* (c) Sindre Sorhus; MIT License
*/
(function(){"use strict";var t="undefined"!==typeof window&&"undefined"!==typeof window.document?window.document:{},n=e.exports,a=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],a=0,r=n.length,l={};a<r;a++)if(e=n[a],e&&e[1]in t){for(a=0;a<e.length;a++)l[n[0][a]]=e[a];return l}return!1}(),r={change:a.fullscreenchange,error:a.fullscreenerror},l={request:function(e,n){return new Promise(function(r,l){var s=function(){this.off("change",s),r()}.bind(this);this.on("change",s),e=e||t.documentElement;var c=e[a.requestFullscreen](n);c instanceof Promise&&c.then(s).catch(l)}.bind(this))},exit:function(){return new Promise(function(e,n){if(this.isFullscreen){var r=function(){this.off("change",r),e()}.bind(this);this.on("change",r);var l=t[a.exitFullscreen]();l instanceof Promise&&l.then(r).catch(n)}else e()}.bind(this))},toggle:function(e,t){return this.isFullscreen?this.exit():this.request(e,t)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,n){var a=r[e];a&&t.addEventListener(a,n,!1)},off:function(e,n){var a=r[e];a&&t.removeEventListener(a,n,!1)},raw:a};a?(Object.defineProperties(l,{isFullscreen:{get:function(){return Boolean(t[a.fullscreenElement])}},element:{enumerable:!0,get:function(){return t[a.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(t[a.fullscreenEnabled])}}}),n?e.exports=l:window.screenfull=l):n?e.exports={isEnabled:!1}:window.screenfull={isEnabled:!1}})()},c80a:function(e,t,n){"use strict";n("5541")}}]);