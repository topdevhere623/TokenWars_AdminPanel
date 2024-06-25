<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="title-box">
        <h3>Ranking</h3>
        <el-select v-model="type" @change="getDataList" style="width: 135px">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in selectOptions"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="report-table-box">
      <el-table :data="dataList" style="width: 100%" height="500" border>
        <el-table-column prop="qualityType" label="Rank" align="center" key="1">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="seriesName" label="Series name" align="center" key="2">
        </el-table-column>
        <el-table-column prop="floorPrice" label="Floor price" align="center" key="3">
        </el-table-column>
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
      type: "numberOfTicketsSold",
      selectOptions: [
        { label: "Number of tickets", value: "numberOfTicketsSold" },
        { label: "Creation number", value: "createdNum" },
        { label: "Complete number", value: "finishedNum" },
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
      const res = await this.$http.getHomeOneNftRanking({
        sortBy: this.type,
        page: 1,
        size: 200,
        userType: this.$store.getters.accountConfig || "",
      });
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
