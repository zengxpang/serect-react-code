import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { CSSProperties } from 'react'
import classnames from 'classnames'

import { LocaleContext } from './helper'
import {
  MonthCalendar,
  type IMonthCalendarProps,
  MonthHeader,
} from './components'

import styles from './index.module.scss'

interface ICalendarProps extends IMonthCalendarProps {
  locale?: string // 国际化相关
  className?: string | string[]
  style?: CSSProperties
}

const Calendar = (props: ICalendarProps) => {
  const { locale, className, style, value, onChange, ...otherProps } = props

  const [currentDate, setCurrentDate] = useState<Dayjs>(value)
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(value)

  const handleChangeDate = (date: Dayjs) => {
    setCurrentDate(date)
    setCurrentMonth(date)
    onChange?.(date)
  }

  const handleSelect = (date: Dayjs) => {
    handleChangeDate(date)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'))
  }

  const handleToday = () => {
    handleChangeDate(dayjs())
  }

  return (
    <LocaleContext.Provider
      value={{
        locale: 'en-US' ?? locale ?? navigator.language,
      }}
    >
      <div className={classnames(styles.calendar, className)} style={style}>
        <MonthHeader
          currentMonth={currentMonth}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />
        <MonthCalendar
          {...otherProps}
          value={currentDate}
          currentMonth={currentMonth}
          onSelect={handleSelect}
        />
      </div>
    </LocaleContext.Provider>
  )
}

Calendar.defaultProps = {}

export default Calendar
