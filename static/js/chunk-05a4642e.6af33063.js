(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-05a4642e"],{"4f81":function(e,t,a){},c369:function(e,t,a){e.exports=a.p+"static/img/create_eth.66387d40.webp"},e00e:function(e,t,a){"use strict";a("4f81")},ebd7:function(e,t,a){"use strict";a.r(t);a("99af4"),a("b0c0");var r=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page-wrapper"},[t("div",{staticClass:"public-list-inputs"},[t("el-input",{staticClass:"public-input",staticStyle:{width:"220px"},attrs:{placeholder:"Enter order number",clearable:""},model:{value:e.orderNum,callback:function(t){e.orderNum=t},expression:"orderNum"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"220px"},attrs:{placeholder:"enter User ID/nickname",clearable:""},model:{value:e.userName,callback:function(t){e.userName=t},expression:"userName"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"220px"},attrs:{placeholder:"Enter ticket number",clearable:""},model:{value:e.num,callback:function(t){e.num=t},expression:"num"}}),t("el-select",{staticClass:"public-input",staticStyle:{width:"120px"},attrs:{placeholder:"Winning status",clearable:""},model:{value:e.winningStatus,callback:function(t){e.winningStatus=t},expression:"winningStatus"}},[t("el-option",{attrs:{label:"Won the prize",value:"YES"}}),t("el-option",{attrs:{label:"Undeval",value:"NO"}})],1),t("el-select",{staticClass:"public-input",staticStyle:{width:"120px"},attrs:{placeholder:"All states",clearable:""},model:{value:e.status,callback:function(t){e.status=t},expression:"status"}},[t("el-option",{attrs:{label:"To be awarded",value:"TO_BE_AWARDED"}}),t("el-option",{attrs:{label:"Winning",value:"AWARDED"}}),t("el-option",{attrs:{label:"refunded",value:"REFUNDED"}})],1),t("div",{staticClass:"public-date-box"},[t("span",{staticClass:"demonstration"},[e._v(" Consumer ")]),t("el-input",{staticStyle:{width:"120px",border:"1px solid #dcdfe6","border-radius":"4px"},attrs:{type:"number",placeholder:"Minimum price",clearable:""},model:{value:e.startPrice,callback:function(t){e.startPrice=t},expression:"startPrice"}}),t("el-input",{staticStyle:{width:"120px",border:"1px solid #dcdfe6","border-radius":"4px"},attrs:{type:"number",placeholder:"Highest price",clearable:""},model:{value:e.endPrice,callback:function(t){e.endPrice=t},expression:"endPrice"}})],1),t("div",{staticClass:"public-date-box"},[t("span",{staticClass:"demonstration"},[e._v(" transaction hour ")]),t("el-date-picker",{attrs:{type:"datetimerange","range-separator":"arrive","start-placeholder":"Starting time","end-placeholder":"End Time"},model:{value:e.transactionTime,callback:function(t){e.transactionTime=t},expression:"transactionTime"}})],1),t("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.fetchOneNftLotteryOrdersManagerList()}}},[e._v(" Inquire ")])],1),t("div",{staticClass:"remittance-box"},[t("div",{staticClass:"remittance-amount remittance-more"},[t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("number of order")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.numberOfOrders))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total votes")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.numberOfUnpacks))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("lump sum")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.totalConsumption))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total commission")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.totalCommission))])])])]),t("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""},on:{"sort-change":e.sortChange}},[t("el-table-column",{key:"1",attrs:{sortable:"custom",prop:"orderNum",label:"order number",align:"center"}}),t("el-table-column",{key:"3",attrs:{prop:"image",label:"NFT diagram",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("div",{staticStyle:{width:"100px",height:"100px"}},["LIMITED_PRICE_COIN"==a.row.orderType?t("el-image",{staticStyle:{height:"100%"},attrs:{src:e.ethPic,"preview-src-list":[e.ethPic]}}):t("el-image",{staticStyle:{height:"100%"},attrs:{src:a.row.image,"preview-src-list":[a.row.image]}})],1)]}}])}),t("el-table-column",{key:"4",attrs:{sortable:"custom",prop:"name",label:"merchandise",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return["LIMITED_PRICE_COIN"==a.row.orderType?t("span",[e._v(" "+e._s(a.row.price?"".concat(a.row.price," ").concat("ETH"):"--")+" ")]):t("span",[e._v(e._s("".concat(a.row.name," #").concat(a.row.orderId)))])]}}])}),t("el-table-column",{key:"5",attrs:{sortable:"custom",prop:"tickets",label:"Vote",align:"center"}}),t("el-table-column",{key:"6",attrs:{sortable:"custom",label:"Ticket number",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("".concat(t.row.startNumbers,"-").concat(t.row.endNumbers))+" ")]}}])}),t("el-table-column",{key:"7",attrs:{prop:"userId",label:"Order user",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("p",{style:{color:"INNER"==a.row.userIsTest?"red":"#000"}},[e._v(" "+e._s(a.row.userId||"--")+" ")]),t("p",{style:{color:"INNER"==a.row.userIsTest?"red":"#000"}},[e._v(" "+e._s(a.row.username||"--")+" ")])]}}])}),t("el-table-column",{key:"8",attrs:{prop:"expenditure",label:"Promotion information",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.twitterInfo?t("span",{staticStyle:{color:"#05a8f0",cursor:"pointer"},on:{click:function(t){return e.openPromotion(a.row)}}},[e._v("Check")]):t("span",[e._v("--")])]}}])}),t("el-table-column",{key:"9",attrs:{sortable:"custom",prop:"expenditure",label:"Consumption",align:"center"}}),t("el-table-column",{key:"10",attrs:{sortable:"custom",prop:"winningStatus",label:"Win a prize",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return["YES"==a.row.winningStatus?t("span",{staticStyle:{color:"#67c23a"}},[e._v("Won the prize")]):t("span",[e._v("Undeval")])]}}])}),t("el-table-column",{key:"11",attrs:{prop:"paymentChannel",label:"Consumer channel",align:"center"}}),t("el-table-column",{key:"14",attrs:{prop:"expenditureSerialId",label:"Consumer flow number",align:"center"}}),t("el-table-column",{key:"15",attrs:{prop:"refundSerialId",label:"Return",align:"center"}}),t("el-table-column",{key:"17",attrs:{sortable:"custom",prop:"status",label:"state",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(a){return["TO_BE_AWARDED"==a.row.status?t("span",{staticStyle:{color:"#05a8f0"}},[e._v("To be awarded")]):e._e(),"REFUNDED"==a.row.status?t("span",{staticStyle:{color:"#31ce0b"}},[e._v("refunded")]):e._e(),"AWARDED"==a.row.status?t("span",{staticStyle:{color:"#bbbbbb"}},[e._v("Winning")]):e._e()]}}])}),t("el-table-column",{key:"18",attrs:{sortable:"custom",prop:"paymentTime",width:"140px",label:"transaction hour",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.timeForStr(t.row.paymentTime,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])})],1),e.baseUserPage&&e.baseUserPage.total?t("el-pagination",{staticClass:"public-pagination",attrs:{background:"","current-page":e.page,"page-sizes":e.pagination.pageSizes,"page-size":e.size,layout:" sizes, prev, pager, next, jumper",total:e.baseUserPage.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e(),t("el-dialog",{attrs:{title:"Promotion information",visible:e.dialogVisible,width:"30%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("el-form",{ref:"ruleForm",attrs:{"label-width":"80px"}},[t("el-form-item",{attrs:{label:"id",prop:"address"}},[t("el-input",{attrs:{readonly:"",autocomplete:"off"},model:{value:e.twitterData.tweetId,callback:function(t){e.$set(e.twitterData,"tweetId",t)},expression:"twitterData.tweetId"}})],1),t("el-form-item",{attrs:{label:"user",prop:"address"}},[t("el-input",{attrs:{readonly:"",autocomplete:"off"},model:{value:e.twitterData.userName,callback:function(t){e.$set(e.twitterData,"userName",t)},expression:"twitterData.userName"}})],1),t("el-form-item",{attrs:{label:"Link",prop:"address"}},[t("el-input",{attrs:{readonly:"",autocomplete:"off"},model:{value:e.twitterData.tweetUrl,callback:function(t){e.$set(e.twitterData,"tweetUrl",t)},expression:"twitterData.tweetUrl"}},[t("template",{slot:"append"},[t("el-button",{on:{click:function(t){return e.openUrl(e.twitterData.tweetUrl)}}},[e._v("Go")])],1)],2)],1),t("el-form-item",{attrs:{label:"content",prop:"address"}},[t("div",{domProps:{innerHTML:e._s(e.twitterData.content)}})])],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("closure")])],1)],1)],1)},n=[],s=a("c7eb"),i=a("5530"),l=a("1da1"),o=a("901e"),c=a.n(o),u=a("ed08"),d=a("1b80"),p={name:"NftBuyRecord",components:{},data:function(){return{orderNum:null,userName:null,num:null,winningStatus:null,status:null,startPrice:null,endPrice:null,startNumbers:null,endNumbers:null,transactionTime:null,page:1,size:20,tableData:null,aggregateQuery:null,baseUserPage:null,sortData:{orderBy:null,orderType:null},ethPic:a("c369"),dialogVisible:!1,twitterData:{}}},mixins:[d["a"]],methods:{accurateDecimal:u["a"],bigNumber:c.a,timeForStr:u["h"],openUrl:u["f"],searchFun:function(){var e=this.transactionTime,t=null,a=null;return e&&e[0]&&(t=Object(u["h"])(e[0],"YYYY-MM-DD HH:mm:ss")),e&&e[1]&&(a=Object(u["h"])(e[1],"YYYY-MM-DD HH:mm:ss")),{orderNum:this.orderNum,userName:this.userName,winningStatus:this.winningStatus,status:this.status,num:this.num,startPrice:this.startPrice,endPrice:this.endPrice,startNumbers:this.startNumbers,endNumbers:this.endNumbers,startTxtime:t,endTxTime:a}},fetchOneNftLotteryOrdersManagerList:function(){var e=arguments,t=this;return Object(l["a"])(Object(s["a"])().mark((function a(){var r,n,l,o,c,u,d,p,m;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=!(e.length>0&&void 0!==e[0])||e[0],n=t.searchFun(),l=t.sortData,o=t.size,c=t.userType,u=t.page,r&&(t.page=1,u=1),d=Object(i["a"])(Object(i["a"])(Object(i["a"])({},{userType:c,size:o,page:u}),l),n),a.next=8,t.$http.getOneNftLotteryOrdersManagerList(d);case 8:return p=a.sent,p&&(t.baseUserPage=p,t.tableData=p.records),delete d.size,delete d.page,a.next=14,t.$http.getOneNftLotteryOrdersStatistics(d);case 14:m=a.sent,m&&(t.aggregateQuery=m);case 16:case"end":return a.stop()}}),a)})))()},sortChange:function(e){e.column;var t=e.prop,a=e.order;this.sortData.orderBy=t,this.sortData.orderType="descending"==a?"DESC":"ASC",a||(this.sortData.orderType=null),this.fetchOneNftLotteryOrdersManagerList()},operatingNft:function(e){var t=this;this.$confirm("Determine".concat("down"==e.upAndDown?"Put on the shelves":"Get off the shelves","One -dollar purchase event『").concat(e.seriesName||e.id,"』?"),"hint",{confirmButtonText:"Sure",cancelButtonText:"Cancel",type:"info"}).then(Object(l["a"])(Object(s["a"])().mark((function a(){var r;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.updateOneNftOrders({id:e.id,upAndDown:"down"==e.upAndDown?"up":"down"});case 2:r=a.sent,r&&(t.fetchOneNftLotteryOrdersManagerList(),t.$message.success("Successful operation"));case 4:case"end":return a.stop()}}),a)})))).catch((function(e){console.error(e)}))},openPromotion:function(e){var t=e.twitterInfo;this.twitterData=t,this.dialogVisible=!0},handleSizeChange:function(e){this.size=e,this.fetchOneNftLotteryOrdersManagerList()},handleCurrentChange:function(e){this.page=e,this.fetchOneNftLotteryOrdersManagerList(!1)}},created:function(){this.fetchOneNftLotteryOrdersManagerList()},computed:{coin:function(){return this.$store.getters.coinConfig},userType:function(){return this.$store.getters.accountConfig}},mounted:function(){},updated:function(){},beforeDestroy:function(){}},m=p,b=(a("e00e"),a("2877")),f=Object(b["a"])(m,r,n,!1,null,"d2b88860",null);t["default"]=f.exports}}]);