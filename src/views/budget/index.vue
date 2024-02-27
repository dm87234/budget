<script setup>
import { onMounted, ref } from 'vue'
import budgetCateItem from './components/budgetCateItem.vue'
import selectMonth from '@/components/selectMonth.vue'
import { ElMessage } from 'element-plus'
import { formatMoney } from '@/utils/moneyFormat'
// API
import {
  getTotalBudgetAPI,
  addTotalBudgetAPI,
  updateTotalBudgetAPI,
  getCateBudgetAPI
} from '@/api/budget'

const monthlyBudget = ref(0)
const isEditTotalBudget = ref(false)
const isDisabled = ref(true)
const inp = ref(null)

const month = ref(null) //子組件曝露出來的
const TotalBudgetList = ref([])
const cateBudgetList = ref([])
const propsYear = ref()
const propsMonth = ref()
const monthlyTotalCost = ref(0)
const allCateTotalCost = ref(0)
const percentage = ref(0)

// 金額校驗的正則
const isMoneyOk = /^[1-9]\d*$/

// 編輯總預算
const onTotalBudgetEdit = () => {
  isDisabled.value = false
  isEditTotalBudget.value = true
  inp.value.focus()
}
const onTotalBudgetOk = async () => {
  if (!isMoneyOk.test(monthlyBudget.value)) {
    return ElMessage.error('金額只能是正整數')
  }
  if (TotalBudgetList.value.length === 0) {
    await addTotalBudgetAPI({
      totalBudget: monthlyBudget.value,
      budgetYear: month.value.currentYear,
      budgetMonth: month.value.exposeMonth
    })
  } else {
    if (!monthlyBudget.value) {
      monthlyBudget.value = 0
    }
    await updateTotalBudgetAPI({
      totalBudget: monthlyBudget.value,
      id: TotalBudgetList.value[0].id
    })
  }
  isDisabled.value = true
  isEditTotalBudget.value = false
  getTotalBudget()
  getCateBudget()
}

//---- 發請求區----
const getTotalBudget = async () => {
  propsYear.value = month.value.currentYear.toString()
  propsMonth.value = month.value.exposeMonth.toString()
  const {
    data: { data }
  } = await getTotalBudgetAPI(month.value.currentYear, month.value.exposeMonth)
  // console.log(data)
  if (data.length > 0) {
    TotalBudgetList.value = data
    monthlyBudget.value = TotalBudgetList.value[0].totalBudget
  }
}

const getCateBudget = async () => {
  const { data } = await getCateBudgetAPI(
    month.value.currentYear,
    month.value.exposeMonth
  )
  cateBudgetList.value = data.data
  monthlyTotalCost.value = cateBudgetList.value.reduce((sum, item) => {
    return sum + item.totalSum
  }, 0)
  allCateTotalCost.value = cateBudgetList.value.reduce((sum, item) => {
    return sum + item.budget
  }, 0)
  percentage.value = parseInt(
    ((monthlyBudget.value - monthlyTotalCost.value) / monthlyBudget.value) * 100
  )
  if (percentage.value < 0) {
    percentage.value = 0
  }
}
// ---------------

const onSuccess = () => {
  getCateBudget()
}

const onChangeMonth = () => {
  getTotalBudget()
  getCateBudget()
}

onMounted(() => {
  getTotalBudget()
  getCateBudget()
})
</script>

<template>
  <div class="budgetContainer m50">
    <!-- 月份選擇 -->
    <selectMonth ref="month" @changeMonth="onChangeMonth"></selectMonth>
    <!-- 總預算 -->
    <el-card shadow="never">
      <div class="left">
        <el-progress
          type="circle"
          :percentage="percentage"
          color="#2ED573"
          stroke-width="12"
        >
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
          </template>
        </el-progress>
      </div>
      <div class="right">
        <el-form>
          <el-form-item label="本月總預算">
            <el-input
              ref="inp"
              v-model="monthlyBudget"
              maxlength="9"
              v-bind:readonly="isDisabled"
              size="large"
              style="width: 200px; font-size: 20px"
              :formatter="
                (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              "
              :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            />
            <font-awesome-icon
              v-if="!isEditTotalBudget"
              :icon="['fas', 'pencil']"
              @click="onTotalBudgetEdit"
            />
            <font-awesome-icon
              v-else
              :icon="['fas', 'circle-check']"
              @click="onTotalBudgetOk"
            />
          </el-form-item>
        </el-form>
        <el-descriptions column="1">
          <el-descriptions-item label="本月總支出">
            {{ formatMoney(monthlyTotalCost) }}
          </el-descriptions-item>
          <el-descriptions-item label="剩餘">
            {{ formatMoney(monthlyBudget - monthlyTotalCost) }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <div class="notice">
      <div>各類別預算</div>
      <div :class="{ danger: monthlyBudget - allCateTotalCost < 0 }">
        待分配預算:
        {{
          monthlyBudget - allCateTotalCost < 0
            ? '各類別預算總和已超過本月總預算!!'
            : formatMoney(monthlyBudget - allCateTotalCost)
        }}
      </div>
    </div>
    <!-- 類別預算 -->
    <div class="budgetCateContainer">
      <budgetCateItem
        v-for="item in cateBudgetList"
        :key="item.id"
        :cateItem="item"
        :year="propsYear"
        :month="propsMonth"
        @success="onSuccess"
      >
        <template #icon>{{ item.categoryPic }}</template>
        <template #cateBudget>{{
          item.budget ? formatMoney(item.budget) : '---'
        }}</template>
        <template #cateName>{{ item.categoryName }}</template>
        <template #remains>{{
          item.budget ? formatMoney(item.budget - item.totalSum) : '---'
        }}</template>
        <template #cost>{{
          item.totalSum ? formatMoney(item.totalSum) : 0
        }}</template>
        <template #progress>
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="
              isNaN(
                parseInt(((item.budget - item.totalSum) / item.budget) * 100)
              ) ||
              parseInt(((item.budget - item.totalSum) / item.budget) * 100) < 0
                ? 0
                : parseInt(((item.budget - item.totalSum) / item.budget) * 100)
            "
          />
        </template>
      </budgetCateItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.budgetContainer {
  .percentage-value {
    font-size: 28px;
  }
  :deep(.el-card__body) {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  :deep(.el-descriptions__cell) {
    font-size: 20px;
  }
  :deep(.el-form-item__label) {
    font-size: 20px;
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: white;
  }
  .fa-circle-check,
  .fa-pencil {
    position: absolute;
    top: 10px;
    right: 5px;
    font-size: 20px;
    cursor: pointer;
  }
  .fa-pencil {
    color: #576955;
  }
  .fa-circle-check {
    color: #ff2d2d;
  }
  .notice {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    .danger {
      color: #ff2d2d;
    }
  }
  .budgetCateContainer {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
  }
}
</style>
