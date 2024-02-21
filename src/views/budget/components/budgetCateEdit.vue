<script setup>
import { ref } from 'vue'
const isBudgetCateEdit = ref(false)
const input = ref(8000)
const onBudgetCateEdit = () => {
  isBudgetCateEdit.value = true
}
const onBudgetCateOk = () => {
  isBudgetCateEdit.value = false
}
</script>
<template>
  <div>
    <span v-if="!isBudgetCateEdit">
      <slot name="cateBudget"></slot>
    </span>
    <el-input v-else v-model="input" style="width: 120px; font-size: 16px" />
    <font-awesome-icon
      v-if="!isBudgetCateEdit"
      :icon="['fas', 'pencil']"
      @click="onBudgetCateEdit"
    />
    <font-awesome-icon
      v-else
      :icon="['fas', 'circle-check']"
      @click="onBudgetCateOk"
    />
  </div>
</template>
