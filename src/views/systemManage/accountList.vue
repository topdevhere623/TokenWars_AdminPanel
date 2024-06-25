<template>
  <div>
    <div class="searchBox">
      <div class="searchLeft">
        <!-- <el-input size="medium" v-model="searchForm.tel" placeholder="Please enter the user phone"  @keyup.enter.native="getTableList"></el-input>
      <el-select size="medium" clearable v-model="searchForm.roleId" @change="getTableList" placeholder="Please select the role">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select size="medium" clearable v-model="searchForm.flag" @change="getTableList" placeholder="Please select the account status">
        <el-option label="run" :value="1"></el-option>
        <el-option label="freeze" :value="2"></el-option>
      </el-select>
      <el-button size="medium" type="primary" icon="el-icon-search" @click="getTableList">搜索</el-button> -->
      </div>
      <div class="searchRight">
        <el-button type="primary" icon="el-icon-plus" @click="addFunc"
          >Increase</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      height="73vh"
      :header-cell-style="{
        'background-color': '#F6F6F6',
        'font-weight': '600',
        color: '#333',
        height: '20px',
      }"
      style="width: 100%"
    >
      <el-table-column prop="userName" label="username"> </el-table-column>
      <el-table-column prop="realName" label="Name"> </el-table-column>
      <el-table-column prop="phone" label="Phone number"> </el-table-column>
      <el-table-column prop="email" label="Mail"> </el-table-column>
      <!-- <el-table-column
      prop="age"
      label="age">
    </el-table-column> -->
      <el-table-column prop="roleName" label="Role"> </el-table-column>
      <!-- <el-table-column
      label="run/禁用">
      <template slot-scope="scope">
        <span>{{scope.row.status=='y'?'运行':'禁用'}}</span>
      </template>
    </el-table-column> -->
      <el-table-column prop="way" width="200px" label="operate">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click="editType(scope.row,1)">授权</el-button> -->
          <el-button size="mini" type="warning" @click="editType(scope.row, 2)"
            >Modify information</el-button
          >
          <!-- <el-button size="mini" type="info" @click="editType(scope.row,3)">修改密码</el-button> -->
          <el-button size="mini" type="danger" @click="deleteType(scope.row)"
            >delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pageBox" v-if="totalNum > 0">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchForm.current"
        :page-sizes="[10, 50, 100]"
        :page-size="searchForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="!ruleForm.id ? 'Add account' : 'Modify the account'"
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
        <el-form-item label="username" prop="userName" :rules="rules.blurRule">
          <el-input
            placeholder="please enter user name"
            v-model="ruleForm.userName"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="user password"
          prop="passWord"
          :rules="!ruleForm.id ? rules.passWord : rules.passWord2"
        >
          <el-input
            type="passWord"
            placeholder="Please enter the user password"
            v-model="ruleForm.passWord"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="username" prop="realName" :rules="rules.blurRule">
          <el-input
            placeholder="Please enter the real name of the user"
            v-model="ruleForm.realName"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Phone number" prop="phone" :rules="rules.phoneRule">
          <el-input
            placeholder="Please enter phone number"
            v-model.number="ruleForm.phone"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="Mail"
          :rules="[
            {
              required: true,
              message: 'Please input the email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input the correct email address',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input
            v-model="ruleForm.email"
            placeholder="Please input the email address"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Role" prop="roleId" :rules="rules.selectRule">
          <el-select
            v-model="ruleForm.roleId"
            placeholder="Please select the role"
            style="width: 240px"
          >
            <template v-for="item in roleList">
              <el-option
                :key="item.id"
                :label="item.roleName + '(' + item.remark + ')'"
                :value="item.id"
                v-if="item.roleStatus != 2"
              >
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="Account Status" prop="status">
            <el-radio-group v-model="ruleForm.status">
                <el-radio label="y">运行</el-radio>
                <el-radio label="n">冻结</el-radio>
            </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="change Password"
      :visible.sync="passDialogVisible"
      width="440px"
      :close-on-click-modal="false"
    >
      <el-form
        :model="passForm"
        :rules="rules"
        ref="passForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Old Password" prop="opass">
          <el-input
            type="passWord"
            placeholder="Please enter the old password"
            v-model="passForm.opass"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="npass">
          <el-input
            type="passWord"
            placeholder="Please enter a new password"
            v-model="passForm.npass"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="cpass">
          <el-input
            type="passWord"
            placeholder="Please enter the confirmation password"
            v-model="passForm.cpass"
            style="width: 240px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="passDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="resetpassWord('passForm')">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("You can't be empty age"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Please enter the digital value"));
        } else {
          if (value < 18) {
            callback(new Error("Must be 18 years old"));
          } else {
            callback();
          }
        }
      });
    };
    var phoneRule = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
      if (value === "") {
        return callback(new Error("Input can not be empty"));
      } else {
        if (!reg.test(value)) {
          callback(new Error("please enter a valid phone number"));
        } else {
          callback();
        }
      }
    };
    var passCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("Input can not be empty"));
      } else if (value.length < 8 || value.length > 20) {
        return callback(new Error("The password length must be 8 to 20 bits"));
      } else if (this.passForm.npass != this.passForm.cpass) {
        return callback(new Error("Two input passwords are inconsistent"));
      } else {
        return callback();
      }
    };
    return {
      totalNum: 0,
      searchForm: {
        page: 1,
        size: 10,
      },
      tableData: [],
      dialogVisible: false,
      passDialogVisible: false,
      ruleForm: {
        id: "",
        email: "",
        userName: "",
        passWord: "",
        realName: "",
        phone: "",
        roleId: "",
      },
      passForm: {
        uid: "",
        opass: "",
        npass: "",
        cpass: "",
      },
      rules: {
        passWord: [
          { required: true, message: "Please enter the password", trigger: "blur" },
          // { min: 8, max: 20, message: 'The minimum password is 8 digits-20位', trigger: 'blur' }
        ],
        passWord2: [
          { required: false, message: "Please enter the password", trigger: "blur" },
        ],
        blurRule: [{ required: true, message: "please enter", trigger: "blur" }],
        phoneRule: [{ required: true, validator: phoneRule, trigger: "blur" }],
        selectRule: [{ required: true, message: "please choose", trigger: "change" }],
        age: [{ required: true, validator: checkAge, trigger: "blur" }],
        opass: [
          { required: true, message: "Input can not be empty", trigger: "blur" },
          // { min: 8, max: 20, message: 'The password length must be 8 to 20 bits', trigger: 'blur' }
        ],
        npass: [
          { required: true, message: "Input can not be empty", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "The password length must be 8 to 20 bits",
            trigger: "blur",
          },
        ],
        cpass: [{ required: true, validator: passCheck, trigger: "blur" }],
      },
      roleList: [],
    };
  },
  created() {
    this.getTableList();
    this.getRoleList();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let ruleForm = { ...this.ruleForm };
          let res = null;
          if (this.ruleForm.id) {
            res = await this.$http.userEdit({ ...ruleForm });
          } else {
            res = await this.$http.userAdd({ ...ruleForm });
          }
          if (res) {
            this.$refs[formName].resetFields();
            this.$message.success("操作成功！");
            this.dialogVisible = false;
            this.getTableList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetpassWord(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let passForm = { ...this.passForm };
          passForm.cpass = undefined;
          let res = await this.$http.userEditPass({ ...passForm });
          if (res) {
            this.$message.success("Successful operation!");
            this.passDialogVisible = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteType(row) {
      this.$confirm(`Are you sure you want to delete $ {row.username} account?`, "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$http.userDelete({ id: row.id });
          if (res) {
            this.$message.success("Successful operation!");
            this.getTableList();
          }
        })
        .catch(() => {});
    },
    editType(row, type) {
      // type:1授权2修改信息3修改密码
      if (type == 2) {
        this.ruleForm = { ...row };
        this.dialogVisible = true;
      } else {
        this.passForm.uid = row.id;
        this.passDialogVisible = true;
        setTimeout(() => {
          this.$refs["passForm"].resetFields();
        });
      }
    },

    addFunc() {
      this.dialogVisible = true;
      this.ruleForm.id = "";
      this.ruleForm.email = "";
      this.ruleForm.userName = "";
      this.ruleForm.passWord = "";
      this.ruleForm.realName = "";
      this.ruleForm.phone = "";
    },
    async getTableList(val) {
      let res = await this.$http.userList({ ...this.searchForm });
      if (res) {
        this.tableData = res.records;
        this.totalNum = res.total;
      }
    },
    async getRoleList() {
      let res = await this.$http.roleDown();
      if (res) {
        this.roleList = res;
      }
    },
    handleSizeChange(val) {
      this.searchForm.page = 1;
      this.searchForm.size = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.searchForm.page = val;
      this.getTableList();
    },
  },
};
</script>

<style scoped></style>
