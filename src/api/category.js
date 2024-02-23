import request from '@/utils/request'

export const getCateListAPI = () => {
  return request.get('/category/cateList')
}
