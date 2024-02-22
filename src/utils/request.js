import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://127.0.0.1:3007'

const instance = axios.create({
  baseURL,
  timeout: 10000
})
// 請求攔截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
// 響應攔截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.status === 0) {
      return res
    }
    // 處理業務失敗，給錯誤提示，拋出錯誤
    // ElMessage.error(res.data.message || '服務異常')
    ElMessage.error({
      duration: 3500,
      message: res.data.message || '服務異常'
    })
    return Promise.reject(res.data)
  },
  (err) => {
    // 401錯誤==>權限不足或 token 過期 ==>攔截到登錄
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 錯誤的默認情況
    // ElMessage.error(err.response.data.message || '服務異常')
    ElMessage.error({
      duration: 3500,
      message: err.response.data.message || '服務異常'
    })
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
