<template>
  <div class="page-wrapper">
    <el-tabs tab-position="left">
      <el-tab-pane label="Basic configuration">
        <div class="points-settings">
          <div class="setting-item">
            <div class="setting-title">Register and pull new start time</div>
            <div class="setting-val">
              <el-date-picker
                class="public-input"
                style="width: 300px"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="points.regCountdownTime"
                type="datetime"
                placeholder="select time"
              />
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Sub -commission ratio</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="the basic proportion of returning commission returns after subordinates after consumption is essentially flowing water*Flowing commission ratio*"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="enter the proportion of subordinates commissions"
                v-model="points.downCommissionRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span
                >The additional proportion of the lower -level air investment
                accumulation</span
              >
              <el-tooltip
                class="item"
                effect="dark"
                content="successful invitation to return to the superiors to return to the superiors"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the additional proportion of the lower air investment accumulation"
                v-model="points.downPointRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Consumption integration coefficient</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The coefficient of consumption produces points, it seems useless now"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the consumption integration coefficient"
                v-model="points.consumePointRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Flow commission ratio</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="With the proportion of commissions in the lower level, the meaning here is actually the advantage of the dealer"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Input flow commission ratio"
                v-model="points.flowCommissionRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Contact customer service name</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The customer service name displayed in the pop -up window when the withdrawal is limited"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 300px"
                placeholder="Enter contact customer service name"
                v-model="points.customerName"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Contact customer service link</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Links to customer service for withdrawal restrictions and balance interfaces"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 300px"
                placeholder="Enter customer service link"
                v-model="points.customerLink"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>LANDINGPAGE jump link link</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Page automatically jumping after registering from LandingPage"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 300px"
                placeholder="Enter LANDINGPAGE jump link link"
                v-model="points.jumpAddress"
                clearable
              >
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitPoints()"
            >Confirm the changes</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="Withdrawal configuration">
        <div class="withdrawal-settings">
          <!-- <div class="setting-item">
        <div class="setting-title">代币提现手续费</div>
        <div class="setting-val">
          <el-input
            class="public-input"
            type="number"
            style="width: 300px"
            placeholder="Enter tokens withdrawal fees"
            v-model="withdrawals.withdrawalFees"
            clearable
          >
            <template slot="append">{{ coin }}</template>
          </el-input>
        </div>
      </div> -->
          <div class="setting-item">
            <div class="setting-title">
              <span>Minimum withdrawal amount</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The minimum withdrawal amount is set here, which must be higher than this amount and higher than the GAS fee to withdraw money. 0 is not limited"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the minimum withdrawal amount"
                v-model="withdrawals.minWithdrawal"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">PVP recharge restriction</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter PVP recharge restriction"
                v-model="withdrawals.pvpThresholds"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Automatic review of flow threshold</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="When the total consumption of the user is greater than this data, the following review threshold will be triggered to enter the automatic audit stage"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter automatic review of the flowing water threshold"
                v-model="withdrawals.auditFlowThresholds"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Activate the Returning Threshold</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The lower -level deposit will return to the superiors to return to the commission"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter activation threshold"
                v-model="withdrawals.activateRebateThreshold"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>NFT withdrawal fee</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The amount of fixed handling fee collected by NFT withdrawal will be converted into USDT for deduction at the actual front desk"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter NFT withdrawal handling fee"
                v-model="withdrawals.nftWithdrawalFees"
                clearable
              >
                <template slot="append">{{ "ETH" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Free trips</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="There are several opportunities to set up the player several times without deducting the GAS fee"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the floating rate"
                v-model="withdrawals.freeFeeCoinNumber"
                clearable
              >
                <template slot="append">Second-rate</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Single review threshold</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="When a single withdrawal is less than this value, it does not need to be reviewed automatically"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the review threshold"
                v-model="withdrawals.auditThresholds"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Cumulative review threshold</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The restrictions on user withdrawal, that is, no, daily, weekly or how much you can withdraw every month,"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the total amount of withdrawal"
                v-model="withdrawals.withdrawalLimits"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
              <el-select
                style="width: 200px"
                v-model="withdrawals.withdrawalDayLimits"
                class="public-select-box"
                placeholder="Selection period"
              >
                <el-option label="daily" :value="1" />
                <el-option label="weekly" :value="7" />
                <el-option label="per month" :value="30" />
              </el-select>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Flash and gold floating ratio</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Here is the flashing difference configuration, it seems useless to float up"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the floating rate"
                v-model="withdrawals.upRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">Flashing out of gold and floating ratio</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the floating rate"
                v-model="withdrawals.downRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>

          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitWithdrawal()"
            >Confirm the changes</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="nft&一元购配置">
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>External NFT recycling ratio</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Here is to set up the recycling value ratio of all NFTs outside the Blind Box NFT"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the recycling ratio"
                v-model="nftReclaimRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitRecycle()"
            >Confirm the changes</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>One dollar purchase service fee</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The one -dollar purchase service fee set here"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Input service fee"
                v-model="serviceFee"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitServiceFee()"
            >Confirm the changes</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>One dollar purchase premium limit</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="What is set here is the proportion of restricted ETH one dollar purchase beyond ETH itself value"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the one -dollar purchase premium limit"
                v-model="ticketExceeding"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitTicketExceeding()"
            >Confirm the changes</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>One dollar purchase NFT days upper limit</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Determine how many days can you choose to buy a single NFT one dollar to buy"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter NFT days upper limit"
                v-model="ticketNftDays"
                clearable
              >
                <template slot="append">day</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitTicketNftDays()"
            >Confirm the changes</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>One dollar purchase of the number of days limit</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Determine how many days can be selected for the user to hang a single dollar to buy"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the upper limit of the number of days of one dollar purchase"
                v-model="ticketCoinDays"
                clearable
              >
                <template slot="append">day</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitTicketCoinDays()"
            >Confirm the changes</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="token War配置">
        <div class="withdrawal-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>Minimum consumption</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Limit the minimum consumption amount of TokenWar, that is, the first consumption amount"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter minimum consumption"
                v-model="battle.lowPriceLimit"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Ticket unit price</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Limit the minimum investment amount of TokenWar"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter ticket unit price"
                v-model="battle.singlePrice"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Handling fee</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Tokenwar handling fee ratio"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the handling fee"
                v-model="battle.fee"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Duration in a single game</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Here is a single game of each game of the currency war."
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter a single game duration"
                v-model="battle.singleTime"
                clearable
              >
                <template slot="append">Second</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Number of acceleration</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="When the number of currency war participants are set up, when the number of participants reached, enter the acceleration countdown"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the number of acceleration"
                v-model="battle.fastLimitNumber"
                clearable
              >
                <template slot="append">man</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Ticket purchase delay</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="This time decides to accelerate the initial duration of countdown, as well as the length of the new consumption delay"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter ticket purchase delay"
                v-model="battle.ticketPurchaseDelay"
                clearable
              >
                <template slot="append">s</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Grand Prize Investment Comparison</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Here is how many flowing water will enter the award prize pool"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter a prize investment ratio"
                v-model="battle.awardInvestmentRatio"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>Grand prize trigger amount</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Where to what level of the prize prize pool is decided to enter the endwar"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the award trigger amount"
                v-model="battle.awardTriggerAmount"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitWarGameSetting()"
            >Confirm the changes</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="Configuration of recharge activities">
        <div class="wallet-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>Token WAR running record ratio</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="The three values ​​here determine that these three games calculate the proportion of effective flowing water in participating in the recharge and delivery activities"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter token WAR running record ratio"
                v-model="gameRatesData.tokenWarFlowRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">Blind box flow record ratio</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter blind box flow record ratio"
                v-model="gameRatesData.boxFlowRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">One dollar purchase flow record ratio</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="Enter the one -dollar purchasing water record ratio"
                v-model="gameRatesData.oneFlowRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="setActivityGameSettingFunc()"
            >Confirm the changes</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="Collect wallet configuration">
        <div class="wallet-settings">
          <div class="operating-box">
            <span>Collect wallet settings</span>
            <!-- <el-button type="primary" style="width: 160px" @click="showDialog = true">新增钱包</el-button> -->
          </div>
          <el-table
            :data="tableData"
            style="width: 760px; min-width: 0"
            class="public-table"
            border
          >
            <el-table-column
              prop="type"
              width="320"
              label="Wallet type"
              align="center"
              key="1"
            >
            </el-table-column>
            <el-table-column
              prop="walletAddress"
              width="320"
              label="Wallet address"
              align="center"
              key="2"
            >
            </el-table-column>
            <el-table-column
              prop="flowId"
              width="200"
              label="Balance"
              align="center"
              key="3"
            >
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.innetWalletList" :key="index">
                  {{ `${item.coin}:${item.assetBalance}` }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="walletStatus"
              width="100"
              label="Activation state"
              align="center"
              key="43"
            >
              <template slot-scope="scope">
                <span style="color: #04b000" v-if="scope.row.walletStatus == 'NORMAL'">
                  activated
                </span>
                <span style="color: red" v-else> inactivated </span>
              </template>
            </el-table-column>
            <el-table-column label="operate" align="center" key="5" fixed="right">
              <template slot-scope="scope">
                <span
                  class="blueColor publick-button cursor"
                  @click="walletActive(scope.row)"
                >
                  activation
                </span>
                <span
                  class="blueColor publick-button cursor"
                  @click="walletDel(scope.row)"
                >
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="Invite text configuration">
        <div class="invite-settings">
          <div class="setting-item" v-for="(item, index) in inviteList" :key="index">
            <div class="setting-title">
              <span v-if="index == 0">Invite text</span>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 100%"
                placeholder="Enter the invitation text (single line)"
                v-model="item.text"
                clearable
              >
                <template slot="append">
                  <el-button v-if="index == 0" @click="inviteAdd()">
                    <i class="el-icon-plus"></i>
                  </el-button>
                  <el-button v-else @click="inviteDel(index)">
                    <i class="el-icon-minus"></i>
                  </el-button>
                </template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitInvite()"
            >Confirm the changes</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-if="showDialog"
      title="Newly added wallet"
      :visible.sync="showDialog"
      width="440px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" class="add-form" label-width="80px">
        <el-form-item label="Wallet type" prop="reclaimRate">
          <el-select
            style="width: 300px"
            v-model="walletAddrType"
            placeholder="Select wallet type"
          >
            <el-option label="evm" value="EVM" />
            <el-option label="tron" value="TRON" />
          </el-select>
        </el-form-item>
        <el-form-item label="Wallet address" prop="reclaimRate">
          <el-input
            v-model="walletAddr"
            style="width: 300px"
            placeholder="Please enter the wallet address"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">Cancel</el-button>
        <el-button type="primary" @click="submitForm()">Sure</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bigNumber from "bignumber.js";
import { timeForStr, accurateDecimal, exportExcel } from "@/utils";
import pagination from "@/mixins/pagination";
import config from "@/config/env";
export default {
  name: "Setting",
  // 模板引入
  components: {},
  // 数据
  data() {
    return {
      /** 积分相关配置 */
      points: {
        downCommissionRate: null, // 下级佣金比例
        downPointRate: null, // 下级积分比例
        consumePointRate: null, // 消费积分
        regCountdownTime: null, //
        flowCommissionRate: null, //流水佣金比例
        customerLink: null, //客服链接
        customerName: null,
        jumpAddress: null, //landingpage跳转链接
      },

      /** 提现相关配置 */
      withdrawals: {
        coin: null, // 币种
        withdrawalFees: null, // 提现手续费
        nftWithdrawalFees: null, // NFT提现手续费
        withdrawalLimits: null, // 提款限制
        withdrawalDayLimits: null, // 限制天数
        auditThresholds: null, // 单次审核阈值
        upRate: null, // 闪兑上浮比率
        downRate: null, // 闪兑下浮比率
        freeFeeCoinNumber: null, //提币免费次数
        minWithdrawal: null, //最低提款金额
        pvpThresholds: null,
        auditFlowThresholds: null, //自动审核流水阈值
        activateRebateThreshold: null, //激活返佣阈值字段
      },

      /** NFT回收相关配置 */
      nftReclaimRate: null,

      /** 一元购服务费 */
      serviceFee: null,
      ticketExceeding: null, // 溢价
      ticketNftDays: null, // NFT天数上限
      ticketCoinDays: null, // 币种天数上限
      timer: null, // 计时器

      /** 战争配置 */
      battle: {
        lowPriceLimit: null, //最低消费
        singlePrice: null, //票单价
        fee: null, //手续费
        singleTime: null, //单局时长
        fastLimitNumber: null, // 加速人数
        ticketPurchaseDelay: null, // 购票延时
        awardInvestmentRatio: null, // 大奖投入比
        awardTriggerAmount: null, // 大奖触发金额
      },

      /** 钱包相关 */
      showDialog: false,
      walletAddr: null,
      walletAddrType: "EVM",

      /** 邀请文本相关 */
      inviteList: [{ text: "" }],

      page: 1,
      size: 20,
      tableData: null,
      baseUserPage: null,
      aggregateQuery: null,
      gameRatesData: {
        tokenWarFlowRate: null,
        boxFlowRate: null,
        oneFlowRate: null,
      },
    };
  },
  mixins: [pagination],
  watch: {
    ticketNftDays(newV, oldV) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        this.ticketNftDays = Math.floor(newV);
      }, 300);
    },
    ticketCoinDays(newV, oldV) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.timer = setTimeout(() => {
        this.ticketCoinDays = Math.floor(newV);
      }, 300);
    },
  },
  // 方法
  methods: {
    bigNumber: bigNumber,
    timeForStr: timeForStr,
    // 加载列表
    async fetchSystemWalletList(isSearch = true) {
      const { size } = this;
      let _page = this.page;
      if (isSearch) {
        this.page = 1;
        _page = 1;
      }
      const data = {
        walletType: "GATHER",
        size: size,
        page: _page,
      };
      const res = await this.$http.getSystemWalletList(data);
      if (res) {
        this.baseUserPage = res;
        this.tableData = res.records;
      }
    },
    // 游戏活动流水比例设置查询
    async findActivityGameSettingFunc() {
      const res = await this.$http.findActivityGameSetting();
      if (res) {
        this.gameRatesData.tokenWarFlowRate = res.tokenWarFlowRate * 100;
        this.gameRatesData.boxFlowRate = res.boxFlowRate * 100;
        this.gameRatesData.oneFlowRate = res.oneFlowRate * 100;
      }
    },
    // 游戏活动流水比例设置
    async setActivityGameSettingFunc() {
      let ruleForm = { ...this.gameRatesData };
      ruleForm.tokenWarFlowRate = ruleForm.tokenWarFlowRate / 100;
      ruleForm.boxFlowRate = ruleForm.boxFlowRate / 100;
      ruleForm.oneFlowRate = ruleForm.oneFlowRate / 100;
      const res = await this.$http.setActivityGameSetting({ ...ruleForm });
      if (res) {
        this.$message.success("Successful operation");
        this.findActivityGameSettingFunc();
      }
    },
    // 积分配置查询
    async fetchPointConfig() {
      const res = await this.$http.getPointConfig();

      if (res) {
        this.points = {
          ...res,
          downCommissionRate: new bigNumber(res.downCommissionRate)
            .multipliedBy(100)
            .toFixed(2), //下级佣金比例
          downPointRate: new bigNumber(res.downPointRate).multipliedBy(100).toFixed(2), //下级积分比例
          consumePointRate: new bigNumber(res.consumePointRate)
            .multipliedBy(100)
            .toFixed(2), //消费积分
          flowCommissionRate: new bigNumber(res.flowCommissionRate)
            .multipliedBy(100)
            .toFixed(2), //流水佣金比例
        };

        this.$forceUpdate();
      }
    },
    // 积分配置更新
    async submitPoints() {
      const {
        downCommissionRate,
        downPointRate,
        consumePointRate,
        flowCommissionRate,
      } = this.points;

      if (
        !downCommissionRate ||
        !downPointRate ||
        !consumePointRate ||
        !flowCommissionRate
      ) {
        this.$message.error(
          "The related parameters of the integration configuration are incomplete, please add after complete"
        );
        return;
      }

      const res = await this.$http.pointConfigSet({
        ...this.points,
        downCommissionRate: accurateDecimal(
          new bigNumber(downCommissionRate).dividedBy(100),
          4
        ), //下级佣金比例
        downPointRate: accurateDecimal(new bigNumber(downPointRate).dividedBy(100), 4), //下级积分比例
        consumePointRate: accurateDecimal(
          new bigNumber(consumePointRate).dividedBy(100),
          4
        ), //消费积分
        flowCommissionRate: accurateDecimal(
          new bigNumber(flowCommissionRate).dividedBy(100),
          4
        ), //流水佣金比例
      });

      if (res) {
        this.fetchPointConfig();
        this.$message.success("Successful operation");
      }
    },
    // 提现配置查询
    async fetchWithdrawalConfig() {
      const res = await this.$http.getWithdrawalConfig({ coin: this.coin });
      if (res) {
        this.withdrawals = {
          ...res,
        };

        this.withdrawals.upRate = accurateDecimal(
          new bigNumber(res.upRate).multipliedBy(100),
          2
        );
        this.withdrawals.downRate = accurateDecimal(
          new bigNumber(res.downRate).multipliedBy(100),
          2
        );

        this.$forceUpdate();
      }
    },
    // 提现配置更新
    async submitWithdrawal() {
      const {
        withdrawalFees,
        nftWithdrawalFees,
        withdrawalLimits,
        withdrawalDayLimits,
        auditThresholds,
        upRate,
        downRate,
        freeFeeCoinNumber,
      } = this.withdrawals;

      // if (
      //   !nftWithdrawalFees ||
      //   !auditThresholds ||
      //   !withdrawalLimits ||
      //   !withdrawalDayLimits ||
      //   !upRate ||
      //   !downRate ||
      //   !freeFeeCoinNumber
      // ) {
      //   this.$message.error("提现配置相关参数不完整，请补充完整后重试");
      //   return;
      // }

      const res = await this.$http.withdrawalConfigSet({
        ...this.withdrawals,
        upRate: accurateDecimal(new bigNumber(upRate).dividedBy(100), 4), // 闪兑展示上浮汇率
        downRate: accurateDecimal(new bigNumber(downRate).dividedBy(100), 4), // 闪兑展示下浮汇率
        coin: this.coin,
      });

      if (res) {
        this.fetchWithdrawalConfig();
        this.$message.success("Successful operation");
      }
    },
    // NFT回收配置查询
    async fetchRecycleConfig() {
      const res = await this.$http.getRecycleConfig({ coin: this.coin });
      if (res) {
        this.nftReclaimRate = accurateDecimal(
          new bigNumber(res.nftReclaimRate).multipliedBy(100),
          2
        );
        this.$forceUpdate();
      }
    },
    // NFT回收配置更新
    async submitRecycle() {
      const { nftReclaimRate } = this;

      if (!nftReclaimRate) {
        this.$message.error(
          "NFT recycling configuration related parameters are incomplete, please replenish after complete review"
        );
        return;
      }

      const res = await this.$http.recycleConfigSet({
        nftReclaimRate: accurateDecimal(new bigNumber(nftReclaimRate).dividedBy(100), 4),
      });

      if (res) {
        this.fetchRecycleConfig();
        this.$message.success("Successful operation");
      }
    },
    // 一元购服务费
    async fetchServiceCharge() {
      const res = await this.$http.getServiceCharge({ coin: this.coin });
      if (res) {
        this.serviceFee = accurateDecimal(
          new bigNumber(res || 0).multipliedBy(100) || 0,
          2
        );
        this.$forceUpdate();
      }
    },
    // 一元购服务费更新
    async submitServiceFee() {
      const { serviceFee } = this;

      if (!serviceFee) {
        this.$message.error("Please enter the one -dollar purchase service fee");
        return;
      }

      const res = await this.$http.updateServiceCharge({
        servicePrice: accurateDecimal(new bigNumber(serviceFee).dividedBy(100), 4),
      });

      if (res) {
        this.fetchServiceCharge();
        this.$message.success("Successful operation");
      }
    },
    // 一元购溢价
    async fetchTicketExceeding() {
      const res = await this.$http.getTicketExceeding({ coin: this.coin });
      if (res) {
        this.ticketExceeding = accurateDecimal(
          new bigNumber(res || 0).multipliedBy(100) || 0,
          2
        );
        this.$forceUpdate();
      }
    },
    // 一元购溢价更新
    async submitTicketExceeding() {
      const { ticketExceeding } = this;

      if (!ticketExceeding) {
        this.$message.error("Please enter a one -dollar purchase premium limit");
        return;
      }

      const res = await this.$http.updateTicketExceeding({
        servicePrice: accurateDecimal(new bigNumber(ticketExceeding).dividedBy(100), 4),
      });

      if (res) {
        this.fetchTicketExceeding();
        this.$message.success("Successful operation");
      }
    },
    // 一元购NFT天数上限
    async fetchTicketNftDays() {
      const res = await this.$http.getTicketNftDays();
      if (res) {
        this.ticketNftDays = res;
        this.$forceUpdate();
      }
    },
    // 一元购NFT天数上限更新
    async submitTicketNftDays() {
      const { ticketNftDays } = this;

      if (!ticketNftDays) {
        this.$message.error(
          "Please enter the upper limit of the number of days of NFT for one yuan"
        );
        return;
      }

      const res = await this.$http.updateTicketNftDays({
        day: Math.floor(ticketNftDays),
      });

      if (res) {
        this.fetchTicketNftDays();
        this.$message.success("Successful operation");
      }
    },
    // 一元购币种天数上限
    async fetchTicketCoinDays() {
      const res = await this.$http.getTicketCoinDays();
      if (res) {
        this.ticketCoinDays = res;
        this.$forceUpdate();
      }
    },
    // 一元购币种天数上限更新
    async submitTicketCoinDays() {
      const { ticketCoinDays } = this;

      if (!ticketCoinDays) {
        this.$message.error(
          "Please enter the upper limit of the number of days of NFT for one yuan"
        );
        return;
      }

      const res = await this.$http.updateTicketCoinDays({
        day: Math.floor(ticketCoinDays),
      });

      if (res) {
        this.fetchTicketCoinDays();
        this.$message.success("Successful operation");
      }
    },

    // 战争配置查询
    async fetchWarGameSetting() {
      const res = await this.$http.getWarGameSetting({ coin: this.coin });
      if (res) {
        this.battle = {
          ...res,
          fee: accurateDecimal(new bigNumber(res.fee).multipliedBy(100), 2),
          awardInvestmentRatio: accurateDecimal(
            new bigNumber(res.awardInvestmentRatio).multipliedBy(100),
            2
          ),
        };

        this.$forceUpdate();
      }
    },
    // 战争配置更新
    async submitWarGameSetting() {
      const {
        fee,
        singleTime,
        fastLimitNumber,
        ticketPurchaseDelay,
        awardInvestmentRatio,
        awardTriggerAmount,
      } = this.battle;

      if (
        !fee ||
        !singleTime ||
        !fastLimitNumber ||
        !ticketPurchaseDelay ||
        !awardInvestmentRatio ||
        !awardTriggerAmount
      ) {
        this.$message.error(
          "The related parameters of the war configuration are incomplete, please replenish it after complete review"
        );
        return;
      }

      const res = await this.$http.setWarGameSetting({
        ...this.battle,
        fee: accurateDecimal(new bigNumber(fee).dividedBy(100), 4),
        awardInvestmentRatio: accurateDecimal(
          new bigNumber(awardInvestmentRatio).dividedBy(100),
          4
        ),
      });

      if (res) {
        this.fetchWarGameSetting();
        this.$message.success("Successful operation");
      }
    },
    // 新增归集钱包
    async submitForm() {
      if (!this.walletAddr) {
        this.$message.error("Please enter the gathering of wallet address");
        return;
      }

      const res = await this.$http.systemWalletAdd({
        type: this.walletAddrType,
        walletAddress: this.walletAddr,
        walletType: "GATHER",
      });

      if (res) {
        this.handleClose();
        this.fetchSystemWalletList();
        this.$message.success("Successful operation");
      }
    },
    //激活钱包
    walletActive(row) {
      this.$confirm(
        `Are you sure you want to activate the wallet "${row.walletaddress}"?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          const res = await this.$http.systemWalletActive({
            id: row.id,
          });
          if (res) {
            this.fetchSystemWalletList();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //删除钱包
    walletDel(row) {
      this.$confirm(
        `Are you sure you want to delete the wallet "${row.walletaddress}"?`,
        "hint",
        {
          confirmButtonText: "Sure",
          cancelButtonText: "Cancel",
          type: "info",
        }
      )
        .then(async () => {
          const res = await this.$http.systemWalletDel({
            id: row.id,
          });
          if (res) {
            this.fetchSystemWalletList();
            this.$message.success("Successful operation");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // 新增邀请文本行
    inviteAdd() {
      this.inviteList.push({ text: "" });
      this.$forceUpdate();
    },
    // 删除邀请文本单行
    inviteDel(index) {
      this.inviteList.splice(index, 1);
      this.$forceUpdate();
    },
    // 邀请文本查询
    async fetchInviteSetting() {
      const res = await this.$http.getInviteSetting();
      if (res) {
        const invites = res.inviteText.split(",");
        this.inviteList = [];
        invites.forEach((element) => {
          this.inviteList.push({ text: element });
        });

        this.$forceUpdate();
      }
    },
    // 邀请文本更新
    async submitInvite() {
      const { inviteList } = this;
      let invites = "";
      inviteList.forEach((element) => {
        if (!invites) {
          invites = element.text;
          return;
        }

        invites += "," + element.text;
      });
      if (!invites) {
        this.$message.error("Please enter the invitation text");
        return;
      }

      const res = await this.$http.inviteSet({
        inviteText: invites,
      });

      if (res) {
        this.fetchInviteSetting();
        this.$message.success("Successful operation");
      }
    },
    handleClose(done) {
      if (done) {
        done();
        return;
      }

      this.showDialog = false;
    },
    handleSizeChange(val) {
      this.size = val;
      this.fetchSystemWalletList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.fetchSystemWalletList(false);
    },
  },
  // 创建后
  created() {
    this.fetchSystemWalletList();
    this.fetchPointConfig();
    this.fetchWithdrawalConfig();
    this.fetchRecycleConfig();
    this.fetchServiceCharge();
    this.fetchTicketExceeding();
    this.fetchTicketNftDays();
    this.fetchTicketCoinDays();
    this.fetchInviteSetting();
    this.fetchWarGameSetting();
    this.findActivityGameSettingFunc();
  },
  computed: {
    coin() {
      return this.$store.getters.coinConfig;
    },
    userType() {
      return this.$store.getters.accountConfig;
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

.setting-item {
  display: flex;
  align-items: center;

  .setting-title {
    font-size: 16px;
    font-weight: bold;
    min-width: 200px;

    & > span {
      margin-right: 8px;
    }
  }

  .el-input {
    margin-bottom: 0;
  }

  .el-select {
    margin: 0 !important;
  }
}

.page-wrapper {
  & > div + div {
    margin-top: 40px;
  }
}

.setting-item + .setting-item {
  margin-top: 10px;
}

.setting-item + .el-button {
  margin-top: 10px;
}

.wallet-settings {
  width: 760px;
}

.invite-settings {
  width: 760px;
}

.operating-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 10px;
}
</style>
