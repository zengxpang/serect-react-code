import {
  ForwardRefRenderFunction,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { useControllableValue } from 'ahooks'

import { MONTHS } from './constants'

import styles from './index.module.css'

interface IMiniCalendarProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
}

export interface IMiniCalendarRef {
  getDate: () => Date
  setDate: (date: Date) => void
}

const MiniCalendar: ForwardRefRenderFunction<
  IMiniCalendarRef,
  IMiniCalendarProps
> = (props, ref) => {
  const { value, defaultValue, onChange } = props

  const [date, setDate] = useControllableValue<Date>(props, {
    defaultValue: new Date(), // 默认值，会被 props.defaultValue 和 props.value 覆盖
  })

  useImperativeHandle(ref, () => ({
    getDate: () => date,
    setDate: (date: Date) => setDate(date),
  }))

  const handlePrev = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const handleNext = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  const dayOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderDates = () => {
    const days = []
    const dayCounts = dayOfMonth(date.getFullYear(), date.getMonth())
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.empty}></div>)
    }

    for (let i = 1; i <= dayCounts; i++) {
      const clickHandler = () => {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), i)
        setDate(currentDate)
      }
      if (i === date.getDate()) {
        days.push(
          <div
            key={i}
            className={styles.day}
            style={{ backgroundColor: 'red', cursor: 'pointer' }}
            onClick={clickHandler}
          >
            {i}
          </div>,
        )
      } else {
        days.push(
          <div key={i} className={styles.day} onClick={clickHandler}>
            {i}
          </div>,
        )
      }
    }

    return days
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={handlePrev}>&lt;</button>
        <div>
          {date.getFullYear()}年{MONTHS[date.getMonth()]}
        </div>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className={styles.days}>
        <div className={styles.day}>日</div>
        <div className={styles.day}>一</div>
        <div className={styles.day}>二</div>
        <div className={styles.day}>三</div>
        <div className={styles.day}>四</div>
        <div className={styles.day}>五</div>
        <div className={styles.day}>六</div>
        {renderDates()}
      </div>
    </div>
  )
}

const TheMiniCalendar = forwardRef(MiniCalendar)

export default TheMiniCalendar
