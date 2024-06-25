<template>
  <div>
    <div class="searchBox">
      <div class="searchLeft">
        <!-- <el-select size="medium" clearable v-model="searchForm.menuType" placeholder="Please choose the type" @change="getTableList">
          <el-option label="menu/栏目" value=""></el-option>
          <el-option label="menu" :value="1"></el-option>
          <el-option label="Column" :value="2"></el-option>
        </el-select> -->
        <!-- <el-button size="medium" type="primary" icon="el-icon-search" @click="getTableList">搜索</el-button> -->
      </div>
      <div class="searchRight">
        <el-select
          size="medium"
          clearable
          v-model="searchForm.roleId"
          @change="getTableList"
          placeholder="Please select the role"
        >
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName + '(' + item.remark + ')'"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="allotFunc"
          >assign permissions</el-button
        >
        <el-button
          size="medium"
          type="warning"
          icon="el-icon-plus"
          @click="addFunc"
          v-if="developer"
          >Add first -level module</el-button
        >
        <!-- <el-button size="medium" type="danger" @click="deleteMoreType" v-if="developer"><i class="el-icon-delete" style="margin-right:3px;"></i>批量删除</el-button> -->
      </div>
    </div>
    <el-table
      style="margin-bottom: 50px"
      :data="tableData"
      row-key="id"
      border
      :class="'mytables'"
      ref="multipleTable"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="{
        'background-color': '#F6F6F6',
        'font-weight': '600',
        color: '#333',
        height: '20px',
      }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.checked"
            @change="toselect(scope.row)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="menuName" label="Module name"> </el-table-column>
      <el-table-column prop="permission" label="Identify"> </el-table-column>
      <el-table-column prop="path" label="path"> </el-table-column>
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="" label="menu/Column">
        <template slot-scope="scope">
          <div>{{ scope.row.menuType == 1 ? "menu" : "Column" }}</div>
          <!-- <div @click="changeStatusFunc" style="display:inline-block;">
            <el-switch 
            v-model="scope.row.menuType"
            :disabled="!developer"
            @change="changeStatus(scope.row)"
            class="demo"
            active-color="#00A854"
            :active-text="scope.row.menuType==1?'菜单':'栏目'"
            active-value="1"
            inactive-color="#999"
            :inactive-text="scope.row.menuType==1?'菜单':'栏目'"
            inactive-value="0"/>
          </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="" label="operate" v-if="developer" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editFunc(scope.row)">
            <i class="el-icon-edit" style="margin-right: 3px"></i>Revise
          </el-button>
          <el-button size="mini" type="warning" @click="addSubFunc(scope.row)">
            <i class="el-icon-edit" style="margin-right: 3px"></i>New enlarged module
          </el-button>
          <el-button size="mini" type="danger" @click="deleteType(scope.row)">
            <i class="el-icon-delete" style="margin-right: 3px"></i>delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      @close="beforeClose"
      :title="!ruleForm.id ? 'Add module' : 'Modify the module'"
      :visible.sync="dialogVisible"
      width="430px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Module name" prop="menuName" :rules="rules.blurRule">
          <el-input
            placeholder="Please enter the module name"
            v-model.trim="ruleForm.menuName"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Module logo" prop="permission">
          <el-input
            placeholder="Please enter the module logo"
            v-model.trim="ruleForm.permission"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Module path">
          <el-input
            placeholder="Please enter the module path"
            v-model.trim="ruleForm.path"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Module sorting">
          <el-input
            placeholder="Please enter sorting"
            v-model.trim="ruleForm.orderBy"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Module type" prop="menuType">
          <el-radio-group v-model="ruleForm.menuType">
            <el-radio :label="1">menu</el-radio>
            <el-radio :label="2">Column</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRowClick: false,
      isAllSelectClick: false,
      totalNum: 0,
      searchForm: {
        menuName: undefined,
        roleId: "",
      },
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        id: "",
        menuName: "",
        orderBy: "",
        permission: "",
        path: "",
        parentId: "",
        menuType: 1,
      },
      rules: {
        blurRule: [{ required: true, message: "please enter", trigger: "blur" }],
      },
      roleList: [],
      multipleSelection: [],
      developer: false, //开发者修改路由
    };
  },
  created() {
    this.getTableList();
    this.getRoleList();
    if (this.$selfFunc.etUrlCode("dev") == "111111") {
      this.developer = true;
    }
  },
  methods: {
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          data[i].label = data[i].product_type_langs_map["zh_CN"];
          data[i].children = undefined;
        } else {
          data[i].label = data[i].product_type_langs_map["zh_CN"];
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    // 更改批量选中
    toselect(row) {
      //每一行单个单个点击
      this.isRowClick = true;
      if (row.checked) {
        this.initSelect(row.children, "row");
      } else {
        this.clearSelect(row.children);
      }
      this.initDD();
      this.isRowClick = false;
      // this.$refs.multipleTable.toggleRowSelection(row);
    },
    initDD() {
      this.isAllSelectClick = true;
      this.$refs.multipleTable.clearSelection();
      this.togg(this.tableData);
      this.isAllSelectClick = false;
    },
    togg(val) {
      if (!val) return;
      val.forEach((item) => {
        if (item.checked) this.$refs.multipleTable.toggleRowSelection(item);
        if (item.children && item.children.length > 0) this.togg(item.children);
      });
    },
    clearSelect(val) {
      if (!val) return;
      val.forEach((item) => {
        this.$set(item, "checked", false);
        if (item.children && item.children.length > 0) this.clearSelect(item.children);
      });
    },
    initSelect(val, type) {
      if (!val) return;
      val.forEach((item) => {
        if (type == "init") {
          if (item.checked) {
            this.multipleSelection.push(item);
          }
        } else if (type == "row") {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", true);
        }
        if (item.children && item.children.length > 0)
          this.initSelect(item.children, type);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (this.isAllSelectClick) return;
      this.clearSelect(this.tableData);
      this.initSelect(val);
      this.initDD();
      if (!this.isRowClick && !this.tableData[0].checked) {
        this.clearBatch();
        this.clearSelect(this.tableData);
        return;
      }
    },
    clearBatch() {
      this.$refs.multipleTable.clearSelection();
    },
    allotFunc() {
      if (this.searchForm.roleId === "") {
        this.$message.error("Please select the role you need to distribute");
        return;
      }
      this.$confirm(`Are you sure to allocate it?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          let menuId = this.multipleSelection.map((x) => x.id);
          let res = await this.$http.roleAuth({
            roleId: this.searchForm.roleId,
            menuId: menuId,
          });
          if (res) {
            this.multipleSelection = [];
            this.getTableList();
            this.searchForm.roleId = "";
            this.$message.success("Successful operation!");
          }
        })
        .catch(() => {});
    },
    changeStatusFunc() {
      if (!this.developer) {
        this.$message.warning("This function is for developers only!");
        return;
      }
    },
    // 修改状态
    async changeStatus(row) {
      let res = await this.$http.updatePermissionMenu({
        id: row.id,
        menuType: row.menuType == 1 ? "1" : "0",
      });
      if (res) {
        this.$message.success("Successful operation!");
        this.getTableList();
      }
    },
    async getTableList() {
      let res = await this.$http.menuList({ ...this.searchForm });
      if (res) {
        this.tableData = res;
        this.multipleSelection = [];
        this.initSelect(this.tableData, "init");
      }
    },
    async getRoleList() {
      let res = await this.$http.roleDown();
      if (res) {
        this.roleList = res;
      }
    },
    beforeClose() {
      this.ruleForm.menuName = "";
      this.ruleForm.permission = "";
      this.ruleForm.path = "";
      this.ruleForm.parentId = "";
      this.ruleForm.id = "";
      this.ruleForm.menuType = 1;
    },
    addFunc() {
      this.dialogVisible = true;
    },
    addSubFunc(row) {
      this.ruleForm.parentId = row.id;
      console.log(this.ruleForm);
      this.dialogVisible = true;
    },
    editFunc(row) {
      this.ruleForm = { ...row };
      this.dialogVisible = true;
    },
    deleteMoreType() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("Please select the module you need to delete!");
        return;
      }
      this.$confirm(`Are you sure to delete in batches?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          let menuId = this.multipleSelection.map((x) => x.id);
          let res = await this.$http.batchDelPermission({ ids: menuId });
          if (res) {
            this.$message.success("Successful operation!");
            this.getTableList();
          }
        })
        .catch(() => {});
    },
    deleteType(row) {
      this.$confirm(`Are you sure to delete ${row.menuname} module?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          console.log(row);
          let res = await this.$http.deleteMenu({ id: row.id });
          if (res) {
            this.$message.success("Successful operation!");
            this.getTableList();
          }
        })
        .catch(() => {});
    },
    async submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let res = null;
          if (this.ruleForm.id) {
            console.log(this.ruleForm);
            res = await this.$http.updateMenu({ ...this.ruleForm });
          } else {
            res = await this.$http.addMenu({ ...this.ruleForm });
          }
          if (res) {
            this.dialogVisible = false;
            this.$message.success("Successful operation!");
            this.getTableList();
            this.$refs["ruleForm"].resetFields();
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style scoped></style>
