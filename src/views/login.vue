<template>
  <div class="login-page">
    <div class="login-box">
      <div class="loginContent">
        <p class="tip">Web3 OS</p>
        <p class="title">
          <!-- <i class="logo"></i> -->
          <span>Management system</span>
        </p>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          label-width="0px"
          style="width: 70%; margin: 0 auto"
        >
          <el-form-item label="" prop="userName" class="inputLogin">
            <el-input
              placeholder="Please enter your account"
              v-model.trim="ruleForm.userName"
              autocomplete="off"
              @keyup.enter.native="handleSubmit"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="passWord" class="inputLogin">
            <el-input
              type="password"
              placeholder="Please enter the account password"
              v-model.trim="ruleForm.passWord"
              autocomplete="off"
              @keyup.enter.native="handleSubmit"
            >
            </el-input>
          </el-form-item>
          <div class="authCodeBox">
            <div class="authCodeInput">
              <el-form-item label="" class="inputLogin" prop="code">
                <el-input
                  type="text"
                  placeholder="please enter verification code"
                  v-model.trim="ruleForm.code"
                  autocomplete="off"
                  @keyup.enter.native="handleSubmit"
                >
                </el-input>
              </el-form-item>
            </div>
            <div class="authCode">
              <!-- <img src="@/assets/images/logo.png" alt="" @click="refreshCode"> -->
              <img :src="codeImg" alt="" v-show="codeImg" @click="refreshCode" />
            </div>
          </div>
          <p class="loginbtn" @click="handleSubmit">Log in</p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config/env";
export default {
  data() {
    return {
      httpPath: "",
      codeImg: "",
      ruleForm: {
        userName: "",
        passWord: "",
        code: "",
      },
      rules: {
        userName: [{ required: true, message: "Please input Username", trigger: "blur" }],
        passWord: [
          { required: true, message: "Please enter the password", trigger: "blur" },
        ],
        code: [
          { required: true, message: "please enter verification code", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.httpPath = config.api;
    // sessionStorage.clear();
    // localStorage.clear();
    this.refreshCode();
  },
  methods: {
    handleSubmit() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          console.log("^^^^^^^^", valid);
          let res = await this.$http.sysUserLogin({ ...this.ruleForm });
          if (res) {
            console.log("^^^^^^res^^", res);

            // window.location.href = '/'
            this.getUserMenuFunc();
          } else {
            console.log("^^^^^^else^^", res);

            this.refreshCode();
          }
        }
      });
    },
    // async getUserMenuFunc() {
    //   this.$router.push({ path: '/' });
    // },
    async getUserMenuFunc() {
      let res = await this.$http.getMenuList();
      if (res) {
        console.log("+++++++++++++++", res);
        let url = "";
        if (!res || res.length == 0) {
          this.$message.error(
            "There is no permission in this account, please contact the administrator!"
          );
          return;
        } else if (res[0].children && res[0].children.length > 0) {
          url = res[0].children[0].path;
        } else if (!res[0].children || res[0].children.length == 0) {
          url = res[0].path;
        }
        this.$router.push({ name: url });
      }
    },
    async refreshCode() {
      const res = await this.$http.sysUserGetCode();

      if (res) {
        console.log("&&&&&&&&", res);
        sessionStorage.setItem("verify", res.headers.verify);
        this.codeImg = window.URL.createObjectURL(res.data);
      }
    },
  },
};
</script>

<style lang="scss">
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2d3a4b;
  // background: url('../assets/images/blur-bg.jpg') no-repeat;
  background-size: 100% 100%;

  .login-box {
    width: 540px;
    margin: 0 auto;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 32px;

    .loginContent {
      width: 100%;
    }

    .tip {
      font-size: 30px;
      color: #fff;
      font-weight: bold;
      margin-bottom: 10px;
      text-align: center;
    }

    .title {
      font-size: 20px;
      color: #209e91;
      text-align: center;
      margin-bottom: 20px;

      .logo {
        display: inline-block;
        width: 40px;
        height: 20px;
        background: url("../assets/images/logo.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 2px;
        right: 20px;
      }
    }

    input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #f7f9fb inset;
    }

    .icon {
      position: absolute;
      left: 0;
      top: 8px;
    }

    .icon1 {
      width: 25px;
      height: 30px;
      background-size: contain;
    }

    .icon2 {
      width: 22px;
      height: 29px;
      background-size: contain;
    }

    .loginbtn {
      background: #209e91;
      box-shadow: 0px 17px 21px 0px rgba(152, 173, 241, 0.44);
      border-radius: 20px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      width: 110px;
      font-size: 13px;
      margin: 40px auto 0;
      display: block;
      color: #fff;
      cursor: pointer;
      transition: all 0.1s;
    }

    .loginbtn:hover {
      background: #209e91;
      border-color: #209e91;
      transform: scale(1.3);
      transition: all 0.1s;
    }

    .authCodeBox {
      display: flex;
      align-content: center;

      .authCodeInput {
        flex: 1;
      }

      .authCode {
        width: 100px;
        margin-left: 20px;

        img {
          width: 100%;
          height: 50px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.login-page .el-form-item.is-error .el-input__inner {
  border-color: #8e9198;
}

.login-page .el-form-item__error {
  color: #f56c6c !important;
}

.inputLogin {
  height: 60px;
}

.inputLogin input {
  border: none;
  outline: none;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  border-radius: 5px;
}

.loginContent {
  .el-input {
    .el-input__inner {
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>
