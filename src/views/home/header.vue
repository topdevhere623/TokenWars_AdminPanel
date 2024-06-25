<template>
  <ul
    class="report-head report-public-content"
    v-if="mainChartDataHead && mainChartDataHead.length > 1"
  >
    <li
      class="report-head-list"
      v-for="(item, index) in mainChartDataHeadData"
      :key="`mainChartDataHeadData-${index}`"
    >
      <h2 class="report-head-list-data">{{ $t(`report.${item}`) }}</h2>
      <h2 class="report-head-list-data">{{ mainChartDataHead[0][item] }}</h2>
      <p class="report-header-text">
        <span class="report-header-title colorSeven">
          {{ $t('report.yesterday') }}
        </span>
        <span
          :class="[
            'colorSeven',
            {
              greenColor:
                mainChartDataHead[0][item] - mainChartDataHead[1][item] > 0,
            },
            {
              redColor:
                mainChartDataHead[0][item] - mainChartDataHead[1][item] < 0,
            },
          ]"
        >
          {{ mainChartDataHead[1][item] }}
        </span>
      </p>
      <p class="report-header-text">
        <span class="report-header-title colorSeven">
          {{ $t('report.lastWeek') }}
        </span>
        <span
          :class="[
            'colorSeven',
            {
              greenColor:
                comparedFun(
                  mainChartDataHead[0][item],
                  mainChartDataHead[2][item]
                ).addMinus === 'add',
            },
            {
              redColor:
                comparedFun(
                  mainChartDataHead[0][item],
                  mainChartDataHead[2][item]
                ).addMinus === 'minus',
            },
          ]"
        >
          {{
            comparedFun(mainChartDataHead[0][item], mainChartDataHead[2][item])
              .text
          }}
          <i
            v-if="
              comparedFun(
                mainChartDataHead[0][item],
                mainChartDataHead[2][item]
              ).addMinus === 'add'
            "
            class="el-input__icon el-icon-caret-top"
          ></i>
          <i
            v-if="
              comparedFun(
                mainChartDataHead[0][item],
                mainChartDataHead[2][item]
              ).addMinus === 'minus'
            "
            class="el-input__icon el-icon-caret-bottom"
          ></i>
        </span>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ReportHeader',
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      mainChartDataHead: [],
      mainChartDataHeadData: [
        'onlineMiner',
        'onlineCard',
        'addMiner',
        'addCard',
        'regUser',
        'loginUser',
      ],
    };
  },
  // 方法
  methods: {
    comparedFun(first, second) {
      if (first || second) {
        const _first = Number(first);
        const _second = Number(second);
        if (_second !== 0) {
          const number = ((_first - _second) / _second).toFixed(4);
          let _text = '';
          if (number > 0) {
            _text = 'add';
          } else if (number < 0) {
            _text = 'minus';
          }
          return {
            addMinus: _text,
            text: `${number * 100}%`,
          };
        } else {
          _first - _second;
          return {
            addMinus: 'add',
            text: `${_first * 100}%`,
          };
        }
      } else {
        return {
          addMinus: '',
          text: `0%`,
        };
      }
    },
    async mainChartDataHeadApi() {
      const res = await this.$http.mainChartDataHead();
      if (res) {
        this.mainChartDataHead = res;
      }
    },
  },
  // 创建后
  created() {
    this.mainChartDataHeadApi();
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
.report-head {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
}
.report-head-list-data {
  line-height: 30px;
  color: #333333;
}
.report-header-text {
  font-weight: 700;
  font-size: 14px;
  line-height: 25px;
}
</style>
