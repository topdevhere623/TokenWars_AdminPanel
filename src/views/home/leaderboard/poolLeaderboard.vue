<template>
  <div class="pool-leaderboard public-leaderboard report-public-content">
    <div class="report-public-header">
      <h2>{{ $t('report.poolLeaderboard') }}</h2>
    </div>
    <el-table
      class="leaderboard-table"
      :data="mainChartDataPoolRank"
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
        prop="poolName"
        :label="$t('report.name')"
        :show-overflow-tooltip="true"
      >
        <span slot="header" class="public-leaderboard-table-header">
          {{ $t('report.name') }}
        </span>
        <span slot-scope="scope">
          {{ scope.row.poolName || '--' }}
        </span>
      </el-table-column>
      <el-table-column
        prop="power"
        :label="$t('report.totalPower')"
        align="right"
        width="100"
        :show-overflow-tooltip="true"
      >
        <span slot="header" class="public-leaderboard-table-header">
          {{ $t('report.totalPower') }}
        </span>
        <span slot-scope="scope">
          {{ Object.formatHashSize(scope.row.power).number }}
          {{ Object.formatHashSize(scope.row.power).digit }}
        </span>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PoolLeaderboard',
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      mainChartDataPoolRank: [],
    };
  },
  // 方法
  methods: {
    async mainChartDataPoolRankApi() {
      const res = await this.$http.mainChartDataPoolRank({
        limit: 10,
      });
      if (res) {
        this.mainChartDataPoolRank = res;
      }
    },
  },
  // 创建后
  created() {
    this.mainChartDataPoolRankApi();
  },
  // 挂载后
  mounted() {},
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
