import dayjs, { Dayjs } from 'dayjs'

import { Calendar } from './components'

interface IApp2Props {}

const App2 = (props: IApp2Props) => {
  const handleChange = (date: Dayjs) => {
    console.log(date.format('YYYY-MM-DD'))
  }

  return (
    <Calendar value={dayjs()} currentMonth={dayjs()} onChange={handleChange} />
  )
}

App2.defaultProps = {}

export default App2
