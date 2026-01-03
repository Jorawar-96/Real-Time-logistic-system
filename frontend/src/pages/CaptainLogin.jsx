import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {CaptainDataContext} from '../context/captainContext'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData,setCaptainData] = useState({}) 

    const {captain, setCaptain} = React.useContext(CaptainDataContext)

    const navigate = useNavigate();
  
    const submitHandler= async(e)=>{
      e.preventDefault();
      const captainData = {
        email:email,
        password:password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captainData)

      if(response.status === 200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }
      setEmail('');
      setPassword('');
    }
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-15 mb-5'  src="https://imgs.search.brave.com/m60X8mNTFaXZ14TxJ2WXrNe7eSuuZPfuGqRqg5drEgs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L3ViZXItZHJpdmVy/cy1sb2dvLXBuZy0x/Ny5qcGc" alt="uber-text-logo" />
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
        <p className='text-center'>Join a fleet ? <Link to={'/captain-signup'} className='text-blue-600'>Register as a Captain</Link></p>
      </form>
      </div>
      <div>
        <Link to={'/login'} className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-2 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
    </div>
  )
}

export default CaptainLogin
