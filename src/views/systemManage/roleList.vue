<template>
  <div>
    <div class="searchBox">
      <div class="searchLeft">
        <!-- <el-input size="medium" v-model="searchForm.name" placeholder="请输入角色名称"  @keyup.enter.native="getTableList"></el-input>
      <el-button size="medium" type="primary" icon="el-icon-search" @click="getTableList">搜索</el-button> -->
      </div>
      <div class="searchRight">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addFunc"
          >Increase</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="{
        'background-color': '#F6F6F6',
        'font-weight': '600',
        color: '#333',
        height: '20px',
      }"
      height="73vh"
    >
      <el-table-column prop="roleName" label="Role Name"> </el-table-column>
      <el-table-column prop="remark" label="Character remark"> </el-table-column>
      <el-table-column prop="roleStatus" label="state">
        <template slot-scope="scope">
          <span>{{ scope.row.roleStatus == "1" ? "Open up" : "Disable" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="way" label="operate">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editType(scope.row)"
            >Revise</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="dialogVisible"
      :title="!ruleForm.id ? 'Add a role' : 'Editor'"
      :visible.sync="dialogVisible"
      width="440px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Role Name" prop="roleName" :rules="rules.roleName">
          <el-input
            placeholder="Please enter the character name"
            v-model="ruleForm.roleName"
            oninput="if(value.length > 20)value=value.slice(0, 20)"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Character remark" prop="remark" :rules="rules.remark">
          <el-input
            placeholder="Please enter the character's note"
            v-model="ruleForm.remark"
            oninput="if(value.length > 50)value=value.slice(0, 50)"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Character state" prop="roleStatus">
          <el-radio-group v-model="ruleForm.roleStatus">
            <el-radio :label="1">Open up</el-radio>
            <el-radio :label="2">Disable</el-radio>
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
    var checkName = (rule, value, callback) => {
      let reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$");
      if (!value) {
        return callback(new Error("Please enter the character name"));
      } else if (!reg.test(value)) {
        return callback(new Error("Only support Chinese, English, numbers"));
      } else if (value.length < 2 || value.length > 20) {
        return callback(new Error("The length is from 2 to 20 characters"));
      } else {
        callback();
      }
    };
    var checkremark = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Please enter the English logo"));
      } else {
        const reg = /^[0-9a-zA-Z]+$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("You can only enter English, numbers"));
        }
      }
    };
    return {
      searchForm: {
        name: "",
      },
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        id: "",
        roleName: "",
        remark: "",
        roleStatus: 1,
      },
      rules: {
        roleName: [
          {
            required: true,
            message: "Please enter the character name!",
            trigger: "blur",
          },
        ],
        remark: [
          {
            required: true,
            message: "Please enter the character's note!",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = null;
          if (this.ruleForm.id) {
            res = await this.$http.roleUpdate({ ...this.ruleForm });
          } else {
            res = await this.$http.roleAdd({ ...this.ruleForm });
          }
          if (res) {
            this.$message.success("Successful operation!");
            this.dialogVisible = false;
            this.getTableList();
          }
        } else {
          this.$message.error("No permission access");
          // console.log("error submit!!");
          return false;
        }
      });
    },
    deleteType(row) {
      this.$confirm(`Are you sure to delete ${row.rolename}?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.roleDelete({ rid: row.id });
          if (res) {
            this.$message.success("Successful operation!");
            this.getTableList();
          }
        })
        .catch(() => {});
    },
    editType(row) {
      this.ruleForm = { ...row };
      // this.ruleForm.id=row.id;
      // this.ruleForm.name=row.name;
      // this.ruleForm.remark=row.remark;
      this.dialogVisible = true;
    },

    addFunc() {
      this.ruleForm.id = "";
      this.ruleForm.roleName = "";
      this.ruleForm.remark = "";
      this.ruleForm.roleStatus = 1;
      this.dialogVisible = true;
    },
    async getTableList() {
      let res = await this.$http.roleList();
      if (res) {
        this.tableData = res.records;
      }
    },
  },
};
</script>

<style scoped>
.el-table {
  width: calc(100% - 10px);
}
</style>
