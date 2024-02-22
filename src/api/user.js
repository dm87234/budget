import request from '@/utils/request'
// 註冊
export const userRegisterAPI = ({ username, password, email }) => {
  return request.post('/api/reguser', { username, password, email })
}

// 登入
export const userLoginAPI = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}
