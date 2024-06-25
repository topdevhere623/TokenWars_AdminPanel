<template>
  <div class="page-wrapper">
    <div class="table-wrapper">
      <el-tabs type="border-card">
        <el-tab-pane label="send email">
          <div class="add-wrapper">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
              <el-form-item label="mail title" prop="title" :rules="rules.blur">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="Select mailbox" prop="emailId" :rules="rules.select">
                <div class="email-box">
                  <el-select
                    v-model="ruleForm.emailId"
                    multiple
                    placeholder="please choose"
                    style="width: 75%"
                  >
                    <el-option
                      v-for="item in emailList"
                      :key="item.id"
                      :label="item.emailUser"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <p class="residue-box">Remaining quota{{ remainingAmount }}</p>
                </div>
              </el-form-item>
              <el-form-item label="recipient" prop="sendUser" :rules="rules.select">
                <div class="flex">
                  <el-radio-group
                    v-model="ruleForm.sendUser"
                    @change="sendUserTypeChange"
                  >
                    <el-radio label="all">All users</el-radio>
                    <el-radio label="part"> customize </el-radio>
                  </el-radio-group>
                  <div v-if="ruleForm.sendUser == 'part'" class="user-select">
                    <template
                      v-if="
                        fileUserList?.length == 0 ||
                        (ruleForm.subscribe && userList?.length == 0)
                      "
                    >
                      <el-upload class="upload-demo" action="/" :on-change="handleChange">
                        <el-button size="small" type="primary" plain
                          >Upload user list</el-button
                        >
                      </el-upload>
                      <el-tooltip
                        content="Please fill in the user ID in the first column of XLS"
                        placement="bottom"
                        effect="light"
                      >
                        <el-button
                          size="small"
                          type="info"
                          plain
                          @click="downloadTemplate"
                          style="margin-left: 5px"
                          >Download template</el-button
                        >
                      </el-tooltip>
                    </template>
                    <el-button
                      size="small"
                      type="primary"
                      plain
                      @click="getSendEmailUserListFunc"
                      v-else
                      >View user list</el-button
                    >
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="Without a copy" prop="subscribe">
                <el-switch
                  v-model="ruleForm.subscribe"
                  @change="subscribeChange"
                ></el-switch>
              </el-form-item>
              <el-form-item label="content" prop="content" :rules="rules.select">
                <el-upload
                  class="upload-demo"
                  action="/"
                  :on-change="contentHandleChange"
                >
                  <el-button size="small" type="primary" plain>upload files</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="Preview">
                <div class="content-view">
                  <div v-html="ruleForm.content"></div>
                </div>
              </el-form-item>
              <el-form-item label="send">
                <el-col :span="6">
                  <el-button type="primary" @click="submitForm()"
                    >send immediately</el-button
                  >
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="sendTimeStr">
                    <div class="flex">
                      <el-date-picker
                        v-model="ruleForm.sendTimeStr"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="Selection date time"
                        :picker-options="pickerOptions"
                      >
                      </el-date-picker>
                      <el-button type="primary" @click="submitForm('timing')"
                        >Timely sending</el-button
                      >
                    </div>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="E -mail history">
          <el-table :data="sendEmailList" border height="75vh">
            <el-table-column prop="id" label="Email ID" align="center" key="1">
            </el-table-column>
            <el-table-column
              prop="title"
              label="mail title"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="content"
              label="content of email"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span
                  class="blueColor publick-button cursor"
                  @click="emailContentShow(scope.row.content)"
                >
                  Check
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="sendUser"
              label="recipient"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.sendUser == 'all'">All users</div>
                <div v-else-if="scope.row.sendUser == 'subscribe'">Subscriber</div>
                <div v-else>customize</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sendUserTotal"
              label="Number of senders"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="sendNum" label="Has been sent" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="Send time" align="center">
              <template slot-scope="scope">
                <div>
                  {{ timeForStr(scope.row.sendTime, "YYYY-MM-DD HH:mm:ss") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="contractAddress" label="state" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.sendType == '0'" style="color: #e6a23c">Wait</div>
                <div v-else-if="scope.row.sendType == '1'" style="color: #67c23a">
                  Has been sent
                </div>
                <div v-else="scope.row.sendType == '2'" style="color: #909399">
                  Cancelled
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="operate" align="center" width="110">
              <template slot-scope="scope">
                <span
                  class="blueColor publick-button cursor"
                  @click="getSendMailUserFunc(scope.row)"
                >
                  View users
                </span>
                <span
                  class="blueColor publick-button cursor"
                  @click="operatingFunc(scope.row, 'cancel')"
                  v-if="scope.row.sendType == '0'"
                >
                  Cancel
                </span>
                <span
                  class="blueColor publick-button cursor"
                  @click="operatingFunc(scope.row, 'del')"
                  v-else
                >
                  delete
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="baseUserPage && baseUserPage.total"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="pagination.pageSizes"
            :page-size="size"
            layout=" sizes, prev, pager, next, jumper"
            :total="baseUserPage.total"
            class="public-pagination"
          >
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="user list"
      :visible.sync="dialogVisible"
      @close="handleClose"
      width="40%"
    >
      <el-table :data="userList" border>
        <el-table-column prop="id" label="User ID" align="center"> </el-table-column>
        <el-table-column prop="userName" label="User's Nickname" align="center">
        </el-table-column>
        <el-table-column prop="email" label="Mail" align="center"> </el-table-column>
        <el-table-column
          prop="balance"
          label="Balance"
          align="center"
          v-if="showUserList"
        >
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="userTotal > 0 && showUserList"
        background
        @size-change="handleSizeChangeUser"
        @current-change="handleCurrentChangeUser"
        :current-page="userPage"
        :page-sizes="pagination.pageSizes"
        :page-size="userSize"
        layout=" sizes, prev, pager, next, jumper"
        :total="userTotal"
        class="public-pagination"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">Sure</el-button>
      </span>
    </el-dialog>
    <el-dialog title="content of email" :visible.sync="dialogVisible2" width="40%">
      <div class="content-view" v-html="emailContent"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/mixins/pagination";
import XLSX from "xlsx";
import { timeForStr } from "@/utils";
export default {
  name: "Email",
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return time.getTime() < today.getTime();
        },
      },
      Id: null,
      marketName: null,
      marketStatus: null,
      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      sendEmailList: [],
      emailList: [],
      ruleForm: {
        title: "",
        emailId: [],
        sendUser: "",
        content: "",
        sendTimeStr: "",
        subscribe: false,
      },
      fileUserList: [],
      userList: [],
      dialogVisible: false,
      dialogVisible2: false,
      rules: {
        blur: [{ required: true, message: "please enter", trigger: "blur" }],
        select: [{ required: true, message: "please choose", trigger: "change" }],
      },
      sendAmount: 0,
      userTotal: 0,
      userPage: 1,
      userSize: 20,
      showUserList: false,
      emailContent: null,
    };
  },
  mixins: [pagination],
  computed: {
    remainingAmount() {
      if (this.ruleForm.emailId?.length > 0) {
        return this.emailList.reduce((total, email) => {
          if (this.ruleForm.emailId.includes(email.id)) {
            return total + email.maxNumberDay - email.sendNumber;
          }
          return total;
        }, 0);
      } else {
        return 0;
      }
    },
  },
  created() {
    this.getEmailListFunc();
    this.getSendEmailListFunc();
  },
  methods: {
    timeForStr: timeForStr,
    downloadTemplate() {
      const workbook = XLSX.utils.book_new(); // 创建一个新的工作簿
      const worksheet = XLSX.utils.json_to_sheet([]); // 创建一个空的工作表
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // 将工作表添加到工作簿
      const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); // 将工作簿转换为二进制数组
      const blob = new Blob([wbout], { type: "application/octet-stream" }); // 创建 Blob 对象
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "user list.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    async getSendEmailListFunc() {
      const { size, page } = this;
      const res = await this.$http.getSendEmailPageList({
        size,
        page,
      });
      if (res) {
        this.baseUserPage = res;
        this.sendEmailList = res.records;
      }
    },
    async sendUserTypeChange(val) {
      this.fileUserList = [];
      if (val != "part") {
        let res = await this.$http.getSendEmailUserTotal({ type: val });
        this.sendAmount = res;
      }
    },
    async getEmailListFunc() {
      const res = await this.$http.getSendEmailList();
      if (res) {
        this.emailList = res;
      }
    },
    // 查看excel用户列表
    async getSendEmailUserListFunc() {
      if (this.fileUserList?.length == 0) return;
      const userIds = this.fileUserList.join(",");
      const res = await this.$http.getSendEmailUserList({
        userIds,
        type: this.ruleForm.subscribe ? "subscribe" : "all",
      });
      if (res) {
        this.userList = res;
        if (this.userList?.length == 0) {
          this.$message.error("User does not exist,Please upload");
        } else {
          this.sendAmount = res?.length;
          this.dialogVisible = true;
        }
      }
    },
    subscribeChange(val) {
      this.getSendEmailUserListFunc();
    },
    // 查看发送邮箱用户
    async getSendMailUserFunc(row) {
      const { userPage, userSize } = this;
      if (row?.id) {
        this.Id = row.id;
      }
      console.log(this.Id);
      const res = await this.$http.getSendMailUser({
        id: this.Id,
        page: userPage,
        size: userSize,
      });
      if (res) {
        this.userList = res.records;
        this.userTotal = res.total;
        this.dialogVisible = true;
        this.showUserList = true;
      }
    },
    handleClose() {
      this.showUserList = false;
      this.userPage = 1;
    },
    handleChange(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (jsonData?.length == 0) {
          this.$message.error(
            "Upload data to empty, please upload files with correct data formats"
          );
          return;
        }
        this.fileUserList = jsonData.map((arr) => arr[0]);
      };
      reader.readAsArrayBuffer(file.raw);
      if (this.fileUserList?.length) {
        this.getSendEmailUserListFunc();
      }
    },
    contentHandleChange(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.ruleForm.content = e.target.result;
      };
      reader.onerror = (e) => {
        this.$message.error("File read error:" + event.target.error);
      };
      reader.readAsText(file.raw);
    },
    submitForm(type) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (type == "timing") {
          this.$set(this.rules, "sendTimeStr", this.rules.select);
          const d = await this.$refs.ruleForm.validateField(["sendTimeStr"], (err) => {
            if (err) {
              valid = false;
            } else {
              valid = true;
            }
          });
        }
        if (valid) {
          if (this.ruleForm.sendUser == "part") {
            if (this.fileUserList?.length == 0) {
              this.$message.error("Please upload the user list");
              return;
            } else if (this.userList?.length == 0) {
              this.$message.error("Custom user data is empty, please upload it again!");
              return;
            }
          }
          if (this.sendAmount > this.remainingAmount) {
            const h = this.$createElement;
            this.$confirm(`Insufficient mailboxes.Whether to continue?`, "hint", {
              message: h("div", null, [
                h("p", null, `Insufficient mailboxes.Whether to continue? `),
                h("p", null, `Email quota:${this.remainingAmount} `),
                h("p", null, `Send quantity:${this.sendAmount}`),
              ]),
              confirmButtonText: "Sure",
              cancelButtonText: "Cancel",
              type: "warning",
            }).then(async () => {
              this.saveFunc(type);
            });
          } else {
            this.saveFunc(type);
          }
        }
      });
    },
    async saveFunc(type) {
      if (!type) {
        this.ruleForm.sendTimeStr = "";
      }
      let ruleForm = { ...this.ruleForm };
      ruleForm.emailId = ruleForm.emailId.join(",");
      if (ruleForm.sendUser == "part") {
        ruleForm.sendUser = this.userList.map((x) => x.id).join(",");
      } else {
        ruleForm.sendUser = ruleForm.subscribe ? "subscribe" : "all";
      }

      const res = await this.$http.sendEmailSave({
        ...ruleForm,
      });
      if (res) {
        this.$message.success("Successful operation!");
        this.getSendEmailListFunc();
        this.$refs.ruleForm.resetFields();
        this.fileUserList = [];
        this.userList = [];
      }
    },
    operatingFunc(row, type) {
      this.$confirm(`Are you ${type == " del " ? " Delete " : " Cancel "}?`, "Tips", {
        confirmbuttontext: "OK",
        Cancelbuttext: "Cancel",
        Type: "Warning",
      })
        .then(async () => {
          let res = null;
          if (type == "del") {
            // 删除
            res = await this.$http.sendEmailDel({
              id: row.id,
            });
          } else {
            // 取消
            res = await this.$http.sendEmailCancel({
              id: row.id,
              isCancel: 0,
            });
          }
          if (res) {
            this.getSendEmailListFunc();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    emailContentShow(content) {
      this.emailContent = content;
      this.dialogVisible2 = true;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getSendEmailListFunc();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getSendEmailListFunc(false);
    },
    handleSizeChangeUser(val) {
      this.userSize = val;
      this.getSendMailUserFunc();
    },
    handleCurrentChangeUser(val) {
      this.userPage = val;
      this.getSendMailUserFunc();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  .add-wrapper {
    width: 56%;
  }
  .email-box {
    display: flex;
  }
  .residue-box {
    display: inline-block;
    color: #f56c6c;
    margin-left: 15px;
  }
  .user-select {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
  .flex {
    display: flex;
    align-items: center;
    height: 28px;
    gap: 10px;
  }
  .content-view {
    height: 300px;
    flex: 1;
    border: 1px solid #dcdfe6;
    overflow: auto;
    border-radius: 4px;
  }
}
::v-deep {
  .el-message-box__message p {
    white-space: break-spaces;
  }
}
</style>
