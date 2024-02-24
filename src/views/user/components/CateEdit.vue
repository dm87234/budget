<script setup>
import { ref } from 'vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { addCateAPI, editCateAPI } from '@/api/category'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const cateForm = ref({
  id: '',
  categoryName: '',
  statusCode: '0',
  categoryPic: ''
})
const props = defineProps({
  AllEmoji: Array
})
const SelectEmoji = ref('')
const onSelectEmoji = (index, emoji) => {
  SelectEmoji.value = index
  cateForm.value.categoryPic = emoji
}
// 提交到後端
const emit = defineEmits(['success'])
const submitCate = async () => {
  console.log(cateForm.value)
  if (!cateForm.value.categoryName) {
    return ElMessage.error('請輸入類別名稱')
  }
  if (!cateForm.value.categoryPic) {
    return ElMessage.error('請選擇一個圖案')
  }
  // 新增類別
  if (!cateForm.value.id) {
    console.log('新增')
    const { data } = await addCateAPI(cateForm.value)
    if (data.status !== 0) {
      ElMessage.error('新增類別失敗')
    }
    ElMessage.success('新增類別成功')
  } else {
    console.log('編輯')
    const { data } = await editCateAPI(cateForm.value)
    if (data.status !== 0) {
      ElMessage.error('編輯類別失敗')
    }
    ElMessage.success('編輯類別成功')
  }
  // 編輯類別

  dialogVisible.value = false
  SelectEmoji.value = ''
  cateForm.value = { categoryName: '', statusCode: '0', categoryPic: '' }
  emit('success')
}

const open = (item) => {
  if (!(Object.keys(item).length === 0)) {
    cateForm.value = { ...item }
    SelectEmoji.value = item.categoryPic
  }
  dialogVisible.value = true
}

const onCancel = () => {
  cateForm.value = { categoryName: '', statusCode: '0', categoryPic: '' }
  SelectEmoji.value = ''
  dialogVisible.value = false
}

// 向外曝露
defineExpose({
  open
})
</script>
<template>
  <el-dialog
    v-model="dialogVisible"
    @close="onCancel"
    width="370"
    :show-close="false"
    style="background-color: #fff8f1; border-radius: 8px"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">
        {{ cateForm.id ? '編輯類別' : '新增類別' }}
      </h4>
      <el-icon @click="close" color="#F56C6C" size="24" style="cursor: pointer">
        <CircleCloseFilled />
      </el-icon>
    </template>
    <el-form>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item>
            <el-select
              fit-input-width
              v-model="cateForm.statusCode"
              :disabled="Boolean(cateForm.id)"
            >
              <el-option label="支出" value="0" />
              <el-option label="收入" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="17">
          <el-form-item>
            <el-input
              v-model="cateForm.categoryName"
              autocomplete="off"
              placeholder="請輸入類別名稱"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-card class="box-card" shadow="never">
        <span
          @click="onSelectEmoji(index, item.emoji)"
          v-for="(item, index) in props.AllEmoji"
          :key="index"
          class="emojiItem"
          :class="{
            active: SelectEmoji === index || SelectEmoji === item.emoji
          }"
        >
          {{ item.emoji }}
        </span>
      </el-card>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="submitCate()" type="primary" style="width: 100px"
          >確認</el-button
        >
        <el-button @click="onCancel" type="primary" style="width: 100px"
          >取消</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.emojiItem {
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 3px;
  font-size: 26px;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  &.active {
    border: 1px solid salmon;
  }
}

.dialog-footer {
  display: flex;
  gap: 20px;
  justify-content: center;
}
</style>
