import React from 'react'
import { useState,useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pannelOpen, setPannelOpen] = useState(false)
  const panelRef = useRef(null)
  const pannelCloseRef = useRef(null)
  const submitHandler=(e)=>{
    e.preventDefault()
  }

  useGSAP(function(){
    if(pannelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        padding:24
        //opacity:1
      })
      gsap.to(pannelCloseRef.current,{
        opacity:1
      })
    }
    else{
      gsap.to(panelRef.current,{
        height:'0%',
        padding:24
        //opacity:0
      })
      gsap.to(pannelCloseRef.current,{
        opacity:0
      })
    }
  },[pannelOpen])
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute left-5 top-5' src="https://imgs.search.brave.com/wCminu2A6ZbB1QN22aV0P2w4YjoK0u6ZzS-JeyJ1hEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full ' src="https://imgs.search.brave.com/VP8pU4e_Bdx9h1AUMbv9bVLbn2WjUzE6BseNuBdn1mA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdG9wLXZpZXct/Y2l0eS1tYXBfNzAz/NDctMTMxMC5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA" alt="" />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={pannelCloseRef} onClick={()=>{
            setPannelOpen(false)
          }} className='absolute opacity-0 right-6 top-6 text-2xl'><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <div className="line absolute h-15 w-1 top-[47%] left-9 bg-gray-900 rounded-full" ></div>
          <input 
          onClick={()=>{
            setPannelOpen(true)
          }}
          value={pickup}
          onChange={(e)=>{
            setPickup(e.target.value)
          }}
          className='bg-[#eeee] px-8 py-2 text-lg rounded-lg w-full mt-5' 
          type="text" 
          placeholder='Add a pick-up location'
          />

          <input 
          onClick={()=>{
            setPannelOpen(true)
          }}
          value={destination}
          onChange={()=>{
            setDestination(e.target.value)
          }}
          className='bg-[#eeee] px-8 py-2 text-lg rounded-lg w-full mt-3' 
          type="text" 
          placeholder='Enter your destination'
          />
        </form>
        </div>
        <div ref={panelRef} className=' bg-white p-5 h-0'>
          <LocationSearchPannel/>
        </div>
      </div>
      <div className=' w-full translate-y-full fixed z-10 bottom-0 bg-white px-3 py-8'>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Ride</h3>
        <div className='w-full bg-gray-100 flex active:border-2 border-black rounded-xl items-center justify-between  p-3 mb-2'>
          <img className='h-10' src="https://imgs.search.brave.com/rd8a_Sjk4Io-qjtxFxmx-FphzkQt8XeY6rH8fx61Oo8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNi8w/Ny9DYXItUE5HLnBu/Zw" alt="" />
          <div className='ml-2 w-1/2' >
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i> 4 </span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'><i className="ri-money-rupee-circle-line"></i>193.20</h2>
        </div>

        <div className='w-full flex active:border-2 bg-gray-100 border-black rounded-xl items-center justify-between  p-3 mb-2'>
          <img className='h-10' src="https://imgs.search.brave.com/1CY0USIoL_tWecHL3g2Qa1ekF00Cik2As-VVqSXMVGQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLWdyYXR1aXRh/cy9tb3RvY2ljbGV0/YS1lbGV0cmljYS1h/bWFyZWxhLWVsZWdh/bnRlLXRyYW5zcG9y/dGUtZGUtZGVzaWdu/LW1vZGVybm9fNjMy/NDk4LTQ4NTUwLmpw/Zz9zZW10PWFpc19o/eWJyaWQ" alt="" />
          <div className='-ml-1 w-1/2' >
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-fill"></i> 1 </span></h4>
            <h5 className='font-normal text-xs text-gray-600'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle ride</p>
          </div>
          <h2 className='text-xl font-semibold'><i className="ri-money-rupee-circle-line"></i>65</h2>
        </div>

        <div className='w-full flex active:border-2 bg-gray-100 border-black rounded-xl items-center justify-between  p-3 mb-2'>
          <img className='h-10' src="https://imgs.search.brave.com/67EOC9mRdwpFVukzNjLY-ZqwuxIPpauR933HXFkkhFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wNy5o/aWNsaXBhcnQuY29t/L3ByZXZpZXcvNDA0/LzM3NC80NjcvYmFq/YWotYXV0by1jYXIt/YXV0by1yaWNrc2hh/dy1waWFnZ2lvLWFw/ZS1jYXItdGh1bWJu/YWlsLmpwZw" alt="" />
          <div className='-ml-4 w-1/2' >
            <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-fill"></i> 3 </span></h4>
            <h5 className='font-normal text-xs text-gray-600'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, Auto ride</p>
          </div>
          <h2 className='text-xl font-semibold'><i className="ri-money-rupee-circle-line"></i>115</h2>
        </div>
      </div>
    </div>
  )
}

export default Home
