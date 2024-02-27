<script setup>
import { ref, onMounted, computed } from 'vue'
import { getMonthlyRecordsAPI } from '@/api/records'
import { formatMoney } from '@/utils/moneyFormat'

// 點選的日期
let pickDateValue = ref()
// 星期的數組
const header = ref(['一', '二', '三', '四', '五', '六', '日'])
// 上个月剩余天数
const lastMonthSurplusDay = ref(0)
const lastMonthSurplusDayArray = ref([])
// 下个月剩余天数
const nextMonthSurplusDay = ref(0)
const nextMonthSurplusDayArray = ref([])

// 当前月份总天数
const currentMonthDayCount = ref(0)
const currentYear = ref(0)
const currentMonth = ref(0)
const currentDate = ref(0)

const currentMonthDay = ref([])

// 获取这个月1号的星期数
const getMonthFirstDay = (year, month) => {
  return new Date(year, month - 1, 1).getDay()
}

// 获取当前日期
const getCurrentDate = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  return {
    year,
    month,
    date
  }
}

// 闰年
const leapMonthDay = ref([31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
// 平年
const normalMonthDay = ref([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
// 是否为闰年
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

// 计算日期
const calculateDays = () => {
  const { year, month, date } = getCurrentDate()
  if (currentYear.value === year && currentMonth.value === month) {
    currentDate.value = date
  } else {
    currentDate.value = ''
  }
  // 获取本月第一天星期几(星期几就补多少个空)
  lastMonthSurplusDay.value =
    getMonthFirstDay(currentYear.value, currentMonth.value) === 0
      ? 6
      : getMonthFirstDay(currentYear.value, currentMonth.value) - 1
  // 获取当前月有多少天
  currentMonthDayCount.value = isLeapYear(currentYear.value)
    ? leapMonthDay.value[currentMonth.value - 1]
    : normalMonthDay.value[currentMonth.value - 1]

  // 拼接數組
  currentMonthDay.value = []
  const incomeDate = computed(() => {
    return MonthlyRecords.value
      .filter((item) => item.statusCode === '1')
      .map(
        (item) =>
          item.costYear + item.costMonth + item.costDate + '$' + item.money
      )
  })
  const costDate = computed(() => {
    return MonthlyRecords.value
      .filter((item) => item.statusCode === '0')
      .map(
        (item) =>
          item.costYear + item.costMonth + item.costDate + '$' + item.money
      )
  })
  // console.log(costDate)
  let yearStr = currentYear.value.toString()
  let MonthStr =
    currentMonth.value < 10
      ? '0' + currentMonth.value.toString()
      : currentMonth.value.toString()
  for (let i = 0; i < currentMonthDayCount.value; i++) {
    let dateStr = i + 1 < 10 ? '0' + (i + 1).toString() : (i + 1).toString()
    let itemStr = yearStr + MonthStr + dateStr
    currentMonthDay.value.push({
      date: itemStr,
      isholiday: false,
      income: false,
      cost: false,
      incomeTotal: 0,
      costTotal: 0
    })
  }
  // console.log(currentMonthDay.value)
  currentMonthDay.value.forEach((item) => {
    for (let i = 0; i < holiday.length; i++) {
      if (item.date === holiday[i].date) {
        item.isholiday = true
      }
    }
    for (let i = 0; i < incomeDate.value.length; i++) {
      if (item.date === incomeDate.value[i].substring(0, 8)) {
        item.income = true
        let money = +incomeDate.value[i].substring(9)
        item.incomeTotal += money
      }
    }
    for (let i = 0; i < costDate.value.length; i++) {
      if (item.date === costDate.value[i].substring(0, 8)) {
        item.cost = true
        let money = +costDate.value[i].substring(9)
        item.costTotal += money
      }
    }
  })
  // console.log(currentMonthDay.value)

  // 上個月要補幾天
  let prevMonthLastDate = 0
  if (currentMonth.value === 1) {
    // 当前是1月还要用去年的去判断
    prevMonthLastDate = isLeapYear(currentYear.value - 1)
      ? leapMonthDay.value[leapMonthDay.value.length - 1]
      : normalMonthDay.value[normalMonthDay.value.length - 1]
  } else {
    prevMonthLastDate = isLeapYear(currentYear.value)
      ? leapMonthDay.value[currentMonth.value - 2]
      : normalMonthDay.value[currentMonth.value - 2]
  }
  // --------------

  // 下個月要補幾天
  nextMonthSurplusDay.value =
    42 - (lastMonthSurplusDay.value + currentMonthDayCount.value)
  const prevtemp = []
  const nexttemp = []
  for (
    let i = prevMonthLastDate - lastMonthSurplusDay.value + 1;
    i <= prevMonthLastDate;
    i++
  ) {
    prevtemp.push(i)
  }
  for (let i = 1; i <= nextMonthSurplusDay.value; i++) {
    nexttemp.push(i)
  }
  lastMonthSurplusDayArray.value = prevtemp
  nextMonthSurplusDayArray.value = nexttemp
}

// 初始化日历
const initCalendar = () => {
  const { year, month, date } = getCurrentDate()
  currentYear.value = year
  currentMonth.value = month
  currentDate.value = date
  calculateDays()
}

// 上个月
const preMonth = (date) => {
  // console.log(Boolean(date))
  pickDateValue.value = date
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
  if (date) {
    openDate.value = `${currentYear.value}-${currentMonth.value}-${date}`
    emit('pickedDate')
  }
  getMonthlyRecords()
  // calculateDays()
}

// 下一月
const nextMonth = (date) => {
  pickDateValue.value = date
  if (currentMonth.value === 12) {
    currentMonth.value = 1
    currentYear.value++
  } else {
    currentMonth.value++
  }
  if (date) {
    openDate.value = `${currentYear.value}-${currentMonth.value}-${date}`
    emit('pickedDate')
  }
  getMonthlyRecords()
}

let openDate = ref('')
const emit = defineEmits(['pickedDate'])
const pickDate = (date) => {
  pickDateValue.value = date
  openDate.value = `${currentYear.value}-${currentMonth.value}-${date}`
  emit('pickedDate')
}

// const incomeDate = [{ date: '20240203' }, { date: '20240220' }]

// 月收支紀錄
const MonthlyRecords = ref([])
const getMonthlyRecords = async () => {
  const {
    data: { data }
  } = await getMonthlyRecordsAPI()
  MonthlyRecords.value = data
  // console.log(MonthlyRecords.value)
  calculateDays()
}

const holiday = []
initCalendar()

onMounted(() => {
  openDate.value = `${currentYear.value}-${currentMonth.value}-${currentDate.value}`
})

getMonthlyRecords()
defineExpose({ openDate, getMonthlyRecords })
</script>

<template>
  <div class="calendarContainer">
    <!-- 月份切換 -->
    <div class="toolbar">
      <div class="changeMonthBtn" @click="preMonth()">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <div class="date">{{ currentYear }}年{{ currentMonth }}月</div>
      <div class="changeMonthBtn" @click="nextMonth()">
        <font-awesome-icon :icon="['fas', 'chevron-right']" />
      </div>
    </div>

    <!-- 日歷內容 -->
    <div class="calendarBox">
      <!-- 星期幾 -->
      <div v-for="(item, index) in header" :key="index" class="weekday">
        {{ item }}
      </div>
      <!-- 上個月補幾天 -->
      <div
        @click="preMonth(item)"
        v-for="(item, index) in lastMonthSurplusDayArray"
        :key="index"
        class="date notThisMonth"
        :class="{
          holiday: item.isholiday === true,
          pickDate: index + 1 === pickDateValue
        }"
      >
        {{ item }}
      </div>
      <!-- 這個月 -->
      <div
        @click="pickDate(index + 1)"
        v-for="(item, index) in currentMonthDay"
        :key="index"
        class="date"
        :class="{
          active: index + 1 === currentDate,
          holiday: item.isholiday === true,
          pickDate: index + 1 === pickDateValue
        }"
      >
        {{ index + 1 }}
        <div class="records" v-if="item.income || item.cost">
          <div class="income" v-if="item.income">
            <span>收入: </span>
            <span>{{ formatMoney(item.incomeTotal) }}</span>
          </div>
          <div class="cost" v-if="item.cost">
            <span>支出: </span>
            <span>{{ formatMoney(item.costTotal) }}</span>
          </div>
        </div>
      </div>
      <!-- 下個月補幾天 -->
      <div
        @click="nextMonth(item)"
        v-for="(item, index) in nextMonthSurplusDayArray"
        :key="index"
        class="date notThisMonth"
        :class="{
          holiday: item.isholiday === true,
          pickDate: index + 1 === pickDateValue
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.calendarContainer {
  width: 700px;
  margin: 0 auto;
  border: 1px solid #e7e8ea;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background: white;
  @include mobile {
    width: 95vw;
  }
  @include pad {
    width: 95vw;
  }

  .toolbar {
    display: flex;
    // outline: 1px solid violet;
    font-size: 30px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    @include mobile {
      font-size: 18px;
    }
    .changeMonthBtn {
      cursor: pointer;
    }
  }

  .calendarBox {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-family: Arial, Helvetica, sans-serif;
    .weekday {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e7e8ea;
      border-bottom: 1px solid #e7e8ea;
      border-right: 1px solid #e7e8ea;
      @include mobile {
        height: 25px;
      }
    }

    .holiday {
      color: red;
    }
    .pickDate {
      background: #afd;
    }
    .date {
      cursor: pointer;
      font-weight: bold;
      height: 60px;
      padding-top: 7px;
      text-align: center;
      border-bottom: 1px solid #e7e8ea;
      border-right: 1px solid #e7e8ea;
      &:nth-last-child(-n + 7) {
        border-bottom: none;
      }
      @include mobile {
        font-size: 14px;
        height: 75px;
      }
    }
    .active {
      color: white;
      position: relative;
      z-index: 5;
      &::after {
        content: '';
        display: block;
        width: 28px;
        height: 28px;
        position: absolute;
        border-radius: 50%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: #36589d;
        opacity: 0.9;
        z-index: -1;
        @include mobile {
          width: 24px;
          height: 24px;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    div:nth-of-type(7n) {
      border-right: none;
    }
    .notThisMonth {
      background: #fafafa;
    }
    .records {
      margin-top: 10px;
      padding-left: 5px;
      height: 20px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: flex-start;
      @include mobile {
        margin-top: 5px;
        padding: 0;
        align-items: center;
      }
      .income {
        font-size: 12px;
        color: #178800;
        @include mobile {
          display: flex;
          flex-direction: column;
        }
      }

      .cost {
        font-size: 12px;
        color: #f56c6c;
        @include mobile {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
