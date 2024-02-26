import request from '@/utils/request'

// 獲取總預算
export const getTotalBudgetAPI = (budgetYear, budgetMonth) => {
  return request.get('/budget/getMonthlyBudget', {
    params: {
      budgetYear,
      budgetMonth
    }
  })
}

// 新增總預算
export const addTotalBudgetAPI = ({ totalBudget, budgetYear, budgetMonth }) => {
  return request.post('/budget/addMonthlyBudget', {
    totalBudget,
    budgetYear,
    budgetMonth
  })
}

// 編輯總預算
export const updateTotalBudgetAPI = ({ totalBudget, id }) => {
  return request.put('/budget/updateMonthlyBudget', {
    totalBudget,
    id
  })
}

// 獲取分類預算
export const getCateBudgetAPI = (budgetYear, budgetMonth) => {
  return request.get('/budget/getCateBudget', {
    params: {
      budgetYear,
      budgetMonth
    }
  })
}

// 新增分類預算
export const addCateBudgetAPI = ({
  categoryId,
  budget,
  budgetYear,
  budgetMonth
}) => {
  return request.post('/budget/addCateBudget', {
    categoryId,
    budget,
    budgetYear,
    budgetMonth
  })
}

// 編輯分類預算
export const updateCateBudgetAPI = ({ budget, id }) => {
  return request.put('/budget/updateCateBudget', {
    budget,
    id
  })
}
