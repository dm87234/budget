<script setup>
import { ref } from 'vue'

const currentYear = ref(0)
const currentMonth = ref(0)
const exposeMonth = ref(0)

const emit = defineEmits(['changeMonth'])

// 获取当前日期
const getCurrentDate = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  return {
    year,
    month
  }
}
// 初始化日历
const initCalendar = () => {
  const { year, month } = getCurrentDate()
  currentYear.value = year
  currentMonth.value = month
}

// 上个月
const preMonth = () => {
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
  exposeMonth.value =
    currentMonth.value < 10 ? '0' + currentMonth.value : currentMonth.value
  emit('changeMonth', exposeMonth.value, currentYear.value)
}

// 下一月
const nextMonth = () => {
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
  exposeMonth.value =
    currentMonth.value < 10 ? '0' + currentMonth.value : currentMonth.value
  emit('changeMonth', exposeMonth.value, currentYear.value)
}

// 格式化要曝露出去的月
const monthFormat = () => {
  exposeMonth.value =
    currentMonth.value < 10 ? '0' + currentMonth.value : currentMonth.value
}

initCalendar()
monthFormat()
defineExpose({
  exposeMonth,
  currentYear
})
</script>
<template>
  <div class="selectMonthBox">
    <el-card shadow="never">
      <div class="changeMonthBtn" @click="preMonth()">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <div class="date">{{ currentYear }}年{{ currentMonth }}月</div>
      <div class="changeMonthBtn" @click="nextMonth()">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped>
.selectMonthBox {
  margin-bottom: 20px;
  font-size: 30px;
  .changeMonthBtn {
    cursor: pointer;
  }
}
</style>
