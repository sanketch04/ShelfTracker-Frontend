import { BrowserRouter, Routes, Route } from 'react-router-dom'
import New from './pages/New'
import AppLayout from './components/AppLayout'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>
          <Route path="/test" element={<New />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>


    </BrowserRouter>
  )
}

export default App