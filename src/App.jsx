import { useState } from 'react'

import './App.css'

function App() {
  const [code,setCode] = useState(null)

  const onAction = () => {
    alert(code);
  }
  return (
    <>
    <div className='bg-gray-100'>
      <h1>Echo</h1>
    </div>
    </>
  )
}

export default App
