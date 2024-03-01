<script setup>
import { ref, computed } from 'vue'
import categoryCom from './components/categoryCom.vue'
import addBtn from '@/components/addBtn.vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import CateEdit from './components/CateEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// API
import { getUserInfoAPI, updateUserInfoAPI } from '@/api/user'
import { getCateListAPI, getAllEmojiAPI, deleteCateAPI } from '@/api/category'

// 儲存使用者基本資料
const userInfoform = ref({
  nickname: '',
  email: ''
})
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

// 控制新增分類的彈窗顯示
const AllEmoji = ref([])
const dialog = ref(null)
const onAddCate = (a) => {
  if (a === 0) {
    onEditItem.value = {}
  }
  dialog.value.open(onEditItem.value)
}

//--- 編輯與刪除分類 ---
const popoverRef = ref(null)
const onClickOutside = () => {
  isPop.value = false
  // unref(popoverRef).popperRef?.delayHide?.()
}
const onEditItem = ref({})
const buttonRef = ref(null)
const isPop = ref(false)
const onEditCate = (event, item) => {
  if (event.target.classList[0] !== 'categoryItem') {
    buttonRef.value = event.target.parentNode
  } else {
    buttonRef.value = event.target
  }
  isPop.value = true
  onEditItem.value = item
}
const onDelCate = async () => {
  ElMessageBox.confirm('確定要刪除此類別嗎?', {
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const { data } = await deleteCateAPI(onEditItem.value.id)
      if (data.status !== 0) {
        ElMessage.error('刪除類別失敗')
      }
      ElMessage.success('刪除類別成功')
      getCateList()
    })
    .catch(() => {})
}
// ----------

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
const onSuccess = () => {
  getCateList()
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
            <el-col :xs="24" :span="12">
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
            <el-col :xs="24" :span="12">
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
        <!-- <el-button class="resetPwdBtn" type="danger">重置密碼</el-button> -->
      </el-card>
    </div>
    <!-- 分類設定 -->
    <div class="bottom">
      <h3 class="title">分類設定</h3>
      <el-tabs type="border-card">
        <el-tab-pane label="支出類別">
          <categoryCom
            v-for="item in costCateList"
            :key="item.id"
            @click="onEditCate($event, item)"
            v-click-outside="onClickOutside"
          >
            <template #emoji>{{ item.categoryPic }}</template>
            <template #cateName>{{ item.categoryName }}</template>
          </categoryCom>
        </el-tab-pane>
        <el-tab-pane label="收入類別">
          <categoryCom
            v-for="item in incomeCateList"
            :key="item.id"
            @click="onEditCate($event, item)"
            v-click-outside="onClickOutside"
          >
            <template #emoji>{{ item.categoryPic }}</template>
            <template #cateName>{{ item.categoryName }}</template>
          </categoryCom>
        </el-tab-pane>

        <addBtn @click="onAddCate(0)">新增類別</addBtn>
      </el-tabs>
    </div>
    <!-- 彈窗 -->
    <CateEdit ref="dialog" :AllEmoji="AllEmoji" @success="onSuccess"></CateEdit>

    <!-- pop -->
    <el-popover
      ref="popoverRef"
      :visible="isPop"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
    >
      <div style="text-align: center">
        <el-button @click="onAddCate(1)" type="success" size="small"
          >編輯</el-button
        >
        <el-button @click="onDelCate" type="danger" size="small"
          >刪除</el-button
        >
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.settings_container {
  @include mobile {
    margin: 0;
  }
  @include pad {
    margin: 0;
  }
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
  :deep(.el-dialog__header) {
    display: flex;
    justify-content: space-between;
  }
}
</style>
