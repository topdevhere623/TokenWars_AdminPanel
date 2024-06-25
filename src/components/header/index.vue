<template>
  <div class="headerBox">
    <div class="headerL">
      <el-breadcrumb
        separator="/"
        v-if="subNav && subNav.length > 0"
        class="breadcrumbBox"
      >
        <template v-for="(item, index) in subNav">
          <el-breadcrumb-item :key="index" v-if="item.path"
            ><span @click="toPage(item.path)">{{ item.name }}</span></el-breadcrumb-item
          >
          <el-breadcrumb-item :key="item.name" v-else>{{ item.name }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div class="headerR">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          Basic operation<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="a">修改密码</el-dropdown-item> -->
          <el-dropdown-item command="b">quit</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="change Password" :visible.sync="dialogVisible" width="440px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="Old Password" prop="oldpass">
          <el-input
            type="password"
            placeholder="Please enter the old password"
            v-model="ruleForm.oldpass"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="orgpass">
          <el-input
            type="password"
            placeholder="Please enter a new password"
            v-model="ruleForm.orgpass"
            style="width: 240px"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmpass">
          <el-input
            type="password"
            placeholder="Please enter the confirmation password"
            v-model="ruleForm.confirmpass"
            style="width: 240px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="resetPassWord('ruleForm')">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["subNav"],
  data() {
    var passCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("Input can not be empty"));
      } else if (value.length < 6 || value.length > 20) {
        return callback(new Error("The password length must be 6 to 20 bits"));
      } else if (this.ruleForm.orgpass != this.ruleForm.confirmpass) {
        return callback(new Error("Two input passwords are inconsistent"));
      } else {
        return callback();
      }
    };
    return {
      dialogVisible: false,
      ruleForm: {
        oldpass: "",
        orgpass: "",
        confirmpass: "",
      },
      rules: {
        oldpass: [
          { required: true, message: "Input can not be empty", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "The password length must be 6 to 20 bits",
            trigger: "blur",
          },
        ],
        orgpass: [
          { required: true, message: "Input can not be empty", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "The password length must be 6 to 20 bits",
            trigger: "blur",
          },
        ],
        confirmpass: [{ required: true, validator: passCheck, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
    userInfoFunc() {
      this.$router.push({ name: "index" });
    },
    exit() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push({ name: "login" });
    },
    async resetPassWord(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.updateUserPass({ ...this.ruleForm });
          if (res) {
            this.dialogVisible = false;
            this.$message.success("Successful operation!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCommand(command) {
      if (command == "a") {
        this.dialogVisible = true;
        this.ruleForm.oldpass = "";
        this.ruleForm.orgpass = "";
        this.ruleForm.confirmpass = "";
      } else if (command == "b") {
        this.exit();
      }
    },
    toPage(name) {
      //路由的name
      this.$router.push({
        name,
      });
    },
  },
};
</script>

<style lang="scss">
.headerBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .headerL {
    position: relative;
    z-index: 1;
    min-width: 200px;
    height: 100%;
    line-height: 56px;
    font-size: 18px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .headerR {
    padding-right: 24px;
    line-height: 32px;
    display: flex;
    align-items: center;

    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
