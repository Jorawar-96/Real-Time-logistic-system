import React from 'react'
import {Route, Routes } from 'react-router-dom'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtextWrapper from './pages/CaptainProtextWrapper'
import CaptainProfile from './pages/CaptainProfile'
import CaptainLogout from './pages/CaptainLogout'
import UserProfile from './pages/UserProfile'
import Ridding from './pages/Ridding'
import CaptainRidding from './pages/CaptainRidding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>}/>
        <Route path='/login' element={<UserLogin/>}/>   
        <Route path='/riding' element={<Ridding/>}/> 
        <Route path='/captain-riding' element={<CaptainRidding/>}/> 
        <Route path='/captain-login' element={<CaptainLogin/>}/>        
        <Route path='/signup' element={<UserSignup/>}/>        
        <Route path='/captain-signup' element={<CaptainSignup/>}/>        
        <Route path='/home' element={<UserProtectWrapper>
          <Home/>
        </UserProtectWrapper>}/>
        <Route path='/user/logout' element={<UserProtectWrapper>
          <UserLogout/>
        </UserProtectWrapper>}/>
        <Route path='/user/profile' element={UserProfile}/>
        <Route path='/captain-home' element={
          <CaptainProtextWrapper>
            <CaptainHome/>
          </CaptainProtextWrapper>
          }/>
          <Route path='/captain/profile' element={CaptainProfile}/>
          <Route path='/captain/logout' element={
            <CaptainProtextWrapper>
              <CaptainLogout/>
            </CaptainProtextWrapper>
          }/>
      </Routes>
    </div>
  )
}

export default App
