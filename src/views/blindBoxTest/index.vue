<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-select v-model="boxId" class="public-select-box" popper-class="public-select-box" placeholder="选择盲盒" clearable>
        <el-option v-for="(item, index) in dropBox" :key="index" :label="item.boxName" :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="bloodPoolsStatus" class="public-select-box" popper-class="public-select-box" placeholder="血池状态"
        clearable>
        <el-option label="血池开" value="TRUE">
        </el-option>
        <el-option label="血池关" value="FALSE">
        </el-option>
      </el-select>
      <el-input class="public-input" type="number" style="width: 140px;" placeholder="请输入血池修正值" v-model="adjust"
        clearable />
      <el-select v-model="lotteryHandler" style="width: 160px;" class="public-select-box" popper-class="public-select-box"
        placeholder="NFT状态">
        <el-option label="回收" value="RECLAIM">
        </el-option>
        <el-option label="提取" value="EXTRACT">
        </el-option>
        <el-option label="内部回收外部提取" value="AVG">
        </el-option>
      </el-select>
      <el-select v-model="coiledType" class="public-select-box" popper-class="public-select-box" placeholder="抽奖状态"
        clearable>
        <el-option label="单抽" value="ONE">
        </el-option>
        <el-option label="五连抽" value="FIVE">
        </el-option>
        <el-option label="十连抽" value="TEN">
        </el-option>
      </el-select>
      <el-input class="public-input" style="width: 140px;" placeholder="请输入测试数量" v-model.number="testNumber" clearable />
      <el-button :loading="loading" type="primary" icon="el-icon-video-play" class="public-search" @click="startRaffle()">
        开始
      </el-button>
      <el-button :loading="loading" type="primary" icon="el-icon-s-promotion" class="public-search"
        @click="fetchBlindBoxTest()">
        快速测试
      </el-button>
      <el-button :loading="loading" type="primary" icon="el-icon-refresh" class="public-search" @click="blindBoxReset()">
        重置
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">盲盒单价</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.price }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">期盼返还率</div>
          <div class="val">
            {{ aggregateQuery && `${new bigNumber(aggregateQuery.expectRate || 0).multipliedBy(100).toFixed(4)}%` }}
          </div>
        </div>
        <div class="remittance-item">
          <div class="title">总消费</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.grossIncomes }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总返奖</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalExpenditures }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">实际返还率</div>
          <div class="val">
            {{ aggregateQuery && `${new bigNumber(aggregateQuery.realRate || 0).multipliedBy(100).toFixed(4)}%` }}
          </div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="qualityType" label="产品质量" align="center" key="1">
      </el-table-column>
      <el-table-column prop="nftName" label="系列名称" align="center" key="2">
      </el-table-column>
      <el-table-column prop="nftId" label="NFT ID" align="center" key="3">
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" key="4">
      </el-table-column>
      <el-table-column prop="count" label="开出次数" align="center" key="5">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr, exportExcel } from '@/utils';
import pagination from '@/mixins/pagination';
import config from "@/config/env";
import { Loading } from "element-ui";
export default {
  name: 'BlindBoxTest',
  // 模板引入
  components: {
  },
  // 数据
  data() {
    return {
      boxId: null, // 盲盒ID
      bloodPoolsStatus: "TRUE", // 血池状态
      adjust: null, // 中奖修正值
      lotteryHandler: "RECLAIM", // NFT处理
      coiledType: "ONE", // 抽奖类型
      testNumber: null, //测试数量
      dropBox: null, // 盲盒下拉

      page: 1,
      size: 9999,
      tableData: null,
      aggregateQuery: {
        price: 0, //盲盒价格
        expectRate: 0, //期望返还率
        realRate: 0, //实际返还率
        totalExpenditures: 0, //总支出
        grossIncomes: 0 //总收入
      },
      loading: false
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    startRaffle() {
      const { boxId, testNumber } = this;
      let count = testNumber;
      const that = this;

      if (!boxId) {
        this.$message.error("请选择盲盒");
        return
      }

      if (!testNumber) {
        this.$message.error("请输入测试数量");
        return
      }

      this.blindBoxReset();
      this.loading = true;

      const raffle = () => {
        setTimeout(() => {
          that.fetchBlindBoxTest();
          count--;
          if (count > 0) {
            raffle();
          } else {
            that.loading = false;
            return
          }
        }, 300);
      }

      if (testNumber > 0) {
        raffle();
      }
    },
    // 加载盲盒
    async fetchBoxManager() {
      const data = {
        boxStatus: "NORMAL",
        page: 1,
        size: 999,
      };
      const res = await this.$http.getBoxManagerList(data);
      if (res) {
        this.dropBox = res.records;
      }
    },
    // 开始测试
    async fetchBlindBoxTest() {
      const data = {
        boxId: this.boxId, // 盲盒ID
        bloodPoolsStatus: this.bloodPoolsStatus, // 血池状态
        adjust: this.adjust, // 中奖修正值
        lotteryHandler: this.lotteryHandler, // NFT处理
        coiledType: this.coiledType, // 抽奖类型
        page: 1,
        size: 9999
      };
      const res = await this.$http.getBlindBoxTest(data);
      if (res) {
        this.tableData = res.page.records;
        this.aggregateQuery = res;
      }
    },
    // 快速测试
    async fetchBlindBoxTest() {
      const { boxId, testNumber } = this;
      if (!boxId) {
        this.$message.error("请选择盲盒");
        return
      }

      if (!testNumber) {
        this.$message.error("请输入测试数量");
        return
      }

      this.loading = true;
      const data = {
        boxId: this.boxId, // 盲盒ID
        bloodPoolsStatus: this.bloodPoolsStatus, // 血池状态
        adjust: this.adjust, // 中奖修正值
        lotteryHandler: this.lotteryHandler, // NFT处理
        coiledType: this.coiledType, // 抽奖类型
        countNumber: this.testNumber, // 抽奖次数
        page: 1,
        size: 9999
      };
      const res = await this.$http.getBlindBoxFastTest(data);
      if (res) {
        this.tableData = res.page.records;
        this.aggregateQuery = res;
        this.loading = false;
      } else {
        this.loading = false;
      }
    },
    // 重置
    async blindBoxReset() {
      const res = await this.$http.blindBoxReset();
      if (res) {
        this.tableData = null;
        this.aggregateQuery = {
          price: 0,
          expectRate: 0,
          realRate: 0,
          totalExpenditures: 0,
          grossIncomes: 0
        }
      }
    },
  },
  // 创建后
  created() {
    this.fetchBoxManager();
  },
  computed: {
    coin() {
      return this.$store.getters.coinConfig;
    },
    userType() {
      return this.$store.getters.accountConfig;
    },
  },
  // 挂载后
  mounted() { },
  // 更新后
  updated() { },
  // 销毁
  beforeDestroy() { },
};
</script>

<style lang="scss" scoped>
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

  &>div {
    min-width: 200px;
  }
}

.remittance-more {
  display: flex;
}
</style>
