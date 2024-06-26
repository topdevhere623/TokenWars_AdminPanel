(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7db95e3b"],{"339b":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e._self._c;return t("div",{staticClass:"page-wrapper"},[t("div",{staticClass:"public-list-inputs"},[t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter user ID/Nick name",clearable:""},model:{value:e.obscureField,callback:function(t){e.obscureField=t},expression:"obscureField"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Email",clearable:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter the invitation code",clearable:""},model:{value:e.inviteCode,callback:function(t){e.inviteCode=t},expression:"inviteCode"}}),t("div",{staticClass:"public-date-box"},[t("span",{staticClass:"demonstration"},[e._v(" Last receipt time ")]),t("el-date-picker",{attrs:{type:"datetimerange","range-separator":"arrive","start-placeholder":"Starting time","end-placeholder":"End Time"},model:{value:e.lastPickUpTime,callback:function(t){e.lastPickUpTime=t},expression:"lastPickUpTime"}})],1),t("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.fetchRebatesBaseList()}}},[e._v(" Inquire ")]),t("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(t){return e.onExport()}}},[e._v(" Export ")])],1),t("div",{staticClass:"remittance-box"},[t("div",{staticClass:"remittance-amount remittance-more"},[t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Subordinate quantity")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.downNumber))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total commission")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.rebatesAmountTotal))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Uncontrolled commissions")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.noReceiveAmounts))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Receive commission")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.receiveAmounts))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("total points")]),t("div",{staticClass:"val"},[e._v(e._s(e.aggregateQuery&&e.aggregateQuery.pointAmountTotal))])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total points")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.aggregateQuery&&e.aggregateQuery.extraPointAmountTotal)+" ")])])])]),t("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:""},on:{"sort-change":e.sortChange}},[t("el-table-column",{key:"1",attrs:{prop:"userName",sortable:"custom",width:"120",label:"user",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("p",{style:{color:"INNER"==a.row.userType?"red":"#000"}},[e._v(" "+e._s(a.row.id||"--")+" ")]),t("p",{style:{color:"INNER"==a.row.userType?"red":"#000"}},[e._v(" "+e._s(a.row.userName||"--")+" ")])]}}])}),t("el-table-column",{key:"2",attrs:{prop:"email",width:"120",label:"Mail",align:"center"}}),t("el-table-column",{key:"3",attrs:{prop:"inviteCode",width:"120",label:"Invitation code",align:"center"}}),t("el-table-column",{key:"4",attrs:{prop:"clickNumber",sortable:"custom",width:"120",label:"The number of clicks",align:"center"}}),t("el-table-column",{key:"5",attrs:{prop:"downIdNumber",sortable:"custom",width:"120",label:"Subordinate quantity",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("span",{staticClass:"blueColor publick-button cursor",on:{click:function(t){return e.showDown(a.row)}}},[e._v(" "+e._s(a.row.downIdNumber||0)+" ")])]}}])}),t("el-table-column",{key:"6",attrs:{prop:"totalConsumption",sortable:"custom",width:"120",label:"Total consumption",align:"center"}}),t("el-table-column",{key:"7",attrs:{prop:"rebateRate",sortable:"custom",width:"120",label:"Division ratio",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("".concat(new e.bigNumber(t.row.rebateRate).multipliedBy(100),"%"))+" ")]}}])}),t("el-table-column",{key:"8",attrs:{prop:"totalAmount",sortable:"custom",width:"120",label:"Total commission",align:"center"}}),t("el-table-column",{key:"9",attrs:{prop:"receiveAmount",sortable:"custom",width:"120",label:"Receive commission",align:"center"}}),t("el-table-column",{key:"10",attrs:{prop:"noReceiveAmount",sortable:"custom",width:"120",label:"Uncontrolled commissions",align:"center"}}),t("el-table-column",{key:"11",attrs:{prop:"pointAmount",sortable:"custom",width:"120",label:"Total registration points",align:"center"}}),t("el-table-column",{key:"12",attrs:{prop:"extraPointAmount",sortable:"custom",width:"120",label:"Total points",align:"center"}}),t("el-table-column",{key:"13",attrs:{prop:"lastReceiveTime",sortable:"custom",width:"140",label:"Last receipt time",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.timeForStr(t.row.lastReceiveTime,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])}),t("el-table-column",{key:"14",attrs:{prop:"createTime",width:"120",sortable:"custom",label:"operate",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{on:{click:function(t){return e.setRatio(a.row)}}},[e._v("Set the commission ratio")])]}}])})],1),e.baseUserPage&&e.baseUserPage.total?t("el-pagination",{staticClass:"public-pagination",attrs:{background:"","current-page":e.page,"page-sizes":e.pagination.pageSizes,"page-size":e.size,layout:" sizes, prev, pager, next, jumper",total:e.baseUserPage.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}):e._e(),t("el-dialog",{attrs:{title:"Lower -level details",visible:e.showDownDialog,width:"1200px","close-on-click-modal":!1,"before-close":e.handleClose},on:{"update:visible":function(t){e.showDownDialog=t}}},[t("div",{staticClass:"public-list-inputs"},[t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Enter user ID/Nick name",clearable:""},model:{value:e.downObscureField,callback:function(t){e.downObscureField=t},expression:"downObscureField"}}),t("el-input",{staticClass:"public-input",staticStyle:{width:"140px"},attrs:{placeholder:"Email",clearable:""},model:{value:e.downEmail,callback:function(t){e.downEmail=t},expression:"downEmail"}}),t("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.fetchRebatesBaseDownList()}}},[e._v(" Inquire ")]),t("el-button",{staticClass:"public-search",attrs:{type:"primary",icon:"el-icon-download"},on:{click:function(t){return e.onDownExport()}}},[e._v(" Export ")])],1),t("div",{staticClass:"remittance-box"},[t("div",{staticClass:"remittance-amount remittance-more"},[t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total number")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.downAggregateQuery&&e.downAggregateQuery.downNumber)+" ")])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total number")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.downAggregateQuery&&e.downAggregateQuery.traNumberTotal)+" ")])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total consumption")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.downAggregateQuery&&e.downAggregateQuery.totalConsumptions)+" ")])]),t("div",{staticClass:"remittance-item"},[t("div",{staticClass:"title"},[e._v("Total commission")]),t("div",{staticClass:"val"},[e._v(" "+e._s(e.downAggregateQuery&&e.downAggregateQuery.rebatesAmountTotal)+" ")])])])]),t("el-table",{staticStyle:{width:"auto"},attrs:{data:e.downData,height:"400px",border:""},on:{"sort-change":e.sortSubChange}},[t("el-table-column",{key:"1",attrs:{prop:"userName",width:"120",label:"user",align:"center"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("p",{style:{color:"INNER"==a.row.userType?"red":"#000"}},[e._v(" "+e._s(a.row.id||"--")+" ")]),t("p",{style:{color:"INNER"==a.row.userType?"red":"#000"}},[e._v(" "+e._s(a.row.userName||"--")+" ")])]}}])}),t("el-table-column",{key:"2",attrs:{prop:"email",width:"120",label:"mail",align:"center"}}),t("el-table-column",{key:"3",attrs:{prop:"inviteCode",label:"invitation code",align:"center"}}),t("el-table-column",{key:"4",attrs:{prop:"traNumber",sortable:"custom",label:"number of transactions",align:"center"}}),t("el-table-column",{key:"5",attrs:{prop:"totalConsumptions",sortable:"custom",label:"amount of consumption",align:"center"}}),t("el-table-column",{key:"6",attrs:{prop:"rebateRate",label:"commission ratio",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s("".concat(new e.bigNumber(t.row.rebateRate).multipliedBy(100),"%"))+" ")]}}])}),t("el-table-column",{key:"7",attrs:{prop:"totalAmount",sortable:"custom",label:"commission",align:"center"}}),t("el-table-column",{key:"8",attrs:{prop:"pointAmountTotal",sortable:"custom",label:"register",align:"center"}}),t("el-table-column",{key:"9",attrs:{prop:"extraPointAmountTotal",sortable:"custom",label:"extra points",align:"center"}}),t("el-table-column",{key:"10",attrs:{prop:"createTime",width:"140",sortable:"custom",label:"registration time",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(" "+e._s(e.timeForStr(t.row.createTime,"YYYY-MM-DD HH:mm:ss"))+" ")]}}])})],1),e.downBaseUserPage&&e.downBaseUserPage.total?t("el-pagination",{staticClass:"public-pagination",attrs:{background:"","current-page":e.downPage,"page-sizes":e.pagination.pageSizes,"page-size":e.downSize,layout:" sizes, prev, pager, next, jumper",total:e.downBaseUserPage.total},on:{"size-change":e.handleDownSizeChange,"current-change":e.handleDownCurrentChange}}):e._e()],1),t("el-dialog",{attrs:{width:"440px","close-on-click-modal":!1,title:"Set the commission ratio",visible:e.showSetRatio,"append-to-body":"","before-close":e.handleClose},on:{"update:visible":function(t){e.showSetRatio=t}}},[t("el-form",{ref:"seriesForm",staticClass:"add-form",attrs:{model:e.ratioForm,"label-width":"80px"}},[t("el-form-item",{attrs:{label:"proportion",prop:"ratio"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{type:"number"},model:{value:e.ratioForm.ratio,callback:function(t){e.$set(e.ratioForm,"ratio",t)},expression:"ratioForm.ratio"}},[t("template",{slot:"append"},[e._v("%")])],2)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){return e.handleClose()}}},[e._v("Cancel")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitRatio()}}},[e._v("Sure")])],1)],1)],1)},s=[],o=a("c7eb"),n=a("5530"),r=a("1da1"),l=(a("a9e3"),a("901e")),c=a.n(l),u=a("ed08"),d=a("1b80"),p=a("51be"),b={name:"invitationRebate",components:{},data:function(){return{obscureField:null,email:null,inviteCode:null,lastPickUpTime:null,sortData:{orderBy:null,orderType:null},page:1,size:20,tableData:null,baseUserPage:null,aggregateQuery:null,showSetRatio:!1,ratioForm:{ratio:null},userSet:{},timer:null,upId:null,downInviteCode:null,showDownDialog:!1,downObscureField:null,downEmail:null,downPage:1,downSize:20,downData:null,downBaseUserPage:null,downAggregateQuery:null,sortSubData:{orderBy:null,orderType:null}}},mixins:[d["a"]],methods:{bigNumber:c.a,timeForStr:u["h"],searchFun:function(){var e=this.lastPickUpTime,t=null,a=null;return e&&e[0]&&(t=Object(u["h"])(e[0],"YYYY-MM-DD HH:mm:ss")),e&&e[1]&&(a=Object(u["h"])(e[1],"YYYY-MM-DD HH:mm:ss")),{obscureField:this.obscureField,email:this.email,inviteCode:this.inviteCode,startPrice:this.startPrice,endPrice:this.endPrice,startTime:t,endTime:a}},sortChange:function(e){e.column;var t=e.prop,a=e.order;this.sortData.orderBy=t,this.sortData.orderType="descending"==a?"DESC":"ASC",a||(this.sortData.orderType=null),this.fetchRebatesBaseList()},fetchRebatesBaseList:function(){var e=arguments,t=this;return Object(r["a"])(Object(o["a"])().mark((function a(){var i,s,r,l,c,u,d,p,b;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=!(e.length>0&&void 0!==e[0])||e[0],s=t.searchFun(),t.sortData,r=t.size,l=t.coin,c=t.userType,u=t.page,i&&(t.page=1,u=1),d=Object(n["a"])(Object(n["a"])(Object(n["a"])({},{userType:c,coin:l,size:r,page:u}),t.sortData),s),a.next=8,t.$http.getRebatesBaseList(d);case 8:return p=a.sent,p&&(t.baseUserPage=p,t.tableData=p.records),delete d.size,delete d.page,a.next=14,t.$http.getRebatesBaseStatistics(d);case 14:b=a.sent,b&&(t.aggregateQuery=b);case 16:case"end":return a.stop()}}),a)})))()},showDown:function(e){this.upId=e.id,this.downInviteCode=e.inviteCode,this.fetchRebatesBaseDownList(),this.showDownDialog=!0},sortSubChange:function(e){e.column;var t=e.prop,a=e.order;this.sortSubData.orderBy=t,this.sortSubData.orderType="descending"==a?"DESC":"ASC",a||(this.sortSubData.orderType=null),this.fetchRebatesBaseDownList()},fetchRebatesBaseDownList:function(){var e=arguments,t=this;return Object(r["a"])(Object(o["a"])().mark((function a(){var i,s,r,l,c,u,d,p,b;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=!(e.length>0&&void 0!==e[0])||e[0],s={obscureField:t.downObscureField,email:t.downEmail,inviteCode:t.downInviteCode,upId:t.upId},r=t.downSize,l=t.coin,c=t.userType,t.sortSubData,u=t.downPage,i&&(t.downPage=1,u=1),d=Object(n["a"])(Object(n["a"])(Object(n["a"])({},{userType:c,coin:l,size:r,page:u}),t.sortSubData),s),a.next=8,t.$http.getRebatesBaseDownList(d);case 8:return p=a.sent,p&&(t.downBaseUserPage=p,t.downData=p.records),delete d.size,delete d.page,a.next=14,t.$http.getRebatesBaseDownStatistics(d);case 14:b=a.sent,b&&(t.downAggregateQuery=b);case 16:case"end":return a.stop()}}),a)})))()},setRatio:function(e){this.showSetRatio=!0,this.userSet=e,this.ratioForm.ratio=Object(u["a"])(Number(new c.a(e.rebateRate).multipliedBy(100)),4)},submitRatio:function(){var e=this;return Object(r["a"])(Object(o["a"])().mark((function t(){var a,i,s;return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.ratioForm.ratio,i=e.userSet.id,null!=a&&""!=a&&void 0!=a){t.next=4;break}return e.$message.error("Please enter the commission ratio"),t.abrupt("return");case 4:if(!(a<=0)){t.next=7;break}return e.$message.error("The proportion of commission cannot be 0 or below"),t.abrupt("return");case 7:return t.next=9,e.$http.setRebateRate({rebateRate:Object(u["a"])(Number(new c.a(a).div(100)),4),userId:i});case 9:s=t.sent,s&&(e.handleClose(),e.fetchRebatesBaseList(),e.$message.success("Successful operation"));case 11:case"end":return t.stop()}}),t)})))()},onExport:function(){var e=this.searchFun(),t=p["a"].api+"/rebates-base/exportExcel",a=this.coin,i=this.userType,s=Object(n["a"])(Object(n["a"])({},{coin:a,userType:i}),e);Object(u["c"])(t,s,"Invite list export")},onDownExport:function(){var e={obscureField:this.downObscureField,email:this.downEmail,upId:this.upId},t=p["a"].api+"/rebates-base/down/exportExcel",a=this.coin,i=this.userType,s=Object(n["a"])(Object(n["a"])({},{coin:a,userType:i}),e);Object(u["c"])(t,s,"Invite subordinates list to export")},handleClose:function(e){this.userSet={},this.ratioForm={ratio:null},e?e():(this.showDownDialog=!1,this.showSetRatio=!1)},handleSizeChange:function(e){this.size=e,this.fetchRebatesBaseList()},handleCurrentChange:function(e){this.page=e,this.fetchRebatesBaseList(!1)},handleDownSizeChange:function(e){this.downSize=e,this.fetchRebatesBaseDownList()},handleDownCurrentChange:function(e){this.downPage=e,this.fetchRebatesBaseDownList(!1)}},created:function(){this.fetchRebatesBaseList()},watch:{"ratioForm.ratio":function(e,t){var a=this;e&&(this.timer&&clearTimeout(this.timer),this.timer=setTimeout((function(){e<0?a.ratioForm.ratio=0:e>100&&(a.ratioForm.ratio=100)}),300))}},computed:{coin:function(){return this.$store.getters.coinConfig},userType:function(){return this.$store.getters.accountConfig}},mounted:function(){},updated:function(){},beforeDestroy:function(){}},m=b,g=(a("3c35f"),a("2877")),h=Object(g["a"])(m,i,s,!1,null,"2f9f4c51",null);t["default"]=h.exports},"3c35f":function(e,t,a){"use strict";a("6dab")},"6dab":function(e,t,a){}}]);