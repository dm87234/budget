import request from '@/utils/request'

// 獲取記錄
export const getRecordsAPI = () => {
  return request.get('/records/getRecords')
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
export const deleteCateAPI = (id) => {
  console.log(id)
  return request.delete('/records/delrecords', {
    params: { id }
  })
}
