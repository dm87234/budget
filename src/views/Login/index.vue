<script setup>
import { ref } from 'vue'
import { userRegisterAPI, userLoginAPI } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import router from '@/router'
const LoginDialogVisible = ref(false) // 控制登入談框
const isRegister = ref(false)
const formModel = ref({
  username: '',
  password: '',
  repassword: '',
  email: ''
})

const form = ref(null) //登入表單對象
// 表單校驗
const rules = {
  username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,10}$/,
      message: '帳號必須是6-10碼小寫英文數字',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '請輸入電子信箱', trigger: 'blur' },
    { type: 'email', message: '電子信箱不正確', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9!@#$%^&*()-_+=?<>]{6,12}$/,
      message: '密碼必須是6-12碼英文數字符號',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('兩次密碼輸入不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 點擊立即使用
const onOpenDialog = () => {
  LoginDialogVisible.value = true
}

// 登入
const userStore = useUserStore()
const onLogin = async () => {
  await form.value.validate()
  // 發請求
  const res = await userLoginAPI(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登入成功')
  router.push('/')
}

// 註冊
const onRegister = async () => {
  await form.value.validate()
  // 發請求
  const res = await userRegisterAPI(formModel.value)
  if (res.data.status === 0) {
    ElMessage.success({
      duration: 3500,
      message: '註冊成功!!請登入'
    })
    formModel.value = {}
    isRegister.value = false
  }
}
</script>

<template>
  <div class="login_container">
    <div class="wrapper">
      <div class="title">
        <h1>Budget Tracker</h1>
      </div>
      <div class="main">
        <div class="left">
          <p>
            最美記帳 <br />易用可靠的雲端記帳工具 <br />中小企業最安心的成長夥伴
          </p>
          <button @click="onOpenDialog">立即使用</button>
        </div>
        <div class="right">
          <img src="../../assets/images/computer.png" />
        </div>
      </div>
    </div>
    <!-- 登入對話框 -->
    <el-dialog
      v-model="LoginDialogVisible"
      :show-close="true"
      width="414"
      align-center
    >
      <template #header>
        <div class="dialogTitleBox" v-if="!isRegister">
          <h3>登入</h3>
          <p>
            沒有帳號，<span class="orange" @click="isRegister = true"
              >快速註冊</span
            >
          </p>
        </div>
        <div class="dialogTitleBox" v-else>
          <h3>註冊</h3>
          <p>
            已經註冊，<span class="orange" @click="isRegister = false"
              >登入</span
            >
          </p>
        </div>
      </template>
      <!-- 社群登入 -->
      <div class="loginTip">使用社群帳號繼續</div>
      <div class="socialLogin">
        <button class="bgStyle fbLogin"></button>
        <button class="bgStyle lineLogin"></button>
        <button class="bgStyle googleLogin"></button>
      </div>
      <div v-if="!isRegister" class="loginTip">或使用帳號密碼登入</div>
      <div v-else class="loginTip">或註冊成為會員</div>

      <!-- 登入表單 -->
      <el-form v-if="!isRegister" :model="formModel" ref="form" :rules="rules">
        <el-form-item prop="username">
          <font-awesome-icon :icon="['fas', 'user']" />
          <el-input
            v-model="formModel.username"
            autocomplete="off"
            placeholder="請輸入帳號"
          />
        </el-form-item>
        <el-form-item prop="password">
          <font-awesome-icon :icon="['fas', 'lock']" />
          <el-input
            v-model="formModel.password"
            autocomplete="off"
            placeholder="請輸入密碼"
            show-password
          />
        </el-form-item>
      </el-form>

      <!-- 註冊表單 -->
      <el-form v-else :model="formModel" ref="form" :rules="rules">
        <el-form-item prop="username">
          <font-awesome-icon :icon="['fas', 'user']" />
          <el-input
            v-model="formModel.username"
            autocomplete="off"
            placeholder="帳號 (限6-10碼小寫英文數字)"
          />
        </el-form-item>
        <el-form-item prop="email">
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <el-input
            v-model="formModel.email"
            autocomplete="off"
            placeholder="電子信箱"
          />
        </el-form-item>
        <el-form-item prop="password">
          <font-awesome-icon :icon="['fas', 'lock']" />
          <el-input
            v-model="formModel.password"
            autocomplete="off"
            placeholder="密碼 (限6-12碼英文數字符號)"
            show-password
          />
        </el-form-item>
        <el-form-item prop="repassword">
          <font-awesome-icon :icon="['fas', 'lock']" />
          <el-input
            v-model="formModel.repassword"
            autocomplete="off"
            placeholder="請再次輸入密碼"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div v-if="!isRegister" class="dialog-footer">
          <el-button class="button" type="warning" @click="onLogin">
            登入
          </el-button>
          <el-link type="primary">忘記密碼</el-link>
        </div>
        <div v-else class="dialog-footer">
          <el-button class="button" type="warning" @click="onRegister">
            註冊
          </el-button>
          <el-link type="primary">註冊即同意 隱私權政策 和 使用者條款</el-link>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.login_container {
  height: 100%;
  background: url('@/assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;

  .wrapper {
    width: 76%;
    height: 500px;
    // background: #bfa;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      // background: rgb(96, 98, 230);
      margin-bottom: 70px;
      h1 {
        font-family: 'Protest Riot', sans-serif;
        font-size: 48px;
        color: #0f2470;
      }
    }
    .main {
      // background: #9cd;
      display: flex;
      align-items: center;
      .left {
        margin-right: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        p {
          font-size: 24px;
          text-align: center;
          line-height: 1.5;
        }
        button {
          border: none;
          outline: none;
          width: 150px;
          height: 40px;
          border-radius: 4px;
          background: $primary_color;
          color: $white_color;
          cursor: pointer;
        }
      }
      .right {
        img {
          width: 600px;
        }
      }
    }
  }

  :deep(.el-dialog) {
    padding: 30px 50px;
  }

  :deep(.el-input__inner) {
    padding-left: 20px;
  }

  .dialogTitleBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 30px;
    }
    p {
      color: rgba($color: #000000, $alpha: 0.4);
      font-size: 16px;
    }
    .orange {
      color: #fa8800;
      cursor: pointer;
      &:hover {
        color: #f5c488;
      }
    }
  }
  .loginTip {
    margin: 20px 0;
  }
  .socialLogin {
    display: flex;
    gap: 15px;
    justify-content: space-around;

    .bgStyle {
      width: 56px;
      height: 56px;
      background-size: cover;
      border-radius: 50%;
      border: none;
      background-color: transparent;
      cursor: pointer;
      @include transition_ease;
      &:hover {
        opacity: 0.8;
      }
    }
    .fbLogin {
      background-image: url('@/assets/images/facebook.png');
    }
    .lineLogin {
      background-image: url('@/assets/images/line.png');
    }
    .googleLogin {
      background-image: url('@/assets/images/google1.png');
    }
  }
}
.svg-inline--fa {
  position: absolute;
  top: 8px;
  left: 10px;
  z-index: 30;
  font-size: 16px;
}
.button {
  width: 100%;
  margin-bottom: 10px;
}
</style>
