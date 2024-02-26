export const formatMoney = (money) => {
  let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return money.toString().replace(comma, ',')
}

export const isBudgetOk = (money) => {
  const reg = /^[0-9]\d*$/
  return reg.test(money)
}
