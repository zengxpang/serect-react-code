import React, { ReactNode, useContext } from 'react'
import { map } from 'lodash-es'
import { Dayjs } from 'dayjs'
import classnames from 'classnames'

import { WEEK_LIST } from './constants'
import { getAllDays } from './helper'
import { allLocales } from '../../locale'
import { LocaleContext } from '../../helper'

import styles from './index.module.scss'

export interface IMonthCalendarProps {
  value: Dayjs
  currentMonth: Dayjs
  dateRender?: (currentDate: Dayjs) => ReactNode // 定制日期显示，会完全覆盖日期单元格
  dataInnerRender?: (currentDate: Dayjs) => ReactNode // 定制日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效。
  onChange?: (date: Dayjs) => void
  onSelect?: (date: Dayjs) => void
}

const MonthCalendar = (props: IMonthCalendarProps) => {
  const {
    value,
    currentMonth,
    dateRender,
    dataInnerRender,
    onSelect,
    onChange,
  } = props

  const localeContext = useContext(LocaleContext)

  const calendarLocale = allLocales[localeContext.locale]

  const renderDays = () => {
    const allDays = getAllDays(currentMonth)
    const rows = []
    for (let i = 0; i < 6; i++) {
      const row = []
      for (let j = 0; j < 7; j++) {
        const item = allDays[i * 7 + j]
        row[j] = (
          <div
            className={classnames(styles['month-body-cell'], {
              [styles['month-body-cell-current']]: item.currentMonth,
            })}
            onClick={() => {
              onSelect?.(item.date)
            }}
          >
            {dateRender ? (
              dateRender(item.date)
            ) : (
              <div className={styles['month-body-cell-date']}>
                <div
                  className={classnames(styles['month-body-cell-date-value'], {
                    [styles['month-body-cell-date-selected']]:
                      value.format('YYYY-MM-DD') ===
                      item.date.format('YYYY-MM-DD'),
                  })}
                >
                  {item.date.date()}
                </div>
                <div className={styles['month-body-cell-date-content']}>
                  {dataInnerRender?.(item.date)}
                </div>
              </div>
            )}
          </div>
        )
      }
      rows.push(row)
    }
    return map(rows, (row, index) => (
      <div className={styles['month-body-row']} key={index}>
        {row}
      </div>
    ))
  }

  return (
    <div className={styles.month}>
      <div className={styles['month-week-list']}>
        {map(WEEK_LIST, (week) => (
          <div className={styles['month-week-list-item']} key={week}>
            {calendarLocale.week[week]}
          </div>
        ))}
      </div>
      <div className={styles['month-body']}>{renderDays()}</div>
    </div>
  )
}

MonthCalendar.defaultProps = {}

export default MonthCalendar
