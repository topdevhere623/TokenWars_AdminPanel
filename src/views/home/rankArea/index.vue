<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title-box">
        <h3>用户地区统计</h3>
      </div>
    </div>
    <div class="report-table-box">
      <el-table :data="dataList" style="width: 100%" height="500" border>
        <el-table-column prop="country" label="国家" align="center" key="1">
          <template slot-scope="scope">
            {{ scope.row.country || "其他" }}
          </template>
        </el-table-column>
        <el-table-column prop="registerNum" label="注册" align="center" key="2"> </el-table-column>
        <el-table-column prop="rechargeAmount" label="充值" align="center" key="3"> </el-table-column>
        <el-table-column prop="consumeAmount" label="消费" align="center" key="4"> </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      dataList: [],
    };
  },
  // 方法
  methods: {
    async getDataList() {
      const res = await this.$http.getHomeUserRegionStatisticsChart({ userType: this.$store.getters.accountConfig || "" });
      if (res) {
        this.dataList = res;
      }
    },
  },
  // 创建后
  created() {
    this.getDataList();
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
.report-table-box {
  min-height: 500px;
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>
