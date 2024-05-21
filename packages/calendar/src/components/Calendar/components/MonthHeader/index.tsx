import React, { useContext } from 'react'
import { Dayjs } from 'dayjs'

import { LocaleContext } from '../../helper'
import { allLocales } from '../../locale'

import styles from './index.module.scss'

interface IMonthHeaderProps {
  currentMonth: Dayjs
  onPrevMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

const MonthHeader = (props: IMonthHeaderProps) => {
  const { currentMonth, onToday, onPrevMonth, onNextMonth } = props

  const localeContext = useContext(LocaleContext)
  const calendarLocale = allLocales[localeContext.locale]

  return (
    <div className={styles.header}>
      <div className={styles['header-left']}>
        <div className={styles['header-left-icon']} onClick={onPrevMonth}>
          &lt;
        </div>
        <div className={styles['header-left-value']}>
          {currentMonth.format(calendarLocale.formatMonth)}
        </div>
        <div className={styles['header-left-icon']} onClick={onNextMonth}>
          &gt;
        </div>
        <div className={styles['header-left-btn']} onClick={onToday}>
          {calendarLocale.today}
        </div>
      </div>
    </div>
  )
}

MonthHeader.defaultProps = {}

export default MonthHeader
