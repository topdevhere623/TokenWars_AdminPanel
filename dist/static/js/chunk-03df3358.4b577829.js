(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-03df3358"],{6658:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"page-wrapper"},[e("el-table",{staticClass:"public-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[e("el-table-column",{key:"1",attrs:{prop:"id",label:"ID",align:"center"}}),e("el-table-column",{key:"5",attrs:{prop:"channelName",label:"Channel name",align:"center"}}),e("el-table-column",{attrs:{prop:"gasWalletAddress",label:"Proportion of fees",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return[e("p",[t._v(t._s(100*n.row.fee)+"%")])]}}])}),e("el-table-column",{attrs:{prop:"gasWalletAddress",label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return["TRUE"==n.row.status?e("p",{staticStyle:{color:"#67c23a"}},[t._v("Open up")]):e("p",{staticStyle:{color:"#f56c6c"}},[t._v("Disable")])]}}])}),e("el-table-column",{key:"15",attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(n){return["TRUE"==n.row.status?e("span",{staticClass:"blueColor publick-button cursor",on:{click:function(e){return t.operatingFunc(n.row,"close")}}},[t._v(" Disable ")]):e("span",{staticClass:"blueColor publick-button cursor",on:{click:function(e){return t.operatingFunc(n.row,"open")}}},[t._v("Open up ")])]}}])})],1)],1)},c=[],r=n("c7eb"),o=n("1da1"),s=(n("bc3a"),n("ed08")),l=n("1b80"),u={name:"ExternalTokenManagement",components:{},data:function(){return{tableData:null}},mixins:[l["a"]],methods:{timeForStr:s["h"],getTableList:function(){var t=arguments,e=this;return Object(o["a"])(Object(r["a"])().mark((function n(){var a;return Object(r["a"])().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return!(t.length>0&&void 0!==t[0])||t[0],n.next=3,e.$http.getLegalPageList();case 3:a=n.sent,a&&(e.tableData=a);case 5:case"end":return n.stop()}}),n)})))()},operatingFunc:function(t,e){var n=this;this.$confirm("Determine".concat("open"==e?"Open up":"Stop","?"),"hint",{confirmButtonText:"Sure",cancelButtonText:"Cancel",type:"warning"}).then(Object(o["a"])(Object(r["a"])().mark((function a(){var c;return Object(r["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,n.$http.setLegalupdateStatus({id:t.id,status:"open"==e});case 2:c=a.sent,c&&(n.getTableList(),n.$message.success("Successful operation"));case 4:case"end":return a.stop()}}),a)})))).catch((function(t){console.error(t)}))}},created:function(){this.getTableList()},computed:{coin:function(){return this.$store.getters.coinConfig},userType:function(){return this.$store.getters.accountConfig}},mounted:function(){},updated:function(){},beforeDestroy:function(){}},i=u,p=(n("969c"),n("2877")),b=Object(p["a"])(i,a,c,!1,null,"58b847b4",null);e["default"]=b.exports},"76c9":function(t,e,n){},"969c":function(t,e,n){"use strict";n("76c9")}}]);