<template>
  <div class="page-wrapper activity-management-box">
    <div class="public-list-inputs">
      <div class="remittance-box">
        <div class="remittance-amount remittance-more">
          <div class="remittance-item">
            <div class="title">Total number of participants</div>
            <div class="val">{{ aggregateQuery && aggregateQuery.joinPeopleNum }}</div>
          </div>
          <div class="remittance-item">
            <div class="title">Total bonus</div>
            <div class="val">{{ aggregateQuery && aggregateQuery.totalBonus }}</div>
          </div>
          <div class="remittance-item">
            <div class="title">total points</div>
            <div class="val">{{ aggregateQuery && aggregateQuery.totalPoint }}</div>
          </div>
        </div>
      </div>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="handleAdd()"
      >
        Add activity
      </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="Active ID" align="center" key="1">
      </el-table-column>
      <el-table-column prop="name" label="Event name" align="center" key="2">
      </el-table-column>
      <el-table-column
        prop="banner"
        label="Banner picture"
        width="120px"
        align="center"
        key="3"
      >
        <template slot-scope="scope">
          <div style="width: 100px; height: 50px">
            <el-image
              style="height: 100%"
              :src="scope.row.banner"
              :preview-src-list="[scope.row.banner]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="seriesName" label="type of activity" align="center" key="4">
        <template slot-scope="scope">
          {{ getActivityName(scope.row.activityType) }}
        </template>
      </el-table-column>
      <el-table-column prop="activityIndex" label="Sort" align="center" key="5">
      </el-table-column>
      <el-table-column
        prop="joinNum"
        label="The number of participants"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column label="Have received/Total bonus" align="center" key="7">
        <template slot-scope="scope">
          <p v-if="scope.row.totalBonus">
            {{ scope.row.receivedBonus + " / " + scope.row.totalBonus }}
          </p>
          <p v-else>--</p>
        </template>
      </el-table-column>
      <el-table-column prop="points" label="total points" align="center" key="8">
      </el-table-column>
      <el-table-column
        prop="relevancyBoxNumber"
        label="Reward record"
        align="center"
        key="9"
      >
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="recordsShow(scope.row)">
            Detail
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="acticityStatus"
        width="120"
        label="状态"
        align="center"
        key="10"
      >
        <template slot-scope="scope">
          <p style="color: #67c23a" v-if="scope.row.acticityStatus == 'IN_PROGRESS'">
            in progress
          </p>
          <p style="color: #e6a23c" v-else-if="scope.row.acticityStatus == 'NOT_STARTED'">
            has not started
          </p>
          <p style="color: #909399" v-else>over</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        width="140"
        label="开始时间"
        align="center"
        key="11"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.startTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column
        prop="endTime"
        width="140"
        label="结束时间"
        align="center"
        key="12"
      >
        <template slot-scope="scope">
          {{ timeForStr(scope.row.endTime, "YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="operate" align="center" key="13" width="140">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="handleEdit(scope.row)">
            {{ scope.row.acticityStatus == "ENDED" ? "Detail" : "edit" }}
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="handleTime(scope.row, 'start')"
            v-if="scope.row.acticityStatus == 'NOT_STARTED'"
          >
            Start in advance
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="handleTime(scope.row, 'end')"
            v-if="scope.row.acticityStatus == 'IN_PROGRESS'"
          >
            an early closure
          </span>
          <span
            class="blueColor publick-button cursor"
            @click="handleDel(scope.row)"
            v-if="scope.row.acticityStatus != 'IN_PROGRESS'"
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
    <el-dialog
      v-if="showDialog"
      :title="operatingType == 1 ? 'Add activity' : 'Editing activity'"
      :visible.sync="showDialog"
      width="940px"
      :close-on-click-modal="false"
      :before-close="handleClose"
      top="5vh"
    >
      <div class="add-form-box">
        <el-form
          ref="ruleForm"
          class="add-form"
          :rules="rules"
          :model="ruleForm"
          label-width="140px"
        >
          <el-form-item
            label="type of activity"
            prop="activityType"
            :rules="rules.select"
          >
            <el-select
              :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
              v-model="ruleForm.activityType"
              style="width: 350px"
            >
              <el-option
                v-for="(item, index) in typeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Event name" prop="name" :rules="rules.blur">
            <el-input
              v-model="ruleForm.name"
              style="width: 350px"
              placeholder="Please enter the name"
            />
          </el-form-item>
          <el-form-item label="Activity banner" prop="banner" :rules="rules.select">
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
          <el-form-item label="Sort" prop="activityIndex" :rules="rules.blur">
            <el-input
              v-model="ruleForm.activityIndex"
              style="width: 350px"
              placeholder="The larger the numbers, the higher the higher"
            />
          </el-form-item>
          <el-form-item
            label="one-sentence introduction"
            prop="shortWord"
            :rules="rules.blur"
          >
            <el-input
              v-model="ruleForm.shortWord"
              style="width: 350px"
              placeholder="Please enter the name"
            />
          </el-form-item>
          <template v-if="ruleForm.activityType != 'WELCOME_BONUS'">
            <el-form-item label="Point ratio" prop="pointRate" :rules="rules.blur">
              <el-input
                type="number"
                v-model="ruleForm.pointRate"
                style="width: 350px"
                placeholder="Please enter the integral ratio"
              >
                <template slot="append">Doubling</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Maximum" prop="maxPoint" :rules="rules.blur">
              <el-input
                v-model="ruleForm.maxPoint"
                style="width: 350px"
                placeholder="Please enter the maximum points"
              />
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item label="Minimum recharge" prop="lowRecharge" :rules="rules.blur">
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.lowRecharge"
                style="width: 350px"
                placeholder="Please enter the minimum recharge"
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Bonus ratio" prop="bonusRate" :rules="rules.blur">
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.bonusRate"
                style="width: 350px"
                placeholder="Please enter the bonus ratio"
              >
                <template slot="append">Doubling</template>
              </el-input>
            </el-form-item>
            <el-form-item label="Maximum bonus" prop="maxBonusLimit" :rules="rules.blur">
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.maxBonusLimit"
                style="width: 350px"
                placeholder="Please enter the maximum bonus"
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="Unlock the flow rate required"
              prop="unlockFlowRate"
              :rules="rules.blur"
            >
              <el-input
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                type="number"
                v-model="ruleForm.unlockFlowRate"
                style="width: 350px"
                placeholder="Please enter the unlocked flowing rate required"
              >
                <template slot="append">Doubling</template>
              </el-input>
            </el-form-item>
            <div class="flex">
              <el-form-item label="Unlocking round" prop="unlockNum" :rules="rules.blur">
                <el-input
                  :disabled="
                    ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1
                  "
                  type="number"
                  v-model="ruleForm.unlockNum"
                  style="width: 200px"
                  placeholder="Please enter the unlock wheel"
                >
                  <template slot="append">Second-rate</template>
                </el-input>
              </el-form-item>
              <el-form-item label="Unlock ratio" v-if="ruleForm.unlockNum > 0">
                <p style="line-height: 28px">
                  {{ ((1 / ruleForm.unlockNum) * 100).toFixed(2) }}%
                </p>
              </el-form-item>
            </div>
          </template>
          <el-form-item label="Start and end time" prop="startTime" :rules="rules.select">
            <div class="flex">
              <el-date-picker
                style="width: 200px"
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                v-model="ruleForm.startTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="Choose start time"
              >
              </el-date-picker>
              <p>to</p>
              <el-date-picker
                :disabled="ruleForm.acticityStatus == 'IN_PROGRESS' && operatingType != 1"
                style="width: 200px"
                v-model="ruleForm.endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="Choose start time"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item
            label="Activity description"
            prop="activityDesc"
            :rules="rules.blur"
          >
            <quillEditor
              :content="ruleForm.activityDesc"
              @change="editorDetailFunc"
            ></quillEditor>
          </el-form-item>
          <el-form-item
            label="terms and conditions"
            prop="conditionRule"
            :rules="rules.blur"
          >
            <quillEditor
              :content="ruleForm.conditionRule"
              @change="editorRuleFunc"
            ></quillEditor>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button
          :disabled="ruleForm.acticityStatus == 'ENDED'"
          type="primary"
          @click="submitForm()"
          >Sure</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      v-if="showDetailDialog"
      title="Reward record"
      :visible.sync="showDetailDialog"
      width="1200px"
      :close-on-click-modal="false"
    >
      <div class="page-wrapper showDetailDialog">
        <template>
          <div class="public-list-inputs">
            <el-input
              class="public-input"
              style="width: 200px"
              placeholder="Enter the player's nickname/ID"
              v-model="obscureField"
              clearable
            />
            <el-button
              type="primary"
              icon="el-icon-search"
              class="public-search"
              @click="getAwardsRecords()"
            >
              Inquire
            </el-button>
          </div>
          <div class="remittance-box" v-if="row.activityType == 'WELCOME_BONUS'">
            <div class="remittance-amount remittance-more">
              <div class="remittance-item">
                <div class="title">The number of participants</div>
                <div class="val">{{ rewardRecordStatic?.joinPeopleNum }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">Total recharge</div>
                <div class="val">{{ rewardRecordStatic?.totalRecharge }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">Total bonus</div>
                <div class="val">{{ rewardRecordStatic?.totalBonus }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">Total flow</div>
                <div class="val">{{ rewardRecordStatic?.totalFlowNums }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">Unlock</div>
                <div class="val">{{ rewardRecordStatic?.totalUnlocks }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">Always receive</div>
                <div class="val">{{ rewardRecordStatic?.totalReceive }}</div>
              </div>
              <div class="remittance-item">
                <div class="title">Never lead</div>
                <div class="val">
                  {{
                    accurateDecimal(
                      new bigNumber(
                        rewardRecordStatic?.totalUnlocks -
                          rewardRecordStatic?.totalReceive || 0
                      ),
                      4
                    )
                  }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <el-table :data="rewardRecordList" style="width: 100%" border>
          <el-table-column prop="id" label="Player ID/Nick name" align="center" key="0">
            <template slot-scope="scope">
              <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
                {{ scope.row.userId || "--" }}
              </p>
              <p :style="{ color: scope.row.userType == 'INNER' ? 'red' : '#000' }">
                {{ scope.row.userName || "--" }}
              </p>
            </template>
          </el-table-column>
          <template v-if="row.activityType == 'WELCOME_BONUS'">
            <el-table-column
              prop="rechargeAmount"
              width="120"
              label="Recharge amount"
              align="center"
              key="1"
            >
            </el-table-column>
            <el-table-column
              prop="rechargeTime"
              label="Recharge time"
              align="center"
              key="2"
            >
              <template slot-scope="scope">
                {{ timeForStr(scope.row.rechargeTime, "YYYY-MM-DD HH:mm:ss") }}
              </template>
            </el-table-column>
            <el-table-column
              prop="totalRewards"
              label="Total bonus"
              align="center"
              key="4"
            >
            </el-table-column>
            <el-table-column prop="flowAmount" label="Dowded" align="center" key="5">
            </el-table-column>
            <el-table-column
              prop="unlockReward"
              label="Unlock bonus"
              align="center"
              key="6"
            >
            </el-table-column>
            <el-table-column
              prop="receivedReward"
              label="Receive bonus"
              align="center"
              key="7"
            >
            </el-table-column>
            <el-table-column
              prop="walletAddress"
              label="Unblocked bonus"
              align="center"
              key="8"
            >
              <template slot-scope="scope">
                {{
                  accurateDecimal(
                    new bigNumber(scope.row.unlockReward - scope.row.receivedReward || 0),
                    4
                  )
                }}
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column
              prop="flowAmount"
              label="Flowing water"
              align="center"
              key="9"
            >
            </el-table-column>
            <el-table-column
              prop="totalPoints"
              label="total points"
              align="center"
              key="10"
            >
            </el-table-column>
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
        <el-button type="primary" @click="showDetailDialog = false">closure</el-button>
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
        { label: "Bonus", value: "WELCOME_BONUS" },
        { label: "Open the box to win points", value: "OPEN_BOX_WIN_POINTS" },
        { label: "Treasure Winning points", value: "TREASURES_WIN_POINTS" },
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
        select: [
          { required: true, message: "please choose", trigger: ["blur", "change"] },
        ],
        blur: [{ required: true, message: "please enter", trigger: ["blur", "change"] }],
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
        const data = await this.$http.activityManagerDetailHeaderDataTotal({
          id: this.row.id,
          obscureField: this.obscureField,
        });
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
      this.$confirm(
        `Make sure the event" ${row.name}} "advance ${
          type == " start " ? " Start " : " End "
        }?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
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
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleDel(row) {
      this.$confirm(`Are you going to delete" ${row.name} "?`, {
        confirmButtonText: "Sure",
        cancelButtonText: "Cancel",
        type: "info",
      })
        .then(async () => {
          let res = await this.$http.activityManagerRemove({
            id: row.id,
          });
          if (res) {
            this.getTableList();
            this.$message.success("Successful operation");
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
    // 提交
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.fileImg.length == 0) {
            this.$message.error("Please upload the picture!");
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
            ruleForm.endTime = ruleForm.endTime
              ? timeForStr(ruleForm.endTime, "YYYY-MM-DD HH:mm:ss")
              : null;
            res = await this.$http.activityManagerUpdate({ ...ruleForm });
          }
          if (res) {
            this.handleClose();
            this.$refs["ruleForm"].resetFields();
            this.$message.success("Successful operation!");
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
