import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Login, DarkMode } from './components'
import Home from './container/Home'
import { fetchUser } from './utils/fetchUser'


const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();

    if(!user) navigate('/login');
  }, []);
  
  return (
    <div className={darkTheme ?  "dark": ""}>
      <DarkMode darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
