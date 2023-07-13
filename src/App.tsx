import { useState } from 'react'

import Auth from './modules/authentication/pages/Auth/Auth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='cont'>
      <Auth />
    </div>
  )
}

export default App
