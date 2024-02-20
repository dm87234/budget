<script setup>
// import { ref } from 'vue'
import addBtn from '@/components/addBtn.vue'
import myCalendar from './components/myCalendar.vue'
const onEdit = (scope) => {
  console.log(scope)
}
const tableData = [
  {
    date: '2016-05-03',
    category: '薪資',
    money: '12,000',
    memo: '3月份薪水'
  }
]
</script>

<template>
  <div class="homeContainer m50">
    <myCalendar></myCalendar>
    <addBtn>新增一筆</addBtn>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column
        prop="category"
        label="類別"
        width="180"
      ></el-table-column>
      <el-table-column prop="money" label="金額"></el-table-column>
      <el-table-column prop="memo" label="備註"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="success" @click="onEdit(scope)"
            >編輯</el-button
          >
          <el-button size="small" type="danger">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.homeContainer {
  margin: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .addCateBtnContainer {
    margin-top: 10px;
  }
}
</style>
