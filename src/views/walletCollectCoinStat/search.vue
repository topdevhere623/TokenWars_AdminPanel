<template>
  <div>
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 170px"
        placeholder="Enter Hash or turn into a wallet"
        v-model="obscureField"
        clearable
      />
      <el-input
        class="public-input"
        placeholder="Enter tokenID"
        v-model="tokenId"
        v-if="typeShow.includes('tokenId')"
        clearable
      />
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('behavior')"
        placeholder="All behavior"
      >
        <el-option label="Blind Box Rainers" value="Opensea"> </el-option>
        <el-option label="One dollar purchase raffle" value="blur"> </el-option>
        <el-option label="Token withdrawal" value="blur"> </el-option>
        <el-option label="NFT withdrawal" value="blur"> </el-option>
        <el-option label="Collect" value="blur"> </el-option>
        <el-option label="Buy NFT" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('chain')"
        placeholder="Chain"
      >
        <el-option label="eth" value="Opensea"> </el-option>
        <el-option label="polygon" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('market')"
        placeholder="market place"
      >
        <el-option label="opensea" value="Opensea"> </el-option>
        <el-option label="blur" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('coin')"
        placeholder="All token"
      >
        <el-option label="eht" value="Opensea"> </el-option>
        <el-option label="usdt" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="Asset type"
        v-if="typeShow.includes('assetType')"
      >
        <el-option label="eth" value="ETH"> </el-option>
        <el-option label="usdt" value="USDT"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="state"
        v-if="typeShow.includes('state')"
      >
        <el-option label="success" value="ETH"> </el-option>
        <el-option label="fail" value="USDT"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> the starting time </span>
        <el-date-picker
          v-model="changeCreateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> Account change time </span>
        <el-date-picker
          v-model="changeUpdateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="arrive"
          start-placeholder="Starting time"
          end-placeholder="End Time"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="getTableList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
        class="public-search"
        @click="getTableList()"
      >
        Export Excel
      </el-button>
    </div>
  </div>
</template>
<script>
import bigNumber from "bignumber.js";
import { timeForStr } from "@/utils";
export default {
  props: ["typeShow"],
  // 数据
  data() {
    return {
      Id: null, // Id
      tokenId: null,
      obscureField: null, // 用户ID/昵称
      chainName: "", // 卖出币种
      changeCreateTime: [], // 创建时间
      changeUpdateTime: [], // 账变时间
    };
  },
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 搜索条件
    searchFun() {
      let { changeCreateTime, changeUpdateTime } = this;
      const [createStartTime, createEndTime] = changeCreateTime;
      const [updateStartTime, updateEndTime] = changeUpdateTime;
      return {
        obscureField: this.obscureField,
        chainName: this.chainName,
        createStartTime,
        createEndTime,
        updateStartTime,
        updateEndTime,
      };
    },
    // 加载列表
    async getTableList() {
      const search = this.searchFun();
      this.$emit("search", search);
      this.$emit("getTableList");
    },
  },
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
