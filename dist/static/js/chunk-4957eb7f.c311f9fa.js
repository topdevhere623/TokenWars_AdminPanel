(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4957eb7f"],{"3ee4":function(e,t,a){},"580d":function(e,t,a){"use strict";a("3ee4")},b9da:function(e,t,a){"use strict";a.r(t);a("b680");var l=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page-wrapper"},[t("div",{staticClass:"public-list-inputs"},[t("el-select",{staticClass:"public-select-box",attrs:{"popper-class":"public-select-box",placeholder:"Choose a blind box",clearable:""},model:{value:e.boxId,callback:function(t){e.boxId=t},expression:"boxId"}},e._l(e.dropBox,(function(e,a){return t("el-option",{key:a,attrs:{label:e.boxName,value:e.id}})})),1),t("el-select",{staticClass:"public-select-box",attrs:{"popper-class":"public-select-box",placeholder:"Blood pool state",clearable:""},model:{value:e.bloodPoolsStatus,callback:function(t){e.bloodPoolsStatus=t},expression:"bloodPoolsStatus"}},[t("el-option",{attrs:{label:"Bleeding",value:"TRUE"}}),t("el-option",{attrs:{label:"Blood pool",value:"FALSE"}})],1),t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{type:"number",placeholder:"Please enter the blood pool correction value",clearable:""},model:{value:e.adjust,callback:function(t){e.adjust=t},expression:"adjust"}}),t("el-select",{staticClass:"public-select-box",staticStyle:{width:"160px"},attrs:{"popper-class":"public-select-box",placeholder:"NFT status"},model:{value:e.lotteryHandler,callback:function(t){e.lotteryHandler=t},expression:"lotteryHandler"}},[t("el-option",{attrs:{label:"Recycle",value:"RECLAIM"}}),t("el-option",{attrs:{label:"extract",value:"EXTRACT"}}),t("el-option",{attrs:{label:"Internal recycling external extraction",value:"AVG"}})],1),t("el-select",{staticClass:"public-select-box",attrs:{"popper-class":"public-select-box",placeholder:"Draw status",clearable:""},model:{value:e.coiledType,callback:function(t){e.coiledType=t},expression:"coiledType"}},[t("el-option",{attrs:{label:"Single draw",value:"ONE"}}),t("el-option",{attrs:{label:"Five consecutive draws",value:"FIVE"}}),t("el-option",{attrs:{label:"Ten consecutive pumps",value:"TEN"}})],1),t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Please enter the test quantity",clearable:""},model:{value:e.testNumber,callback:function(t){e.testNumber=e._n(t)},expression:"testNumber"}}),t("el-button",{staticClass:"public-search",attrs:{loading:e.loading,type:"primary",icon:"el-icon-video-play"},on:{click:function(t){return e.startRaffle()}}},[e._v(" start ")]),t("el-button",{staticClass:"public-search",attrs:{loading:e.loading,type:"primary",icon:"el-icon-s-promotion"},on:{click:function(t){return e.fetchBlindBoxTest()}}},[e._v(" Fast test ")]),t("el-button",{staticClass:"public-search",attrs:{loading:e.loading,type:"primary",icon:"el-icon-refresh"},on:{click:function(t){return e.blindBoxReset()}}},[e._v(" Repossess ")])],1),t("div",{staticClass:"remittance-box"},[t("div",{staticClass:"remittance-amount remittance-more"},[t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Blind box unit price")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.price))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Looking forward to returning rate")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.aggregateQuery&&"".concat(new e.bigNumber(e.aggregateQuery.expectRate||0).multipliedBy(100).toFixed(4),"%"))+" ")])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total consumption")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.grossIncomes))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total return")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.totalExpenditures))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Actual return rate")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.aggregateQuery&&"".concat(new e.bigNumber(e.aggregateQuery.realRate||0).multipliedBy(100).toFixed(4),"%"))+" ")])])])]),t("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""}},[t("el-table-column",{key:"1",attrs:{prop:"qualityType",label:"product quality",align:"center"}}),t("el-table-column",{key:"2",attrs:{prop:"nftName",label:"Series name",align:"center"}}),t("el-table-column",{key:"3",attrs:{prop:"nftId",label:"NFT ID",align:"center"}}),t("el-table-column",{key:"4",attrs:{prop:"price",label:"price",align:"center"}}),t("el-table-column",{key:"5",attrs:{prop:"count",label:"Number",align:"center"}})],1)],1)},s=[],r=a("ade3"),o=a("c7eb"),i=a("1da1"),n=a("901e"),c=a.n(n),u=a("ed08"),d=a("1b80"),p=(a("51be"),a("5c96"),{name:"BlindBoxTest",components:{},data:function(){return{boxId:null,bloodPoolsStatus:"TRUE",adjust:null,lotteryHandler:"RECLAIM",coiledType:"ONE",testNumber:null,dropBox:null,page:1,size:9999,tableData:null,aggregateQuery:{price:0,expectRate:0,realRate:0,totalExpenditures:0,grossIncomes:0},loading:!1}},mixins:[d["a"]],methods:Object(r["a"])(Object(r["a"])({bigNumber:c.a,timeForStr:u["h"],startRaffle:function(){var e=this.boxId,t=this.testNumber,a=t,l=this;if(e)if(t){this.blindBoxReset(),this.loading=!0;var s=function e(){setTimeout((function(){l.fetchBlindBoxTest(),a--,a>0?e():l.loading=!1}),300)};t>0&&s()}else this.$message.error("Please enter the test quantity");else this.$message.error("Please select a blind box")},fetchBoxManager:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var a,l;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={boxStatus:"NORMAL",page:1,size:999},t.next=3,e.$http.getBoxManagerList(a);case 3:l=t.sent,l&&(e.dropBox=l.records);case 5:case"end":return t.stop()}}),t)})))()},fetchBlindBoxTest:function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var a,l;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={boxId:e.boxId,bloodPoolsStatus:e.bloodPoolsStatus,adjust:e.adjust,lotteryHandler:e.lotteryHandler,coiledType:e.coiledType,page:1,size:9999},t.next=3,e.$http.getBlindBoxTest(a);case 3:l=t.sent,l&&(e.tableData=l.page.records,e.aggregateQuery=l);case 5:case"end":return t.stop()}}),t)})))()}},"fetchBlindBoxTest",(function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var a,l,s,r;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.boxId,l=e.testNumber,a){t.next=4;break}return e.$message.error("Please select a blind box"),t.abrupt("return");case 4:if(l){t.next=7;break}return e.$message.error("Please enter the test quantity"),t.abrupt("return");case 7:return e.loading=!0,s={boxId:e.boxId,bloodPoolsStatus:e.bloodPoolsStatus,adjust:e.adjust,lotteryHandler:e.lotteryHandler,coiledType:e.coiledType,countNumber:e.testNumber,page:1,size:9999},t.next=11,e.$http.getBlindBoxFastTest(s);case 11:r=t.sent,r?(e.tableData=r.page.records,e.aggregateQuery=r,e.loading=!1):e.loading=!1;case 13:case"end":return t.stop()}}),t)})))()})),"blindBoxReset",(function(){var e=this;return Object(i["a"])(Object(o["a"])().mark((function t(){var a;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.blindBoxReset();case 2:a=t.sent,a&&(e.tableData=null,e.aggregateQuery={price:0,expectRate:0,realRate:0,totalExpenditures:0,grossIncomes:0});case 4:case"end":return t.stop()}}),t)})))()})),created:function(){this.fetchBoxManager()},computed:{coin:function(){return this.$store.getters.coinConfig},userType:function(){return this.$store.getters.accountConfig}},mounted:function(){},updated:function(){},beforeDestroy:function(){}}),b=p,g=(a("580d"),a("2877")),x=Object(g["a"])(b,l,s,!1,null,"35a13512",null);t["default"]=x.exports}}]);