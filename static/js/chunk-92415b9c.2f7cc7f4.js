(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-92415b9c"],{"7a91":function(e,t,a){},"7db0":function(e,t,a){"use strict";var r=a("23e7"),i=a("b727").find,s=a("44d2"),l="find",n=!0;l in[]&&Array(1)[l]((function(){n=!1})),r({target:"Array",proto:!0,forced:n},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),s(l)},"81b9":function(e,t,a){"use strict";var r=function(){var e=this,t=e._self._c;return t("a",{attrs:{href:e.addressUrl,target:"_blank"}},[e._t("default",(function(){return[e._v("View Results")]}))],2)},i=[],s=(a("7db0"),a("d3b7"),a("0acd")),l={props:{chain:{type:String|Boolean,default:!1},address:{type:String|Boolean,default:!1}},data:function(){return{addressUrl:""}},mounted:function(){var e=this.chain;if(e){var t=s["b"].find((function(t){return t.chainName==e})),a=null===t||void 0===t?void 0:t.blockExplorerUrls;this.addressUrl=a+this.address}}},n=l,o=(a("d185"),a("2877")),c=Object(o["a"])(n,r,i,!1,null,"b754451c",null);t["a"]=c.exports},d185:function(e,t,a){"use strict";a("7a91")},d1e9:function(e,t,a){},debe:function(e,t,a){"use strict";a.r(t);a("b680");var r=function(){var e,t,a,r,i,s,l=this,n=l._self._c;return n("div",{staticClass:"page-wrapper"},[n("div",{staticClass:"public-list-inputs"},[n("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter user ID, nickname, mailbox",clearable:""},model:{value:l.obscureField,callback:function(e){l.obscureField=e},expression:"obscureField"}}),n("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter gold flow ID",clearable:""},model:{value:l.flowId,callback:function(e){l.flowId=e},expression:"flowId"}}),n("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Input source",clearable:""},model:{value:l.sourceNum,callback:function(e){l.sourceNum=e},expression:"sourceNum"}}),n("div",{staticClass:"public-date-box"},[n("span",{staticClass:"demonstration"},[l._v(" Registration time ")]),n("el-date-picker",{attrs:{type:"datetimerange","range-separator":"到","start-placeholder":"Starting time","end-placeholder":"End Time"},model:{value:l.regTime,callback:function(e){l.regTime=e},expression:"regTime"}})],1),n("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){return l.fetchOrderManagerList()}}},[l._v(" Inquire ")]),n("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(e){return l.dailyStatsExcel()}}},[l._v(" Export Excel ")])],1),n("div",{staticClass:"remittance-box"},[n("div",{staticClass:"remittance-amount remittance-more"},[n("div",{staticClass:"remittance-item"},[n("div",{staticClass:"title"},[l._v("Total account number")]),n("div",{staticClass:"val"},[l._v(" "+l._s(l.aggregateQuery&&l.aggregateQuery.totalPeopleNumber)+" ")])]),n("div",{staticClass:"remittance-item"},[n("div",{staticClass:"title"},[l._v("总 remittance")]),n("div",{staticClass:"val"},[l._v(" "+l._s(l.aggregateQuery&&l.aggregateQuery.totalBouns)+" ")])]),n("div",{staticClass:"remittance-item"},[n("div",{staticClass:"title"},[l._v("Total recharge")]),n("div",{staticClass:"val"},[l._v(" "+l._s(l.aggregateQuery&&l.aggregateQuery.totalRecharge)+" ")])]),n("div",{staticClass:"remittance-item"},[n("div",{staticClass:"title"},[l._v("Total consumption")]),n("div",{staticClass:"val"},[l._v(" "+l._s(l.aggregateQuery&&l.aggregateQuery.totalCumption)+" ")])]),n("div",{staticClass:"remittance-item"},[n("div",{staticClass:"title"},[l._v("Recharge rate")]),(null===(e=l.aggregateQuery)||void 0===e?void 0:e.totalPeopleNumber)>0?n("div",{staticClass:"val"},[l._v(" "+l._s(l.aggregateQuery&&((null===(t=l.aggregateQuery)||void 0===t?void 0:t.totalRechargePeopleNumber)/(null===(a=l.aggregateQuery)||void 0===a?void 0:a.totalPeopleNumber)*100).toFixed(2))+"% ")]):n("div",{staticClass:"val"},[l._v("0%")])]),n("div",{staticClass:"remittance-item"},[n("div",{staticClass:"title"},[l._v("Consumption rate")]),(null===(r=l.aggregateQuery)||void 0===r?void 0:r.totalPeopleNumber)>0?n("div",{staticClass:"val"},[l._v(" "+l._s(l.aggregateQuery&&((null===(i=l.aggregateQuery)||void 0===i?void 0:i.totalCumptionPeopleNumber)/(null===(s=l.aggregateQuery)||void 0===s?void 0:s.totalPeopleNumber)*100).toFixed(2))+"% ")]):n("div",{staticClass:"val"},[l._v("0%")])])])]),n("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:l.tableData,border:""},on:{"sort-change":l.sortChange}},[n("el-table-column",{key:"1",attrs:{prop:"userId",width:"120",label:"User ID",align:"center"}}),n("el-table-column",{key:"2",attrs:{prop:"userName",width:"120",label:"Nick name",align:"center"},scopedSlots:l._u([{key:"default",fn:function(e){return[n("p",{style:{color:"INNER"==e.row.userType?"red":"#000"}},[l._v(" "+l._s(e.row.userName||"--")+" ")])]}}])}),n("el-table-column",{key:"3",attrs:{prop:"sourceNum",width:"120",label:"source",align:"center"}}),n("el-table-column",{key:"4",attrs:{prop:"email",width:"120",label:"Mail",align:"center"}}),n("el-table-column",{key:"5",attrs:{prop:"upId",width:"120",label:"Superior ID",align:"center"}}),n("el-table-column",{key:"6",attrs:{prop:"inviteCode",width:"120",label:"Invitation code",align:"center"}}),n("el-table-column",{key:"7",attrs:{prop:"traPrice",width:"120",label:"Amount",align:"center"}}),n("el-table-column",{key:"8",attrs:{prop:"flowId",width:"120",label:"Golden ID",align:"center"}}),n("el-table-column",{key:"9",attrs:{prop:"recharge",width:"120",label:"top up",align:"center"}}),n("el-table-column",{key:"10",attrs:{prop:"consumption",width:"120",label:"Consumption",align:"center"}}),n("el-table-column",{key:"11",attrs:{prop:"drawing",width:"120",label:"Withdraw",align:"center"}}),n("el-table-column",{key:"12",attrs:{prop:"createTime",label:"Get the gold time",align:"center"},scopedSlots:l._u([{key:"default",fn:function(e){return[l._v(" "+l._s(l.timeForStr(e.row.createTime,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])})],1),l.baseUserPage&&l.baseUserPage.total?n("el-pagination",{staticClass:"public-pagination",attrs:{background:"","current-page":l.page,"page-sizes":l.pagination.pageSizes,"page-size":l.size,layout:" sizes, prev, pager, next, jumper",total:l.baseUserPage.total},on:{"size-change":l.handleSizeChange,"current-change":l.handleCurrentChange}}):l._e()],1)},i=[],s=a("c7eb"),l=a("1da1"),n=a("5530"),o=a("901e"),c=a.n(o),u=a("ed08"),d=a("1b80"),g=a("81b9"),p=a("51be"),b={name:"OrderManagement",components:{chainExplorerSkip:g["a"]},data:function(){return{flowId:null,obscureField:null,sourceNum:null,regTime:null,sortData:{orderBy:null,orderType:null},page:1,size:20,tableData:null,baseUserPage:null,aggregateQuery:null}},mixins:[d["a"]],methods:{bigNumber:c.a,timeForStr:u["h"],searchFun:function(){var e=this.regTime,t=null,a=null;return e&&e[0]&&(t=Object(u["h"])(e[0],"YYYY-MM-DD HH:mm:ss")),e&&e[1]&&(a=Object(u["h"])(e[1],"YYYY-MM-DD HH:mm:ss")),{obscureField:this.obscureField,flowId:this.flowId,sourceNum:this.sourceNum,regStartTime:t,regEndTime:a}},sortChange:function(e){e.column;var t=e.prop,a=e.order;this.sortData.orderBy=t,this.sortData.orderType="descending"==a?"DESC":"ASC",a||(this.sortData.orderType=null),this.fetchOrderManagerList()},dailyStatsExcel:function(){var e=this.searchFun(),t=p["a"].api+"/bouns/exportExcel",a=(this.coin,this.userType,Object(n["a"])({},e));Object(u["c"])(t,a,"Register to send gold statistics")},fetchOrderManagerList:function(){var e=arguments,t=this;return Object(l["a"])(Object(s["a"])().mark((function a(){var r,i,l,o,c,u,d,g;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=!(e.length>0&&void 0!==e[0])||e[0],i=t.searchFun(),t.sortData,l=t.size,t.coin,o=t.userType,c=t.page,r&&(t.page=1,c=1),u=Object(n["a"])(Object(n["a"])({},{userType:o,size:l,page:c}),i),a.next=8,t.$http.getBounsPageList(u);case 8:return d=a.sent,d&&(t.baseUserPage=d,t.tableData=d.records),delete u.size,delete u.page,a.next=14,t.$http.getBounsHeaderDataTotal(u);case 14:g=a.sent,g&&(t.aggregateQuery=g);case 16:case"end":return a.stop()}}),a)})))()},handleSizeChange:function(e){this.size=e,this.fetchOrderManagerList()},handleCurrentChange:function(e){this.page=e,this.fetchOrderManagerList(!1)}},created:function(){this.fetchOrderManagerList()},computed:{coin:function(){return this.$store.getters.coinConfig},userType:function(){return this.$store.getters.accountConfig}},mounted:function(){},updated:function(){},beforeDestroy:function(){}},m=b,h=(a("df42"),a("2877")),v=Object(h["a"])(m,r,i,!1,null,"9f51a556",null);t["default"]=v.exports},df42:function(e,t,a){"use strict";a("d1e9")}}]);