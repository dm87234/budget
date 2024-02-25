<script setup>
import { ref, computed } from 'vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {
  formatDate,
  formatMonth,
  formatYear,
  formatD
} from '@/utils/dateFormat'

// API
import { addRecordsAPI, editRecordsAPI } from '@/api/records'

const form = ref({
  id: '',
  date: '',
  status: '0',
  categoryId: '',
  money: 0,
  memo: ''
})
const dialogVisible = ref(false)

const props = defineProps({
  cateList: Array
})

// 支出類別
const costCateList = computed(() => {
  return props.cateList.filter((item) => item.statusCode === '0')
})
// 收入類別
const incomeCateList = computed(() => {
  return props.cateList.filter((item) => item.statusCode === '1')
})

const emit = defineEmits(['success'])
const isMoneyOk = /^[1-9]\d*$/
const onAddRecord = async (action) => {
  form.value.date = formatDate(form.value.date)
  form.value.costYear = formatYear(form.value.date)
  form.value.costMonth = formatMonth(form.value.date)
  form.value.costDate = formatD(form.value.date)
  if (form.value.date === 'Invalid Date') {
    return ElMessage.error('請輸入日期')
  }
  if (form.value.categoryId === '') {
    return ElMessage.error('請選擇類別')
  }
  if (form.value.money === 0) {
    return ElMessage.error('請輸入金額')
  }
  if (!isMoneyOk.test(form.value.money)) {
    return ElMessage.error('金額只能是正整數')
  }

  if (!form.value.id) {
    // 新增
    const { data } = await addRecordsAPI(form.value)
    if (data.status !== 0) {
      return ElMessage.error('新增失敗')
    }
    ElMessage.success('新增成功')
    if (action === 'save') {
      dialogVisible.value = false
    }
  } else {
    // 編輯
    const { data } = await editRecordsAPI({
      id: form.value.id,
      categoryId: form.value.categoryId,
      money: form.value.money,
      memo: form.value.memo
    })
    if (data.status !== 0) {
      return ElMessage.error('更新紀錄失敗')
    }
    ElMessage.success('更新紀錄成功')
    dialogVisible.value = false
  }
  form.value.id = ''
  form.value.categoryId = ''
  form.value.money = 0
  form.value.memo = ''
  emit('success')
}
const open = (date, item) => {
  if (Object.keys(item).length === 0) {
    form.value.date = date
  } else {
    form.value = {
      id: item.id,
      date: item.completeDate,
      status: item.statusCode,
      categoryId: item.categoryId,
      money: item.money,
      memo: item.memo
    }
  }
  dialogVisible.value = true
}

const onCancel = () => {
  form.value.id = ''
  form.value.categoryId = ''
  form.value.money = 0
  form.value.memo = ''
  dialogVisible.value = false
}
// 向外曝露
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    @close="onCancel"
    v-model="dialogVisible"
    width="370"
    :show-close="false"
    style="background-color: #fff8f1; border-radius: 8px"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">
        {{ form.id ? '編輯' : '新增' }}
      </h4>
      <el-icon @click="close" color="#F56C6C" size="24" style="cursor: pointer">
        <CircleCloseFilled />
      </el-icon>
    </template>
    <el-form>
      <el-form-item>
        <el-date-picker
          :readonly="form.id"
          v-model="form.date"
          type="date"
          style="width: 100%"
        />
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
          maxlength="9"
          autocomplete="off"
          placeholder="請輸入金額"
          :formatter="
            (value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          validate-event
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
        <el-button
          v-if="!form.id"
          @click="onAddRecord('save')"
          type="primary"
          style="width: 100px"
          >儲存</el-button
        >
        <el-button
          v-else
          @click="onAddRecord('save')"
          type="primary"
          style="width: 100px"
          >更新</el-button
        >
        <el-button
          v-if="!form.id"
          @click="onAddRecord('oneMore')"
          type="primary"
          style="width: 100px"
          >再記一筆</el-button
        >
        <el-button v-else @click="onCancel" type="danger" style="width: 100px"
          >取消</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
