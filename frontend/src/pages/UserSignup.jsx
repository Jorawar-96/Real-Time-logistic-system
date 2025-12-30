import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler=(e)=>{
    e.preventDefault()

    setUserData({
      fullname:{
        firstname:firstname,
        lastname:lastname
      },
      email:email,
      password:password
      }
    )
    console.log(userData)
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-30 mb-5'  src="https://imgs.search.brave.com/wCminu2A6ZbB1QN22aV0P2w4YjoK0u6ZzS-JeyJ1hEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="uber-text-logo" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} action="">
        <h3 className='text-base font-medium mb-2'>What's your name ?</h3>
        <div className='flex gap-3 mb-4'>
          <input 
            className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-base placeholder:text-base'
            required 
            type="text" 
            placeholder='First name'
            value={firstname}
            onChange={(e)=>{
              setFirstname(e.target.value)
            }}
          />
          <input 
            className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-base placeholder:text-base'
            required 
            type="text" 
            placeholder='Last name'
            value={lastname}
            onChange={(e)=>{
              setLastname(e.target.value)
            }}
          />
        </div>

        <h3 className='text-base font-medium mb-2'>What's your email ?</h3>
        <input 
        className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-base placeholder:text-base'
        required 
        type="email" 
        placeholder='email@example.com'
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
        />

        <h3 className='text-base font-medium mb-2'>What's you password ?</h3>

        <input
        className='bg-[#eeeeee] mb-4 rounded px-2 py-2 border w-full text-base placeholder:text-base' 
        required 
        type="password" 
        placeholder='Password'
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        />
        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-2 py-2 w-full text-base placeholder:text-base'
        >Login
        </button>
        <p className='text-center'>Already have an account ? <Link to={'/login'} className='text-blue-600'>Login here</Link></p>
      </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google privacy and Policy</span> and <span className='underline'>Terms of Service apply</span> </p>
      </div>
    </div>
  )
}

export default UserSignup