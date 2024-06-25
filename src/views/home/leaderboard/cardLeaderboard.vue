<template>
  <div class="card-leaderboard public-leaderboard report-public-content">
    <div class="report-public-header">
      <h2>{{ $t('report.cardLeaderboard') }}</h2>
      <div class="report-public-header-runStatus">
        <el-button
          :class="[{ chooseBtn: runStatus === 'ALL' }]"
          @click="changeRunStatus('ALL')"
        >
          {{ $t('report.all') }}
        </el-button>
        <el-button
          :class="[{ chooseBtn: runStatus === 'ONLINE' }]"
          @click="changeRunStatus('ONLINE')"
        >
          {{ $t('report.onLine') }}
        </el-button>
      </div>
    </div>
    <el-table
      class="leaderboard-table"
      :data="mainChartDataCardRank"
      :max-height="324"
      stripe
    >
      <el-table-column
        :label="$t('report.leaderboard')"
        width="60"
        :show-overflow-tooltip="true"
      >
        <span slot="header" class="public-leaderboard-table-header">
          {{ $t('report.leaderboard') }}
        </span>
        <span slot-scope="scope">
          {{ scope.$index + 1 }}
        </span>
      </el-table-column>
      <el-table-column
        prop="cardName"
        :label="$t('report.name')"
        :show-overflow-tooltip="true"
      >
        <span slot="header" class="public-leaderboard-table-header">
          {{ $t('report.name') }}
        </span>
        <span slot-scope="scope">
          {{ scope.row.cardName || '--' }}
        </span>
      </el-table-column>
      <el-table-column
        prop="num"
        :label="$t('report.number')"
        align="right"
        width="100"
        :show-overflow-tooltip="true"
      >
        <span slot="header" class="public-leaderboard-table-header">
          {{ $t('report.number') }}
        </span>
        <span slot-scope="scope">
          {{ scope.row.num || '--' }}
        </span>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CardLeaderboard',
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      mainChartDataCardRank: [],
      runStatus: 'ALL',
    };
  },
  // 方法
  methods: {
    changeRunStatus(_runStatus) {
      if (_runStatus === this.runStatus) return;
      this.runStatus = _runStatus;
      this.mainChartDataCardRankApi();
    },
    async mainChartDataCardRankApi() {
      const { runStatus } = this;

      const res = await this.$http.mainChartDataCardRank({
        limit: 10,
        runStatus: runStatus === 'ALL' ? '' : runStatus,
      });
      if (res) {
        this.mainChartDataCardRank = res;
      }
    },
  },
  // 创建后
  created() {
    this.mainChartDataCardRankApi();
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
.chooseBtn {
  background: #46a6ff;
  border-color: #46a6ff;
  color: #ffffff;
}
</style>
