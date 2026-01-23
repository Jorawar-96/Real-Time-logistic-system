import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRidding = () => {

    const [finishRidePannel, setFinishRidePannel] = useState(false)
    const finishRidePannelRef = useRef(null)

    useGSAP(function(){
    if(finishRidePannel){
      gsap.to(finishRidePannelRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(finishRidePannelRef.current,{
      transform:'translateY(100%)'
    })
  }
  },[finishRidePannel])

  return (
    <div className='h-screen'>
        <div className='fixed p-6 w-screen top-0 flex items-center justify-between'>
          <img className='w-16' src="https://imgs.search.brave.com/wCminu2A6ZbB1QN22aV0P2w4YjoK0u6ZzS-JeyJ1hEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="" />
          <Link to={'/captain-home'} className=' h-10 w-10 bg-white rounded-full flex items-center justify-center'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
      <div className='h-4/5'>
        <img className='h-full w-full ' src="https://imgs.search.brave.com/VP8pU4e_Bdx9h1AUMbv9bVLbn2WjUzE6BseNuBdn1mA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdG9wLXZpZXct/Y2l0eS1tYXBfNzAz/NDctMTMxMC5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA" alt="" />

      </div>
      <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400' onClick={()=>{
        setFinishRidePannel(true)
      }}>
       <h5 className='p-1 text-center absolute top-0  w-[95%]' onClick={()=>{
          
        }}><i className=" text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
        <h4 className='text-lg font-semibold'>4 km Away</h4>
        <button className='bg-green-600 text-white font-semibold rounded-lg p-3 px-8'>Complete Ride</button>
      </div>

      <div ref={finishRidePannelRef} className=' w-full fixed translate-y-full z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <FinishRide setFinishRidePannel={setFinishRidePannel}/>
      </div>
      
    </div>
  )
}

export default CaptainRidding
