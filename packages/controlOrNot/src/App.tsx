import { useEffect, useRef, useState } from 'react'

import { Calendar } from './components'

import './App.css'

const App = () => {
  const [value, setValue] = useState<Date>(new Date('2024-5-1'))

  const handleChange = (date: Date) => {
    console.log(date.toLocaleDateString())
    // setValue(date)
  }

  return (
    <Calendar defaultValue={new Date('2024-5-1')} onChange={handleChange} />
    // <Calendar value={value} onChange={handleChange} />
  )
}

export default App
