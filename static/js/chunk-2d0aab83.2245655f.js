(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0aab83"],{"11e2":function(e,t,r){"use strict";r.r(t);r("498a");var l=function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"searchBox"},[t("div",{staticClass:"searchLeft"}),t("div",{staticClass:"searchRight"},[t("el-select",{attrs:{size:"medium",clearable:"",placeholder:"Please select the role"},on:{change:e.getTableList},model:{value:e.searchForm.roleId,callback:function(t){e.$set(e.searchForm,"roleId",t)},expression:"searchForm.roleId"}},e._l(e.roleList,(function(e){return t("el-option",{key:e.id,attrs:{label:e.roleName+"("+e.remark+")",value:e.id}})})),1),t("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-search"},on:{click:e.allotFunc}},[e._v("assign permissions")]),e.developer?t("el-button",{attrs:{size:"medium",type:"warning",icon:"el-icon-plus"},on:{click:e.addFunc}},[e._v("Add first -level module")]):e._e()],1)]),t("el-table",{ref:"multipleTable",class:"mytables",staticStyle:{"margin-bottom":"50px"},attrs:{data:e.tableData,"row-key":"id",border:"","default-expand-all":"","tree-props":{children:"children",hasChildren:"hasChildren"},"header-cell-style":{"background-color":"#F6F6F6","font-weight":"600",color:"#333",height:"20px"}},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-checkbox",{on:{change:function(t){return e.toselect(r.row)}},model:{value:r.row.checked,callback:function(t){e.$set(r.row,"checked",t)},expression:"scope.row.checked"}})]}}])}),t("el-table-column",{attrs:{prop:"menuName",label:"Module name"}}),t("el-table-column",{attrs:{prop:"permission",label:"Identify"}}),t("el-table-column",{attrs:{prop:"path",label:"path"}}),t("el-table-column",{attrs:{prop:"id",label:"id"}}),t("el-table-column",{attrs:{prop:"",label:"menu/Column"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("div",[e._v(e._s(1==r.row.menuType?"menu":"Column"))])]}}])}),e.developer?t("el-table-column",{attrs:{prop:"",label:"operate",width:"300px"},scopedSlots:e._u([{key:"default",fn:function(r){return[t("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.editFunc(r.row)}}},[t("i",{staticClass:"el-icon-edit",staticStyle:{"margin-right":"3px"}}),e._v("Revise ")]),t("el-button",{attrs:{size:"mini",type:"warning"},on:{click:function(t){return e.addSubFunc(r.row)}}},[t("i",{staticClass:"el-icon-edit",staticStyle:{"margin-right":"3px"}}),e._v("New enlarged module ")]),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.deleteType(r.row)}}},[t("i",{staticClass:"el-icon-delete",staticStyle:{"margin-right":"3px"}}),e._v("delete ")])]}}],null,!1,1790118818)}):e._e()],1),t("el-dialog",{attrs:{title:e.ruleForm.id?"Modify the module":"Add module",visible:e.dialogVisible,width:"430px","close-on-click-modal":!1},on:{close:e.beforeClose,"update:visible":function(t){e.dialogVisible=t}}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"Module name",prop:"menuName",rules:e.rules.blurRule}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"Please enter the module name"},model:{value:e.ruleForm.menuName,callback:function(t){e.$set(e.ruleForm,"menuName","string"===typeof t?t.trim():t)},expression:"ruleForm.menuName"}})],1),t("el-form-item",{attrs:{label:"Module logo",prop:"permission"}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"Please enter the module logo"},model:{value:e.ruleForm.permission,callback:function(t){e.$set(e.ruleForm,"permission","string"===typeof t?t.trim():t)},expression:"ruleForm.permission"}})],1),t("el-form-item",{attrs:{label:"Module path"}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"Please enter the module path"},model:{value:e.ruleForm.path,callback:function(t){e.$set(e.ruleForm,"path","string"===typeof t?t.trim():t)},expression:"ruleForm.path"}})],1),t("el-form-item",{attrs:{label:"Module sorting"}},[t("el-input",{staticStyle:{width:"240px"},attrs:{placeholder:"Please enter sorting"},model:{value:e.ruleForm.orderBy,callback:function(t){e.$set(e.ruleForm,"orderBy","string"===typeof t?t.trim():t)},expression:"ruleForm.orderBy"}})],1),t("el-form-item",{attrs:{label:"Module type",prop:"menuType"}},[t("el-radio-group",{model:{value:e.ruleForm.menuType,callback:function(t){e.$set(e.ruleForm,"menuType",t)},expression:"ruleForm.menuType"}},[t("el-radio",{attrs:{label:1}},[e._v("menu")]),t("el-radio",{attrs:{label:2}},[e._v("Column")])],1)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("Cancel")]),t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("Sure")])],1)],1)],1)},n=[],i=r("5530"),a=r("c7eb"),o=r("1da1"),s=(r("d81d"),r("14d9"),r("d3b7"),r("159b"),{data:function(){return{isRowClick:!1,isAllSelectClick:!1,totalNum:0,searchForm:{menuName:void 0,roleId:""},tableData:[],dialogVisible:!1,ruleForm:{id:"",menuName:"",orderBy:"",permission:"",path:"",parentId:"",menuType:1},rules:{blurRule:[{required:!0,message:"please enter",trigger:"blur"}]},roleList:[],multipleSelection:[],developer:!1}},created:function(){this.getTableList(),this.getRoleList(),"111111"==this.$selfFunc.etUrlCode("dev")&&(this.developer=!0)},methods:{getTreeData:function(e){for(var t=0;t<e.length;t++)e[t].children.length<1?(e[t].label=e[t].product_type_langs_map["zh_CN"],e[t].children=void 0):(e[t].label=e[t].product_type_langs_map["zh_CN"],this.getTreeData(e[t].children));return e},toselect:function(e){this.isRowClick=!0,e.checked?this.initSelect(e.children,"row"):this.clearSelect(e.children),this.initDD(),this.isRowClick=!1},initDD:function(){this.isAllSelectClick=!0,this.$refs.multipleTable.clearSelection(),this.togg(this.tableData),this.isAllSelectClick=!1},togg:function(e){var t=this;e&&e.forEach((function(e){e.checked&&t.$refs.multipleTable.toggleRowSelection(e),e.children&&e.children.length>0&&t.togg(e.children)}))},clearSelect:function(e){var t=this;e&&e.forEach((function(e){t.$set(e,"checked",!1),e.children&&e.children.length>0&&t.clearSelect(e.children)}))},initSelect:function(e,t){var r=this;e&&e.forEach((function(e){"init"==t?e.checked&&r.multipleSelection.push(e):r.$set(e,"checked",!0),e.children&&e.children.length>0&&r.initSelect(e.children,t)}))},handleSelectionChange:function(e){if(this.multipleSelection=e,!this.isAllSelectClick)return this.clearSelect(this.tableData),this.initSelect(e),this.initDD(),this.isRowClick||this.tableData[0].checked?void 0:(this.clearBatch(),void this.clearSelect(this.tableData))},clearBatch:function(){this.$refs.multipleTable.clearSelection()},allotFunc:function(){var e=this;""!==this.searchForm.roleId?this.$confirm("Are you sure to allocate it?","hint",{confirmButtonText:"Sure",cancelButtonText:"Cancel",type:"warning"}).then(Object(o["a"])(Object(a["a"])().mark((function t(){var r,l;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.multipleSelection.map((function(e){return e.id})),t.next=3,e.$http.roleAuth({roleId:e.searchForm.roleId,menuId:r});case 3:l=t.sent,l&&(e.multipleSelection=[],e.getTableList(),e.searchForm.roleId="",e.$message.success("Successful operation!"));case 5:case"end":return t.stop()}}),t)})))).catch((function(){})):this.$message.error("Please select the role you need to distribute")},changeStatusFunc:function(){this.developer||this.$message.warning("This function is for developers only!")},changeStatus:function(e){var t=this;return Object(o["a"])(Object(a["a"])().mark((function r(){var l;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$http.updatePermissionMenu({id:e.id,menuType:1==e.menuType?"1":"0"});case 2:l=r.sent,l&&(t.$message.success("Successful operation!"),t.getTableList());case 4:case"end":return r.stop()}}),r)})))()},getTableList:function(){var e=this;return Object(o["a"])(Object(a["a"])().mark((function t(){var r;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.menuList(Object(i["a"])({},e.searchForm));case 2:r=t.sent,r&&(e.tableData=r,e.multipleSelection=[],e.initSelect(e.tableData,"init"));case 4:case"end":return t.stop()}}),t)})))()},getRoleList:function(){var e=this;return Object(o["a"])(Object(a["a"])().mark((function t(){var r;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.roleDown();case 2:r=t.sent,r&&(e.roleList=r);case 4:case"end":return t.stop()}}),t)})))()},beforeClose:function(){this.ruleForm.menuName="",this.ruleForm.permission="",this.ruleForm.path="",this.ruleForm.parentId="",this.ruleForm.id="",this.ruleForm.menuType=1},addFunc:function(){this.dialogVisible=!0},addSubFunc:function(e){this.ruleForm.parentId=e.id,console.log(this.ruleForm),this.dialogVisible=!0},editFunc:function(e){this.ruleForm=Object(i["a"])({},e),this.dialogVisible=!0},deleteMoreType:function(){var e=this;0!=this.multipleSelection.length?this.$confirm("Are you sure to delete in batches?","hint",{confirmButtonText:"Sure",cancelButtonText:"Cancel",type:"warning"}).then(Object(o["a"])(Object(a["a"])().mark((function t(){var r,l;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.multipleSelection.map((function(e){return e.id})),t.next=3,e.$http.batchDelPermission({ids:r});case 3:l=t.sent,l&&(e.$message.success("Successful operation!"),e.getTableList());case 5:case"end":return t.stop()}}),t)})))).catch((function(){})):this.$message.error("Please select the module you need to delete!")},deleteType:function(e){var t=this;this.$confirm("Are you sure to delete ".concat(e.menuname," module?"),"hint",{confirmButtonText:"Sure",cancelButtonText:"Cancel",type:"warning"}).then(Object(o["a"])(Object(a["a"])().mark((function r(){var l;return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return console.log(e),r.next=3,t.$http.deleteMenu({id:e.id});case 3:l=r.sent,l&&(t.$message.success("Successful operation!"),t.getTableList());case 5:case"end":return r.stop()}}),r)})))).catch((function(){}))},submitForm:function(){var e=this;return Object(o["a"])(Object(a["a"])().mark((function t(){return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.$refs["ruleForm"].validate(function(){var t=Object(o["a"])(Object(a["a"])().mark((function t(r){var l;return Object(a["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!r){t.next=15;break}if(l=null,!e.ruleForm.id){t.next=9;break}return console.log(e.ruleForm),t.next=6,e.$http.updateMenu(Object(i["a"])({},e.ruleForm));case 6:l=t.sent,t.next=12;break;case 9:return t.next=11,e.$http.addMenu(Object(i["a"])({},e.ruleForm));case 11:l=t.sent;case 12:l&&(e.dialogVisible=!1,e.$message.success("Successful operation!"),e.getTableList(),e.$refs["ruleForm"].resetFields()),t.next=16;break;case 15:return t.abrupt("return",!1);case 16:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})))()}}}),c=s,u=r("2877"),d=Object(u["a"])(c,l,n,!1,null,"0c3a9415",null);t["default"]=d.exports}}]);