import React from 'react'
import { useState,useRef } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel'
import VehiclePannel from '../components/VehiclePannel'
import ConfirmRide from '../components/ConfirmRide'
import WaitingForDriver from '../components/WaitingForDriver'
import LookingForDriver from '../components/LookingForDriver'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [pannelOpen, setPannelOpen] = useState(false)
  const vehiclePannelRef = useRef(null)
  const confirmRideRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const pannelCloseRef = useRef(null)
  const [vehiclePannel, setVehiclePannel] = useState(false)
  const [confirmRidePannel, setConfirmRidePannel] = useState(false)

  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

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

  useGSAP(function(){
    if(vehiclePannel){
      gsap.to(vehiclePannelRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(vehiclePannelRef.current,{
      transform:'translateY(100%)'
    })
  }
  },[vehiclePannel])
  useGSAP(function(){
    if(confirmRidePannel){
      gsap.to(confirmRideRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(confirmRideRef.current,{
      transform:'translateY(100%)'
    })
  }
  },[confirmRidePannel])
  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(vehicleFoundRef.current,{
      transform:'translateY(100%)'
    })
  }
  },[vehicleFound])
  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
      transform:'translateY(0)'
    })
    }else{
      gsap.to(waitingForDriverRef.current,{
      transform:'translateY(100%)'
    })
  }
  },[waitingForDriver])
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-20 absolute left-5 top-5' src="https://imgs.search.brave.com/wCminu2A6ZbB1QN22aV0P2w4YjoK0u6ZzS-JeyJ1hEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="" />

      <div onClick={()=>{
        setVehiclePannel(false)
      }} className='h-screen w-screen'>
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
          <LocationSearchPannel setPannelOpen = {setPannelOpen} setVehiclePannel={setVehiclePannel}/>
        </div>
      </div>
      <div ref={vehiclePannelRef} className=' w-full translate-y-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <VehiclePannel setConfirmRidePannel={setConfirmRidePannel} setVehiclePannel={setVehiclePannel}/>
      </div>
      <div ref={confirmRideRef} className=' w-full translate-y-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <ConfirmRide setConfirmRidePannel={setConfirmRidePannel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className=' w-full translate-y-full fixed z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={waitingForDriverRef} className=' w-full  fixed z-10 bottom-0 bg-white px-3 py-10 pt-12'>
        <WaitingForDriver waitingForDriver={waitingForDriver} s/>
      </div>
    </div>
  )
}

export default Home
