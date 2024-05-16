import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div className="App" onClick={handleClick}>
      {count}
    </div>
  )
}

export default App
