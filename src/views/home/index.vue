<script setup>
import { ref, computed } from 'vue'
import addBtn from '@/components/addBtn.vue'
import myCalendar from './components/myCalendar.vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  formatDate,
  formatMonth,
  formatYear,
  formatD
} from '@/utils/dateFormat'
// API
import { getRecordsAPI, addRecordsAPI } from '@/api/records'
import { getCateListAPI } from '@/api/category'

// 儲存紀錄的數組
const allRecords = ref([])
const calendar = ref(null)

// 分類資料
const cateList = ref([])

// 支出類別
const costCateList = computed(() => {
  return cateList.value.filter((item) => item.statusCode === '0')
})
// 收入類別
const incomeCateList = computed(() => {
  return cateList.value.filter((item) => item.statusCode === '1')
})

const isVisible = ref(false)
const form = ref({
  date: '',
  status: '0',
  categoryId: '',
  money: 0,
  memo: ''
})
const onEdit = (row) => {
  console.log(row)
  isVisible.value = true
  form.value = {
    date: row.completeDate,
    status: row.statusCode,
    categoryId: row.categoryId,
    money: row.money,
    memo: row.memo
  }
  console.log(form.value)
}

const addRecord = () => {
  isVisible.value = true
  form.value.date = calendar.value.openDate
}

const onAddRecord = async () => {
  form.value.date = formatDate(form.value.date)
  form.value.costYear = formatYear(form.value.date)
  form.value.costMonth = formatMonth(form.value.date)
  form.value.costDate = formatD(form.value.date)
  // console.log(form.value)

  const { data } = await addRecordsAPI(form.value)
  if (data.status !== 0) {
    ElMessage.error('新增失敗')
  }
  ElMessage.success('新增成功')
  isVisible.value = false
  getAllRecords()
}

//--- 發請求區 ---
const getAllRecords = async () => {
  const { data } = await getRecordsAPI()
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
  cateList.value = data.data
}
// --------------

getAllRecords()
getCateList()
</script>

<template>
  <div class="homeContainer m50">
    <myCalendar ref="calendar"></myCalendar>
    <addBtn @click="addRecord">新增一筆</addBtn>
    <el-table :data="allRecords" stripe style="width: 100%">
      <el-table-column prop="completeDate" label="日期" width="180">
        <template #default="{ row }">
          {{ formatDate(row.completeDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="categoryId" label="類別" width="180">
        <template #default="{ row }">
          {{ row.categoryName }}
        </template>
      </el-table-column>
      <el-table-column prop="money" label="金額"></el-table-column>
      <el-table-column prop="memo" label="備註"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="small" type="success" @click="onEdit(row)"
            >編輯</el-button
          >
          <el-button size="small" type="danger">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 彈窗 -->
    <el-dialog
      v-model="isVisible"
      width="370"
      :show-close="false"
      style="background-color: #fff8f1; border-radius: 8px"
    >
      <template #header="{ close }">
        <el-icon
          @click="close"
          color="#F56C6C"
          size="24"
          style="cursor: pointer"
        >
          <CircleCloseFilled />
        </el-icon>
      </template>
      <el-form>
        <el-form-item>
          <el-date-picker v-model="form.date" type="date" style="width: 100%" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item>
              <el-select
                @change="form.categoryId = ''"
                fit-input-width
                v-model="form.status"
              >
                <el-option label="支出" value="0" />
                <el-option label="收入" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item v-if="form.status === '0'">
              <el-select v-model="form.categoryId" placeholder="選擇類別">
                <el-option
                  v-for="item in costCateList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-else>
              <el-select v-model="form.categoryId" placeholder="選擇類別">
                <el-option
                  v-for="item in incomeCateList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-input
            v-model="form.money"
            autocomplete="off"
            placeholder="請輸入金額"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.memo"
            maxlength="30"
            :rows="5"
            placeholder="請輸入備註"
            show-word-limit
            resize="none"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onAddRecord()" type="primary" style="width: 100px"
            >儲存</el-button
          >
          <el-button type="primary" style="width: 100px">再記一筆</el-button>
        </div>
      </template>
    </el-dialog>
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
  :deep(.el-dialog__header) {
    text-align: right;
  }
  .dialog-footer {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
}
</style>
