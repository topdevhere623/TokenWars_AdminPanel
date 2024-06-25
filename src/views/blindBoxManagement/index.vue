<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input class="public-input" style="width: 140px" placeholder="输入盲盒ID" v-model="Id" clearable />
      <el-input class="public-input" style="width: 140px" placeholder="输入盲盒名称" v-model="boxName" clearable />
      <el-select v-model="externalStatus" class="public-select-box" popper-class="public-select-box" placeholder="外部状态" clearable>
        <el-option label="正常" value="NORMAL"> </el-option>
        <el-option label="数量不足" value="NUMBER"> </el-option>
      </el-select>
      <el-select v-model="boxStatus" class="public-select-box" popper-class="public-select-box" placeholder="盲盒状态" clearable>
        <el-option label="冻结" value="DISABLE"> </el-option>
        <el-option label="正常" value="NORMAL"> </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" class="public-search" @click="fetchBoxManagerList()"> 查询 </el-button>
      <el-button type="primary" icon="el-icon-circle-plus-outline" class="public-search" @click="addBox()"> 添加盲盒 </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">总盲盒数</div>
          <div class="val">{{ baseUserPage && baseUserPage.total }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总被开次数</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.openBoxNumber }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总价值</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.priceTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总提走次数</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.outNumberTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总退款数</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.refundsTotalNumber }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总收入</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.grossIncome }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总支出</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalOpenNftPrice }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">总收益</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.grossIncomeU }}</div>
        </div>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="sortChange" class="public-table" border>
      <el-table-column prop="id" sortable="custom" label="盲盒ID" align="center" key="1"> </el-table-column>
      <el-table-column prop="boxImg" label="盲盒图片" width="120px" align="center" key="2">
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image style="height: 100%" :src="scope.row.boxImg" :preview-src-list="[scope.row.boxImg]"> </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="boxName" width="120" label="盲盒名称" align="center" key="3"> </el-table-column>
      <el-table-column prop="boxIndex" sortable="custom" label="推荐顺序" align="center" key="4"> </el-table-column>
      <el-table-column prop="nftTotalNumber" label="权重" align="center" key="5"> </el-table-column>
      <el-table-column prop="price" sortable="custom" label="单价" align="center" key="6"> </el-table-column>
      <el-table-column prop="fivePrice" sortable="custom" label="五连价格" align="center" key="7"></el-table-column>
      <el-table-column prop="tenPrice" sortable="custom" label="十连价格" align="center" key="8"></el-table-column>
      <el-table-column prop="totalWeight" sortable="custom" label="总权重" align="center" key="9"></el-table-column>
      <el-table-column prop="sales" width="100" sortable="custom" label="销量" align="center" key="10"></el-table-column>
      <el-table-column
        prop="grossIncome"
        sortable="custom"
        width="100"
        :label="`总收入(${coin})`"
        align="center"
        key="12"
      ></el-table-column>
      <el-table-column
        prop="totalOpenNftPrice"
        sortable="custom"
        width="100"
        :label="`总支出(${coin})`"
        align="center"
        key="13"
      ></el-table-column>
      <el-table-column
        prop="totalExpenditure"
        sortable="custom"
        width="120"
        :label="`实际返奖(${coin})`"
        align="center"
        key="14"
      ></el-table-column>
      <el-table-column
        prop="totalProfit"
        width="100"
        sortable="custom"
        :label="`总利润(${coin})`"
        align="center"
        key="15"
      ></el-table-column>
      <el-table-column prop="realRate" width="100" sortable="custom" label="实际返还率" align="center" key="16">
        <template slot-scope="scope">
          {{ `${accurateDecimal(new bigNumber(scope.row.realRate || 0).multipliedBy(100), 4)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="deviseRate" width="100" sortable="custom" label="设计返还率" align="center" key="17">
        <template slot-scope="scope">
          {{ `${accurateDecimal(new bigNumber(scope.row.deviseRate || 0).multipliedBy(100), 4)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="reduceThreshold" width="100" sortable="custom" label="盲盒衰减率" align="center" key="18">
        <template slot-scope="scope">
          {{
            scope.row.reduceThreshold != null && scope.row.reduceThreshold !== ""
              ? `${accurateDecimal(new bigNumber(scope.row.reduceThreshold).multipliedBy(100), 4)}%`
              : "--"
          }}
        </template>
      </el-table-column>
      <el-table-column prop="adjust" width="100" sortable="custom" label="中奖修正" align="center" key="19"> </el-table-column>
      <el-table-column prop="adjustRate" width="100" sortable="custom" label="修正返还率" align="center" key="20">
        <template slot-scope="scope">
          {{ `${accurateDecimal(new bigNumber(scope.row.adjustRate || 0).multipliedBy(100), 4)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="expectRate" width="100" sortable="custom" label="期望返还率" align="center" key="21">
        <template slot-scope="scope">
          {{ `${accurateDecimal(new bigNumber(scope.row.expectRate || 0).multipliedBy(100), 4)}%` }}
        </template>
      </el-table-column>
      <el-table-column prop="externalStatus" sortable="custom" label="外部异常" align="center" key="22">
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.externalStatus == 'NUMBER'">数量不足</span>
          <span style="color: #21ae04" v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="bloodPoolsStatus" sortable="custom" label="血池开关" align="center" key="23">
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.bloodPoolsStatus == 'FALSE'">关闭</span>
          <span style="color: #21ae04" v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="bloodPoolsStatus" sortable="custom" label="是否假盲盒" align="center" key="24">
        <template slot-scope="scope">
          <span>{{ scope.row.indexShowStatus == "TRUE" ? "是" : "否" }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="boxStatus" sortable="custom" label="状态" align="center" key="25">
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.boxStatus == 'DISABLE'">冻结</span>
          <span style="color: #21ae04" v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="操作" align="center" width="110" key="26" fixed="right">
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="onEbit(scope.row)"> 编辑 </span>
          <span class="blueColor publick-button cursor" @click="operatingNft(scope.row)">
            {{ scope.row.boxStatus == "DISABLE" ? "解禁" : "冻结" }}
          </span>
          <span class="blueColor publick-button cursor" @click="handleDel(scope.row)"> 删除 </span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="baseUserPage && baseUserPage.total"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="pagination.pageSizes"
      :page-size="size"
      layout=" sizes, prev, pager, next, jumper"
      :total="baseUserPage.total"
      class="public-pagination"
    >
    </el-pagination>
    <el-dialog
      :title="operatingType == 1 ? '新增盲盒' : '编辑盲盒'"
      :visible.sync="showDialog"
      width="1200px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="box-setting">
        <el-form ref="ruleForm" style="width: 420px" :rules="rules" :model="ruleForm" label-width="100px">
          <el-form-item label="是否假盲盒">
            <el-switch
              v-model="ruleForm.indexShowStatus"
              active-value="TRUE"
              inactive-value="FALSE"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="盲盒名称" prop="boxName">
            <el-input v-model="ruleForm.boxName" style="width: 300px" placeholder="请输入盲盒名称"> </el-input>
          </el-form-item>
          <el-form-item label="盲盒图片" prop="seriesImg">
            <el-upload
              :action="uploadUrl"
              :class="{ hide: hideUpload }"
              :on-change="handleChange"
              :on-success="handleUpload"
              :file-list="fileImg"
              :multiple="false"
              :limit="limitCount"
              accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/gif,image/webp"
              list-type="picture-card"
              :before-upload="handleBefore"
              :on-remove="handleRemove"
              :on-exceed="handExceed"
              :headers="uploadHeader"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
          <el-form-item label="H5盲盒图片" prop="seriesImg">
            <div class="flex">
              <el-upload
                :action="uploadUrl"
                :class="{ hide: hideUploadOne }"
                :on-change="handleChangeOne"
                :on-success="handleUploadOne"
                :file-list="fileImgOne"
                :multiple="false"
                :limit="limitCount"
                accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/gif,image/webp"
                list-type="picture-card"
                :before-upload="handleBefore"
                :on-remove="handleRemoveOne"
                :on-exceed="handExceed"
                :headers="uploadHeader"
              >
                <i class="el-icon-plus" />
                <div class="tip">logo</div>
              </el-upload>
              <el-upload
                :action="uploadUrl"
                :class="{ hide: hideUploadTwo }"
                :on-change="handleChangeTwo"
                :on-success="handleUploadTwo"
                :file-list="fileImgTwo"
                :multiple="false"
                :limit="limitCount"
                accept="image/png,image/jpg,image/jpeg,image/svg+xml,image/gif,image/webp"
                list-type="picture-card"
                :before-upload="handleBefore"
                :on-remove="handleRemoveTwo"
                :on-exceed="handExceed"
                :headers="uploadHeader"
              >
                <i class="el-icon-plus" />
                <div class="tip">光盘</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="推荐顺序" prop="boxIndex">
            <el-input type="number" v-model.number="ruleForm.boxIndex" style="width: 300px" placeholder="请输入推荐顺序"></el-input>
          </el-form-item>
          <el-form-item label="单价" prop="price">
            <el-input type="number" v-model="ruleForm.price" style="width: 300px" placeholder="请输入单价"></el-input>
          </el-form-item>
          <el-form-item label="五连单价" prop="fivePrice">
            <el-input type="number" v-model="ruleForm.fivePrice" style="width: 300px" placeholder="请输入五连单价"></el-input>
          </el-form-item>
          <el-form-item label="十连单价" prop="tenPrice">
            <el-input type="number" v-model="ruleForm.tenPrice" style="width: 300px" placeholder="请输入十连单价"></el-input>
          </el-form-item>
          <el-form-item label="设计返还率" prop="deviseRate">
            <el-input type="number" v-model="ruleForm.deviseRate" style="width: 300px" placeholder="请输入设计返还率">
              <template slot="append">%</template></el-input
            >
          </el-form-item>
          <el-form-item label="NFT价格限制" prop="reduceThreshold">
            <el-input type="number" v-model="ruleForm.reduceThreshold" style="width: 300px" placeholder="请输入NFT价格限制">
              <template slot="append">%</template></el-input
            >
          </el-form-item>
          <el-form-item label="传奇数量" prop="legendNum">
            <el-input type="number" v-model="ruleForm.legendNum" style="width: 300px" placeholder="请输入传奇数量">
              <template slot="append">
                {{ `几率${new bigNumber(legendNftProbability || 0).multipliedBy(100).toFixed(4)}% ` }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="史诗数量" prop="epicNum">
            <el-input type="number" v-model="ruleForm.epicNum" style="width: 300px" placeholder="请输入史诗数量">
              <template slot="append">
                {{ `几率${new bigNumber(epicNftProbability || 0).multipliedBy(100).toFixed(4)}% ` }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="稀有数量" prop="rareNum">
            <el-input type="number" v-model="ruleForm.rareNum" style="width: 300px" placeholder="请输入稀有数量">
              <template slot="append">
                {{ `几率${new bigNumber(rareNftProbability || 0).multipliedBy(100).toFixed(4)}% ` }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="普通数量">
            <el-input type="number" readonly="readonly" v-model="commonNum" style="width: 300px" placeholder="普通数量">
              <template slot="append">
                {{ `几率${new bigNumber(commonNftProbability || 0).multipliedBy(100).toFixed(4)}% ` }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="盲盒描述" prop="boxDesc">
            <el-input type="textarea" :autosize="{ minRows: 4 }" placeholder="请输入描述" v-model="ruleForm.boxDesc"></el-input>
          </el-form-item>
          <div class="blood_pool">
            <div class="blood_pool_item">
              <div class="blood_pool_item_l">{{ `消费:${(bloodPool && bloodPool.grossIncome) || 0}` }}</div>
              <div class="blood_pool_item_r">
                <span>血池开关：</span>
                <el-switch
                  v-model="bloodPool.bloodPoolsStatus"
                  @change="calculationPlatformNft"
                  active-value="TRUE"
                  inactive-value="FALSE"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </div>
            </div>
            <div class="blood_pool_item">
              <div class="blood_pool_item_l">{{ `返奖:${(bloodPool && bloodPool.totalOpenNftPrice) || 0}` }}</div>
              <div class="blood_pool_item_r">
                <span>修正值：</span>
                <el-input type="number" v-model="bloodPool.adjust" style="flex: 1"></el-input>
              </div>
            </div>
            <div class="blood_pool_item">
              <span>修正值强制更新快照阈值：</span>
              <el-input type="number" v-model="bloodPool.adjustCompulsionUpdateThreshold" style="flex: 1">
                <template slot="append">%</template>
              </el-input>
            </div>
            <div class="blood_pool_item">
              <div class="blood_pool_item_l">
                {{ `实际返还率:${accurateDecimal(new bigNumber(bloodPool.realRate || 0).multipliedBy(100), 4)}%` }}
              </div>
              <div class="blood_pool_item_r">
                {{ `修正返还率:${accurateDecimal(new bigNumber(bloodPool.adjustRate || 0).multipliedBy(100), 4)}%` }}
              </div>
            </div>
          </div>
        </el-form>
        <div class="nft-box">
          <div class="external-nft nft-item">
            <div class="operating-box">
              <div class="title">外部NFT配置</div>
              <div class="btn">
                <div class="add" @click="addSeries(1)">添加</div>
              </div>
            </div>
            <el-table :data="externalList" style="min-width: 0" class="public-table">
              <el-table-column prop="seriesName" label="系列" align="center" key="1" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="chain" label="链" align="center" key="2">
                <template slot-scope="scope">
                  {{ chainFormat(scope.row.chain || scope.row.chainId) }}
                </template>
              </el-table-column>
              <el-table-column prop="number" label="期望数量" width="140px" align="center" key="3">
                <template slot-scope="scope">
                  <div class="number-box">
                    <el-input type="number" class="number" v-model.number="scope.row.number"></el-input>
                    <el-tooltip
                      v-if="
                        scope.row.totalNumber &&
                        Number(scope.row.totalNumber || 0) < Number(scope.row.number || 0) &&
                        scope.row.type == 'NFT'
                      "
                      class="item"
                      effect="dark"
                      :content="`该NFT当前最大只能设置为${scope.row.totalNumber}个`"
                      placement="top-start"
                    >
                      <i class="icon-warning el-icon-warning-outline"></i>
                    </el-tooltip>
                    <el-tooltip
                      v-if="scope.row.dwindleNumber"
                      class="item"
                      effect="dark"
                      :content="`${scope.row.dwindleNumber}个NFT超出阈值`"
                      placement="top-start"
                    >
                      <i class="icon-warning icon-warning-color el-icon-warning-outline"></i>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="realNumber" label="实际数量" width="120px" align="center" key="4"> </el-table-column>
              <el-table-column prop="floorPrice" v-if="calculationNft.length > 0" label="均价" align="center" key="5"> </el-table-column>
              <el-table-column prop="floorPrice" v-else label="地板价" align="center" key="6"> </el-table-column>
              <el-table-column prop="boxImg" label="总价" align="center" key="7">
                <template slot-scope="scope">
                  {{ new bigNumber(scope.row.floorPrice).multipliedBy(scope.row.number || 0).toFixed(4) }}
                </template>
              </el-table-column>
              <el-table-column label="几率" align="center" key="8">
                <template slot-scope="scope">
                  {{ probability(scope.row, 1) }}
                </template>
              </el-table-column>
              <el-table-column align="center" width="60" key="9" fixed="right">
                <template slot-scope="scope">
                  <img
                    style="width: 24px; cursor: pointer"
                    @click="handleNftDel(scope.row, scope.$index, 1)"
                    src="@/assets/images/icon_delete.svg"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="external-nft nft-item">
            <div class="operating-box">
              <div class="title">内部NFT配置</div>
              <div class="btn">
                <img src="@/assets/images/icon_calculator.svg" @click="calculationPlatformNft()" />
                <div class="add" @click="addSeries(2)">添加</div>
              </div>
            </div>
            <el-table :data="platformList" style="min-width: 0" class="public-table">
              <el-table-column prop="id" align="center" key="1">
                <template slot-scope="scope">
                  <div style="display: flex; align-items: center">
                    <img v-if="scope.row.baseStatus == 'TRUE'" src="@/assets/images/icon_benchmark_active.svg" alt="" />
                    <img v-else @click="onEbitNft(scope.row)" src="@/assets/images/icon_benchmark.svg" alt="" />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="seriesName" label="系列" align="center" key="2"> </el-table-column>
              <el-table-column prop="price" label="单价" align="center" key="3"> </el-table-column>
              <el-table-column prop="multipleRate" label="基准系数" align="center" key="4">
                <template slot-scope="scope">
                  <div class="number-box" v-if="scope.row.baseStatus != 'TRUE'">
                    <el-input type="number" class="number" v-model="scope.row.multipleRate"></el-input>
                  </div>
                  <div v-else>{{ scope.row.multipleRate }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="数量" align="center" key="5">
                <template slot-scope="scope">
                  {{
                    (ruleForm.innerBaseNumber &&
                      Math.ceil(Number(new bigNumber(ruleForm.innerBaseNumber || 0).multipliedBy(scope.row.multipleRate || 0)))) ||
                    "--"
                  }}
                </template>
              </el-table-column>
              <el-table-column label="总价" align="center" key="6">
                <template slot-scope="scope">
                  {{
                    new bigNumber(scope.row.price)
                      .multipliedBy(
                        Math.ceil(Number(new bigNumber(ruleForm.innerBaseNumber || 1).multipliedBy(scope.row.multipleRate || 0)))
                      )
                      .toFixed(4)
                  }}
                </template>
              </el-table-column>
              <el-table-column label="几率" align="center" key="7">
                <template slot-scope="scope">
                  {{ probability(scope.row, 2) }}
                </template>
              </el-table-column>
              <el-table-column prop="id" align="center" width="120" key="20" fixed="right">
                <template slot-scope="scope">
                  <img
                    style="width: 24px; cursor: pointer"
                    @click="handleNftDel(scope.row, scope.$index, 2)"
                    src="@/assets/images/icon_delete.svg"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="probability-box">
            <div>
              {{
                ruleForm.expectRate &&
                `预计返还率：${new bigNumber(ruleForm.expectRate || 0).multipliedBy(100).toFixed(4)}%
              `
              }}
            </div>
            <div>
              {{ ruleForm.lossRate && `赔本率：${new bigNumber(ruleForm.lossRate || 0).multipliedBy(100).toFixed(4)}% ` }}
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
      <el-dialog
        width="440px"
        :close-on-click-modal="false"
        :title="seriesType == 1 ? '选择外部NFT' : '选择内部NFT'"
        :visible.sync="showSeriesDialog"
        append-to-body
        :before-close="handleSeriesClose"
      >
        <el-form ref="seriesForm" class="add-form" :model="seriesForm" label-width="80px">
          <div class="benchmark-obx" v-if="seriesType == 2">
            <img v-if="!platformList.length > 0" src="@/assets/images/icon_benchmark_active.svg" alt="" srcset="" />
            <img
              v-else-if="seriesForm.baseStatus == 'TRUE'"
              @click="seriesForm.baseStatus = 'FALSE'"
              src="@/assets/images/icon_benchmark_active.svg"
              alt=""
              srcset=""
            />
            <img v-else src="@/assets/images/icon_benchmark.svg" @click="seriesForm.baseStatus = 'TRUE'" alt="" srcset="" />
            <span>基准NFT</span>
          </div>
          <el-form-item label="类型" v-if="seriesType == 1" prop="adjust">
            <el-select
              style="width: 300px"
              v-model="seriesForm.type"
              popper-class="public-select-box"
              @change="selectChain"
              placeholder="请选择"
            >
              <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="选择链" v-if="seriesType == 1" prop="adjust">
            <el-select
              style="width: 300px"
              v-model="seriesForm.chain"
              popper-class="public-select-box"
              @change="selectChain"
              placeholder="请选择"
            >
              <el-option v-for="(item, index) in chainList" :key="index" :label="item.chainName" :value="item.chainId" />
            </el-select>
          </el-form-item>
          <el-form-item label="选择系列" prop="adjust">
            <el-select
              style="width: 300px"
              v-model="seriesForm.seriesId"
              popper-class="public-select-box"
              @change="changeSeries"
              placeholder="请选择"
              clearable
            >
              <template v-for="(item, index) in downNft">
                <el-option :key="index" :label="item.seriesName" :value="item.id" v-if="!seriesIdIncludes(item.id)">
                  <span style="float: left">{{ item.seriesName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">{{ item.floorPrice }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">{{ item.price }}</span>
                </el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item :label="seriesForm.type == 'NFT' ? '地板价' : '价值'" v-if="seriesType == 1" prop="adjust">
            <el-input style="width: 300px" type="number" readonly v-model="seriesForm.floorPrice">
              <template slot="append">{{ priceCoin }}</template>
            </el-input>
          </el-form-item>
          <el-form-item label="单价" v-if="seriesType == 2" prop="adjust">
            <el-input style="width: 300px" type="number" readonly v-model="seriesForm.price">
              <template slot="append">{{ priceCoin }}</template>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleSeriesClose()">取 消</el-button>
          <el-button type="primary" @click="pushSeries()">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { accurateDecimal, timeForStr } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";
import { chainList } from "@/utils/chain";

export default {
  name: "BlindBoxManagement",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      Id: null, // NFT Id
      boxName: null, // 系列名
      externalStatus: null, // 异常状态
      boxStatus: null, // 盲盒状态
      sortData: {
        orderBy: null,
        orderType: null,
      },
      page: 1,
      size: 20,
      tableData: [],
      baseUserPage: null,
      aggregateQuery: {},

      /** 添加盲盒相关 */
      showDialog: false,
      operatingType: 1,
      uploadUrl: "",
      limitCount: 1,
      hideUpload: false,
      hideUploadOne: false,
      hideUploadTwo: false,
      uploadHeader: {
        certificate: sessionStorage.getItem("token"),
      },
      fileImg: [{ url: "https://www.bitzing.io/prd/mystery/IMAGE/8945f0a4b909442395d48718c335a9a8.webp" }],
      fileImgOne: [],
      fileImgTwo: [],
      ruleForm: {
        boxName: null, //盲盒名称
        boxImg: "https://www.bitzing.io/prd/mystery/IMAGE/8945f0a4b909442395d48718c335a9a8.webp", //盲盒图片
        boxIndex: null, //推荐顺序
        price: null, //价格
        coin: "ETH", //币种
        fivePrice: null, //五连单价
        tenPrice: null, //十连单价
        deviseRate: null, //设计返还率
        reduceThreshold: null, // 盲盒衰减率
        legendNum: null, //传奇数量
        epicNum: null, //史诗数量
        rareNum: null, //稀有数量
        boxDesc: null, //盲盒描述
        platformList: [],
        externalList: [],
        expectRate: null, // 期望返还率
        lossRate: null, // 亏本几率
        innerBaseNumber: null, // 基准NFT数量
        indexShowStatus: "FALSE", // 是否是假盲盒，TRUE-是，FALSE-否
      },
      bloodPool: {
        grossIncome: 0, // 消费
        totalOpenNftPrice: 0, // 返奖
        bloodPoolsStatus: "FALSE", // 血池开关
        adjust: null, // 修正值
        adjustCompulsionUpdateThreshold: null, // 修正阈值
        realRate: null, // 实际返还率
        adjustRate: null, // 修正返还率
      }, //血池相关
      chainList: chainList,
      rules: {},
      externalData: [],
      externalCoinData: [],
      platformData: [],
      externalList: [],
      platformList: [],

      /** 选择系列相关 */
      showSeriesDialog: false,
      seriesType: 1,
      seriesForm: {
        nftType: null,
        chain: null,
        seriesId: null,
        seriesName: null,
        floorPrice: null,
        price: null,
        multipleRate: null,
        baseStatus: "FALSE",
        number: null,
      },
      downNft: null,
      calculationNft: [],
      typeOptions: [
        { label: "NFT", value: "NFT" },
        { label: "ETH", value: "ETH" },
      ],
      priceCoin: "ETH",
    };
  },
  mixins: [pagination],
  // 方法
  methods: {
    bigNumber: bigNumber,
    accurateDecimal: accurateDecimal,
    timeForStr: timeForStr,
    seriesIdIncludes(id) {
      if (this.seriesType == 1) {
        return this.externalList.some((item) => item.seriesId === id);
      } else {
        return this.platformList.some((item) => item.seriesId === id);
      }
    },
    // 产品相册
    handleUpload(res) {
      if (res.status == 200) {
        this.fileImg.push({ url: res.data });
        return;
      }
      this.$message.error("上传失败");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error("图片过大，文件大小小于2M");
      }
      return is1M;
    },
    handleRemove(file, fileList) {
      this.fileImg = [];
    },
    handExceed(fiel) {
      this.$message.error("Banner图片只能上传一张");
    },
    submitCofirm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.fileImg.length == 0) {
            this.$message.error("请上传图片！");
            return;
          }
          let ruleForm = { ...this.ruleForm };
          ruleForm.imageUrl = this.fileImg[0].url;
          let res = null;
          if (this.ruleForm.id) {
            res = await this.$http.updateBanner({ ...ruleForm });
            this.$router.go(-1);
          } else {
            res = await this.$http.saveBanner({ ...ruleForm });
            this.$router.go(-1);
          }
          if (res) {
            this.$refs["ruleForm"].resetFields();
            this.$message.success("操作成功！");
            this.fileImg = [];
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 搜索条件
    searchFun() {
      return {
        id: this.Id, // 盲盒Id
        boxName: this.boxName, // 盲盒名
        externalStatus: this.externalStatus,
        boxStatus: this.boxStatus,
      };
    },
    /**
     * @description: 排序
     */
    sortChange({ column, prop, order }) {
      this.sortData.orderBy = prop;
      this.sortData.orderType = order == "descending" ? "DESC" : "ASC";

      if (!order) {
        this.sortData.orderType = null;
      }

      this.fetchBoxManagerList();
    },

    // 加载列表
    async fetchBoxManagerList(isSearch = true) {
      const search = this.searchFun();
      const { sortData, size, coin, userType } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        ...{
          coin: coin,
          userType: userType,
          size: size,
          page: _page,
        },
        ...sortData,
        ...search,
      };
      const res = await this.$http.getBoxManagerList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }

      delete data.size;
      delete data.page;
      const resAggregateQuery = await this.$http.getBoxManagerStatistics(data);
      if (resAggregateQuery) {
        this.aggregateQuery = resAggregateQuery;
      }
    },
    // 获取外部代币列表数据
    async getExternalCoinFunc() {
      const data = {
        size: 999,
        page: 1,
        coinName: this.seriesForm.type,
        chainId: this.seriesForm.chain,
      };
      const res = await this.$http.externalCoinPageList(data);
      if (res) {
        this.downNft = res.records;
        this.externalCoinData = res.records;
      }
    },
    // 加载外部NFT
    async fetchNftExternalList() {
      const data = {
        chainId: this.seriesForm.chain,
        coin: this.coin,
        userType: this.userType,
        page: 1,
        size: 999,
      };
      const res = await this.$http.getNftExternalList(data);
      if (res) {
        this.downNft = res.records;
        this.externalData = res.records;
      }
    },
    // 加载内部NFT
    async fetchNftPlatformList() {
      const data = {
        coin: this.coin,
        userType: this.userType,
        page: 1,
        size: 999,
      };
      const res = await this.$http.getNftPlatformList(data);
      if (res) {
        this.downNft = res.records;
        this.platformData = res.records;
      }
    },
    // 冻结/解禁
    operatingNft(row) {
      this.$confirm(`确定要${row.boxStatus == "DISABLE" ? "开启" : "关闭"}『${row.boxName || row.id}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = null;
          if (row.boxStatus == "DISABLE") {
            // 开启
            res = await this.$http.boxManagerThaw({
              id: row.id,
            });
          } else {
            // 关闭
            res = await this.$http.boxManagerFreeze({
              id: row.id,
            });
          }
          if (res) {
            this.fetchBoxManagerList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 删除
    handleDel(event) {
      this.$confirm(`确定要删除盲盒『${event.boxName || event.id}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          let res = await this.$http.boxManagerDelete({
            id: event.id,
          });
          if (res) {
            this.fetchBoxManagerList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    actualReturn(row) {
      const { totalExpenditure, adjust, grossIncome } = row;
      const expenditure = new bigNumber(totalExpenditure || 0).plus(adjust);
      if (!grossIncome) return 0;
      return new bigNumber(expenditure || 0).dividedBy(grossIncome);
    },
    // 抽奖返还率
    paybackRate(row) {
      const { expectRate } = row;
      const expectRates = new bigNumber(expectRate || 0).multipliedBy(expectRate);
      const actualReturnVal = this.actualReturn(row);
      if (!actualReturnVal) return 0;
      return new bigNumber(expectRates || 0).dividedBy(actualReturnVal);
    },
    addBox() {
      this.showDialog = true;
      this.operatingType = 1;
    },
    // 编辑盲盒
    onEbit(row) {
      this.ruleForm = {
        ...this.ruleForm,
        ...row,
        deviseRate: new bigNumber(row.deviseRate).multipliedBy(100).toFixed(4),
        reduceThreshold:
          row.reduceThreshold != null && row.reduceThreshold !== ""
            ? new bigNumber(row.reduceThreshold).multipliedBy(100).toFixed(4)
            : null,
      };

      this.operatingType = 2;
      this.hideUpload = true;
      this.hideUploadOne = row.showImgOne ? true : false;
      this.hideUploadTwo = row.showImgTwo ? true : false;

      this.fileImg = [{ url: row.boxImg }];
      this.fileImgOne = row.showImgOne ? [{ url: row.showImgOne }] : [];
      this.fileImgTwo = row.showImgTwo ? [{ url: row.showImgTwo }] : [];

      const platformLists = row.platformList;
      const externalLists = row.externalList;
      const externalCoinLists = row.externalCoinList;
      this.bloodPool = {
        grossIncome: row.grossIncome, // 消费
        totalOpenNftPrice: row.totalOpenNftPrice, // 返奖
        bloodPoolsStatus: row.bloodPoolsStatus, // 血池开关
        adjust: row.adjust, // 修正值
        adjustCompulsionUpdateThreshold: accurateDecimal(new bigNumber(row.adjustCompulsionUpdateThreshold || 0).multipliedBy(100), 4), // 修正阈值
        realRate: row.realRate, // 实际返还率
        adjustRate: row.adjustRate, // 修正返还率
      };

      for (let i = 0; i < platformLists.length; i++) {
        if (platformLists[i].baseStatus == "TRUE") {
          this.ruleForm.innerBaseNumber = platformLists[i].nftNum || 0;
        }

        this.platformData.forEach((element) => {
          if (platformLists[i].seriesId == element.id) {
            this.platformList.push({
              ...this.seriesForm,
              nftType: "PLATFORM",
              ...platformLists[i],
              ...element,
              floorPrice: element.floorPrice || null,
              price: element.price || null,
              seriesName: element.seriesName || null,
            });
          }
        });
      }
      for (let i = 0; i < externalLists.length; i++) {
        this.externalData.forEach((element) => {
          if (externalLists[i].seriesId == element.id) {
            this.externalList.push({
              type: "NFT",
              ...this.seriesForm,
              nftType: "EXTERNAL",
              ...externalLists[i],
              ...element,
              floorPrice: element.floorPrice || null,
              price: element.price || null,
              seriesName: element.seriesName || null,
              number: externalLists[i].nftNum || null,
            });
          }
        });
      }
      for (let i = 0; i < externalCoinLists.length; i++) {
        this.externalCoinData.forEach((element) => {
          if (externalCoinLists[i].seriesId == element.id) {
            this.externalList.push({
              type: "ETH",
              ...this.seriesForm,
              nftType: "EXTERNAL",
              ...externalCoinLists[i],
              ...element,
              floorPrice: element.price || null,
              price: element.price || null,
              seriesName: element.seriesName || null,
              number: externalCoinLists[i].nftNum || null,
            });
          }
        });
      }
      this.$forceUpdate();
      this.showDialog = true;
      setTimeout(() => {
        this.calculationPlatformNft();
      }, 10);
    },
    handleUpload(res) {
      if (res.code == 200) {
        this.fileImg.push({ url: res.data });
        this.ruleForm.boxImg = res.data;
        return;
      }
      this.$message.error("上传失败");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error("文件过大，文件大小小于2M");
      }
      return is1M;
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
      this.fileImg = [];
    },
    handExceed(fiel) {
      this.$message.error("文件只能上传一个");
    },
    handleUploadOne(res) {
      if (res.code == 200) {
        this.fileImgOne.push({ url: res.data });
        this.ruleForm.showImgOne = res.data;
        return;
      }
      this.$message.error("上传失败");
    },
    handleChangeOne(file, fileList) {
      this.hideUploadOne = fileList.length >= this.limitCount;
    },
    handleRemoveOne(file, fileList) {
      this.hideUploadOne = fileList.length >= this.limitCount;
      this.fileImgOne = [];
      this.ruleForm.showImgOne = "";
    },
    handleUploadTwo(res) {
      if (res.code == 200) {
        this.fileImgTwo.push({ url: res.data });
        this.ruleForm.showImgTwo = res.data;
        return;
      }
      this.$message.error("上传失败");
    },
    handleChangeTwo(file, fileList) {
      this.hideUploadTwo = fileList.length >= this.limitCount;
    },
    handleRemoveTwo(file, fileList) {
      this.hideUploadTwo = fileList.length >= this.limitCount;
      this.fileImgTwo = [];
      this.ruleForm.showImgTwo = "";
    },
    // 提交盲盒数据
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const {
            ruleForm: { innerBaseNumber },
            bloodPool,
            fileImg,
            platformList,
            externalList,
            calculationNft,
          } = this;

          if (fileImg.length == 0) {
            this.$message.error("请上传盲盒图片！");
            return;
          }

          if (!platformList.length > 0) {
            this.$message.error("请选择内部NFT！");
            return;
          }

          if (!externalList.length > 0) {
            this.$message.error("请选择外部NFT！");
            return;
          }

          if (!calculationNft.length > 0) {
            this.$message.error("未计算内部NFT基准数据，请补充完整后重试");
            return;
          }

          if (!innerBaseNumber && innerBaseNumber > 0) {
            this.$message.error("内部NFT基准数据不能为负数，请更正后重试");
            return;
          }

          let platformNftData = [];
          let externalNftData = [];
          let externalCoinData = [];

          try {
            externalList.forEach((element) => {
              if (Number(element.totalNumber) < Number(element.number) && element.type == "NFT") {
                console.log("最大数量不对");
                // throw new Error("error");
              }

              if (!element.number || Number(element.number) <= 0) {
                console.log("空数量");
                throw new Error("error");
              }
              if (element.type == "NFT") {
                externalNftData.push({
                  seriesId: element.seriesId, //系列ID
                  nftNum: element.number, //数量
                });
              } else {
                externalCoinData.push({
                  seriesId: element.seriesId, //系列ID
                  nftNum: element.number, //数量
                });
              }
            });
          } catch (e) {
            this.$message.error("外部NFT系列数量不正确，请补充完整后重试");
            return;
          }

          platformList.forEach((element) => {
            platformNftData.push({
              seriesId: element.seriesId, //系列ID
              multipleRate: element.multipleRate, //倍率
              baseStatus: element.baseStatus, //是否是基准NFT(TRUE-是,FALSE-否)
            });
          });

          let ruleForm = {
            ...this.ruleForm,
            adjust: bloodPool.adjust, // 修正值
            bloodPoolsStatus: bloodPool.bloodPoolsStatus, // 血池开关
            adjustCompulsionUpdateThreshold: accurateDecimal(
              new bigNumber(bloodPool.adjustCompulsionUpdateThreshold || 0).dividedBy(100),
              4
            ), // 修正阈值
            coin: this.coin,
            deviseRate: accurateDecimal(new bigNumber(this.ruleForm.deviseRate).dividedBy(100), 6),
            reduceThreshold:
              this.ruleForm.reduceThreshold != null && this.ruleForm.reduceThreshold !== ""
                ? accurateDecimal(new bigNumber(this.ruleForm.reduceThreshold).dividedBy(100), 6)
                : null,
            platformList: platformNftData,
            externalList: externalNftData,
            externalCoinList: externalCoinData,
          };
          let res = null;
          if (!this.ruleForm.id) {
            res = await this.$http.boxManagerAdd({ ...ruleForm });
          } else {
            res = await this.$http.boxManagerUpdate({ ...ruleForm });
          }

          if (res) {
            this.$message.success("操作成功");
            this.handleClose();
            this.fetchBoxManagerList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 更改基准Nft
    onEbitNft(row) {
      for (let i = 0; i < this.platformList.length; i++) {
        if (this.platformList[i].seriesId == row.seriesId) {
          this.platformList[i].baseStatus = "TRUE";
          this.platformList[i].multipleRate = 1;
        } else {
          this.platformList[i].baseStatus = "FALSE";
        }
      }

      this.$forceUpdate();
    },
    // 添加Nft系列
    addSeries(type) {
      this.seriesType = type;
      if (!this.platformList.length > 0) {
        this.seriesForm.baseStatus = "TRUE";
      }

      if (this.seriesType == 1) {
        this.searchFun.nftType = "EXTERNAL";
        this.fetchNftExternalList();
      } else {
        this.searchFun.nftType = "PLATFORM";
        this.fetchNftPlatformList();
      }
      this.showSeriesDialog = true;
    },
    selectChain() {
      if (this.seriesForm.type == "NFT") {
        this.fetchNftExternalList();
      } else {
        this.getExternalCoinFunc();
      }
      this.seriesForm.seriesId = "";
    },
    // NFT系列变动
    changeSeries(event) {
      const nftInfo = this.downNft.find((e) => e.id == event);
      this.seriesForm.floorPrice = (nftInfo && nftInfo.floorPrice) || null;
      this.seriesForm.price = (nftInfo && nftInfo.price) || null;
      this.seriesForm.seriesName = (nftInfo && nftInfo.seriesName) || null;
      if (this.seriesForm.type != "NFT") {
        this.seriesForm.floorPrice = this.seriesForm.floorPrice || this.seriesForm.price;
      }
    },
    pushSeries() {
      if (this.seriesType == 1) {
        if (this.externalList.findIndex((e) => e.seriesId == this.seriesForm.seriesId) > -1) {
          this.$message.warning("该NFT系列已存在");
          return;
        }

        if (!this.seriesForm.seriesId) {
          this.$message.warning("请选择外部NFT系列");
          return;
        }

        if (!this.seriesForm.chain) {
          const nftInfo = this.downNft.find((e) => e.id == this.seriesForm.seriesId);
          this.seriesForm.chain = nftInfo && nftInfo.chainId;
        }
        this.externalList.push(this.seriesForm);
      } else {
        if (this.platformList.findIndex((e) => e.seriesId == this.seriesForm.seriesId) > -1) {
          this.$message.warning("该NFT系列已存在");
          return;
        }

        if (this.seriesForm.baseStatus == "TRUE") {
          this.seriesForm.multipleRate = 1;
        }

        this.platformList.push(this.seriesForm);

        // 更新基准Nft系列
        if (this.seriesForm.baseStatus == "TRUE" && this.platformList.length > 1) {
          for (let i = 0; i < this.platformList.length; i++) {
            const element = this.platformList[i];
            if (element.seriesId == this.seriesForm.seriesId) {
              this.platformList[i].baseStatus = "TRUE";
            } else {
              this.platformList[i].baseStatus = "FALSE";
            }
          }
        }

        const platform = this.platformList;
        this.platformList = [];

        setTimeout(() => {
          this.platformList = platform;
        }, 10);
      }

      this.$forceUpdate();
      this.handleSeriesClose();
    },
    /**
     * @description 计算抽奖概率
     */
    probability(event, type) {
      const { innerBaseNumber } = this.ruleForm;
      const nftData = this.platformList.concat(this.externalList);
      let nftNumber = 0;
      nftData.forEach((element) => {
        if (element.nftType == "EXTERNAL") {
          nftNumber += Number(element.number || 0);
        } else {
          const platformNum = Math.ceil(Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate)));
          nftNumber += platformNum && platformNum > 0 ? platformNum : 0;
        }
      });

      const platformNumber = Math.ceil(Number(new bigNumber(innerBaseNumber || 0).multipliedBy(event.multipleRate)));
      const nftNun = innerBaseNumber && platformNumber > 0 ? platformNumber : 0;

      if (type == 1) {
        if (!event.number) {
          return "--";
        }
      } else {
        if (!nftNun) {
          return "--";
        }
      }

      if (!nftNumber) {
        return "--";
      }

      if (type == 1) {
        return `${new bigNumber(event.number || 0)
          .dividedBy(nftNumber || 0)
          .multipliedBy(100)
          .toFixed(4)}%`;
      } else {
        return `${new bigNumber(nftNun || 0)
          .dividedBy(nftNumber || 0)
          .multipliedBy(100)
          .toFixed(4)}%`;
      }
    },
    // 计算平台NFT数量
    calculationPlatformNft() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { fileImg, bloodPool, platformList, externalList } = this;
          if (fileImg.length == 0) {
            this.$message.error("请上传盲盒图片！");
            return;
          }

          if (!platformList.length > 0) {
            this.$message.error("请选择内部NFT！");
            return;
          }

          if (!externalList.length > 0) {
            this.$message.error("请选择外部NFT！");
            return;
          }

          let platformNftList = [];
          let externalNftList = [];
          let externalCoinList = [];

          try {
            externalList.forEach((element) => {
              if (!element.number || Number(element.number) <= 0) {
                throw new Error("error");
              }

              if (element.type == "NFT") {
                externalNftList.push({
                  seriesId: element.seriesId, //系列ID
                  nftNum: element.number, //数量
                });
              } else {
                externalCoinList.push({
                  seriesId: element.seriesId, //系列ID
                  nftNum: element.number, //数量
                });
              }
            });
          } catch (e) {
            this.$message.error("有外部NFT系列未输入数量，请补充完整后重试");
            return;
          }

          platformList.forEach((element) => {
            platformNftList.push({
              seriesId: element.seriesId, //系列ID
              multipleRate: element.multipleRate, //倍率
              baseStatus: element.baseStatus, //是否是基准NFT(TRUE-是,FALSE-否)
            });
          });

          let ruleForm = {
            ...this.ruleForm,
            coin: this.coin,
            adjust: bloodPool.adjust, // 修正值
            bloodPoolsStatus: bloodPool.bloodPoolsStatus, // 血池开关
            adjustCompulsionUpdateThreshold: accurateDecimal(
              new bigNumber(bloodPool.adjustCompulsionUpdateThreshold || 0).dividedBy(100),
              4
            ), // 修正阈值
            deviseRate: accurateDecimal(new bigNumber(this.ruleForm.deviseRate).dividedBy(100), 6),
            reduceThreshold:
              this.ruleForm.reduceThreshold != null && this.ruleForm.reduceThreshold !== ""
                ? accurateDecimal(new bigNumber(this.ruleForm.reduceThreshold).dividedBy(100), 6)
                : null,
            platformList: platformNftList,
            externalList: externalNftList,
            externalCoinList: externalCoinList,
          };

          let res = await this.$http.calculationPlatformNft({ ...ruleForm });
          if (res) {
            this.ruleForm = {
              ...this.ruleForm,
              expectRate: res.expectRate, // 期望返还率
              lossRate: res.lossRate, // 亏本几率
              innerBaseNumber: res.innerBaseNumber, // 基准NFT数量
            };

            this.bloodPool.adjustRate = res.adjustRate;
            this.bloodPool.grossIncome = res.grossIncome;
            this.bloodPool.totalOpenNftPrice = res.totalOpenNftPrice;
            this.bloodPool.realRate = res.realRate;

            this.calculationNft = res.seriesSort; // 合计NFT系列
            let platformCount = [];
            let externalCount = [];

            for (let j = 0; j < this.calculationNft.length; j++) {
              for (let i = 0; i < this.platformList.length; i++) {
                if (this.calculationNft[j].nftType == "PLATFORM" && this.calculationNft[j].seriesId == this.platformList[i].seriesId) {
                  this.platformList[i].nftType = "PLATFORM";
                  this.platformList[i].price = this.calculationNft[j].averagePrice;
                  platformCount.push(this.platformList[i]);
                }
              }
            }

            for (let j = 0; j < this.calculationNft.length; j++) {
              for (let i = 0; i < this.externalList.length; i++) {
                if (this.calculationNft[j].nftType == "EXTERNAL" && this.calculationNft[j].seriesId == this.externalList[i].seriesId) {
                  this.externalList[i].nftType = "EXTERNAL";
                  this.externalList[i].totalNumber = this.calculationNft[j].totalNumber;
                  this.externalList[i].realNumber = this.calculationNft[j].realNumber;
                  this.externalList[i].dwindleNumber = this.calculationNft[j].dwindleNumber;
                  this.externalList[i].number = this.calculationNft[j].number;
                  this.externalList[i].floorPrice = this.calculationNft[j].averagePrice;
                  externalCount.push(this.externalList[i]);
                } else if (
                  this.calculationNft[j].nftType == "EXT_COIN" &&
                  this.calculationNft[j].seriesId == this.externalList[i].seriesId
                ) {
                  this.externalList[i].nftType = "EXT_COIN";
                  this.externalList[i].totalNumber = this.calculationNft[j].totalNumber;
                  this.externalList[i].realNumber = this.calculationNft[j].realNumber;
                  this.externalList[i].dwindleNumber = this.calculationNft[j].dwindleNumber;
                  this.externalList[i].number = this.calculationNft[j].number;
                  this.externalList[i].floorPrice = this.calculationNft[j].averagePrice;
                  externalCount.push(this.externalList[i]);
                }
              }
            }

            this.platformList = [];
            this.externalList = [];

            setTimeout(() => {
              this.platformList = platformCount;
              this.externalList = externalCount;
            }, 10);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除NFT
    handleNftDel(row, index, type) {
      if (type == 1) {
        this.externalList.splice(index, 1);
      } else {
        this.platformList.splice(index, 1);
      }
    },
    /** 选择系列关闭 */
    handleSeriesClose(done) {
      if (done) {
        done();
        return;
      }
      this.seriesForm = {
        nftType: null,
        chain: null,
        seriesId: null,
        seriesName: null,
        floorPrice: null,
        price: null,
        multipleRate: null,
        baseStatus: "FALSE",
      };

      this.showSeriesDialog = false;
    },
    handleClose(done) {
      this.ruleForm = {
        boxName: null, //盲盒名称
        boxImg: null, //盲盒图片
        boxIndex: null, //推荐顺序
        price: null, //价格
        coin: "ETH", //币种
        fivePrice: null, //五连单价
        tenPrice: null, //十连单价
        deviseRate: null, //设计返还率
        reduceThreshold: null, // 盲盒衰减率
        legendNum: null, //传奇数量
        epicNum: null, //史诗数量
        rareNum: null, //稀有数量
        boxDesc: null, //盲盒描述
        platformList: [],
        externalList: [],
        expectRate: null, // 期望返还率
        lossRate: null, // 亏本几率
        innerBaseNumber: null, // 基准NFT数量
      };

      this.bloodPool = {
        grossIncome: 0, // 消费
        totalOpenNftPrice: 0, // 返奖
        bloodPoolsStatus: "FALSE", // 血池开关
        adjust: null, // 修正值
        adjustCompulsionUpdateThreshold: null, // 修正阈值
        realRate: null, // 实际返还率
        adjustRate: null, // 修正返还率
      }; //血池相关

      this.calculationNft = [];
      this.platformList = [];
      this.externalList = [];
      this.fileImg = [];
      this.fileImgOne = [];
      this.fileImgTwo = [];
      this.hideUpload = false;
      this.hideUploadOne = false;
      this.hideUploadTwo = false;

      this.$forceUpdate();

      setTimeout(() => {
        this.$refs["ruleForm"].clearValidate();
      }, 10);

      if (done) {
        done();
        return;
      }
      this.showDialog = false;
    },
    chainFormat(event) {
      const chain = chainList.find((e) => e.chainId == event);
      return chain && chain.chainName;
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchBoxManagerList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchBoxManagerList(false);
    },
    // 单价计算
    validateOne(rule, value, callback) {
      const { fivePrice } = this.ruleForm;
      if (Number(value) <= 0 || Number(value || 0) < Number(fivePrice || 0)) {
        callback(new Error("单买单价不能低于五连单价"));
      } else {
        callback();
      }
    },
    // 五连计算
    validateFive(rule, value, callback) {
      const { tenPrice } = this.ruleForm;
      if (Number(value) <= 0 || Number(value || 0) < Number(tenPrice || 0)) {
        callback(new Error("五连单价不能低于十连单价"));
      } else {
        callback();
      }
    },
  },
  // 创建后
  created() {
    this.fetchBoxManagerList();
    this.fetchNftExternalList();
    this.getExternalCoinFunc();
    this.fetchNftPlatformList();
    this.uploadUrl = config.api + "/file/upload/image";
    this.rules = {
      boxName: [{ required: true, message: "请输入盲盒名称", trigger: ["blur", "change"] }],
      boxImg: [{ required: true, message: "请选择盲盒图片", trigger: ["blur", "change"] }],
      boxIndex: [{ required: true, message: "请输入推荐顺序", trigger: ["blur", "change"] }],
      price: [
        { required: true, message: "请输入价格", trigger: ["blur", "change"] },
        { validator: this.validateOne, trigger: ["blur", "change"] },
      ],
      fivePrice: [
        { required: true, message: "请输入五连价格", trigger: ["blur", "change"] },
        { validator: this.validateFive, trigger: ["blur", "change"] },
      ],
      tenPrice: [{ required: true, message: "请输入十连价格", trigger: ["blur", "change"] }],
      deviseRate: [{ required: true, message: "请输入设计返还率", trigger: ["blur", "change"] }],
      // reduceThreshold: [
      //   { required: true, message: "请输入盲盒衰减率", trigger: ["blur", "change"] },
      // ],
      legendNum: [{ required: true, message: "请输入传奇数量", trigger: ["blur", "change"] }],
      epicNum: [{ required: true, message: "请输入史诗数量", trigger: ["blur", "change"] }],
      rareNum: [{ required: true, message: "请输入稀有数量", trigger: ["blur", "change"] }],
      boxDesc: [{ required: true, message: "请输入盲盒描述", trigger: ["blur", "change"] }],
    };
  },
  computed: {
    coin() {
      return this.$store.getters.coinConfig;
    },
    userType() {
      return this.$store.getters.accountConfig;
    },
    /**
     * @description 计算普通NFT系列数量
     */
    commonNum() {
      const {
        ruleForm: { legendNum, epicNum, rareNum },
        externalList,
        platformList,
      } = this;

      const totalNum = Number(legendNum) + Number(epicNum) + Number(rareNum);
      const nftNum = externalList.length + platformList.length;

      if (totalNum >= nftNum) {
        return 0;
      }

      return nftNum - totalNum;
    },
    /**
     * @description 计算NFT总数量
     */
    nftTotalNum() {
      const {
        calculationNft,
        ruleForm: { innerBaseNumber },
      } = this;

      if (!calculationNft.length > 0) return 0;

      let totalNum = 0;
      calculationNft.forEach((element) => {
        if (element.nftType == "PLATFORM") {
          const platformNum = Math.ceil(Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate)));
          totalNum += platformNum && platformNum > 0 ? platformNum : 0;
        } else {
          totalNum += Number(element.number);
        }
      });

      return totalNum;
    },
    /**
     * @description 计算传奇NFT概率
     */
    legendNftProbability() {
      const {
        ruleForm: { legendNum, innerBaseNumber },
        calculationNft,
        nftTotalNum,
      } = this;

      if (!calculationNft.length > 0) return 0;
      if (!legendNum) return 0;

      const nftData = calculationNft.slice(0, legendNum);

      let legendNftNum = 0;
      nftData.forEach((element) => {
        if (element.nftType == "PLATFORM") {
          const platformNum = Math.ceil(Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate)));
          legendNftNum += platformNum && platformNum > 0 ? platformNum : 0;
        } else {
          legendNftNum += Number(element.number);
        }
      });

      return new bigNumber(legendNftNum).dividedBy(nftTotalNum).toFixed(6);
    },
    /**
     * @description 计算史诗NFT概率
     */
    epicNftProbability() {
      const {
        ruleForm: { legendNum, epicNum, innerBaseNumber },
        calculationNft,
        nftTotalNum,
      } = this;

      if (!calculationNft.length > 0) return 0;
      if (!epicNum) return 0;

      const nftData = calculationNft.slice(legendNum, Number(legendNum) + Number(epicNum));

      let epicNftNum = 0;
      nftData.forEach((element) => {
        if (element.nftType == "PLATFORM") {
          const platformNum = Math.ceil(Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate)));
          epicNftNum += platformNum && platformNum > 0 ? platformNum : 0;
        } else {
          epicNftNum += Number(element.number);
        }
      });

      return new bigNumber(epicNftNum).dividedBy(nftTotalNum).toFixed(6);
    },
    /**
     * @description 计算稀有NFT概率
     */
    rareNftProbability() {
      const {
        ruleForm: { legendNum, epicNum, rareNum, innerBaseNumber },
        calculationNft,
        nftTotalNum,
      } = this;

      if (!calculationNft.length > 0) return 0;
      if (!rareNum) return 0;

      const nftData = calculationNft.slice(Number(legendNum) + Number(epicNum), Number(legendNum) + Number(epicNum) + Number(rareNum));

      let rareNftNum = 0;
      nftData.forEach((element) => {
        if (element.nftType == "PLATFORM") {
          const platformNum = Math.ceil(Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate)));
          rareNftNum += platformNum && platformNum > 0 ? platformNum : 0;
        } else {
          rareNftNum += Number(element.number);
        }
      });

      return new bigNumber(rareNftNum).dividedBy(nftTotalNum).toFixed(6);
    },
    /**
     * @description 计算普通NFT概率
     */
    commonNftProbability() {
      const {
        ruleForm: { legendNum, epicNum, rareNum, innerBaseNumber },
        calculationNft,
        nftTotalNum,
        commonNum,
      } = this;

      if (!calculationNft.length > 0) return 0;
      if (!rareNum) return 0;

      const nftData = calculationNft.slice(
        Number(legendNum) + Number(epicNum) + Number(rareNum),
        Number(legendNum) + Number(epicNum) + Number(rareNum) + commonNum
      );

      let commonNftNum = 0;
      nftData.forEach((element) => {
        if (element.nftType == "PLATFORM") {
          const platformNum = Math.ceil(Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate)));
          commonNftNum += platformNum && platformNum > 0 ? platformNum : 0;
        } else {
          commonNftNum += Number(element.number);
        }
      });

      return new bigNumber(commonNftNum).dividedBy(nftTotalNum).toFixed(6);
    },
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
.flex {
  display: flex;
  gap: 10px;
  height: 161px;
  overflow: hidden;
}
/deep/ .el-upload {
  position: relative;
}
.tip {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}

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

.box-setting {
  display: flex;
}

.nft-box {
  padding-left: 20px;
  flex: 1;
}

.nft-item + .nft-item {
  padding-top: 20px;
}

.nft-item {
  min-height: 336px;
}

.operating-box {
  border-radius: 10px 10px 0 0;
  height: 40px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;

  .title {
    font-size: 20px;
    font-weight: bold;
    color: #000;
  }

  .btn {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;

    .add {
      width: 140px;
      height: 40px;
      background-color: #169bd5;
      line-height: 40px;
      color: #fff;
      text-align: center;
      font-size: 16px;
      cursor: pointer;
    }

    img {
      height: 30px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}

.number-box {
  display: flex;
  align-items: center;

  /deep/ .el-input__inner {
    text-align: center;
  }

  .icon-warning {
    width: 24px;
    font-size: 24px;
    color: red;
    margin-left: 4px;
  }
  .icon-warning-color {
    color: #e6a23c;
  }
}

.benchmark-obx {
  padding-bottom: 22px;
  display: flex;
  align-items: center;

  img {
    width: 30px;
    cursor: pointer;
    margin-right: 10px;
  }
}

.probability-box {
  display: flex;
  align-items: center;

  & > div + div {
    margin-left: 20px;
  }
}

.blood_pool {
  background-color: rgba(242, 242, 242, 0.4);
  padding: 8px 30px 8px 30px;
  border-radius: 8px;

  .blood_pool_item {
    display: flex;
    align-items: center;
    padding: 8px 0;

    & > div {
      flex: 1;
    }

    .blood_pool_item_r {
      display: flex;
      align-items: center;
    }
  }
}
</style>
