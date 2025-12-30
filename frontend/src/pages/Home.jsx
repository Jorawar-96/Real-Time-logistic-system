import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div>
      <div className='bg-cover bg-bottom bg-[url(https://imgs.search.brave.com/wlzhj3_0QrFpRIP2-BKoBG_C94kxTKqs6lfSvocDoh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NTc0MDQ3NjMtNjk3/MDhjZDhiOWNlP2Zt/PWpwZyZxPTYwJnc9/MzAwMCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE1ueDhkSEpoWm1a/cFl5VXlNR3hwWjJo/MGZHVnVmREI4ZkRC/OGZId3c)] h-screen pt-7 w-full  flex justify-between flex-col'>
        <img className='w-30 ml-5'  src="https://imgs.search.brave.com/wCminu2A6ZbB1QN22aV0P2w4YjoK0u6ZzS-JeyJ1hEs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjcv/MTI3LzQ1MS9zbWFs/bC91YmVyLWxvZ28t/dWJlci1pY29uLXRy/YW5zcGFyZW50LWZy/ZWUtcG5nLnBuZw" alt="uber-text-logo" />
        <div className= 'py-4  pb-7 px-4 bg-white'>
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to={'/login'} className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default home
