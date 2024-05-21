import { Dayjs } from 'dayjs'
import { size } from 'lodash-es'

export const getAllDays = (date: Dayjs) => {
  const startDate = date.startOf('month')
  const day = startDate.day()
  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7,
  )

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false,
    }
  }

  for (let i = day; i < size(daysInfo); i++) {
    const calcDate = startDate.add(i - day, 'day')
    daysInfo[i] = {
      date: startDate.add(i - day, 'day'),
      currentMonth: calcDate.month() === date.month(),
    }
  }

  return daysInfo
}
