(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2fc63a80"],{"1cab":function(e,t,a){},4114:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page-wrapper"},[t("div",{staticClass:"public-list-inputs"},[t("el-input",{staticClass:"public-input",staticStyle:{width:"210px"},attrs:{placeholder:"enter User ID/Nick name",clearable:""},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"210px"},attrs:{placeholder:"enter Number of stations",clearable:""},model:{value:e.warBaseId,callback:function(t){e.warBaseId=t},expression:"warBaseId"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"210px"},attrs:{placeholder:"Enter order number",clearable:""},model:{value:e.orderNum,callback:function(t){e.orderNum=t},expression:"orderNum"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"210px"},attrs:{placeholder:"Enter gold flow water number",clearable:""},model:{value:e.flowId,callback:function(t){e.flowId=t},expression:"flowId"}}),t("el-select",{staticClass:"public-input",staticStyle:{width:"120px"},attrs:{placeholder:"All states",clearable:""},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[t("el-option",{attrs:{label:"To be awarded",value:"WAIT"}}),t("el-option",{attrs:{label:"Winning",value:"OPEN"}}),t("el-option",{attrs:{label:"refunded",value:"REFUNDED"}}),t("el-option",{attrs:{label:"Cancelled",value:"CANCELED"}})],1),t("div",{staticClass:"public-date-box"},[t("span",{staticClass:"demonstration"},[e._v("transaction hour")]),t("el-date-picker",{attrs:{type:"datetimerange","range-separator":"到","start-placeholder":"Starting time","end-placeholder":"End Time"},model:{value:e.transactionTime,callback:function(t){e.transactionTime=t},expression:"transactionTime"}})],1),t("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.fetchWarGameTicketSalesList()}}},[e._v(" Inquire ")])],1),t("div",{staticClass:"remittance-box"},[t("div",{staticClass:"remittance-amount remittance-more"},[t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Number of players")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.aggregateQuery&&e.aggregateQuery.userNumbers)+" ")])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total injection")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.aggregateQuery&&e.aggregateQuery.buyPriceTotal)+" ")])])])]),t("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""},on:{"sort-change":e.sortChange}},[t("el-table-column",{key:"1",attrs:{sortable:"custom",prop:"flowId",label:"Gold Stream Water Number",align:"center"}}),t("el-table-column",{key:"7",attrs:{prop:"userId",label:"Betting user",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("p",{style:{color:"INNER"==a.row.userType?"red":"#000"}},[e._v(" "+e._s(a.row.userId||"--")+" ")]),t("p",{style:{color:"INNER"==a.row.userType?"red":"#000"}},[e._v(" "+e._s(a.row.userName||"--")+" ")])]}}])}),t("el-table-column",{key:"9",attrs:{sortable:"custom",prop:"warBaseId",label:"Number of stations",align:"center"}}),t("el-table-column",{key:"10",attrs:{sortable:"custom",prop:"buyPrice",label:"Amount of consumption",align:"center"}}),t("el-table-column",{key:"11",attrs:{sortable:"custom",prop:"totalBuyPrice",label:"General Consumption of the Bureau",align:"center"}}),t("el-table-column",{key:"15",attrs:{prop:"orderNumber",label:"order number",align:"center"}}),t("el-table-column",{key:"17",attrs:{prop:"currentStatus",label:"state",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(a){return["WAIT"==a.row.currentStatus?t("span",{staticStyle:{color:"#00bdff"}},[e._v(" To be awarded ")]):e._e(),"OPEN"==a.row.currentStatus?t("span",{staticStyle:{color:"#05ac04"}},[e._v(" Winning ")]):e._e(),"REFUNDED"==a.row.currentStatus?t("span",{staticStyle:{color:"#ff0000"}},[e._v(" refunded ")]):e._e(),"CANCELED"==a.row.currentStatus?t("span",{staticStyle:{color:"#b7b7b7"}},[e._v(" Cancelled ")]):e._e()]}}])}),t("el-table-column",{key:"18",attrs:{sortable:"custom",prop:"lotteryTime",width:"140px",label:"Lottery time",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.timeForStr(t.row.lotteryTime,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])}),t("el-table-column",{key:"18",attrs:{sortable:"custom",prop:"createTime",width:"140px",label:"transaction hour",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.timeForStr(t.row.createTime,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])})],1),e.baseUserPage&&e.baseUserPage.total?t("el-pagination",{staticClass:"public-pagination",attrs:{background:"","current-page":e.page,"page-sizes":e.pagination.pageSizes,"page-size":e.size,layout:" sizes, prev, pager, next, jumper",total:e.baseUserPage.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e()],1)},s=[],l=a("c7eb"),n=a("5530"),i=a("1da1"),c=a("901e"),o=a.n(c),u=a("ed08"),p=a("1b80"),d={name:"NftBuyRecord",components:{},data:function(){return{orderNum:null,flowId:null,userName:null,warBaseId:null,status:null,transactionTime:null,page:1,size:20,tableData:null,aggregateQuery:null,baseUserPage:null,sortData:{orderBy:null,orderType:null},ethPic:a("c369")}},mixins:[p["a"]],methods:{accurateDecimal:u["a"],bigNumber:o.a,timeForStr:u["h"],openUrl:u["f"],searchFun:function(){var e=this.transactionTime,t=null,a=null;return e&&e[0]&&(t=Object(u["h"])(e[0],"YYYY-MM-DD HH:mm:ss")),e&&e[1]&&(a=Object(u["h"])(e[1],"YYYY-MM-DD HH:mm:ss")),{orderNumber:this.orderNum,flowId:this.flowId,warBaseId:this.warBaseId,obscureField:this.userName,currentStatus:this.status,startTime:t,endTime:a}},fetchWarGameTicketSalesList:function(){var e=arguments,t=this;return Object(i["a"])(Object(l["a"])().mark((function a(){var r,s,i,c,o,u,p,d,m;return Object(l["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=!(e.length>0&&void 0!==e[0])||e[0],s=t.searchFun(),i=t.sortData,c=t.size,o=t.userType,u=t.page,r&&(t.page=1,u=1),p=Object(n["a"])(Object(n["a"])(Object(n["a"])({},{userType:o,size:c,page:u}),i),s),a.next=8,t.$http.getWarGameTicketSalesList(p);case 8:return d=a.sent,d&&(t.baseUserPage=d,t.tableData=d.records),delete p.size,delete p.page,a.next=14,t.$http.getWarGameTicketSalesStatistics(p);case 14:m=a.sent,m&&(t.aggregateQuery=m);case 16:case"end":return a.stop()}}),a)})))()},sortChange:function(e){e.column;var t=e.prop,a=e.order;this.sortData.orderBy=t,this.sortData.orderType="descending"==a?"DESC":"ASC",a||(this.sortData.orderType=null),this.fetchWarGameTicketSalesList()},handleSizeChange:function(e){this.size=e,this.fetchWarGameTicketSalesList()},handleCurrentChange:function(e){this.page=e,this.fetchWarGameTicketSalesList(!1)}},created:function(){this.fetchWarGameTicketSalesList()},computed:{coin:function(){return this.$store.getters.coinConfig},userType:function(){return this.$store.getters.accountConfig}},mounted:function(){},updated:function(){},beforeDestroy:function(){}},m=d,b=(a("d758"),a("2877")),g=Object(b["a"])(m,r,s,!1,null,"e8d95c5e",null);t["default"]=g.exports},c369:function(e,t,a){e.exports=a.p+"static/img/create_eth.66387d40.webp"},d758:function(e,t,a){"use strict";a("1cab")}}]);