<script setup>
import { ref } from 'vue'
// 點選的日期
let pickDateValue = ref(0)
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
      cost: false
    })
  }
  currentMonthDay.value.forEach((item) => {
    for (let i = 0; i < holiday.length; i++) {
      if (item.date === holiday[i].date) {
        item.isholiday = true
      }
    }
    for (let i = 0; i < incomeDate.length; i++) {
      if (item.date === incomeDate[i].date) {
        item.income = true
      }
    }
    for (let i = 0; i < costDate.length; i++) {
      if (item.date === costDate[i].date) {
        item.cost = true
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
  pickDateValue.value = date
  if (currentMonth.value === 1) {
    currentMonth.value = 12
    currentYear.value--
  } else {
    currentMonth.value--
  }
  calculateDays()
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
  calculateDays()
}

const pickDate = (date) => {
  pickDateValue.value = date
  console.log(date)
}

const holiday = [
  {
    date: '20240219',
    year: '2024',
    name: '中華民國開國紀念日',
    isholiday: '是',
    holidaycategory: '放假之紀念日及節日',
    description: '全國各機關學校放假一日。'
  },
  {
    date: '20240228',
    year: '2024',
    name: null,
    isholiday: '是',
    holidaycategory: '調整放假日',
    description: null
  }
]
const incomeDate = [{ date: '20240203' }, { date: '20240220' }]
const costDate = [
  { date: '20240203' },
  { date: '20240220' },
  { date: '20240229' }
]
initCalendar()
</script>

<template>
  <div class="calendarContainer">
    <!-- 月份切換 -->
    <div class="toolbar">
      <div class="changeMonthBtn" @click="preMonth">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </div>
      <div class="date">{{ currentYear }}年{{ currentMonth }}月</div>
      <div class="changeMonthBtn" @click="nextMonth">
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
          <div class="income" v-if="item.income"></div>
          <div class="cost" v-if="item.cost"></div>
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

  .toolbar {
    display: flex;
    // outline: 1px solid violet;
    font-size: 30px;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    .changeMonthBtn {
      cursor: pointer;
    }
  }

  .calendarBox {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-family: Arial, Helvetica, sans-serif;
    // div {
    //   border: 1px solid #e7e8ea;
    // }
    .weekday {
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #e7e8ea;
      border-bottom: 1px solid #e7e8ea;
      border-right: 1px solid #e7e8ea;
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
      height: 50px;
      padding-top: 7px;
      text-align: center;
      border-bottom: 1px solid #e7e8ea;
      border-right: 1px solid #e7e8ea;
      &:nth-last-child(-n + 7) {
        border-bottom: none;
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
        top: 0px;
        left: 35px;
        background: #36589d;
        opacity: 0.9;
        z-index: -1;
      }
    }
    div:nth-of-type(7n) {
      border-right: none;
    }
    .notThisMonth {
      background: #fafafa;
    }
    .records {
      height: 20px;
      display: flex;
      gap: 5px;
      justify-content: center;
      align-items: center;
      .income {
        width: 5px;
        height: 5px;
        background: #ffb428;
        border-radius: 50%;
      }
      .cost {
        width: 5px;
        height: 5px;
        background: #178800;
        border-radius: 50%;
      }
    }
  }
}
</style>
