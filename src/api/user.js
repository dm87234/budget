import request from '@/utils/request'

// 註冊
export const userRegisterAPI = ({ username, password, email }) => {
  return request.post('/api/reguser', { username, password, email })
}

// 登入
export const userLoginAPI = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

// 獲取用戶基本資料
export const getUserInfoAPI = () => {
  return request.get('/my/userinfo')
}

// 更新用戶基本資料
export const updateUserInfoAPI = ({ nickname, email }) => {
  return request.post('/my/userinfo', { nickname, email })
}
