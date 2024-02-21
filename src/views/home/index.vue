<script setup>
import { ref } from 'vue'
import addBtn from '@/components/addBtn.vue'
import myCalendar from './components/myCalendar.vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const isVisible = ref(false)
const form = ref({
  date: '2024-02-15',
  status: '0',
  category: '',
  money: 0,
  memo: ''
})
const onEdit = (row) => {
  console.log(row)
  isVisible.value = true
  form.value = {
    date: row.date,
    status: '0',
    category: row.category,
    money: row.money,
    memo: row.memo
  }
  console.log(form.value)
}
const tableData = [
  {
    date: '2016-05-03',
    category: '薪資',
    money: '12,000',
    memo: '3月份薪水'
  },
  {
    date: '2016-05-03',
    category: '薪資',
    money: '12,000',
    memo: '3月份薪水'
  },
  {
    date: '2016-05-03',
    category: '薪資',
    money: '12,000',
    memo: '3月份薪水'
  },
  {
    date: '2016-05-03',
    category: '薪資',
    money: '12,000',
    memo: '3月份薪水'
  },
  {
    date: '2016-05-03',
    category: '薪資',
    money: '12,000',
    memo: '3月份薪水'
  },
  {
    date: '2016-05-03',
    category: '薪資',
    money: '12,000',
    memo: '3月份薪水'
  }
]
const addRecord = () => {
  isVisible.value = true
  console.log(11)
}

const saveRecord = () => {
  console.log(22)
}

const oneMoreRecord = () => {
  console.log(33)
}
</script>

<template>
  <div class="homeContainer m50">
    <myCalendar></myCalendar>
    <addBtn @click="addRecord">新增一筆</addBtn>
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
              <el-select fit-input-width v-model="form.status">
                <el-option label="支出" value="0" />
                <el-option label="收入" value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="17">
            <el-form-item>
              <el-select placeholder="選擇類別">
                <el-option label="Zone No.1" value="shanghai" />
                <el-option label="Zone No.2" value="beijing" />
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
          <el-button type="primary" style="width: 100px">儲存</el-button>
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
