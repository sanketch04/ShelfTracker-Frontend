import { useState } from 'react'
import index from './pages/index'
import './App.css'
import Navbar from '../components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<index />} />

       

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
