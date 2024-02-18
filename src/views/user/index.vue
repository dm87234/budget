<script setup>
import categoryCom from './components/categoryCom.vue'
import { ref } from 'vue'

const userInfoform = ref({
  userName: '',
  userEmail: ''
})
// 更改使用者名稱
const isEditUserName = ref(false)
const userNameEdit = () => {
  isEditUserName.value = true
}
const onUserNameOk = () => {
  isEditUserName.value = false
}

// 更改電子信箱
const isEditUserEmail = ref(false)
const userEmailEdit = () => {
  isEditUserEmail.value = true
}
const onUserEmailOk = () => {
  isEditUserEmail.value = false
}

// 假資料
const list = [
  {
    icon: '🍽️',
    cateName: '飲食'
  },
  {
    icon: '🍉',
    cateName: '飲料'
  },
  {
    icon: '🧡',
    cateName: '飲食'
  },
  {
    icon: '🎃',
    cateName: '飲食'
  },
  {
    icon: '⚾',
    cateName: '飲食'
  },
  {
    icon: '🔮',
    cateName: '玩具'
  },
  {
    icon: '🀄',
    cateName: '衣服'
  },
  {
    icon: '🎃',
    cateName: '飲食'
  },
  {
    icon: '⚾',
    cateName: '飲食'
  },
  {
    icon: '🔮',
    cateName: '玩具'
  },
  {
    icon: '🀄',
    cateName: '衣服'
  },
  {
    icon: '🎃',
    cateName: '飲食'
  },
  {
    icon: '⚾',
    cateName: '飲食'
  },
  {
    icon: '🔮',
    cateName: '玩具'
  },
  {
    icon: '🀄',
    cateName: '衣服'
  }
]
</script>

<template>
  <div class="settings_container">
    <div class="top">
      <h3 class="title">個人資料設定</h3>
      <el-card shadow="never">
        <el-form label-position="top" :model="userInfoform">
          <el-row :gutter="20">
            <!-- 使用者名稱 -->
            <el-col :span="12">
              <el-form-item v-if="!isEditUserName" label="使用者名稱">
                <el-input v-model="userInfoform.userName" disabled />
                <font-awesome-icon
                  :icon="['fas', 'pencil']"
                  @click="userNameEdit"
                />
              </el-form-item>
              <el-form-item v-else label="使用者名稱">
                <el-input v-model="userInfoform.userName" maxlength="10" />
                <font-awesome-icon
                  :icon="['fas', 'circle-check']"
                  @click="onUserNameOk"
                />
              </el-form-item>
            </el-col>
            <!-- 電子信箱 -->
            <el-col :span="12">
              <el-form-item v-if="!isEditUserEmail" label="電子信箱">
                <el-input v-model="userInfoform.userEmail" disabled />
                <font-awesome-icon
                  :icon="['fas', 'pencil']"
                  @click="userEmailEdit"
                />
              </el-form-item>
              <el-form-item v-else label="電子信箱">
                <el-input v-model="userInfoform.userEmail" maxlength="50" />
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
          <categoryCom v-for="(item, index) in list" :key="index">
            <template #emoji>{{ item.icon }}</template>
            <template #cateName>{{ item.cateName }}</template>
          </categoryCom>
        </el-tab-pane>
        <el-tab-pane label="收入類別">Config</el-tab-pane>
        <div class="addCateBtnContainer">
          <el-button class="addCateBtn">新增類別</el-button>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings_container {
  // width: $container-width-lg;
  margin: 50px;
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
    .addCateBtnContainer {
      display: flex;
      justify-content: flex-end;
      .addCateBtn {
        background: $button_color;
        color: white;
        @include transition_ease;
        &:hover {
          background: white;
          color: $button_color;
        }
      }
    }
  }
}
</style>
