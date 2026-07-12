
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import AuthLayout from './layouts/AuthLayout'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import MainLayout from './layouts/MainLayout'
import { useCurrentSession } from '../lib/action/useCurrentSession'
import Cart from './pages/Cart'


function App() {
      const { user, isPending } = useCurrentSession();

  return (
    <Routes >
      <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="explore" element={<Explore />} />
      <Route path="profile" element={<Profile />} />
      {user ? <Route path="cart" element={<Cart />} />:""}
      </Route>
     

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default App
