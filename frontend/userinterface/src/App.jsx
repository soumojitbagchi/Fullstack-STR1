import React from 'react'
import Home from './firstInterface/pages/Home'
import { NavLink } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Navbar from './firstInterface/components/navbar'
import BackButton from './firstInterface/components/BackButton'
import Login from './firstInterface/auth/login'
import Signup from './firstInterface/auth/signup'
import AboutUs from './firstInterface/pages/aboutUs'
import Contact from './firstInterface/pages/Contact'
import Dashboard from './firstInterface/pages/Dashboard'
import ProtectedRoute from './firstInterface/components/ProtectedRoute'
import OutsideDashBoard from './firstInterface/onClickingOutside/pages/OutsideDashBoard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div><Navbar/> <Home /></div>} />
        <Route path="/aboutUs" element={<div><Navbar/><AboutUs /></div>} />
        <Route path="/contact" element={<div><Navbar/><Contact /> </div>} />
        <Route path="/login" element={<div><BackButton/><Login /></div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/outside' element={<OutsideDashBoard/>} />
      </Routes>
    </div>
  )
}

export default App