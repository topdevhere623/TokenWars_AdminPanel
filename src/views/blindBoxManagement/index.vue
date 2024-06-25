<template>
  <div class="page-wrapper">
    <div class="public-list-inputs">
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter the blind box ID"
        v-model="Id"
        clearable
      />
      <el-input
        class="public-input"
        style="width: 140px"
        placeholder="Enter the name of the blind box"
        v-model="boxName"
        clearable
      />
      <el-select
        v-model="externalStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="External state"
        clearable
      >
        <el-option label="normal" value="NORMAL"> </el-option>
        <el-option label="Insufficient quantity" value="NUMBER"> </el-option>
      </el-select>
      <el-select
        v-model="boxStatus"
        class="public-select-box"
        popper-class="public-select-box"
        placeholder="Blind box state"
        clearable
      >
        <el-option label="freeze" value="DISABLE"> </el-option>
        <el-option label="normal" value="NORMAL"> </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="public-search"
        @click="fetchBoxManagerList()"
      >
        Inquire
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        class="public-search"
        @click="addBox()"
      >
        Add a blind box
      </el-button>
    </div>
    <div class="remittance-box">
      <div class="remittance-amount remittance-more">
        <div class="remittance-item">
          <div class="title">Total blind box number</div>
          <div class="val">{{ baseUserPage && baseUserPage.total }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total number</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.openBoxNumber }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">total value</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.priceTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total number of times</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.outNumberTotal }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total refund number</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.refundsTotalNumber }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total revenue</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.grossIncome }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">total expenses</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.totalOpenNftPrice }}</div>
        </div>
        <div class="remittance-item">
          <div class="title">Total revenue</div>
          <div class="val">{{ aggregateQuery && aggregateQuery.grossIncomeU }}</div>
        </div>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      @sort-change="sortChange"
      class="public-table"
      border
    >
      <el-table-column
        prop="id"
        sortable="custom"
        label="Blind box ID"
        align="center"
        key="1"
      >
      </el-table-column>
      <el-table-column
        prop="boxImg"
        label="Blind box picture"
        width="120px"
        align="center"
        key="2"
      >
        <template slot-scope="scope">
          <div style="width: 100px; height: 100px">
            <el-image
              style="height: 100%"
              :src="scope.row.boxImg"
              :preview-src-list="[scope.row.boxImg]"
            >
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="boxName"
        width="120"
        label="Blind Box Name"
        align="center"
        key="3"
      >
      </el-table-column>
      <el-table-column
        prop="boxIndex"
        sortable="custom"
        label="Recommendation order"
        align="center"
        key="4"
      >
      </el-table-column>
      <el-table-column prop="nftTotalNumber" label="Weights" align="center" key="5">
      </el-table-column>
      <el-table-column
        prop="price"
        sortable="custom"
        label="unit price"
        align="center"
        key="6"
      >
      </el-table-column>
      <el-table-column
        prop="fivePrice"
        sortable="custom"
        label="Five consecutive prices"
        align="center"
        key="7"
      ></el-table-column>
      <el-table-column
        prop="tenPrice"
        sortable="custom"
        label="Ten consecutive price"
        align="center"
        key="8"
      ></el-table-column>
      <el-table-column
        prop="totalWeight"
        sortable="custom"
        label="Total weight"
        align="center"
        key="9"
      ></el-table-column>
      <el-table-column
        prop="sales"
        width="100"
        sortable="custom"
        label="Sales volume"
        align="center"
        key="10"
      ></el-table-column>
      <el-table-column
        prop="grossIncome"
        sortable="custom"
        width="100"
        :label="`Total income (${coin})`"
        align="center"
        key="12"
      ></el-table-column>
      <el-table-column
        prop="totalOpenNftPrice"
        sortable="custom"
        width="100"
        :label="`Total expenditure (${coin})`"
        align="center"
        key="13"
      ></el-table-column>
      <el-table-column
        prop="totalExpenditure"
        sortable="custom"
        width="120"
        :label="`Actual return (${coin})`"
        align="center"
        key="14"
      ></el-table-column>
      <el-table-column
        prop="totalProfit"
        width="100"
        sortable="custom"
        :label="`Total profit (${coin})`"
        align="center"
        key="15"
      ></el-table-column>
      <el-table-column
        prop="realRate"
        width="100"
        sortable="custom"
        label="Actual return rate"
        align="center"
        key="16"
      >
        <template slot-scope="scope">
          {{
            `${accurateDecimal(
              new bigNumber(scope.row.realRate || 0).multipliedBy(100),
              4
            )}%`
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="deviseRate"
        width="100"
        sortable="custom"
        label="Design return rate"
        align="center"
        key="17"
      >
        <template slot-scope="scope">
          {{
            `${accurateDecimal(
              new bigNumber(scope.row.deviseRate || 0).multipliedBy(100),
              4
            )}%`
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="reduceThreshold"
        width="100"
        sortable="custom"
        label="Blind box attenuation rate"
        align="center"
        key="18"
      >
        <template slot-scope="scope">
          {{
            scope.row.reduceThreshold != null && scope.row.reduceThreshold !== ""
              ? `${accurateDecimal(
                  new bigNumber(scope.row.reduceThreshold).multipliedBy(100),
                  4
                )}%`
              : "--"
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="adjust"
        width="100"
        sortable="custom"
        label="Winning correction"
        align="center"
        key="19"
      >
      </el-table-column>
      <el-table-column
        prop="adjustRate"
        width="100"
        sortable="custom"
        label="Correct the return rate"
        align="center"
        key="20"
      >
        <template slot-scope="scope">
          {{
            `${accurateDecimal(
              new bigNumber(scope.row.adjustRate || 0).multipliedBy(100),
              4
            )}%`
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="expectRate"
        width="100"
        sortable="custom"
        label="Expecting return rate"
        align="center"
        key="21"
      >
        <template slot-scope="scope">
          {{
            `${accurateDecimal(
              new bigNumber(scope.row.expectRate || 0).multipliedBy(100),
              4
            )}%`
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="externalStatus"
        sortable="custom"
        label="External abnormalities"
        align="center"
        key="22"
      >
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.externalStatus == 'NUMBER'"
            >Insufficient quantity</span
          >
          <span style="color: #21ae04" v-else>normal</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="bloodPoolsStatus"
        sortable="custom"
        label="Blood pool switch"
        align="center"
        key="23"
      >
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.bloodPoolsStatus == 'FALSE'"
            >closure</span
          >
          <span style="color: #21ae04" v-else>normal</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="bloodPoolsStatus"
        sortable="custom"
        label="Is it a fake blind box"
        align="center"
        key="24"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.indexShowStatus == "TRUE" ? "yes" : "no" }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="boxStatus"
        sortable="custom"
        label="state"
        align="center"
        key="25"
      >
        <template slot-scope="scope">
          <span style="color: #ec5706" v-if="scope.row.boxStatus == 'DISABLE'"
            >freeze</span
          >
          <span style="color: #21ae04" v-else>normal</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="operate"
        align="center"
        width="110"
        key="26"
        fixed="right"
      >
        <template slot-scope="scope">
          <span class="blueColor publick-button cursor" @click="onEbit(scope.row)">
            edit
          </span>
          <span class="blueColor publick-button cursor" @click="operatingNft(scope.row)">
            {{ scope.row.boxStatus == "DISABLE" ? "Ban" : "freeze" }}
          </span>
          <span class="blueColor publick-button cursor" @click="handleDel(scope.row)">
            delete
          </span>
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
      :title="operatingType == 1 ? 'New blindEdit Blind Box' : 'Edit Blind Box'"
      :visible.sync="showDialog"
      width="1200px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="box-setting">
        <el-form
          ref="ruleForm"
          style="width: 420px"
          :rules="rules"
          :model="ruleForm"
          label-width="100px"
        >
          <el-form-item label="Is it a fake blind box">
            <el-switch
              v-model="ruleForm.indexShowStatus"
              active-value="TRUE"
              inactive-value="FALSE"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="Blind Box Name" prop="boxName">
            <el-input
              v-model="ruleForm.boxName"
              style="width: 300px"
              placeholder="Please enter the name of the blind box"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Blind box picture" prop="seriesImg">
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
          <el-form-item label="H5 blind box picture" prop="seriesImg">
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
                <div class="tip">CD</div>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item label="Recommendation order" prop="boxIndex">
            <el-input
              type="number"
              v-model.number="ruleForm.boxIndex"
              style="width: 300px"
              placeholder="Please enter the recommended sequence"
            ></el-input>
          </el-form-item>
          <el-form-item label="unit price" prop="price">
            <el-input
              type="number"
              v-model="ruleForm.price"
              style="width: 300px"
              placeholder="Please enter the unit price"
            ></el-input>
          </el-form-item>
          <el-form-item label="Five -company unit price" prop="fivePrice">
            <el-input
              type="number"
              v-model="ruleForm.fivePrice"
              style="width: 300px"
              placeholder="Please enter the five -way unit price"
            ></el-input>
          </el-form-item>
          <el-form-item label="Ten consecutive unit price" prop="tenPrice">
            <el-input
              type="number"
              v-model="ruleForm.tenPrice"
              style="width: 300px"
              placeholder="Please enter ten consecutive unit prices"
            ></el-input>
          </el-form-item>
          <el-form-item label="Design return rate" prop="deviseRate">
            <el-input
              type="number"
              v-model="ruleForm.deviseRate"
              style="width: 300px"
              placeholder="Please enter the design return rate"
            >
              <template slot="append">%</template></el-input
            >
          </el-form-item>
          <el-form-item label="NFT price limit" prop="reduceThreshold">
            <el-input
              type="number"
              v-model="ruleForm.reduceThreshold"
              style="width: 300px"
              placeholder="Please enter the NFT price limit"
            >
              <template slot="append">%</template></el-input
            >
          </el-form-item>
          <el-form-item label="Number of legends" prop="legendNum">
            <el-input
              type="number"
              v-model="ruleForm.legendNum"
              style="width: 300px"
              placeholder="Please enter the number of legends"
            >
              <template slot="append">
                {{
                  `probability${new bigNumber(legendNftProbability || 0)
                    .multipliedBy(100)
                    .toFixed(4)}% `
                }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Number of epic" prop="epicNum">
            <el-input
              type="number"
              v-model="ruleForm.epicNum"
              style="width: 300px"
              placeholder="Please enter the number of poems"
            >
              <template slot="append">
                {{
                  `probability${new bigNumber(epicNftProbability || 0)
                    .multipliedBy(100)
                    .toFixed(4)}% `
                }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Rare quantity" prop="rareNum">
            <el-input
              type="number"
              v-model="ruleForm.rareNum"
              style="width: 300px"
              placeholder="Please enter the rare quantity"
            >
              <template slot="append">
                {{
                  `probability${new bigNumber(rareNftProbability || 0)
                    .multipliedBy(100)
                    .toFixed(4)}% `
                }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Ordinary quantity">
            <el-input
              type="number"
              readonly="readonly"
              v-model="commonNum"
              style="width: 300px"
              placeholder="Ordinary quantity"
            >
              <template slot="append">
                {{
                  `probability${new bigNumber(commonNftProbability || 0)
                    .multipliedBy(100)
                    .toFixed(4)}% `
                }}
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Blind Box Description" prop="boxDesc">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4 }"
              placeholder="Please enter the description"
              v-model="ruleForm.boxDesc"
            ></el-input>
          </el-form-item>
          <div class="blood_pool">
            <div class="blood_pool_item">
              <div class="blood_pool_item_l">
                {{ `Consumption:${(bloodPool && bloodPool.grossIncome) || 0}` }}
              </div>
              <div class="blood_pool_item_r">
                <span>Blood pool switch:</span>
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
              <div class="blood_pool_item_l">
                {{ `Return prize:${(bloodPool && bloodPool.totalOpenNftPrice) || 0}` }}
              </div>
              <div class="blood_pool_item_r">
                <span>Correct value:</span>
                <el-input
                  type="number"
                  v-model="bloodPool.adjust"
                  style="flex: 1"
                ></el-input>
              </div>
            </div>
            <div class="blood_pool_item">
              <span>Correct value for compulsory update snapshot threshold:</span>
              <el-input
                type="number"
                v-model="bloodPool.adjustCompulsionUpdateThreshold"
                style="flex: 1"
              >
                <template slot="append">%</template>
              </el-input>
            </div>
            <div class="blood_pool_item">
              <div class="blood_pool_item_l">
                {{
                  `Actual return rate:${accurateDecimal(
                    new bigNumber(bloodPool.realRate || 0).multipliedBy(100),
                    4
                  )}%`
                }}
              </div>
              <div class="blood_pool_item_r">
                {{
                  `Correct the return rate:${accurateDecimal(
                    new bigNumber(bloodPool.adjustRate || 0).multipliedBy(100),
                    4
                  )}%`
                }}
              </div>
            </div>
          </div>
        </el-form>
        <div class="nft-box">
          <div class="external-nft nft-item">
            <div class="operating-box">
              <div class="title">External NFT configuration</div>
              <div class="btn">
                <div class="add" @click="addSeries(1)">Add to</div>
              </div>
            </div>
            <el-table :data="externalList" style="min-width: 0" class="public-table">
              <el-table-column
                prop="seriesName"
                label="series"
                align="center"
                key="1"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="chain" label="chain" align="center" key="2">
                <template slot-scope="scope">
                  {{ chainFormat(scope.row.chain || scope.row.chainId) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                label="Expected quantity"
                width="140px"
                align="center"
                key="3"
              >
                <template slot-scope="scope">
                  <div class="number-box">
                    <el-input
                      type="number"
                      class="number"
                      v-model.number="scope.row.number"
                    ></el-input>
                    <el-tooltip
                      v-if="
                        scope.row.totalNumber &&
                        Number(scope.row.totalNumber || 0) <
                          Number(scope.row.number || 0) &&
                        scope.row.type == 'NFT'
                      "
                      class="item"
                      effect="dark"
                      :content="`This NFT can only be set at the current maximum setting${scope.row.totalNumber}个`"
                      placement="top-start"
                    >
                      <i class="icon-warning el-icon-warning-outline"></i>
                    </el-tooltip>
                    <el-tooltip
                      v-if="scope.row.dwindleNumber"
                      class="item"
                      effect="dark"
                      :content="`${scope.row.dwindleNumber}One NFT exceeds the threshold`"
                      placement="top-start"
                    >
                      <i
                        class="icon-warning icon-warning-color el-icon-warning-outline"
                      ></i>
                    </el-tooltip>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="realNumber"
                label="the actual amount"
                width="120px"
                align="center"
                key="4"
              >
              </el-table-column>
              <el-table-column
                prop="floorPrice"
                v-if="calculationNft.length > 0"
                label="Average price"
                align="center"
                key="5"
              >
              </el-table-column>
              <el-table-column
                prop="floorPrice"
                v-else
                label="Floor price"
                align="center"
                key="6"
              >
              </el-table-column>
              <el-table-column prop="boxImg" label="General price" align="center" key="7">
                <template slot-scope="scope">
                  {{
                    new bigNumber(scope.row.floorPrice)
                      .multipliedBy(scope.row.number || 0)
                      .toFixed(4)
                  }}
                </template>
              </el-table-column>
              <el-table-column label="probability" align="center" key="8">
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
              <div class="title">Internal NFT configuration</div>
              <div class="btn">
                <img
                  src="@/assets/images/icon_calculator.svg"
                  @click="calculationPlatformNft()"
                />
                <div class="add" @click="addSeries(2)">Add to</div>
              </div>
            </div>
            <el-table :data="platformList" style="min-width: 0" class="public-table">
              <el-table-column prop="id" align="center" key="1">
                <template slot-scope="scope">
                  <div style="display: flex; align-items: center">
                    <img
                      v-if="scope.row.baseStatus == 'TRUE'"
                      src="@/assets/images/icon_benchmark_active.svg"
                      alt=""
                    />
                    <img
                      v-else
                      @click="onEbitNft(scope.row)"
                      src="@/assets/images/icon_benchmark.svg"
                      alt=""
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="seriesName" label="series" align="center" key="2">
              </el-table-column>
              <el-table-column prop="price" label="unit price" align="center" key="3">
              </el-table-column>
              <el-table-column
                prop="multipleRate"
                label="Benchmark coefficient"
                align="center"
                key="4"
              >
                <template slot-scope="scope">
                  <div class="number-box" v-if="scope.row.baseStatus != 'TRUE'">
                    <el-input
                      type="number"
                      class="number"
                      v-model="scope.row.multipleRate"
                    ></el-input>
                  </div>
                  <div v-else>{{ scope.row.multipleRate }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="quantity" align="center" key="5">
                <template slot-scope="scope">
                  {{
                    (ruleForm.innerBaseNumber &&
                      Math.ceil(
                        Number(
                          new bigNumber(ruleForm.innerBaseNumber || 0).multipliedBy(
                            scope.row.multipleRate || 0
                          )
                        )
                      )) ||
                    "--"
                  }}
                </template>
              </el-table-column>
              <el-table-column label="General price" align="center" key="6">
                <template slot-scope="scope">
                  {{
                    new bigNumber(scope.row.price)
                      .multipliedBy(
                        Math.ceil(
                          Number(
                            new bigNumber(ruleForm.innerBaseNumber || 1).multipliedBy(
                              scope.row.multipleRate || 0
                            )
                          )
                        )
                      )
                      .toFixed(4)
                  }}
                </template>
              </el-table-column>
              <el-table-column label="probability" align="center" key="7">
                <template slot-scope="scope">
                  {{ probability(scope.row, 2) }}
                </template>
              </el-table-column>
              <el-table-column
                prop="id"
                align="center"
                width="120"
                key="20"
                fixed="right"
              >
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
                `It is expected to return the rate:${new bigNumber(
                  ruleForm.expectRate || 0
                )
                  .multipliedBy(100)
                  .toFixed(4)}%
              `
              }}
            </div>
            <div>
              {{
                ruleForm.lossRate &&
                `Subjoin rate:${new bigNumber(ruleForm.lossRate || 0)
                  .multipliedBy(100)
                  .toFixed(4)}% `
              }}
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="submitForm()">Sure</el-button>
      </span>
      <el-dialog
        width="440px"
        :close-on-click-modal="false"
        :title="seriesType == 1 ? 'Choose an external NFT' : 'Choose an internal NFT'"
        :visible.sync="showSeriesDialog"
        append-to-body
        :before-close="handleSeriesClose"
      >
        <el-form ref="seriesForm" class="add-form" :model="seriesForm" label-width="80px">
          <div class="benchmark-obx" v-if="seriesType == 2">
            <img
              v-if="!platformList.length > 0"
              src="@/assets/images/icon_benchmark_active.svg"
              alt=""
              srcset=""
            />
            <img
              v-else-if="seriesForm.baseStatus == 'TRUE'"
              @click="seriesForm.baseStatus = 'FALSE'"
              src="@/assets/images/icon_benchmark_active.svg"
              alt=""
              srcset=""
            />
            <img
              v-else
              src="@/assets/images/icon_benchmark.svg"
              @click="seriesForm.baseStatus = 'TRUE'"
              alt=""
              srcset=""
            />
            <span>Benchmark NFT</span>
          </div>
          <el-form-item label="type" v-if="seriesType == 1" prop="adjust">
            <el-select
              style="width: 300px"
              v-model="seriesForm.type"
              popper-class="public-select-box"
              @change="selectChain"
              placeholder="please choose"
            >
              <el-option
                v-for="(item, index) in typeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Choice chain" v-if="seriesType == 1" prop="adjust">
            <el-select
              style="width: 300px"
              v-model="seriesForm.chain"
              popper-class="public-select-box"
              @change="selectChain"
              placeholder="please choose"
            >
              <el-option
                v-for="(item, index) in chainList"
                :key="index"
                :label="item.chainName"
                :value="item.chainId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Select a series" prop="adjust">
            <el-select
              style="width: 300px"
              v-model="seriesForm.seriesId"
              popper-class="public-select-box"
              @change="changeSeries"
              placeholder="please choose"
              clearable
            >
              <template v-for="(item, index) in downNft">
                <el-option
                  :key="index"
                  :label="item.seriesName"
                  :value="item.id"
                  v-if="!seriesIdIncludes(item.id)"
                >
                  <span style="float: left">{{ item.seriesName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">{{
                    item.floorPrice
                  }}</span>
                  <span style="float: right; color: #8492a6; font-size: 12px">{{
                    item.price
                  }}</span>
                </el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="seriesForm.type == 'NFT' ? 'Floor price' : 'value'"
            v-if="seriesType == 1"
            prop="adjust"
          >
            <el-input
              style="width: 300px"
              type="number"
              readonly
              v-model="seriesForm.floorPrice"
            >
              <template slot="append">{{ priceCoin }}</template>
            </el-input>
          </el-form-item>
          <el-form-item label="unit price" v-if="seriesType == 2" prop="adjust">
            <el-input
              style="width: 300px"
              type="number"
              readonly
              v-model="seriesForm.price"
            >
              <template slot="append">{{ priceCoin }}</template>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleSeriesClose()">Cancel</el-button>
          <el-button type="primary" @click="pushSeries()">Sure</el-button>
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
      fileImg: [
        {
          url:
            "https://www.bitzing.io/prd/mystery/IMAGE/8945f0a4b909442395d48718c335a9a8.webp",
        },
      ],
      fileImgOne: [],
      fileImgTwo: [],
      ruleForm: {
        boxName: null, //盲盒名称
        boxImg:
          "https://www.bitzing.io/prd/mystery/IMAGE/8945f0a4b909442395d48718c335a9a8.webp", //盲盒图片
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
      this.$message.error("upload failed");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error(
          "The picture is too large, the file size is small and small is less than 2M"
        );
      }
      return is1M;
    },
    handleRemove(file, fileList) {
      this.fileImg = [];
    },
    handExceed(fiel) {
      this.$message.error("Banner picture can only be uploaded");
    },
    submitCofirm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.fileImg.length == 0) {
            this.$message.error("Please upload the picture!");
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
      this.$confirm(
        `Are you ${row.boxstatus == " Disable " ? " Open " : " Close "}" ${
          row.boxname || row.id
        }"?`,
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
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
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 删除
    handleDel(event) {
      this.$confirm(
        `Are you sure you want to delete the blind box "${event.boxname || event.id}"?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          let res = await this.$http.boxManagerDelete({
            id: event.id,
          });
          if (res) {
            this.fetchBoxManagerList();
            this.$message.success("Successful operation");
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
        adjustCompulsionUpdateThreshold: accurateDecimal(
          new bigNumber(row.adjustCompulsionUpdateThreshold || 0).multipliedBy(100),
          4
        ), // 修正阈值
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
      this.$message.error("upload failed");
    },
    handleBefore(file) {
      const _this = this;
      const is1M = file.size / 1024 / 1024 < 2; // 限制小于2M
      if (!is1M) {
        _this.$message.error("The file is too large, and the file size is less than 2M");
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
      this.$message.error("File can only upload one");
    },
    handleUploadOne(res) {
      if (res.code == 200) {
        this.fileImgOne.push({ url: res.data });
        this.ruleForm.showImgOne = res.data;
        return;
      }
      this.$message.error("upload failed");
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
      this.$message.error("upload failed");
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
            this.$message.error("Please upload a blind box picture!");
            return;
          }

          if (!platformList.length > 0) {
            this.$message.error("Please select the internal NFT!");
            return;
          }

          if (!externalList.length > 0) {
            this.$message.error("Please select the external NFT!");
            return;
          }

          if (!calculationNft.length > 0) {
            this.$message.error(
              "If the internal NFT benchmark data is not calculated, please replenish it after the completeness"
            );
            return;
          }

          if (!innerBaseNumber && innerBaseNumber > 0) {
            this.$message.error(
              "The internal NFT reference data cannot be negative, please correct it and try again"
            );
            return;
          }

          let platformNftData = [];
          let externalNftData = [];
          let externalCoinData = [];

          try {
            externalList.forEach((element) => {
              if (
                Number(element.totalNumber) < Number(element.number) &&
                element.type == "NFT"
              ) {
                console.log("The maximum number is wrong");
                // throw new Error("error");
              }

              if (!element.number || Number(element.number) <= 0) {
                console.log("Empty quantity");
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
            this.$message.error(
              "The number of external NFT series is incorrect, please replenish it after the completeness"
            );
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
              new bigNumber(bloodPool.adjustCompulsionUpdateThreshold || 0).dividedBy(
                100
              ),
              4
            ), // 修正阈值
            coin: this.coin,
            deviseRate: accurateDecimal(
              new bigNumber(this.ruleForm.deviseRate).dividedBy(100),
              6
            ),
            reduceThreshold:
              this.ruleForm.reduceThreshold != null &&
              this.ruleForm.reduceThreshold !== ""
                ? accurateDecimal(
                    new bigNumber(this.ruleForm.reduceThreshold).dividedBy(100),
                    6
                  )
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
            this.$message.success("Successful operation");
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
        if (
          this.externalList.findIndex((e) => e.seriesId == this.seriesForm.seriesId) > -1
        ) {
          this.$message.warning("The NFT series already exists");
          return;
        }

        if (!this.seriesForm.seriesId) {
          this.$message.warning("Please select the external NFT series");
          return;
        }

        if (!this.seriesForm.chain) {
          const nftInfo = this.downNft.find((e) => e.id == this.seriesForm.seriesId);
          this.seriesForm.chain = nftInfo && nftInfo.chainId;
        }
        this.externalList.push(this.seriesForm);
      } else {
        if (
          this.platformList.findIndex((e) => e.seriesId == this.seriesForm.seriesId) > -1
        ) {
          this.$message.warning("The NFT series already exists");
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
          const platformNum = Math.ceil(
            Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate))
          );
          nftNumber += platformNum && platformNum > 0 ? platformNum : 0;
        }
      });

      const platformNumber = Math.ceil(
        Number(new bigNumber(innerBaseNumber || 0).multipliedBy(event.multipleRate))
      );
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
            this.$message.error("Please upload a blind box picture!");
            return;
          }

          if (!platformList.length > 0) {
            this.$message.error("Please select the internal NFT!");
            return;
          }

          if (!externalList.length > 0) {
            this.$message.error("Please select the external NFT!");
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
            this.$message.error(
              "There is an external NFT series that does not enter the number, please replenish it after full review"
            );
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
              new bigNumber(bloodPool.adjustCompulsionUpdateThreshold || 0).dividedBy(
                100
              ),
              4
            ), // 修正阈值
            deviseRate: accurateDecimal(
              new bigNumber(this.ruleForm.deviseRate).dividedBy(100),
              6
            ),
            reduceThreshold:
              this.ruleForm.reduceThreshold != null &&
              this.ruleForm.reduceThreshold !== ""
                ? accurateDecimal(
                    new bigNumber(this.ruleForm.reduceThreshold).dividedBy(100),
                    6
                  )
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
                if (
                  this.calculationNft[j].nftType == "PLATFORM" &&
                  this.calculationNft[j].seriesId == this.platformList[i].seriesId
                ) {
                  this.platformList[i].nftType = "PLATFORM";
                  this.platformList[i].price = this.calculationNft[j].averagePrice;
                  platformCount.push(this.platformList[i]);
                }
              }
            }

            for (let j = 0; j < this.calculationNft.length; j++) {
              for (let i = 0; i < this.externalList.length; i++) {
                if (
                  this.calculationNft[j].nftType == "EXTERNAL" &&
                  this.calculationNft[j].seriesId == this.externalList[i].seriesId
                ) {
                  this.externalList[i].nftType = "EXTERNAL";
                  this.externalList[i].totalNumber = this.calculationNft[j].totalNumber;
                  this.externalList[i].realNumber = this.calculationNft[j].realNumber;
                  this.externalList[i].dwindleNumber = this.calculationNft[
                    j
                  ].dwindleNumber;
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
                  this.externalList[i].dwindleNumber = this.calculationNft[
                    j
                  ].dwindleNumber;
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
        callback(
          new Error(
            "The unit price of single buy cannot be lower than the five -way unit price"
          )
        );
      } else {
        callback();
      }
    },
    // 五连计算
    validateFive(rule, value, callback) {
      const { tenPrice } = this.ruleForm;
      if (Number(value) <= 0 || Number(value || 0) < Number(tenPrice || 0)) {
        callback(
          new Error(
            "The price of the five consecutive units cannot be lower than the ten consecutive unit price"
          )
        );
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
      boxName: [
        {
          required: true,
          message: "Please enter the name of the blind box",
          trigger: ["blur", "change"],
        },
      ],
      boxImg: [
        {
          required: true,
          message: "Please select a blind box picture",
          trigger: ["blur", "change"],
        },
      ],
      boxIndex: [
        {
          required: true,
          message: "Please enter the recommended sequence",
          trigger: ["blur", "change"],
        },
      ],
      price: [
        {
          required: true,
          message: "Please enter the price",
          trigger: ["blur", "change"],
        },
        { validator: this.validateOne, trigger: ["blur", "change"] },
      ],
      fivePrice: [
        {
          required: true,
          message: "Please enter five consecutive prices",
          trigger: ["blur", "change"],
        },
        { validator: this.validateFive, trigger: ["blur", "change"] },
      ],
      tenPrice: [
        {
          required: true,
          message: "Please enter the ten consecutive price",
          trigger: ["blur", "change"],
        },
      ],
      deviseRate: [
        {
          required: true,
          message: "Please enter the design return rate",
          trigger: ["blur", "change"],
        },
      ],
      // reduceThreshold: [
      //   { required: true, message: "Please enter the blind box attenuation rate", trigger: ["blur", "change"] },
      // ],
      legendNum: [
        {
          required: true,
          message: "Please enter the number of legends",
          trigger: ["blur", "change"],
        },
      ],
      epicNum: [
        {
          required: true,
          message: "Please enter the number of poems",
          trigger: ["blur", "change"],
        },
      ],
      rareNum: [
        {
          required: true,
          message: "Please enter the rare quantity",
          trigger: ["blur", "change"],
        },
      ],
      boxDesc: [
        {
          required: true,
          message: "Please enter a blind box description",
          trigger: ["blur", "change"],
        },
      ],
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
          const platformNum = Math.ceil(
            Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate))
          );
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
          const platformNum = Math.ceil(
            Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate))
          );
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

      const nftData = calculationNft.slice(
        legendNum,
        Number(legendNum) + Number(epicNum)
      );

      let epicNftNum = 0;
      nftData.forEach((element) => {
        if (element.nftType == "PLATFORM") {
          const platformNum = Math.ceil(
            Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate))
          );
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

      const nftData = calculationNft.slice(
        Number(legendNum) + Number(epicNum),
        Number(legendNum) + Number(epicNum) + Number(rareNum)
      );

      let rareNftNum = 0;
      nftData.forEach((element) => {
        if (element.nftType == "PLATFORM") {
          const platformNum = Math.ceil(
            Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate))
          );
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
          const platformNum = Math.ceil(
            Number(new bigNumber(innerBaseNumber || 0).multipliedBy(element.multipleRate))
          );
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
