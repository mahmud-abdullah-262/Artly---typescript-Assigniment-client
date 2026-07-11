
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home'

import Login from './pages/login'
import Signup from './pages/signup'
import About from './pages/about'
import AuthLayout from './layouts/authLayout'
import Explore from './pages/explore'
import Profile from './pages/profile'
import MainLayout from './layouts/mainLayout'


function App() {


  return (
    <Routes >
      <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="explore" element={<Explore />} />
      <Route path="profile" element={<Profile />} />
      </Route>
     

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App
