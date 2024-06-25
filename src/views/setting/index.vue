<template>
  <div class="page-wrapper">
    <el-tabs tab-position="left">
      <el-tab-pane label="基础配置">
        <div class="points-settings">
          <div class="setting-item">
            <div class="setting-title">注册拉新开始时间</div>
            <div class="setting-val">
              <el-date-picker
                class="public-input"
                style="width: 300px"
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="points.regCountdownTime"
                type="datetime"
                placeholder="Select time"
              />
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>下级佣金比例</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="下级消费后给上级返佣的基础比例，本质上是流水*流水佣金比例*"
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
                placeholder="输入下级佣金比例"
                v-model="points.downCommissionRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>下级空投积分额外比例</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="成功邀请后下级给上级返的积分比例"
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
                placeholder="输入下级空投积分额外比例"
                v-model="points.downPointRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>消费积分系数</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="消费产生积分的系数，现在好像没用了"
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
                placeholder="输入消费积分系数"
                v-model="points.consumePointRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>流水佣金比例</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="与下级佣金比例搭配，此处含义其实就是庄家优势"
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
                placeholder="输入流水佣金比率"
                v-model="points.flowCommissionRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>联系客服名称</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="提款限制时弹窗显示的客服名称"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 300px"
                placeholder="输入联系客服名称"
                v-model="points.customerName"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>联系客服链接</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="提款限制和余额界面联系客服的链接"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 300px"
                placeholder="输入客服链接"
                v-model="points.customerLink"
                clearable
              >
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>landingPage跳转链接</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="从landingpage注册后自动跳转的页面"
                placement="top-start"
              >
                <i class="el-icon-warning-outline"></i>
              </el-tooltip>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 300px"
                placeholder="输入landingPage跳转链接"
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
            >确认修改</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="提款配置">
        <div class="withdrawal-settings">
          <!-- <div class="setting-item">
        <div class="setting-title">代币提现手续费</div>
        <div class="setting-val">
          <el-input
            class="public-input"
            type="number"
            style="width: 300px"
            placeholder="输入代币提现手续费"
            v-model="withdrawals.withdrawalFees"
            clearable
          >
            <template slot="append">{{ coin }}</template>
          </el-input>
        </div>
      </div> -->
          <div class="setting-item">
            <div class="setting-title">
              <span>最低提款金额</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里设置最低提款金额，必须高于此金额且高于GAS费才能提款，0为不限制"
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
                placeholder="输入最低提款金额"
                v-model="withdrawals.minWithdrawal"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">pvp充值限制</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="输入pvp充值限制"
                v-model="withdrawals.pvpThresholds"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>自动审核流水阈值</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="用户总消费大于此数据时才会触发下面的审核阈值进入自动审核阶段"
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
                placeholder="输入自动审核流水阈值"
                v-model="withdrawals.auditFlowThresholds"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>激活返佣阈值</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="存款大于此金额的下级才会给上级返佣"
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
                placeholder="输入激活返佣阈值"
                v-model="withdrawals.activateRebateThreshold"
                clearable
              >
                <template slot="append">{{ "USDT" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>NFT提现手续费</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="NFT提款收取的固定手续费金额，实际前台会换算成USDT进行扣款"
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
                placeholder="输入NFT提现手续费"
                v-model="withdrawals.nftWithdrawalFees"
                clearable
              >
                <template slot="append">{{ "ETH" }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>提币免费次数</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="此处设置玩家有几次不扣gas费提款的机会"
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
                placeholder="输入下浮汇率"
                v-model="withdrawals.freeFeeCoinNumber"
                clearable
              >
                <template slot="append">次</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>单次审核阈值</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="单次提款小于此数值时无需审核自动通过"
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
                placeholder="输入审核阈值"
                v-model="withdrawals.auditThresholds"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>累计审核阈值</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="用户提款的限制，即无、每天、每周还是每月共能提多少"
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
                placeholder="输入提现总量"
                v-model="withdrawals.withdrawalLimits"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
              <el-select
                style="width: 200px"
                v-model="withdrawals.withdrawalDayLimits"
                class="public-select-box"
                placeholder="选择时段"
              >
                <el-option label="每日" :value="1" />
                <el-option label="每周" :value="7" />
                <el-option label="每月" :value="30" />
              </el-select>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>闪兑入金上浮比例</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里就是闪兑差额配置，上浮好像没用了"
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
                placeholder="输入上浮汇率"
                v-model="withdrawals.upRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">闪兑出金下浮比例</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="输入下浮汇率"
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
            >确认修改</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="NFT&一元购配置">
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>外部NFT回收比例</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里就是设置所有盲盒内除平台NFT外的所有NFT的回收价值比率"
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
                placeholder="输入回收比例"
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
            >确认修改</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>一元购服务费</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里设置的一元购服务费"
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
                placeholder="输入服务费"
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
            >确认修改</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>一元购溢价上限</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里设置的是限制eth一元购最大超出eth本身价值的比例"
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
                placeholder="输入一元购溢价上限"
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
            >确认修改</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>一元购NFT天数上限</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="决定用户挂单NFT一元购最多可以选择多少天"
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
                placeholder="输入NFT天数上限"
                v-model="ticketNftDays"
                clearable
              >
                <template slot="append">天</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitTicketNftDays()"
            >确认修改</el-button
          >
        </div>
        <div class="recycling-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>一元购币种天数上限</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="决定用户挂单ETH一元购最多可以选择多少天"
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
                placeholder="输入一元购币种天数上限"
                v-model="ticketCoinDays"
                clearable
              >
                <template slot="append">天</template>
              </el-input>
            </div>
          </div>
          <el-button
            type="primary"
            style="width: 160px"
            size="medium"
            @click="submitTicketCoinDays()"
            >确认修改</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="Token War配置">
        <div class="withdrawal-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>最低消费</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="限制tokenwar最低消费金额，即首次消费金额"
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
                placeholder="输入最低消费"
                v-model="battle.lowPriceLimit"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>票单价</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="限制tokenwar最低每次投入金额"
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
                placeholder="输入票单价"
                v-model="battle.singlePrice"
                clearable
              >
                <template slot="append">{{ coin }}</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>手续费</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="tokenwar手续费比例"
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
                placeholder="输入手续费"
                v-model="battle.fee"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>单局时长</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里设置货币战争每一局单局时长"
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
                placeholder="输入单局时长"
                v-model="battle.singleTime"
                clearable
              >
                <template slot="append">秒</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>加速人数</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里设置货币战争参与人数达到多少时进入加速倒计时"
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
                placeholder="输入加速人数"
                v-model="battle.fastLimitNumber"
                clearable
              >
                <template slot="append">人</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>购票延时</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这个时间决定加速倒计时的初始时长，以及新消费延时长度"
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
                placeholder="输入购票延时"
                v-model="battle.ticketPurchaseDelay"
                clearable
              >
                <template slot="append">s</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>大奖投入比</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里决定每一轮的流水有多少将进入大奖奖池"
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
                placeholder="输入大奖投入比"
                v-model="battle.awardInvestmentRatio"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">
              <span>大奖触发金额</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里决定大奖奖池积累到什么程度后进入endwar"
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
                placeholder="输入大奖触发金额"
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
            >确认修改</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="充值活动配置">
        <div class="wallet-settings">
          <div class="setting-item">
            <div class="setting-title">
              <span>Token War流水记录比率</span>
              <el-tooltip
                class="item"
                effect="dark"
                content="这里三个值决定的是这三个游戏在参加充值送金活动中计算有效流水的比例"
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
                placeholder="输入Token War流水记录比率"
                v-model="gameRatesData.tokenWarFlowRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">盲盒流水记录比率</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="输入盲盒流水记录比率"
                v-model="gameRatesData.boxFlowRate"
                clearable
              >
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
          <div class="setting-item">
            <div class="setting-title">一元购流水记录比率</div>
            <div class="setting-val">
              <el-input
                class="public-input"
                type="number"
                style="width: 300px"
                placeholder="输入一元购流水记录比率"
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
            >确认修改</el-button
          >
        </div>
      </el-tab-pane>
      <el-tab-pane label="归集钱包配置">
        <div class="wallet-settings">
          <div class="operating-box">
            <span>归集钱包设置</span>
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
              label="钱包类型"
              align="center"
              key="1"
            >
            </el-table-column>
            <el-table-column
              prop="walletAddress"
              width="320"
              label="钱包地址"
              align="center"
              key="2"
            >
            </el-table-column>
            <el-table-column
              prop="flowId"
              width="200"
              label="余额"
              align="center"
              key="3"
            >
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in scope.row.innetWalletList"
                  :key="index"
                >
                  {{ `${item.coin}:${item.assetBalance}` }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="walletStatus"
              width="100"
              label="激活状态"
              align="center"
              key="43"
            >
              <template slot-scope="scope">
                <span
                  style="color: #04b000"
                  v-if="scope.row.walletStatus == 'NORMAL'"
                >
                  已激活
                </span>
                <span style="color: red" v-else> 未激活 </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" key="5" fixed="right">
              <template slot-scope="scope">
                <span
                  class="blueColor publick-button cursor"
                  @click="walletActive(scope.row)"
                >
                  激活
                </span>
                <span
                  class="blueColor publick-button cursor"
                  @click="walletDel(scope.row)"
                >
                  删除
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
      <el-tab-pane label="邀请文本配置">
        <div class="invite-settings">
          <div
            class="setting-item"
            v-for="(item, index) in inviteList"
            :key="index"
          >
            <div class="setting-title">
              <span v-if="index == 0">邀请文本</span>
            </div>
            <div class="setting-val">
              <el-input
                class="public-input"
                style="width: 100%"
                placeholder="输入邀请文本（单行）"
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
            >确认修改</el-button
          >
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-if="showDialog"
      title="新增归集钱包"
      :visible.sync="showDialog"
      width="440px"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="ruleForm" class="add-form" label-width="80px">
        <el-form-item label="钱包类型" prop="reclaimRate">
          <el-select
            style="width: 300px"
            v-model="walletAddrType"
            placeholder="选择钱包类型"
          >
            <el-option label="EVM" value="EVM" />
            <el-option label="TRON" value="TRON" />
          </el-select>
        </el-form-item>
        <el-form-item label="钱包地址" prop="reclaimRate">
          <el-input
            v-model="walletAddr"
            style="width: 300px"
            placeholder="请输入钱包地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
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
        this.$message.success("操作成功");
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
          downPointRate: new bigNumber(res.downPointRate)
            .multipliedBy(100)
            .toFixed(2), //下级积分比例
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
        this.$message.error("积分配置相关参数不完整，请补充完整后重试");
        return;
      }

      const res = await this.$http.pointConfigSet({
        ...this.points,
        downCommissionRate: accurateDecimal(
          new bigNumber(downCommissionRate).dividedBy(100),
          4
        ), //下级佣金比例
        downPointRate: accurateDecimal(
          new bigNumber(downPointRate).dividedBy(100),
          4
        ), //下级积分比例
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
        this.$message.success("操作成功");
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
        this.$message.success("操作成功");
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
        this.$message.error("NFT回收配置相关参数不完整，请补充完整后重试");
        return;
      }

      const res = await this.$http.recycleConfigSet({
        nftReclaimRate: accurateDecimal(
          new bigNumber(nftReclaimRate).dividedBy(100),
          4
        ),
      });

      if (res) {
        this.fetchRecycleConfig();
        this.$message.success("操作成功");
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
        this.$message.error("请输入一元购服务费");
        return;
      }

      const res = await this.$http.updateServiceCharge({
        servicePrice: accurateDecimal(
          new bigNumber(serviceFee).dividedBy(100),
          4
        ),
      });

      if (res) {
        this.fetchServiceCharge();
        this.$message.success("操作成功");
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
        this.$message.error("请输入一元购溢价上限");
        return;
      }

      const res = await this.$http.updateTicketExceeding({
        servicePrice: accurateDecimal(
          new bigNumber(ticketExceeding).dividedBy(100),
          4
        ),
      });

      if (res) {
        this.fetchTicketExceeding();
        this.$message.success("操作成功");
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
        this.$message.error("请输入一元购NFT天数上限");
        return;
      }

      const res = await this.$http.updateTicketNftDays({
        day: Math.floor(ticketNftDays),
      });

      if (res) {
        this.fetchTicketNftDays();
        this.$message.success("操作成功");
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
        this.$message.error("请输入一元购NFT天数上限");
        return;
      }

      const res = await this.$http.updateTicketCoinDays({
        day: Math.floor(ticketCoinDays),
      });

      if (res) {
        this.fetchTicketCoinDays();
        this.$message.success("操作成功");
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
        this.$message.error("战争配置相关参数不完整，请补充完整后重试");
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
        this.$message.success("操作成功");
      }
    },
    // 新增归集钱包
    async submitForm() {
      if (!this.walletAddr) {
        this.$message.error("请输入归集钱包地址");
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
        this.$message.success("操作成功");
      }
    },
    //激活钱包
    walletActive(row) {
      this.$confirm(`确定要激活钱包『${row.walletAddress}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          const res = await this.$http.systemWalletActive({
            id: row.id,
          });
          if (res) {
            this.fetchSystemWalletList();
            this.$message.success("操作成功");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    //删除钱包
    walletDel(row) {
      this.$confirm(`确定要删除钱包『${row.walletAddress}』吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          const res = await this.$http.systemWalletDel({
            id: row.id,
          });
          if (res) {
            this.fetchSystemWalletList();
            this.$message.success("操作成功");
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
        this.$message.error("请输入邀请文本");
        return;
      }

      const res = await this.$http.inviteSet({
        inviteText: invites,
      });

      if (res) {
        this.fetchInviteSetting();
        this.$message.success("操作成功");
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
