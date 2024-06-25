<template>
  <div class="page-wrapper">
    <el-table :data="tableData" style="width: 100%" class="public-table" border>
      <el-table-column prop="id" label="id" align="center"></el-table-column>
      <el-table-column prop="name" label="活动类型" align="center"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "activityList",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      tableData: null,
    };
  },
  // 方法
  methods: {
    // 加载列表
    async getTableList() {
      const res = await this.$http.activityFindList();
      if (res) {
        this.tableData = res;
      }
    },
  },
  // 创建后
  created() {
    this.getTableList();
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
</style>
