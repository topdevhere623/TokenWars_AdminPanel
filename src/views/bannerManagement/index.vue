<template>
  <div class="content">
    <div class="searchBox">
      <div class="searchLeft"></div>
      <div class="searchRight">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="handleAdd"
          >Add banner</el-button
        >
      </div>
    </div>
    <el-table border :data="protocolList" style="width: 100%">
      <el-table-column prop="banner" label="picture">
        <template slot-scope="scope">
          <div style="width: 100px; height: 50px">
            <el-image
              style="height: 100%"
              :src="scope.row.bannerImage"
              :preview-src-list="[scope.row.bannerImage]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderByNumber" label="Location" />
      <el-table-column prop="bannerUrl" label="Link" />
      <el-table-column prop="scope" label="operate" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEditor(scope.row)"
            >edit</el-button
          >
          <el-button size="mini" type="danger" @click="handleDel(scope.row)"
            >delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加banner"
      :visible.sync="showDialog"
      width="540px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div>
        <el-form
          ref="ruleForm"
          class="add-form"
          :rules="rules"
          :model="ruleForm"
          label-width="130px"
        >
          <el-form-item label="Banner picture" required>
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
          <el-form-item label="Link">
            <el-input
              v-model="ruleForm.bannerUrl"
              style="width: 300px"
              placeholder="Please enter the jump address"
            />
          </el-form-item>
          <el-form-item label="Sort" prop="orderByNumber" :rules="rules.blur">
            <el-input
              v-model="ruleForm.orderByNumber"
              style="width: 300px"
              placeholder="Please enter the sort, the number is small,"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="submitCofirm()">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import config from "@/config/env";
export default {
  data() {
    return {
      protocolList: [],
      showDialog: false,
      ruleForm: {
        bannerImage: "",
        bannerUrl: "",
        orderByNumber: "",
      },
      fileImg: [], // 图片
      limitCount: 1,
      uploadHeader: {
        certificate: sessionStorage.getItem("token"),
      },
      uploadUrl: "",
      rules: {
        blur: [{ required: true, message: "please enter", trigger: "blur" }],
        select: [{ required: true, message: "please choose", trigger: "change" }],
      },
      hideUpload: false,
    };
  },
  created() {
    this.uploadUrl = config.api + "/file/upload/image";
    this.fetchGetBanner();
  },
  methods: {
    // 获取banner list
    async fetchGetBanner() {
      this.protocolList = [];
      let res = await this.$http.bannerList();
      if (res) {
        this.protocolList = res.records;
      }
    },
    handleAdd() {
      this.fileImg = [];
      this.hideUpload = false;
      this.ruleForm.id = "";
      this.ruleForm.bannerImage = "";
      this.ruleForm.bannerUrl = "";
      this.ruleForm.orderByNumber = "";
      this.showDialog = true;
    },
    handleEditor(data) {
      const row = { ...data };
      this.fileImg = [{ url: row.bannerImage }];
      this.showDialog = true;
      this.hideUpload = true;
      this.ruleForm = row;
    },
    handleClose(done) {
      if (done) {
        done();
        return;
      }
      this.showDialog = false;
    },
    handleDel(row) {
      this.$confirm("Are you sure to perform this operation?", "hint", {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "info",
      })
        .then(async () => {
          const res = await this.$http.bannerDelete({
            id: row.id,
          });
          if (res) {
            this.fetchGetBanner();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleUpload(res) {
      if (res.code == 200) {
        this.fileImg.push({ url: res.data });
        this.ruleForm.bannerImage = res.data;
        return;
      }
      this.$message.error("upload failed");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error("The file is too large, and the file size is less than 2M");
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
      this.$message.error("File can only upload one");
    },
    submitCofirm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.fileImg.length == 0) {
            this.$message.error("Please upload the picture!");
            return;
          }
          let ruleForm = { ...this.ruleForm };
          ruleForm.bannerImage = this.fileImg[0].url;
          let res = null;
          if (this.ruleForm.id) {
            res = await this.$http.bannerUpdate({ ...ruleForm });
          } else {
            res = await this.$http.bannerAdd({ ...ruleForm });
          }
          if (res) {
            this.fetchGetBanner();
            this.showDialog = false;
            this.$refs["ruleForm"].resetFields();
            this.$message.success("Successful operation!");
            this.fileImg = [];
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.addBox {
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
}
.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
.searchBox {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
