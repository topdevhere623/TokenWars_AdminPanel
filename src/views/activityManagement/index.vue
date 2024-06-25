<template>
  <div class="page-wrapper activity-management-box">
    <div class="public-list-inputs">
      <div class="remittance-box">
        <div class="remittance-amount remittance-more">
          <div class="remittance-item">
            <div class="title">总参与人数</div>
            <div class="val">{{ aggregateQuery && aggregateQuery.joinPeopleNum }}</div>
          </div>
          <div class="remittance-item">
            <div class="title">总奖金</div>
            <div class="val">{{ aggregateQuery && aggregateQuery.totalBonus }}</div>
          </div>
          <div class="remittance-item">
            <div class="title">总积分</div>
            <div class="val">{{ aggregateQuery && aggregateQuery.totalPoint }}</div>
          </div>
        </div>
      </div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" class="public-search" @click="handleAdd()"> 添加活动 </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="活动ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="name" label="活动名称" align="center" key="2"> </el-table-column>
      <el-table-column prop="banner" label="横幅图片" width="120px" align="center" key="3">
        <template slot-scope="scope">
          <div style="width: 100px; height: 50px">
            <el-image style="height: 100%" :src="scope.row.banner" :preview-src-list="[scope.row.banner]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" label="活动类型" align="center" key="4">
        <template slot-scope="scope">
          {{ getActivityName(scope.row.activityType) }}
        </template>
      </el-table-column>
      <el-table-column prop="activityIndex" label="排序" align="center" key="5"> </el-table-column>
      <el-table-column prop="joinNum" label="参与人数" align="center" key="6"> </el-table-column>
      <el-table-column label="已领取/总奖金" align="center" key="7">
        <template slot-scope="scope">
          <p v-if="scope.row.totalBonus">{{ scope.row.receivedBonus + " / " + scope.row.totalBonus }}</p>
          <p v-else>--</p>
        </template>
      </el-table-column>
      <el-table-column prop="points" label="总积分" align="center" key="8"> </el-table-column>
      <el-table-column prop="relevancyBoxNumber" label="奖励记录" align="center" key="9">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="recordsShow(scope.row)"> 详情 </span>
        </template>
      </el-table-column>
      <el-table-column prop="acticityStatus" width="120" label="状态" align="center" key="10">
        <template slot-scope="scope">
          <p style="color: #67c23a" v-if="scope.row.acticityStatus == 'IN_PROGRESS'">进行中</p>
          <p style="color: #e6a23c" v-else-if="scope.row.acticityStatus == 'NOT_STARTED'">未开始</p>
          <p style="color: #909399" v-else>已结束</p>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" width="140" label="开始时间" align="center" key="11">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.startTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="endTime" width="140" label="结束时间" align="center" key="12">
        <template slot-scope="scope">
          {{ timeForStr(scope.row.endTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" key="13" width="140">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="handleEdit(scope.row)">
            {{ scope.row.acticityStatus == "ENDED" ? "详情" : "编辑" }}
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="handleTime(scope.row, 'start')"
            v-if="scope.row.acticityStatus == 'NOT_STARTED'"
          >
            提前开始
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="handleTime(scope.row, 'end')"
            v-if="scope.row.acticityStatus == 'IN_PROGRESS'"
          >
            提前结束
          </span>
          <span class="blueColor publick-button cursor" @click="handleDel(scope.row)" v-if="scope.row.acticityStatus != 'IN_PROGRESS'">
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
    <el-dialog
      v-if="showDialog"
      :title="operatingType == 1 ? '添加活动' : '编辑活动'"
      :visible.sync="showDialog"
      width="940px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      top="5vh"
    >
      <div class="add-form-box">
        <el-form ref="ruleForm" class="add-form" :rules="rules" :model="ruleForm" label-width="140px">
          <el-form-item label="活动类型" prop="activityType" :rules="rules.select">
            <el-select
              :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
              v-model="ruleForm.activityType"
              style="width: 350px"
            >
              <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="活动名称" prop="name" :rules="rules.blur">
            <el-input v-model="ruleForm.name" style="width: 350px" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="活动横幅" prop="banner" :rules="rules.select">
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
          <el-form-item label="排序" prop="activityIndex" :rules="rules.blur">
            <el-input v-model="ruleForm.activityIndex" style="width: 350px" placeholder="数字越大越靠前" />
          </el-form-item>
          <el-form-item label="一句话介绍" prop="shortWord" :rules="rules.blur">
            <el-input v-model="ruleForm.shortWord" style="width: 350px" placeholder="请输入名称" />
          </el-form-item>
          <template v-if="ruleForm.activityType != 'WELCOME_BONUS'">
            <el-form-item label="积分比率" prop="pointRate" :rules="rules.blur">
              <el-input type="number" v-model="ruleForm.pointRate" style="width: 350px" placeholder="请输入积分比率">
                <template slot="append">倍</template>
              </el-input>
            </el-form-item>
            <el-form-item label="最大积分" prop="maxPoint" :rules="rules.blur">
              <el-input v-model="ruleForm.maxPoint" style="width: 350px" placeholder="请输入最大积分" />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="最低充值" prop="lowRecharge" :rules="rules.blur">
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.lowRecharge"
                style="width: 350px"
                placeholder="请输入最低充值"
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </el-form-item>
            <el-form-item label="奖金比率" prop="bonusRate" :rules="rules.blur">
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.bonusRate"
                style="width: 350px"
                placeholder="请输入奖金比率"
              >
                <template slot="append">倍</template>
              </el-input>
            </el-form-item>
            <el-form-item label="最大奖金" prop="maxBonusLimit" :rules="rules.blur">
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.maxBonusLimit"
                style="width: 350px"
                placeholder="请输入最大奖金"
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </el-form-item>
            <el-form-item label="解锁所需流水倍率" prop="unlockFlowRate" :rules="rules.blur">
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.unlockFlowRate"
                style="width: 350px"
                placeholder="请输入解锁所需流水倍率"
              >
                <template slot="append">倍</template>
              </el-input>
            </el-form-item>
            <div class="flex">
              <el-form-item label="解锁轮次" prop="unlockNum" :rules="rules.blur">
                <el-input
                  :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                  type="number"
                  v-model="ruleForm.unlockNum"
                  style="width: 200px"
                  placeholder="请输入解锁轮次"
                >
                  <template slot="append">次</template>
                </el-input>
              </el-form-item>
              <el-form-item label="解锁比率" v-if="ruleForm.unlockNum > 0">
                <p style="line-height: 28px">{{ ((1 / ruleForm.unlockNum) * 100).toFixed(2) }}%</p>
              </el-form-item>
            </div>
          </template>
          <el-form-item label="起止时间" prop="startTime" :rules="rules.select">
            <div class="flex">
              <el-date-picker
                style="width: 200px"
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                v-model="ruleForm.startTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择开始时间"
              >
              </el-date-picker>
              <p>至</p>
              <el-date-picker
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                style="width: 200px"
                v-model="ruleForm.endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择开始时间"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="活动描述" prop="activityDesc" :rules="rules.blur">
            <quillEditor :content="ruleForm.activityDesc" @change="editorDetailFunc"></quillEditor>
          </el-form-item>
          <el-form-item label="条款与条件" prop="conditionRule" :rules="rules.blur">
            <quillEditor :content="ruleForm.conditionRule" @change="editorRuleFunc"></quillEditor>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button :disabled="ruleForm.acticityStatus == 'ENDED'" type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-if="showDetailDialog" title="奖励记录" :visible.sync="showDetailDialog" width="1200px" :close-on-click-modal="false">
      <div class="page-wrapper showDetailDialog">
        <template>
          <div class="public-list-inputs">
            <el-input class="public-input" style="width: 200px" placeholder="输入玩家昵称/ID" v-model="obscureField" clearable />
            <el-button type="primary" icon="el-icon-search" class="public-search" @click="getAwardsRecords()"> 查询 </el-button>
          </div>
          <div class="remittance-box" v-if="row.activityType == 'WELCOME_BONUS'">
            <div class="remittance-amount remittance-more">
              <div class="remittance-item">
                <div class="title">参与人数</div>
                <div class="val">{{ rewardRecordStatic?.joinPeopleNum }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">总充值</div>
                <div class="val">{{ rewardRecordStatic?.totalRecharge }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">总奖金</div>
                <div class="val">{{ rewardRecordStatic?.totalBonus }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">总流水</div>
                <div class="val">{{ rewardRecordStatic?.totalFlowNums }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">总解锁</div>
                <div class="val">{{ rewardRecordStatic?.totalUnlocks }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">总领取</div>
                <div class="val">{{ rewardRecordStatic?.totalReceive }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">总未领</div>
                <div class="val">
                  {{ accurateDecimal(new bigNumber(rewardRecordStatic?.totalUnlocks - rewardRecordStatic?.totalReceive || 0), 4) }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <el-table :data="rewardRecordList" style="width: 100%" border>
          <el-table-column prop="id" label="玩家ID/昵称" align="center" key="0">
            <template slot-scope="scope">
              <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">{{ scope.row.userId || "--" }}</p>
              <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">{{ scope.row.userName || "--" }}</p>
            </template>
          </el-table-column>
          <template v-if="row.activityType == 'WELCOME_BONUS'">
            <el-table-column prop="rechargeAmount" width="120" label="充值金额" align="center" key="1"> </el-table-column>
            <el-table-column prop="rechargeTime" label="充值时间" align="center" key="2">
              <template slot-scope="scope">
                {{ timeForStr(scope.row.rechargeTime, "YYYY-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column prop="totalRewards" label="总奖金" align="center" key="4"> </el-table-column>
            <el-table-column prop="flowAmount" label="已打流水" align="center" key="5"> </el-table-column>
            <el-table-column prop="unlockReward" label="解锁奖金" align="center" key="6"> </el-table-column>
            <el-table-column prop="receivedReward" label="领取奖金" align="center" key="7"> </el-table-column>
            <el-table-column prop="walletAddress" label="未领奖金" align="center" key="8">
              <template slot-scope="scope">
                {{ accurateDecimal(new bigNumber(scope.row.unlockReward - scope.row.receivedReward || 0), 4) }}
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column prop="flowAmount" label="流水" align="center" key="9"> </el-table-column>
            <el-table-column prop="totalPoints" label="总积分" align="center" key="10"> </el-table-column>
          </template>
        </el-table>
        <el-pagination
          v-if="rewardBaseUserPage && rewardBaseUserPage.total"
          background
          @size-change="rewardHandleSizeChange"
          @current-change="rewardHandleCurrentChange"
          :current-page="rewardPage"
          :page-sizes="pagination.pageSizes"
          :page-size="size"
          layout=" sizes, prev, pager, next, jumper"
          :total="rewardBaseUserPage.total"
          class="public-pagination"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDetailDialog = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { timeForStr, accurateDecimal } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";
import quillEditor from "@/components/quillEditor";
import bigNumber from "bignumber.js";
export default {
  name: "ExternalTokenManagement",
  // 模板引入
  components: { quillEditor },
  // 数据
  data() {
    return {
      typeOptions: [
        { label: "欢迎奖金", value: "WELCOME_BONUS" },
        { label: "开盒赢积分", value: "OPEN_BOX_WIN_POINTS" },
        { label: "夺宝赢积分", value: "TREASURES_WIN_POINTS" },
      ],
      showDialog: false,
      showDetailDialog: false,
      page: 1,
      size: 20,
      tableData: null,
      aggregateQuery: {},
      baseUserPage: null,
      uploadUrl: "",
      fileImg: [],
      limitCount: 1,
      hideUpload: false,
      uploadHeader: {
        certificate: sessionStorage.getItem("token"),
      },
      coin: "USDT",
      ruleForm: {
        name: null, //活动名称
        activityType: null, //活动类型(WELCOME_BONUS-欢迎奖金,OPEN_BOX_WIN_POINTS-开盒赢积分,TREASURES_WIN_POINTS-夺宝赢积分)
        banner: null, //banner
        activityIndex: null, //排序
        shortWord: null, //一句话的事
        lowRecharge: null, //最低充值
        bonusRate: null, //奖金比率
        maxBonusLimit: null, //最大奖金限制
        unlockFlowRate: null, //解锁流水倍率
        unlockNum: null, //解锁次数
        pointRate: null, //积分比率
        maxPoint: null, //最大积分
        startTime: null,
        endTime: null,
        activityDesc: null, //活动描述
        conditionRule: null, //活动与条款
      },
      ruleFormClone: {},
      rules: {
        select: [{ required: true, message: "请选择", trigger: ["blur", "change"] }],
        blur: [{ required: true, message: "请输入", trigger: ["blur", "change"] }],
      },
      row: {},
      obscureField: null,
      rewardPage: 1,
      rewardBaseUserPage: null,
      rewardRecordList: [],
      rewardRecordStatic: {},
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    timeForStr: timeForStr,
    bigNumber: bigNumber,
    accurateDecimal: accurateDecimal,
    getActivityName(type) {
      let filterRes = this.typeOptions.filter((x) => x.value == type);
      return filterRes && filterRes?.length > 0 ? filterRes[0].label : "";
    },
    // 加载列表
    async getTableList(isSearch = true) {
      const { size } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          size: size,
          page: _page,
        },
      };
      const res = await this.$http.activityManagerPageList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.activityHeaderDataTotal(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    handleAdd() {
      this.operatingType = 1;
      this.hideUpload = false;
      this.fileImg = [];
      this.ruleForm = JSON.parse(JSON.stringify(this.ruleFormClone));
      this.showDialog = true;
    },
    handleEdit(row) {
      this.ruleForm = {
        ...row,
      };
      this.fileImg = [{ url: row.banner }];
      this.operatingType = 2;
      this.hideUpload = true;
      this.showDialog = true;
    },
    async recordsShow(row) {
      this.row = row;
      this.getAwardsRecords();
    },
    async getAwardsRecords(isSearch = true) {
      if (isSearch) {
        this.rewardPage = 1;
      }
      const res = await this.$http.activityManagerDetailPageList({
        id: this.row.id,
        obscureField: this.obscureField,
        page: this.rewardPage,
        size: this.size,
      });
      if (res) {
        this.rewardBaseUserPage = res;
        this.rewardRecordList = res.records;
        this.showDetailDialog = true;
        const data = await this.$http.activityManagerDetailHeaderDataTotal({ id: this.row.id, obscureField: this.obscureField });
        if (data) {
          this.rewardRecordStatic = data;
          this.showDetailDialog = true;
        }
      }
    },
    editorDetailFunc(data) {
      this.ruleForm.activityDesc = data;
      console.log(data);
    },
    editorRuleFunc(data) {
      this.ruleForm.conditionRule = data;
    },
    handleTime(row, type) {
      this.$confirm(`确定要让活动『${row.name}』提前${type == "start" ? "开始" : "结束"}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = null;
          if (type == "start") {
            res = await this.$http.activityManagerAdvanceStart({
              id: row.id,
            });
          } else {
            res = await this.$http.activityManagerAdvanceEnd({
              id: row.id,
            });
          }
          if (res) {
            this.getTableList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleDel(row) {
      this.$confirm(`确定要删除『${row.name}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = await this.$http.activityManagerRemove({
            id: row.id,
          });
          if (res) {
            this.getTableList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleClose(done) {
      this.fileImg = [];
      this.$refs["ruleForm"].clearValidate();
      if (done) {
        done();
        return;
      }
      this.showDialog = false;
    },
    handleUpload(res) {
      if (res.code == 200) {
        this.fileImg.push({ url: res.data });
        this.ruleForm.banner = res.data;
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
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.fileImg.length == 0) {
            this.$message.error("请上传图片！");
            return;
          }

          let ruleForm = {
            ...this.ruleForm,
          };

          let res = null;
          if (this.operatingType == 1) {
            ruleForm.banner = this.fileImg[0].url;
            res = await this.$http.activityManagerAdd({ ...ruleForm });
          } else {
            ruleForm.startTime = timeForStr(ruleForm.startTime, "YYYY-MM-DD HH:mm:ss");
            ruleForm.endTime = ruleForm.endTime ? timeForStr(ruleForm.endTime, "YYYY-MM-DD HH:mm:ss") : null;
            res = await this.$http.activityManagerUpdate({ ...ruleForm });
          }
          if (res) {
            this.handleClose();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("操作成功！");
            this.getTableList();
            this.fileImg = [];
            this.ruleForm.activityDesc = null;
            this.ruleForm.conditionRule = null;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTableList(false);
    },
    rewardHandleSizeChange(val) {
      this.size = val;
      this.getAwardsRecords();
    },
    rewardHandleCurrentChange(val) {
      this.rewardPage = val;
      this.getAwardsRecords(false);
    },
  },
  // 创建后
  created() {
    this.ruleFormClone = JSON.parse(JSON.stringify(this.ruleForm));
    this.getTableList();
    this.uploadUrl = config.api + "/file/upload/image";
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}

.remittance-box {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.remittance-amount {
  padding: 20px 0;
  border: 1px solid #666;
  text-align: center;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 50px;
  margin-bottom: 10px;

  .val {
    padding: 10px;
    padding-bottom: 0;
  }

  & > div {
    min-width: 200px;
  }
}

.remittance-more {
  display: flex;
}
.flex {
  display: flex;
  align-items: center;
  gap: 20px;
}
.add-form-box {
  max-height: 75vh;
  overflow-y: auto;
}
.showDetailDialog .remittance-amount > div {
  min-width: 150px;
}
</style>
<style>
.ql-container.ql-snow {
  background: rgb(36, 21, 55);
}
.activity-management-box .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  object-fit: contain;
}
</style>
