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
export const addCateAPI = ({ categoryName, statusCode, emoji }) => {
  return request.post('/category/addCate', {
    categoryName,
    statusCode,
    categoryPic: emoji
  })
}
