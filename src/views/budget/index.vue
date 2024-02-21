<script setup>
import budgetCateItem from './components/budgetCateItem.vue'
import { ref } from 'vue'
const monthlyBudget = ref('20,000')
const isEditTotalBudget = ref(false)
const isDisabled = ref(true)
const inp = ref(null)

const onTotalBudgetEdit = () => {
  isDisabled.value = false
  isEditTotalBudget.value = true
  inp.value.focus()
}
const onTotalBudgetOk = () => {
  isDisabled.value = true
  isEditTotalBudget.value = false
}

// 假數據
const cateBudgetList = [
  {
    id: '0001',
    icon: '🎃',
    cateName: '飲食',
    cateBudget: 8000,
    cost: 200
  },
  {
    id: '0002',
    icon: '😭',
    cateName: '娛樂',
    cateBudget: 5000,
    cost: 2400
  }
]
</script>

<template>
  <div class="budgetContainer m50">
    <!-- 月份選擇 -->
    <!-- 總預算 -->
    <el-card shadow="never">
      <div class="left">
        <el-progress
          type="circle"
          :percentage="80"
          color="#2ED573"
          stroke-width="12"
        >
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
          </template>
        </el-progress>
      </div>
      <div class="right">
        <el-form :model="form">
          <el-form-item label="預算">
            <el-input
              ref="inp"
              v-model="monthlyBudget"
              v-bind:readonly="isDisabled"
              size="large"
              style="width: 200px; font-size: 20px"
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
          <el-descriptions-item label="支出"> 2000 </el-descriptions-item>
          <el-descriptions-item label="剩餘"> 2000 </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <!-- 類別預算 -->
    <div class="budgetCateContainer">
      <budgetCateItem
        v-for="item in cateBudgetList"
        :key="item.id"
        :message="item"
      >
        <template #icon>{{ item.icon }}</template>
        <template #cateBudget>{{ item.cateBudget }}</template>
        <template #cateName>{{ item.cateName }}</template>
        <template #remains>{{ item.cateBudget - item.cost }}</template>
        <template #cost>{{ item.cost }}</template>
        <template #progress>
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="
              parseInt(((item.cateBudget - item.cost) / item.cateBudget) * 100)
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
  .budgetCateContainer {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
  }
}
</style>
