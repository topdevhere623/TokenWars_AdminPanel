<template>
  <div class="box-card">
    <el-card v-for="i in dataList" :key="i.key" class="card-item">
      <p class="title">{{ i.title }}</p>
      <template v-if="i.key != 'pendingWithdrawalCount'">
        <p class="num">{{ i.count }}</p>
        <div class="flex">
          <p :class="['increase', { decrease: !i.increaseOrDecrease }]"><span class="sub-title">昨日：</span>{{ i.yesterdayCount }}</p>
          <p :class="['increase', { decrease: !i.increaseOrDecrease }]"><span class="sub-title">本周：</span>{{ i.thisWeekCount }}</p>
        </div>
        <p :class="['increase', { decrease: !i.increaseOrDecrease }]">
          <span class="sub-title">同比上周：</span>{{ i.percentage }}%
          <i class="el-icon-top" v-if="i.increaseOrDecrease"></i>
          <i class="el-icon-bottom" v-else></i>
        </p>
      </template>
      <template v-else>
        <p class="num">{{ i.count }}</p>
        <el-link type="primary" href="/withdrawalReview" v-if="i.count > 0" class="link">前往</el-link>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      sortedMap: [
        { key: "registerPeople", title: "注册人数" },
        { key: "loginPeople", title: "登录人数" },
        { key: "rechargePeople", title: "充值人数" },
        { key: "consumptionPeople", title: "消费人数" },
        { key: "rechargeAmount", title: "充值金额" },
        { key: "orderCount", title: "订单数" },
        { key: "orderAmount", title: "订单金额" },
        { key: "rebateAmount", title: "返奖金额" },
        { key: "withdrawalAmount", title: "提款金额" },
        { key: "pendingWithdrawalCount", title: "待处理提款申请" },
      ],
      dataList: {},
    };
  },
  // 方法
  methods: {
    async getDataFunc() {
      const res = await this.$http.getHomeTodaysData({ userType: this.$store.getters.accountConfig || "" });
      if (res) {
        this.dataList = this.sortedMap.map((x) => {
          if (x.key != "pendingWithdrawalCount") {
            return { ...x, ...res[x.key] };
          } else {
            return { ...x, count: res[x.key] };
          }
        });
      }
    },
  },
  // 创建后
  created() {
    this.getDataFunc();
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
.box-card {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .card-item {
    width: calc((100% - 80px) / 5);
  }
  .title {
    font-size: 18px;
    color: #333;
    font-weight: 500;
  }
  .num {
    color: #333;
    font-size: 30px;
    font-weight: bold;
    margin: 10px 0;
  }
  .increase {
    color: #67c23a;
    margin-top: 10px;
    font-weight: bold;
    font-size: 16px;
    &.decrease {
      color: #f56c6c;
    }
    i {
      font-weight: bold;
    }
    span {
      color: #666;
      font-size: 14px;
    }
  }
}
.link {
  margin-top: 26px;
  font-size: 18px;
  font-weight: bold;
}
.flex {
  display: flex;
  gap: 20px;
}
</style>
