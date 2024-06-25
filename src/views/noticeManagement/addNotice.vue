<template>
  <div class="content mall-add">
    <!-- <el-tabs type="border-card" v-model="active">
      <el-tab-pane name="en_US" label="英文"> -->
    <el-row>
      <el-col :span="23">
        <el-form ref="ruleForm" class="add-form" :rules="rules" :model="ruleForm" label-width="130px">
          <el-form-item label="标题名称" prop="title">
            <el-input v-model="ruleForm.title" style="width: 300px" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="发布时间" prop="title">
            <el-date-picker
              v-model="ruleForm.webTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="封面" prop="imgUrl" :rules="rules.select">
            <el-upload
              :action="uploadUrl"
              :class="{ hide: hideUpload }"
              :on-change="handleChange"
              :on-success="handleUpload"
              :file-list="fileImg"
              :multiple="false"
              :limit="1"
              accept="image/png,image/jpg,image/jpeg,image/gif,image/webp"
              list-type="picture-card"
              :before-upload="handleBefore"
              :on-remove="handleRemove"
              :on-exceed="handExceed"
              :headers="uploadHeader"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-form-item label="公告内容" prop="contentHtml">
            <quillEditor class="ql-editor" :content="ruleForm.contentHtml" @change="onEditorChange"></quillEditor>
          </el-form-item>

          <!-- <el-form-item label="是否强提醒" prop="forcedSwitch">
            <el-radio-group v-model="ruleForm.forcedSwitch" @change="changeForced">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否是重要公告" prop="importantSwitch">
            <el-radio-group v-model="ruleForm.importantSwitch" @change="changeImportant">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>
    <!-- </el-tab-pane>
      <el-tab-pane name="zh_CN" label="中文">
        <el-row>
          <el-col :span="23">
            <el-form ref="ruleForm2" class="add-form" :model="ruleForm2" label-width="130px">
              <el-form-item label="标题名称">
                <el-input v-model="ruleForm2.title" style="width: 300px" placeholder="请输入名称" />
              </el-form-item>

              <el-form-item label="公告内容">
                <quillEditor class="ql-editor" :content="ruleForm2.contentHtml" @change="onEditorChange2"></quillEditor>
              </el-form-item>
              <el-form-item label="是否强提醒">
                <el-radio-group v-model="ruleForm2.forcedSwitch" @change="changeForced">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否是重要公告">
                <el-radio-group v-model="ruleForm2.importantSwitch" @change="changeImportant">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs> -->

    <el-row style="margin-top: 20px">
      <el-button type="primary" plain @click="resetForm()">取消</el-button>
      <el-button type="primary" @click.native.prevent="submitCofirm()">保存</el-button>
    </el-row>
  </div>
</template>
<script>
import quillEditor from "@/components/quillEditor";
import config from "@/config/env";
import { timeForStr } from "@/utils";
export default {
  name: "AddNotice",
  props: {
    id: {
      type: Number | String,
      default: false,
    },
  },
  data() {
    var checkIntNumMaxThree = (rule, value, callback) => {
      const reg = /^\d{0,3}$/;
      if (!value) {
        return callback(new Error("请输入"));
      } else if (reg.test(value)) {
        callback();
      } else {
        callback("请输入不超过3位数的整数");
      }
    };
    return {
      uploadHeader: {
        certificate: sessionStorage.getItem("token"),
      },
      active: "en_US",
      ruleForm: {
        language: "en_US",
        title: "",
        content: "",
        webTime:"",
        contentHtml: "",
        forcedSwitch: 0,
        importantSwitch: 0,
      },
      ruleForm2: {
        language: "zh_CN",
        title: "",
        imgUrl: "",
        content: "",
        contentHtml: "",
        forcedSwitch: 0,
        importantSwitch: 0,
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "长度在 1 到 30 个字符",
            trigger: "blur",
          },
        ],
        contentHtml: [{ required: true, message: "请输入公告内容", trigger: "blur" }],
        forcedSwitch: [{ required: true, trigger: "blur" }],
        importantSwitch: [{ required: true, trigger: "blur" }],
      },
      timer: null,
      timer2: null,
      fileImg: [],
      limitCount: 1,
      uploadUrl: "",
      hideUpload: false,
    };
  },
  components: { quillEditor },

  created() {
    const { id } = this;
    if (id) {
      this.getBannerInfo(id);
      this.hideUpload = true;
    } else {
      this.hideUpload = false;
    }
    this.uploadUrl = config.api + "/file/upload/image";
  },
  methods: {
    async getBannerInfo(id) {
      let res = await this.$http.getAnnouncementInfo({ annId: id });
      if (res) {
        this.ruleForm = res;
        if(this.ruleForm.webTime){
          this.ruleForm.webTime=timeForStr(this.ruleForm.webTime, "YYYY-MM-DD HH:mm:ss")
        }
        this.fileImg = [{ url: this.ruleForm.imgUrl }];
        // res.forEach((element) => {
        //   if (element.language == "zh_CN") {
        //     this.ruleForm = element;
        //   }
        //   if (element.language == "en_US") {
        //     this.ruleForm2 = element;
        //   }
        // });
      }
    },
    changeForced(event) {
      this.ruleForm.forcedSwitch = event;
      // this.ruleForm2.forcedSwitch = event;
    },
    changeImportant(event) {
      this.ruleForm.importantSwitch = event;
      // this.ruleForm2.importantSwitch = event;
    },
    resetForm() {
      this.$emit("close");
      this.$refs.ruleForm.resetFields();
    },
    onEditorChange(html, text) {
      this.ruleForm.contentHtml = html;
      this.ruleForm.content = text;
    },
    handleUpload(res) {
      if (res.code == 200) {
        this.fileImg.push({ url: res.data });
        this.ruleForm.imgUrl = res.data;
        return;
      }
      this.$message.error("上传失败");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error("文件过大，文件大小小于2M");
      }
      return is1M;
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.fileImg = [];
    },
    handExceed(fiel) {
      this.$message.error("文件只能上传一个");
    },
    //保存
    async submitCofirm() {
      //表单1验证
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return;
        let ruleForm1 = { ...this.ruleForm };

        // if (this.ruleForm2.title != "") {
        //   ruleForm1.push(this.ruleForm2);
        // }
        if (this.id) {
          let res = await this.$http.updateAnnouncement(ruleForm1);
          if (res) {
            this.$message.success("操作成功！");
            this.$emit("close");
            this.$emit("refresh");
          }
        } else {
          let res = await this.$http.saveAnnouncement(ruleForm1);
          if (res) {
            this.$message.success("操作成功！");
            this.$emit("close");
            this.$emit("refresh");
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mall-add {
  .el-form-item .el-upload--picture-card,
  .el-upload-list__item {
    width: 80px;
    height: 80px;
    line-height: 88px;
  }
}

.file-imgs {
  /deep/.el-tabs__header {
    display: none;
  }
}
/deep/.ql-container {
  height: 490px;
}

.price-box {
  margin: 0;
}

.ql-editor {
  padding: 0;
  >>> .ql-container {
    height: calc(100% - 83px);
  }
}

.el-textarea__inner {
  min-height: 100px !important;
}
.ql-editor-container {
  padding-left: 20px;
}
.el-row:nth-child(2) {
  text-align: center;
}
.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
</style>
<style>
.ql-container.ql-snow {
  background: rgb(36, 21, 55);
}
</style>
