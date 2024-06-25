<template>
  <div class="page-wrapper">
    <div class="table-wrapper">
      <el-tabs type="border-card">
        <el-tab-pane label="发送邮件">
          <div class="add-wrapper">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="80px"
            >
              <el-form-item label="邮件标题" prop="title" :rules="rules.blur">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item
                label="选择邮箱"
                prop="emailId"
                :rules="rules.select"
              >
                <div class="email-box">
                  <el-select
                    v-model="ruleForm.emailId"
                    multiple
                    placeholder="请选择"
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
                  <p class="residue-box">剩余额度{{ remainingAmount }}</p>
                </div>
              </el-form-item>
              <el-form-item
                label="收件人"
                prop="sendUser"
                :rules="rules.select"
              >
                <div class="flex">
                  <el-radio-group
                    v-model="ruleForm.sendUser"
                    @change="sendUserTypeChange"
                  >
                    <el-radio label="all">所有用户</el-radio>
                    <el-radio label="part"> 自定义 </el-radio>
                  </el-radio-group>
                  <div v-if="ruleForm.sendUser == 'part'" class="user-select">
                    <template
                      v-if="
                        fileUserList?.length == 0 ||
                        (ruleForm.subscribe && userList?.length == 0)
                      "
                    >
                      <el-upload
                        class="upload-demo"
                        action="/"
                        :on-change="handleChange"
                      >
                        <el-button size="small" type="primary" plain
                          >上传用户列表</el-button
                        >
                      </el-upload>
                      <el-tooltip
                        content="xls第一列请填写用户ID"
                        placement="bottom"
                        effect="light"
                      >
                        <el-button
                          size="small"
                          type="info"
                          plain
                          @click="downloadTemplate"
                          style="margin-left: 5px"
                          >下载模板</el-button
                        >
                      </el-tooltip>
                    </template>
                    <el-button
                      size="small"
                      type="primary"
                      plain
                      @click="getSendEmailUserListFunc"
                      v-else
                      >查看用户列表</el-button
                    >
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="不含退订" prop="subscribe">
                <el-switch
                  v-model="ruleForm.subscribe"
                  @change="subscribeChange"
                ></el-switch>
              </el-form-item>
              <el-form-item label="内容" prop="content" :rules="rules.select">
                <el-upload
                  class="upload-demo"
                  action="/"
                  :on-change="contentHandleChange"
                >
                  <el-button size="small" type="primary" plain
                    >上传文件</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item label="内容预览">
                <div class="content-view">
                  <div v-html="ruleForm.content"></div>
                </div>
              </el-form-item>
              <el-form-item label="发送">
                <el-col :span="6">
                  <el-button type="primary" @click="submitForm()"
                    >立即发送</el-button
                  >
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="sendTimeStr">
                    <div class="flex">
                      <el-date-picker
                        v-model="ruleForm.sendTimeStr"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择日期时间"
                        :picker-options="pickerOptions"
                      >
                      </el-date-picker>
                      <el-button type="primary" @click="submitForm('timing')"
                        >定时发送</el-button
                      >
                    </div>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮件历史">
          <el-table :data="sendEmailList" border height="75vh">
            <el-table-column prop="id" label="邮件ID" align="center" key="1">
            </el-table-column>
            <el-table-column
              prop="title"
              label="邮件标题"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="content"
              label="邮件内容"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span
                  class="blueColor publick-button cursor"
                  @click="emailContentShow(scope.row.content)"
                >
                  查看
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="sendUser"
              label="收件人"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div v-if="scope.row.sendUser == 'all'">全部用户</div>
                <div v-else-if="scope.row.sendUser == 'subscribe'">
                  订阅用户
                </div>
                <div v-else>自定义</div>
              </template>
            </el-table-column>
            <el-table-column
              prop="sendUserTotal"
              label="发送人数"
              align="center"
            >
            </el-table-column>
            <el-table-column prop="sendNum" label="已发送" align="center">
            </el-table-column>
            <el-table-column prop="createTime" label="发送时间" align="center">
              <template slot-scope="scope">
                <div>
                  {{ timeForStr(scope.row.sendTime, "YYYY-MM-DD HH:mm:ss") }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="contractAddress" label="状态" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.sendType == '0'" style="color: #e6a23c">
                  等待发送
                </div>
                <div
                  v-else-if="scope.row.sendType == '1'"
                  style="color: #67c23a"
                >
                  已发送
                </div>
                <div v-else="scope.row.sendType == '2'" style="color: #909399">
                  已取消
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="操作" align="center" width="110">
              <template slot-scope="scope">
                <span
                  class="blueColor publick-button cursor"
                  @click="getSendMailUserFunc(scope.row)"
                >
                  查看用户
                </span>
                <span
                  class="blueColor publick-button cursor"
                  @click="operatingFunc(scope.row, 'cancel')"
                  v-if="scope.row.sendType == '0'"
                >
                  取消
                </span>
                <span
                  class="blueColor publick-button cursor"
                  @click="operatingFunc(scope.row, 'del')"
                  v-else
                >
                  删除
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
      title="用户列表"
      :visible.sync="dialogVisible"
      @close="handleClose"
      width="40%"
    >
      <el-table :data="userList" border>
        <el-table-column prop="id" label="用户id" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户昵称" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额"
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
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="邮件内容" :visible.sync="dialogVisible2" width="40%">
      <div class="content-view" v-html="emailContent"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false"
          >确 定</el-button
        >
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
        blur: [{ required: true, message: "请输入", trigger: "blur" }],
        select: [{ required: true, message: "请选择", trigger: "change" }],
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
      link.setAttribute("download", "用户列表.xlsx");
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
          this.$message.error("用户不存在,请重新上传");
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
          this.$message.error("上传数据为空，请上传数据格式正确的文件");
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
        this.$message.error("文件读取错误:" + event.target.error);
      };
      reader.readAsText(file.raw);
    },
    submitForm(type) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (type == "timing") {
          this.$set(this.rules, "sendTimeStr", this.rules.select);
          const d = await this.$refs.ruleForm.validateField(
            ["sendTimeStr"],
            (err) => {
              if (err) {
                valid = false;
              } else {
                valid = true;
              }
            }
          );
        }
        if (valid) {
          if (this.ruleForm.sendUser == "part") {
            if (this.fileUserList?.length == 0) {
              this.$message.error("请上传用户列表");
              return;
            } else if (this.userList?.length == 0) {
              this.$message.error("自定义用户数据为空，请重新上传！");
              return;
            }
          }
          if (this.sendAmount > this.remainingAmount) {
            const h = this.$createElement;
            this.$confirm(`邮箱额度不足。是否继续？`, "提示", {
              message: h("div", null, [
                h("p", null, `邮箱额度不足。是否继续？ `),
                h("p", null, `邮箱额度：${this.remainingAmount} `),
                h("p", null, `发送数量：${this.sendAmount}`),
              ]),
              confirmButtonText: "确定",
              cancelButtonText: "取消",
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
        this.$message.success("操作成功！");
        this.getSendEmailListFunc();
        this.$refs.ruleForm.resetFields();
        this.fileUserList = [];
        this.userList = [];
      }
    },
    operatingFunc(row, type) {
      this.$confirm(`确定要${type == "del" ? "删除" : "取消"}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
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
            this.$message.success("操作成功");
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
