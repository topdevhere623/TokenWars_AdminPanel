<template>
  <div class="number-list-specific">
    <p>{{ title }}</p>
    <el-tooltip
      placement="bottom-start"
      :visible-arrow="false"
      popper-class="atooltip"
    >
      <div slot="content">
        {{ number }}
      </div>
      <p class="blod-text ellipsis-line">
        {{ number }}
      </p>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'RegisterChartNumber',
  props: {
    title: {
      type: String,
      default: '',
    },
    number: {
      type: [String, Number],
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.number-list-specific {
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
.blod-text {
  font-weight: 600;
  max-width: 85px;
}
</style>
