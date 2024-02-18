<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue'
const setBarChart = () => {
  const chart1 = echarts.init(document.getElementById('main'))
  const chart1Opt = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }
  chart1.setOption(chart1Opt)
}

onMounted(() => {
  setBarChart()
})
</script>

<template>
  <el-tabs type="border-card">
    <el-tab-pane label="收支趨勢">
      <div class="chartWrapper">
        <!-- 月份選擇 -->
        <div id="main"></div>
        <div class="totalWrapper">
          <div class="totalBox">
            <div>收入</div>
            <div>30,000</div>
          </div>
          <div class="totalBox">
            <div>支出</div>
            <div>30,000</div>
          </div>
          <div class="totalBox">
            <div>收支差</div>
            <div>30,000</div>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="支出類別比"></el-tab-pane>
    <el-tab-pane label="收入類別比"></el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
.chartWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 50px;
  #main {
    width: 800px;
    height: 400px;
    display: flex;
    justify-content: center;
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
</style>
