import dayjs from 'dayjs'

console.log(dayjs('2024-5-11').daysInMonth())
console.log(dayjs('2024-5-11').startOf('month').format('YYYY-MM-DD'))
console.log(dayjs('2024-5-11').endOf('month').format('YYYY-MM-DD'))
