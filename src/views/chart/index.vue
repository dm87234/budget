<script setup>
import { ref, onMounted } from 'vue'
import selectMonth from '@/components/selectMonth.vue'
import * as echarts from 'echarts'
import {
  getMonthlyCostAPI,
  getMonthlyIncomeAPI,
  getBalanceAPI
} from '@/api/records'

const activeName = ref('first')

const month = ref(null)
const month2 = ref(null)
const monthlyCostList = ref()
const monthlyIncomeList = ref()
const costChart = ref(null)
const incomeChart = ref(null)
const balanceChart = ref(null)
let myChart = null
let myChart2 = null
let myChart3 = null
// const setPieChart = () => {
//   const costChart = echarts.init(document.getElementById('monthlyCost'))
//   const costChartOpt = {
//     // title: {
//     //   text: 'Referer of a Website',
//     //   left: 'center'
//     // },
//     tooltip: {
//       trigger: 'item'
//     },
//     legend: {
//       orient: 'vertical',
//       left: 'left'
//     },
//     series: [
//       {
//         name: 'Access From',
//         type: 'pie',
//         radius: '50%',
//         data: monthlyCostList.value,
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: 'rgba(0, 0, 0, 0.5)'
//           }
//         }
//       }
//     ]
//   }
//   costChart.setOption(costChartOpt)
// }

const getMonthlyCost = async () => {
  const { data } = await getMonthlyCostAPI(
    month.value.currentYear,
    month.value.exposeMonth
  )
  monthlyCostList.value = data.data
  if (myChart === null) {
    myChart = echarts.init(costChart.value)
  }
  myChart.showLoading({
    text: '加載中...',
    fontSize: 18,
    textColor: '#000',
    maskColor: 'rgb(255, 255, 255)',
    zlevel: 0
  })
  setTimeout(() => {
    let options = {
      // title: {
      //   text: 'Referer of a Website',
      //   left: 'center'
      // },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'center'
      },
      series: [
        {
          name: '支出類別',
          type: 'pie',
          radius: '70%',
          data: monthlyCostList.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart.hideLoading()
    myChart.setOption(options)
  }, 2000)
}

const getMonthlyIncome = async () => {
  const { data } = await getMonthlyIncomeAPI(
    month2.value.currentYear,
    month2.value.exposeMonth
  )
  monthlyIncomeList.value = data.data

  if (myChart2 === null) {
    myChart2 = echarts.init(incomeChart.value)
  }
  myChart2.showLoading({
    text: '加載中...',
    fontSize: 18,
    textColor: '#000',
    maskColor: 'rgb(255, 255, 255)',
    zlevel: 0
  })
  setTimeout(() => {
    let options = {
      // title: {
      //   text: 'Referer of a Website',
      //   left: 'center'
      // },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'center'
      },
      series: [
        {
          name: '收入類別',
          type: 'pie',
          radius: '70%',
          data: monthlyIncomeList.value,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart2.hideLoading()
    myChart2.setOption(options)
  }, 2000)
}

const getBalance = async () => {
  const {
    data: { data }
  } = await getBalanceAPI()
  let yearMonth = data.map((item) => `${item.costYear}/${item.costMonth}`)
  let totalIncome = data.map((item) => item.totalIncome)
  let totalCost = data.map((item) => item.totalExpense)
  let balance = data.map((item) => item.balance)
  myChart3 = echarts.init(balanceChart.value)
  myChart3.showLoading({
    text: '加載中...',
    fontSize: 18,
    textColor: '#000',
    maskColor: 'rgb(255, 255, 255)',
    zlevel: 0
  })
  setTimeout(() => {
    let options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['月結餘', '月支出', '月收入']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            show: false
          },
          data: yearMonth
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '月支出',
          type: 'bar',
          emphasis: {
            focus: 'series'
          },
          data: totalCost
        },
        {
          name: '月收入',
          type: 'bar',
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          data: totalIncome
        },
        {
          name: '月結餘',
          type: 'line',
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          data: balance
        }
      ]
    }
    myChart3.hideLoading()
    myChart3.setOption(options)
  }, 10)
}

const onChangeMonth = (statusCode) => {
  if (statusCode === 0) {
    getMonthlyCost()
  } else {
    getMonthlyIncome()
  }
}

onMounted(() => {
  getBalance()
  getMonthlyCost()
  getMonthlyIncome()
})
</script>

<template>
  <div class="chartContainer m50">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="收支趨勢" name="first">
        <div class="chartWrapper">
          <div id="balance" ref="balanceChart"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="支出類別比">
        <!-- 月份選擇 -->
        <selectMonth
          ref="month"
          @changeMonth="onChangeMonth(0, $event)"
        ></selectMonth>
        <div class="chartWrapper">
          <div id="monthlyCost" ref="costChart"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收入類別比">
        <!-- 月份選擇 -->
        <selectMonth
          ref="month2"
          @changeMonth="onChangeMonth(1, $event)"
        ></selectMonth>
        <div class="chartWrapper">
          <div id="monthlyIncome" ref="incomeChart"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.chartContainer {
  @include mobile {
    margin: 0;
  }
  @include pad {
    margin: 0;
  }
  :deep(.el-card__body) {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .chartWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // padding: 20px 50px;
    #monthlyCost {
      width: 600px;
      height: 500px;
      display: flex;
      justify-content: center;
      @include mobile {
        width: 350px;
        height: 90vh;
      }
    }
    #monthlyIncome {
      width: 600px;
      height: 500px;
      display: flex;
      justify-content: center;
      @include mobile {
        width: 350px;
        height: 90vh;
      }
    }
    #balance {
      width: 600px;
      height: 500px;
      display: flex;
      justify-content: center;
      @include mobile {
        width: 350px;
        height: 90vh;
      }
    }
    .totalWrapper {
      width: 100%;
      height: 80px;
      display: flex;
      gap: 50px;
      justify-content: center;
      .totalBox {
        width: 200px;
        background: #2ed573;
        color: white;
        padding: 15px 20px;
        font-size: 20px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        &:nth-child(1) {
          background: #2ed573;
        }
        &:nth-child(2) {
          background: #ff7f50;
        }
        &:nth-child(3) {
          background: #3742fa;
        }
      }
    }
  }
}
</style>
