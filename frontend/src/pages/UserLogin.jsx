import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { UserDataContext } from '../context/UserContext'  
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const {user,setUser} = React.useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler= async (e)=>{
    e.preventDefault();
    const userData = {
      email:email,
      password:password
    }

    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token);
      navigate('/home');
    }
    setEmail('');
    setPassword('');
  } catch (err) {
    setError('Invalid email or password');
  }
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-30 mb-5'  src="https://imgs.search.brave.com/wCminu2A6ZbB1QN22aV0P2w4YjoK0u6ZzS-JeyJ1hEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="uber-text-logo" />
      <form onSubmit={(e)=>{
        submitHandler(e)
      }} action="">
        <h3 className='text-lg font-medium mb-2'>What's your email ?</h3>
        <input 
        value={email}
        onChange={(e)=>{
          setEmail(e.target.value)
        }}

        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'
        required 
        type="email" 
        placeholder='email@example.com'
        />

        <h3 className='text-lg font-medium mb-2'>What's you password ?</h3>

        <input
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base' 
        required 
        type="password" 
        placeholder='Password'
        />
        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-2 py-2 w-full text-lg placeholder:text-base'
        >Login
        </button>
        <p className='text-center'>New Here ? <Link to={'/signup'} className='text-blue-600'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link to={'/captain-login'} className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default Login