import { CalendarLocaleZhCN } from './zh-CN'
import { CalendarLocalEnUS } from './en-US'
import { ICalendarType } from './interface'

export const allLocales: Record<string, ICalendarType> = {
  'zh-CN': CalendarLocaleZhCN,
  'en-US': CalendarLocalEnUS,
}
