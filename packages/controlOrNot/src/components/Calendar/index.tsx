import { useEffect, useRef, useState } from 'react'
import { useMergeState } from '../../hooks'

interface ICalendarProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
}

const Calendar = (props: ICalendarProps) => {
  const { value: propsValue, defaultValue, onChange } = props

  // const isControlled = propsValue !== undefined
  //
  // const [value, setValue] = useState<Date>(() => {
  //   if (isControlled) {
  //     return propsValue
  //   } else {
  //     return defaultValue
  //   }
  // })
  //
  // const isFirstRenderRef = useRef(true)
  //
  // useEffect(() => {
  //   // 不是第一次渲染，但是value变成了undefined(也就是从受控变成了非受控)，同步更新内部状态
  //   if (!isControlled && !isFirstRenderRef.current) {
  //     setValue(propsValue)
  //   }
  //   isFirstRenderRef.current = false
  // }, [propsValue])
  //
  // const handleChange = (date: Date) => {
  //   if (!isControlled) setValue(date) // 非受控的时候才需要更新内部状态
  //   onChange && onChange(date)
  // }

  // const mergedValue = !isControlled ? value : propsValue

  const [mergedValue, setStateValue] = useMergeState<Date>(
    new Date('2024-5-1'),
    {
      value: propsValue,
      defaultValue,
      onChange,
    },
  )

  return (
    <>
      {mergedValue.toLocaleDateString()}
      <div onClick={() => setStateValue(new Date('2024-5-1'))}>2023-5-1</div>
      <div onClick={() => setStateValue(new Date('2024-5-2'))}>2023-5-2</div>
      <div onClick={() => setStateValue(new Date('2024-5-3'))}>2023-5-3</div>
    </>
  )
}

Calendar.defaultProps = {}

export default Calendar
