<script setup>
import { ref, computed } from 'vue'
import categoryCom from './components/categoryCom.vue'
import addBtn from '@/components/addBtn.vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'

// API
import { getUserInfoAPI, updateUserInfoAPI } from '@/api/user'
import { getCateListAPI, getAllEmojiAPI, addCateAPI } from '@/api/category'
import { ElMessage } from 'element-plus'

// 儲存使用者基本資料
const userInfoform = ref({
  nickname: '',
  email: ''
})
// 分類資料
const cateList = ref([])

// 支出類別
const costCateList = computed(() => {
  return cateList.value.filter((item) => item.statusCode === 0)
})
// 收入類別
const incomeCateList = computed(() => {
  return cateList.value.filter((item) => item.statusCode === 1)
})
// 新增、編輯分類表單
const cateForm = ref({
  categoryName: '',
  statusCode: '0',
  emoji: ''
})

// 更改暱稱
const isEditUserName = ref(false)
const userNameEdit = () => {
  isEditUserName.value = true
}
const onUserNameOk = async () => {
  const res = await updateUserInfo(userInfoform.value)
  console.log(res)
  isEditUserName.value = false
}

// 更改電子信箱
const form = ref(null)
const rules = {
  email: [
    { required: true, message: '請輸入電子信箱', trigger: 'blur' },
    { type: 'email', message: '電子信箱不正確', trigger: 'blur' }
  ]
}
const isEditUserEmail = ref(false)
const userEmailEdit = () => {
  isEditUserEmail.value = true
}
const onUserEmailOk = async () => {
  await form.value.validate()
  const res = await updateUserInfo(userInfoform.value)
  console.log(res)
  isEditUserEmail.value = false
}

// 新增分類
const isAddCateVisible = ref(false)
const AllEmoji = ref([])
const SelectEmoji = ref('')
// 控制新增分類的彈窗顯示
const onAddCate = () => {
  isAddCateVisible.value = true
}
const onSelectEmoji = (index, emoji) => {
  SelectEmoji.value = index
  cateForm.value.emoji = emoji
}

const submitCate = async () => {
  if (!cateForm.value.categoryName) {
    return ElMessage.error('請輸入類別名稱')
  }
  if (!cateForm.value.emoji) {
    return ElMessage.error('請選擇一個圖案')
  }

  const { data } = await addCateAPI(cateForm.value)
  if (data.status !== 0) {
    ElMessage.error('新增類別失敗')
  }
  ElMessage.success('新增類別成功')
  isAddCateVisible.value = false
  cateForm.value = { categoryName: '', statusCode: '0', emoji: '' }
  getCateList()
}

//--- 發請求區 ---
const getUserInfo = async () => {
  const {
    data: { data }
  } = await getUserInfoAPI()
  userInfoform.value.nickname = data.nickname
  userInfoform.value.email = data.email
}

const updateUserInfo = async () => {
  const res = await updateUserInfoAPI(userInfoform.value)
  console.log(res)
}

const getCateList = async () => {
  const { data } = await getCateListAPI()
  if (data.status !== 0) {
    return ElMessage.error('服務異常')
  }
  cateList.value = data.data
}
const getAllEmoji = async () => {
  const {
    data: { data }
  } = await getAllEmojiAPI()
  AllEmoji.value = data
}
// ------------

getUserInfo()
getCateList()
getAllEmoji()
</script>

<template>
  <div class="settings_container m50">
    <div class="top">
      <h3 class="title">個人資料設定</h3>
      <el-card shadow="never">
        <el-form
          label-position="top"
          :model="userInfoform"
          :rules="rules"
          ref="form"
        >
          <el-row :gutter="20">
            <!-- 使用者名稱 -->
            <el-col :span="12">
              <el-form-item v-if="!isEditUserName" label="暱稱">
                <el-input
                  v-model="userInfoform.nickname"
                  disabled
                  placeholder="請輸入暱稱(限10字)"
                />
                <font-awesome-icon
                  :icon="['fas', 'pencil']"
                  @click="userNameEdit"
                />
              </el-form-item>
              <el-form-item v-else label="暱稱">
                <el-input v-model="userInfoform.nickname" maxlength="10" />
                <font-awesome-icon
                  :icon="['fas', 'circle-check']"
                  @click="onUserNameOk"
                />
              </el-form-item>
            </el-col>
            <!-- 電子信箱 -->
            <el-col :span="12">
              <el-form-item v-if="!isEditUserEmail" label="電子信箱">
                <el-input v-model="userInfoform.email" disabled />
                <font-awesome-icon
                  :icon="['fas', 'pencil']"
                  @click="userEmailEdit"
                />
              </el-form-item>
              <el-form-item v-else label="電子信箱" prop="email">
                <el-input v-model="userInfoform.email" maxlength="100" />
                <font-awesome-icon
                  :icon="['fas', 'circle-check']"
                  @click="onUserEmailOk"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button class="resetPwdBtn" type="danger">重置密碼</el-button>
      </el-card>
    </div>
    <!-- 分類設定 -->
    <div class="bottom">
      <h3 class="title">分類設定</h3>
      <el-tabs type="border-card">
        <el-tab-pane label="支出類別">
          <categoryCom v-for="item in costCateList" :key="item.id">
            <template #emoji>{{ item.categoryPic }}</template>
            <template #cateName>{{ item.categoryName }}</template>
          </categoryCom>
        </el-tab-pane>
        <el-tab-pane label="收入類別">
          <categoryCom v-for="item in incomeCateList" :key="item.id">
            <template #emoji>{{ item.categoryPic }}</template>
            <template #cateName>{{ item.categoryName }}</template>
          </categoryCom>
        </el-tab-pane>

        <addBtn @click="onAddCate">新增類別</addBtn>
      </el-tabs>
    </div>
    <!-- 彈窗 -->
    <el-dialog
      v-model="isAddCateVisible"
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
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item>
              <el-select fit-input-width v-model="cateForm.statusCode">
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
            v-for="(item, index) in AllEmoji"
            :key="index"
            class="emojiItem"
            :class="{ active: SelectEmoji === index }"
          >
            {{ item.emoji }}
          </span>
        </el-card>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="submitCate()" type="primary" style="width: 100px"
            >新增</el-button
          >
          <el-button
            @click="isAddCateVisible = false"
            type="primary"
            style="width: 100px"
            >取消</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.settings_container {
  .title {
    font-size: 26px;
    color: $text_color;
    margin-bottom: 20px;
  }
  .top {
    margin-bottom: 20px;
    .resetPwdBtn {
      width: 100px;
    }
    .fa-pencil,
    .fa-circle-check {
      font-size: 20px;
      position: absolute;
      top: 6px;
      right: 10px;
      cursor: pointer;
    }
    .fa-pencil {
      color: #576955;
    }
    .fa-circle-check {
      color: #ff2d2d;
    }
  }
  .bottom {
    :deep(.el-tab-pane) {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
    }
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: white;
  }
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
