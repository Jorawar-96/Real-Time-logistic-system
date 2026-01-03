import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { CaptainDataContext } from '../context/captainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [userData, setUserData] = useState({})
    const [capacity, setCapacity] = useState('')
    const [color, setColor] = useState('')
    const [vehicleType, setVehicleType] = useState('')
    const [plateNumber, setPlateNumber] = useState('')

    const {captain, setCaptain} = React.useContext(CaptainDataContext);
  
    const submitHandler=async (e)=>{
      e.preventDefault()
  
      const CaptainData={
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        email:email,
        password:password,
        vehicle:{
          color:color,
          plate:plateNumber,
          vehicleType:vehicleType,
          capacity:capacity
        }
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,CaptainData)

      if (response.status===201){
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token',data.token);
        navigate('/captain-home');
      }

      setEmail('')
      setPassword('')
      setFirstname('')
      setLastname('')
      setColor('')
      setPlateNumber('')
      setVehicleType('')
      setCapacity('')


    }
  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
          <div>
            <img className='w-15 mb-5'  src="https://imgs.search.brave.com/m60X8mNTFaXZ14TxJ2WXrNe7eSuuZPfuGqRqg5drEgs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L3ViZXItZHJpdmVy/cy1sb2dvLXBuZy0x/Ny5qcGc" alt="uber-text-logo" />
          <form onSubmit={(e)=>{
            submitHandler(e)
          }} action="">
            <h3 className='text-base font-medium mb-2'>What's your Captain's name ?</h3>
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
    
            <h3 className='text-base font-medium mb-2'>What's your Captain's email ?</h3>
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


            <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-3 mb-4'>
              <input
                className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-base placeholder:text-base'
                required
                type="text"
                placeholder='Vehicle Color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-base placeholder:text-base'
                required
                type="text"
                placeholder='Plate Number'
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value)}
              />
            </div>
            <div className='flex gap-3 mb-4'>
              <select
                className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-base'
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="Car">Car</option>
                <option value="Auto">Auto</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
              <input
                className='bg-[#eeeeee] rounded px-2 py-2 border w-1/2 text-base placeholder:text-base'
                required
                type="number"
                min="1"
                placeholder='Capacity'
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <button
            className='bg-[#111] text-white font-semibold mb-3 rounded px-2 py-2 w-full text-base placeholder:text-base'
            >Create captain account
            </button>
            <p className='text-center'>Already have an account ? <Link to={'/captain-login'} className='text-blue-600'>Login here</Link></p>
          </form>
          </div>
          <div>
            <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google privacy and Policy</span> and <span className='underline'>Terms of Service apply</span> </p>
          </div>
        </div>
  )
}

export default CaptainSignup
