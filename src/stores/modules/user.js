import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用戶token模塊
export const useUserStore = defineStore(
  'budget-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }

    return {
      token,
      setToken
    }
  },
  { persist: true }
)
