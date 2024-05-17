import { useEffect, useRef, useState } from 'react'

import { MiniCalendar, type IMiniCalendarRef } from './components'

const App = () => {
  const miniCalendarRef = useRef<IMiniCalendarRef>(null)

  const [date, setDate] = useState(new Date())

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(miniCalendarRef.current)
  //     miniCalendarRef.current?.setDate(new Date(2024, 3, 1))
  //   }, 3000)
  // }, [])

  const handleChange = (newDate: Date) => {
    setDate(newDate)
    console.log(newDate.toLocaleDateString())
    // alert(newDate.toLocaleDateString())
  }

  return (
    <>
      <MiniCalendar value={date} onChange={handleChange} />
      <MiniCalendar
        ref={miniCalendarRef}
        defaultValue={new Date('2023-8-15')}
      />
    </>
  )
}

export default App
