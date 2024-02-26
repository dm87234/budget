<script setup>
import { ref } from 'vue'
import addBtn from '@/components/addBtn.vue'
import myCalendar from './components/myCalendar.vue'
import editRecord from './components/editRecord.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatDate, formatToday } from '@/utils/dateFormat'
import { formatMoney } from '@/utils/moneyFormat'
// API
import { getRecordsAPI, deleteRecordAPI } from '@/api/records'
import { getCateListAPI } from '@/api/category'
// Store
import { useCateStore } from '@/stores/modules/catrgory'

const CateStore = useCateStore()

// 儲存紀錄的數組
const allRecords = ref([])
const calendar = ref(null)
const today = formatToday
const pickDate = ref('')

// 分類資料
const cateList = ref([])

// 新增與編輯
const dialog = ref(null)
const EditRecord = (item) => {
  dialog.value.open(calendar.value.openDate, item)
}

// 刪除
const onDelRecord = (id) => {
  ElMessageBox.confirm('確定要刪除此類別嗎?', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const { data } = await deleteRecordAPI(id)
      if (data.status !== 0) {
        ElMessage.error('刪除失敗')
      }
      ElMessage.success('刪除成功')
      getAllRecords()
    })
    .catch(() => {})
}

//--- 發請求區 ---
const getAllRecords = async () => {
  pickDate.value = pickDate.value || today
  const { data } = await getRecordsAPI(pickDate.value)
  if (data.status !== 0) {
    return ElMessage.error('服務異常')
  }
  allRecords.value = data.data
}

const getCateList = async () => {
  const { data } = await getCateListAPI()
  if (data.status !== 0) {
    return ElMessage.error('服務異常')
  }
  CateStore.setCateList(data.data)
  cateList.value = data.data
}

const onSuccess = () => {
  getAllRecords()
  calendar.value.getMonthlyRecords()
}

const onPickDate = () => {
  pickDate.value = calendar.value.openDate
  // console.log(calendar.value.openDate)
  getAllRecords(pickDate.value)
}
// --------------

getAllRecords()
getCateList()
</script>

<template>
  <div class="homeContainer m50">
    <myCalendar ref="calendar" @pickedDate="onPickDate"></myCalendar>
    <addBtn @click="EditRecord({})">新增一筆</addBtn>
    <el-table :data="allRecords" stripe style="width: 100%">
      <el-table-column prop="completeDate" label="日期" width="180">
        <template #default="{ row }">
          {{ formatDate(row.completeDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="categoryId" label="類別" width="180">
        <template #default="{ row }">
          <!-- <span>{{ row.statusCode }}</span> -->
          <img
            v-if="row.statusCode === '0'"
            src="@/assets/images/cost.png"
            class="statusIcon"
          />
          <img v-else src="@/assets/images/income.png" class="statusIcon" />
          {{ row.categoryName }}
        </template>
      </el-table-column>
      <el-table-column prop="money" label="金額">
        <template #default="{ row }">
          {{ formatMoney(row.money) }}
        </template>
      </el-table-column>
      <el-table-column prop="memo" label="備註"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="small" type="success" @click="EditRecord(row)"
            >編輯</el-button
          >
          <el-button @click="onDelRecord(row.id)" size="small" type="danger"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 彈窗 -->
    <editRecord
      ref="dialog"
      :cateList="cateList"
      @success="onSuccess"
    ></editRecord>
  </div>
</template>

<style lang="scss" scoped>
.homeContainer {
  margin: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .statusIcon {
    width: 20px;
    height: 20px;
    vertical-align: sub;
  }
  .addCateBtnContainer {
    margin-top: 10px;
  }
  :deep(.el-dialog__header) {
    display: flex;
    justify-content: space-between;
  }
}
</style>
