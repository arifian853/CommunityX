import './App.css'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Login } from './Pages/Login'
import { Register } from './Pages/Register'
import { Feed } from './Pages/Feed'
// import ProtectedRoute from './Components/ProtectedRoute'

import AOS from 'aos'
import 'aos/dist/aos.css'


function App() {

    useEffect(() => {
      AOS.init();
    })
  
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />} />
        {/* <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/feed' element={<Feed />} />
        {/* <Route
          path="/feed"
          element={
            <ProtectedRoute
              element={<Feed />}
              isAuthenticated={isAuthenticated}
            />
          }
        /> */}
      </Routes>

    </>
  )
}

export default App
