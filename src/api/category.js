import request from '@/utils/request'
// 獲取分類
export const getCateListAPI = () => {
  return request.get('/category/cateList')
}
// 獲取Emoji
export const getAllEmojiAPI = () => {
  return request.get('/category/allemoji')
}
// 新增分類
export const addCateAPI = ({ categoryName, statusCode, categoryPic }) => {
  return request.post('/category/addCate', {
    categoryName,
    statusCode,
    categoryPic
  })
}

// 編輯分類
export const editCateAPI = ({ id, categoryName, categoryPic }) => {
  return request.put('/category/updateCate', {
    id,
    categoryName,
    categoryPic
  })
}

// 刪除分類
export const deleteCateAPI = (id) => {
  return request.delete('/category/delCate', {
    params: { id }
  })
}
