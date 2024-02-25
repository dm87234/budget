export const formatMoney = (money) => {
  let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
  return money.toString().replace(comma, ',')
}
