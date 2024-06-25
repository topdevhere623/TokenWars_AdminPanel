<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title-box">
        <h3>盲盒排行榜</h3>
        <el-select v-model="type" @change="getDataList" style="width: 135px">
          <el-option :label="item.label" :value="item.value" v-for="(item, index) in selectOptions" :key="index"></el-option>
        </el-select>
      </div>
    </div>
    <div class="report-table-box">
      <el-table :data="dataList" style="width: 100%" height="500" border>
        <el-table-column prop="qualityType" label="排名" align="center" key="1">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="boxName" label="名称" align="center" key="2"> </el-table-column>
        <el-table-column prop="price" label="单价" align="center" key="3"> </el-table-column>
        <el-table-column prop="price" :label="labelTxt" align="center" key="4">
          <template slot-scope="scope">
            {{ scope.row[type] }}
          </template>
        </el-table-column>
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
      type: "sales",
      selectOptions: [
        { label: "按销量", value: "sales" },
        { label: "按销售额", value: "grossIncome" },
        { label: "按平台收入", value: "totalProfit" },
      ],
      dataList: [],
    };
  },
  computed: {
    labelTxt() {
      const res = this.selectOptions.filter((x) => x.value == this.type);
      return res[0].label;
    },
  },
  // 方法
  methods: {
    async getDataList() {
      const res = await this.$http.getHomeBoxRanking({ sortBy: this.type, page: 1, size: 200 });
      if (res) {
        this.dataList = res.records;
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
}

.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
