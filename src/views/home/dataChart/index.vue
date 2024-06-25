<template>
  <el-card>
    <div slot="header" class="clearfix">
      <div class="report-public-header">
        <h3><slot></slot></h3>
        <el-select v-model="day" :placeholder="$t('public.select')" @change="dayChangeFun" style="width: 135px">
          <el-option v-for="item in options" :key="`${item.key}-${item.value}`" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </div>
    <div class="dataChart report-public-content">
      <div class="dataChart-content">
        <el-radio-group size="medium" v-model="activeName" @change="changeType" style="margin-bottom: 50px">
          <el-radio-button :label="item.type" v-for="item in typeList" :key="item.type">{{ item.name }}</el-radio-button>
        </el-radio-group>
        <chart :dataList="dataList" :id="activeName" :tooltip="tooltip" />
      </div>
    </div>
  </el-card>
</template>

<script>
import dayjs from "dayjs";

import { options } from "../day";
import chart from "./chart.vue";
export default {
  name: "DataChart",
  // 模板引入
  components: { chart },
  props: {
    typeList: {
      type: [],
      required: true,
    },
    dataList: {
      type: [],
      required: true,
    },
    defaultTime: {
      type: String,
      required: false,
    },
    tooltip: {
      required: false,
      default: null,
    },
  },
  // 数据
  data() {
    return {
      activeName: "",
      options: options,
      day: "SEVEN",
    };
  },
  watch: {},
  // 方法
  methods: {
    dayChangeFun() {
      this.$emit("change", { day: this.day, type: this.activeName });
    },
    changeType(type) {
      this.activeName = type;
      this.$emit("change", { day: this.day, type: this.activeName });
    },
  },
  // 创建后
  created() {},
  // 挂载后
  mounted() {
    if (this.defaultTime) {
      this.day = this.defaultTime;
    }

    this.activeName = this.typeList[0].type;
  },
  // 更新后
  updated() {},
  // 销毁
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped></style>
