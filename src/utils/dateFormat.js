import { dayjs } from 'element-plus'
export const formatDate = (time) => dayjs(time).format('YYYY-MM-DD')
export const formatYear = (time) => dayjs(time).format('YYYY')
export const formatMonth = (time) => dayjs(time).format('MM')
export const formatD = (time) => dayjs(time).format('DD')
