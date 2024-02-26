import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用戶收支分類模塊
export const useCateStore = defineStore(
  'budget-category',
  () => {
    const cateList = ref([])
    const setCateList = (newList) => {
      cateList.value = newList
    }

    return {
      cateList,
      setCateList
    }
  },
  { persist: true }
)
