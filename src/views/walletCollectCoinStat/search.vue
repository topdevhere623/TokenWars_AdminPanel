<template>
  <div>
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 170px"
        placeholder="输入HASH或转入钱包"
        v-model="obscureField"
        clearable
      />
      <el-input
        class="public-input"
        placeholder="输入tokenID"
        v-model="tokenId"
        v-if="typeShow.includes('tokenId')"
        clearable
      />
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('behavior')"
        placeholder="全部行为"
      >
        <el-option label="盲盒抽奖" value="Opensea"> </el-option>
        <el-option label="一元购抽奖" value="blur"> </el-option>
        <el-option label="代币提款" value="blur"> </el-option>
        <el-option label="NFT提款" value="blur"> </el-option>
        <el-option label="归集" value="blur"> </el-option>
        <el-option label="购入NFT" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('chain')"
        placeholder="链类型"
      >
        <el-option label="ETH" value="Opensea"> </el-option>
        <el-option label="POLYGON" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('market')"
        placeholder="交易市场"
      >
        <el-option label="Opensea" value="Opensea"> </el-option>
        <el-option label="blur" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        v-if="typeShow.includes('coin')"
        placeholder="全部代币"
      >
        <el-option label="EHT" value="Opensea"> </el-option>
        <el-option label="USDT" value="blur"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="资产类型"
        v-if="typeShow.includes('assetType')"
      >
        <el-option label="ETH" value="ETH"> </el-option>
        <el-option label="USDT" value="USDT"> </el-option>
      </el-select>
      <el-select
        v-model="chainName"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="状态"
        v-if="typeShow.includes('state')"
      >
        <el-option label="成功" value="ETH"> </el-option>
        <el-option label="失败" value="USDT"> </el-option>
      </el-select>
      <div class="public-date-box">
        <span class="demonstration"> 发起时间 </span>
        <el-date-picker
          v-model="changeCreateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <div class="public-date-box">
        <span class="demonstration"> 账变时间 </span>
        <el-date-picker
          v-model="changeUpdateTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd"
          type="datetimerange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        >
        </el-date-picker>
      </div>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="getTableList()"
      >
        查询
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
        class="public-search"
        @click="getTableList()"
      >
        导出EXCEL
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
