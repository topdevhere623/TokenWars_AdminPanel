<template>
  <a :href="addressUrl" target="_blank"><slot>View Results</slot></a>
</template>

<script>
import { chainUrlList } from "@/utils/chain";
export default {
  props: {
    // chainId: {
    //   type: String | Boolean,
    //   default: false,
    // },
    chain: {
      type: String | Boolean,
      default: false,
    },
    address: {
      type: String | Boolean,
      default: false,
    },
  },
  data() {
    return {
      addressUrl: "",
    };
  },
  mounted() {
    const { chain } = this;
    if (chain) {
      let res = chainUrlList.find((x) => x.chainName == chain);
      const chainUrl = res?.blockExplorerUrls;
      this.addressUrl = chainUrl + this.address;
    }
  },
};
</script>

<style lang="scss" scoped>
a {
  color: rgb(49, 206, 11);
}
</style>
