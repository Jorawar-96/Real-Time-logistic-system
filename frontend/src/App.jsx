import React from 'react'
import {Route, Routes } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<UserLogin/>}/>        
        <Route path='/captain-login' element={<CaptainLogin/>}/>        
        <Route path='/signup' element={<UserSignup/>}/>        
        <Route path='/captain-signup' element={<CaptainSignup/>}/>        

      </Routes>
    </div>
  )
}

export default App
