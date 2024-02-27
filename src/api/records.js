import request from '@/utils/request'

// 獲取記錄
export const getRecordsAPI = (date) => {
  return request.get('/records/getRecords', {
    params: { date }
  })
}

// 新增紀錄
export const addRecordsAPI = ({
  categoryId,
  money,
  memo,
  costYear,
  costMonth,
  costDate,
  date
}) => {
  return request.post('/records/addrecords', {
    categoryId,
    money,
    memo,
    costYear,
    costMonth,
    costDate,
    date
  })
}

// 編輯紀錄
export const editRecordsAPI = ({ id, categoryId, money, memo }) => {
  return request.put('/records/updaterecords', {
    id,
    categoryId,
    money,
    memo
  })
}

// 刪除紀錄
export const deleteRecordAPI = (id) => {
  console.log(id)
  return request.delete('/records/delrecords', {
    params: { id }
  })
}

// 獲取首頁月收支記錄
export const getMonthlyRecordsAPI = () => {
  return request.get('/records/getMonthlyRecords')
}

// 獲取圖表月支出記錄
export const getMonthlyCostAPI = (year, month) => {
  return request.get('/records/getMonthlyCost', {
    params: {
      year,
      month
    }
  })
}

// 獲取圖表月收入記錄
export const getMonthlyIncomeAPI = (year, month) => {
  return request.get('/records/getMonthlyIncome', {
    params: {
      year,
      month
    }
  })
}

// 獲取圖表收支差
export const getBalanceAPI = () => {
  return request.get('/records/getBalance')
}
