import React from 'react'
import Home from './firstInterface/Home'
import { NavLink } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Navbar from './firstInterface/navbar'
import BackButton from './firstInterface/BackButton'
import Login from './firstInterface/login'
import Signup from './firstInterface/signup'
import AboutUs from './firstInterface/aboutUs'
import Contact from './firstInterface/Contact'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div><Navbar/> <Home /></div>} />
        <Route path="/aboutUs" element={<div><Navbar/><AboutUs /></div>} />
        <Route path="/contact" element={<div><Navbar/><Contact /> </div>} />
        <Route path="/login" element={<div><BackButton/><Login /></div>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App