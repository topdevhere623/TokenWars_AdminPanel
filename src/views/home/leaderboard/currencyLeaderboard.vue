<template>
  <div class="currency-leaderboard public-leaderboard report-public-content">
    <div class="report-public-header">
      <h2>{{ $t('report.currencyLeaderboard') }}</h2>
    </div>
    <el-table
      class="leaderboard-table"
      :data="mainChartDataCoinRank"
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
        prop="coinName"
        :label="$t('report.name')"
        :show-overflow-tooltip="true"
      >
        <span slot="header" class="public-leaderboard-table-header">
          {{ $t('report.name') }}
        </span>
        <span slot-scope="scope">
          {{ scope.row.coinName || '--' }}
        </span>
      </el-table-column>
      <el-table-column
        prop="power"
        :label="$t('report.totalPower')"
        width="100"
        align="right"
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
  name: 'CurrencyLeaderboard',
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      mainChartDataCoinRank: [],
    };
  },
  // 方法
  methods: {
    async mainChartDataCoinRankApi() {
      const res = await this.$http.mainChartDataCoinRank({
        limit: 10,
      });
      if (res) {
        this.mainChartDataCoinRank = res;
      }
    },
  },
  // 创建后
  created() {
    this.mainChartDataCoinRankApi();
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
