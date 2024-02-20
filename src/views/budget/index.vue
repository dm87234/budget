<script setup>
import budgetCateItem from './components/budgetCateItem.vue'
import { ref } from 'vue'
const monthlyBudget = ref('20,000')
const isEditTotalBudget = ref(false)
const isDisabled = ref(true)

const onTotalBudgetEdit = async () => {
  isDisabled.value = false
  isEditTotalBudget.value = true
}
const onTotalBudgetOk = () => {
  isDisabled.value = true
  isEditTotalBudget.value = false
}
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
              v-bind:disabled="isDisabled"
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
      <budgetCateItem v-for="(item, index) in 4" :key="index"></budgetCateItem>
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
