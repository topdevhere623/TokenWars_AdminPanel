(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e1af15f"],{5224:function(e,t,a){},"9a94":function(e,t,a){"use strict";a("5224")},d9e6:function(e,t,a){"use strict";a.r(t);var r=function(){var e,t,a,r=this,n=r._self._c;return n("div",{staticClass:"page-wrapper"},[n("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:r.tableData,border:""}},[n("el-table-column",{attrs:{prop:"id",label:"Chain ID",align:"center"}}),n("el-table-column",{attrs:{prop:"chain",label:"Chain name",align:"center"}}),n("el-table-column",{attrs:{prop:"rpc",label:"rpc",align:"center"},scopedSlots:r._u([{key:"default",fn:function(e){return[n("span",{staticClass:"blueColor publick-button cursor",on:{click:function(t){return r.openRpc(e.row)}}},[r._v(r._s(e.row.rpc))])]}}])}),n("el-table-column",{attrs:{prop:"gas",label:"A withdrawal fee",align:"center"}}),n("el-table-column",{attrs:{prop:"chainCoin",label:"Fees",align:"center"}}),n("el-table-column",{attrs:{prop:"confirmTheHeight",label:"Several confirmation",align:"center"}}),n("el-table-column",{attrs:{prop:"minGasForce",label:"Trigger forced collection GAS(USDT）",align:"center",width:"120px"},scopedSlots:r._u([{key:"default",fn:function(e){return[n("p",{staticStyle:{color:"#f56c6c"}},[r._v(r._s(e.row.minGasForce))])]}}])}),n("el-table-column",{attrs:{label:"state",align:"center"},scopedSlots:r._u([{key:"default",fn:function(e){return[0==e.row.isDisplay?n("p",{staticStyle:{color:"#67c23a"}},[r._v("activated")]):n("p",{staticStyle:{color:"#f56c6c"}},[r._v("stopped")])]}}])}),n("el-table-column",{attrs:{label:"operate",align:"center"},scopedSlots:r._u([{key:"default",fn:function(e){return[n("span",{staticClass:"blueColor publick-button cursor",on:{click:function(t){return r.setFun(e.row)}}},[r._v("Configuration")]),0==e.row.isDisplay?n("span",{staticClass:"blueColor publick-button cursor",on:{click:function(t){return r.operatingFunc(e.row,"close")}}},[r._v(" Stop ")]):n("span",{staticClass:"blueColor publick-button cursor",on:{click:function(t){return r.operatingFunc(e.row,"open")}}},[r._v("Open up ")])]}}])})],1),r.baseUserPage&&r.baseUserPage.total?n("el-pagination",{staticClass:"public-pagination",attrs:{background:"","current-page":r.page,"page-sizes":r.pagination.pageSizes,"page-size":r.size,layout:" sizes, prev, pager, next, jumper",total:r.baseUserPage.total},on:{"size-change":r.handleSizeChange,"current-change":r.handleCurrentChange}}):r._e(),n("el-dialog",{attrs:{title:"Chain chain configuration",visible:r.dialogVisible,width:"40%"},on:{"update:visible":function(e){r.dialogVisible=e}}},[n("el-form",{ref:"ruleForm",attrs:{model:r.ruleForm,"label-width":"150px",rules:r.rules}},[n("el-form-item",{attrs:{label:"A withdrawal handling fee GAS",prop:"gas",rules:r.rules.blur}},[n("el-input",{attrs:{type:"number",autocomplete:"off"},model:{value:r.ruleForm.gas,callback:function(e){r.$set(r.ruleForm,"gas",e)},expression:"ruleForm.gas"}})],1),n("el-form-item",{attrs:{label:"Number of confirmation times",prop:"confirmTheHeight",rules:r.rules.blur}},[n("el-input",{attrs:{type:"number",autocomplete:"off"},model:{value:r.ruleForm.confirmTheHeight,callback:function(e){r.$set(r.ruleForm,"confirmTheHeight",r._n(e))},expression:"ruleForm.confirmTheHeight"}})],1),n("el-form-item",{attrs:{label:"Trigger forced collection GAS",prop:"minGasForce",rules:r.rules.blur}},[n("el-input",{attrs:{type:"number",autocomplete:"off"},model:{value:r.ruleForm.minGasForce,callback:function(e){r.$set(r.ruleForm,"minGasForce",e)},expression:"ruleForm.minGasForce"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){r.dialogVisible=!1}}},[r._v("Cancel")]),n("el-button",{attrs:{type:"primary"},on:{click:r.saveFunc}},[r._v("Sure")])],1)],1),n("el-dialog",{attrs:{title:"Switch RPC",visible:r.rpcDialogVisible,width:"30%"},on:{"update:visible":function(e){r.rpcDialogVisible=e}}},[n("div",{staticClass:"rpc-box"},[n("p",[r._v("main")]),n("div",{staticClass:"rpc-item"},[n("el-radio",{attrs:{label:"1"},model:{value:r.rpcVal,callback:function(e){r.rpcVal=e},expression:"rpcVal"}},[r._v(r._s(null===(e=r.row)||void 0===e?void 0:e.rpcUrl1))])],1),n("p",{staticClass:"mgr-t"},[r._v("spare")]),n("div",{staticClass:"rpc-item"},[n("div",[n("el-radio",{attrs:{label:"2"},model:{value:r.rpcVal,callback:function(e){r.rpcVal=e},expression:"rpcVal"}},[r._v(r._s(null===(t=r.row)||void 0===t?void 0:t.rpcUrl2))]),n("el-radio",{attrs:{label:"3"},model:{value:r.rpcVal,callback:function(e){r.rpcVal=e},expression:"rpcVal"}},[r._v(r._s(null===(a=r.row)||void 0===a?void 0:a.rpcUrl3))])],1)])]),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(e){r.rpcDialogVisible=!1}}},[r._v("Cancel")]),n("el-button",{attrs:{type:"primary"},on:{click:r.rpcSaveFunc}},[r._v("Sure")])],1)])],1)},n=[],l=a("c7eb"),i=a("5530"),o=a("1da1"),s=a("901e"),c=a.n(s),u=a("ed08"),p=a("1b80"),b={name:"walletOneDollarLottery",components:{},data:function(){return{page:1,size:20,tableData:null,baseUserPage:null,dialogVisible:!1,rpcDialogVisible:!1,ruleForm:{},rules:{blur:[{required:!0,message:"please enter",trigger:"blur"}]},row:null,rpcVal:null}},mixins:[p["a"]],methods:{bigNumber:c.a,timeForStr:u["h"],getTableList:function(){var e=arguments,t=this;return Object(o["a"])(Object(l["a"])().mark((function a(){var r,n,o,s,c;return Object(l["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=!(e.length>0&&void 0!==e[0])||e[0],n=t.size,o=t.page,r&&(t.page=1,o=1),s=Object(i["a"])({},{size:n,page:o}),a.next=7,t.$http.transferChainPageList(s);case 7:c=a.sent,c&&(t.tableData=c.records);case 9:case"end":return a.stop()}}),a)})))()},setFun:function(e){this.ruleForm=e,this.dialogVisible=!0},operatingFunc:function(e,t){var a=this;this.$confirm("Determine".concat("open"==t?"Open up":"Stop","?"),"hint",{confirmButtonText:"Sure",cancelButtonText:"Cancel",type:"warning"}).then(Object(o["a"])(Object(l["a"])().mark((function r(){var n;return Object(l["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,a.$http.transferChainUpdate({id:e.id,isDisplay:"open"!=t});case 2:n=r.sent,n&&(a.getTableList(),a.$message.success("Successful operation"));case 4:case"end":return r.stop()}}),r)})))).catch((function(e){console.error(e)}))},saveFunc:function(){var e=this;this.$refs.ruleForm.validate(function(){var t=Object(o["a"])(Object(l["a"])().mark((function t(a){var r;return Object(l["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=7;break}return t.next=3,e.$http.transferChainUpdate(Object(i["a"])({},e.ruleForm));case 3:r=t.sent,r&&(e.dialogVisible=!1,e.getTableList()),t.next=9;break;case 7:return console.log("error submit!!"),t.abrupt("return",!1);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())},rpcSaveFunc:function(e){var t=this;return Object(o["a"])(Object(l["a"])().mark((function e(){var a;return Object(l["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.transferChainUpdate({id:t.row.id,rpcNum:t.rpcVal});case 2:a=e.sent,a&&(t.rpcDialogVisible=!1,t.getTableList());case 4:case"end":return e.stop()}}),e)})))()},openRpc:function(e){this.row=e,this.rpcVal=String(e.rpcNum),this.rpcDialogVisible=!0},handleSizeChange:function(e){this.size=e,this.getTableList()},handleCurrentChange:function(e){this.page=e,this.getTableList(!1)}},created:function(){this.getTableList()},mounted:function(){},updated:function(){},beforeDestroy:function(){}},f=b,d=(a("9a94"),a("2877")),g=Object(d["a"])(f,r,n,!1,null,"12d4efd0",null);t["default"]=g.exports}}]);