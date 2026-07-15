
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
import NotFound from './pages/NotFound'
import ErrorBoundary from './pages/ErrorBoundary'
import ExploreDetails from './pages/ExploreDetails'
import BeaSeler from './pages/BeaSeler'
import Sell from './pages/Sell'



function App() {
      const { user } = useCurrentSession();

  return (
    <ErrorBoundary>
      
  
    <Routes >
      <Route element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
   <Route path='explore'>
      <Route index element={ <Explore /> }></Route>
      <Route  path=':id' element={ <ExploreDetails />}></Route>
   </Route>
   
      {user ? <Route path="profile" element={<Profile />} />:""}
      {user ? <Route path="cart" element={<Cart />} />:""}
      {user ? <Route path="seller" element={<BeaSeler />} />:""}
      {user ? <Route path="sell" element={<Sell />} />:""}
       <Route path="*" element={<NotFound />} />
      </Route>
     

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>

      </ErrorBoundary>
  )
}

export default App
