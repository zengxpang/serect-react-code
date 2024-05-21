import { createContext } from 'react'

export interface ILocaleContextType {
  locale: string
}

export const LocaleContext = createContext<ILocaleContextType>({
  locale: 'zh-CN',
})
