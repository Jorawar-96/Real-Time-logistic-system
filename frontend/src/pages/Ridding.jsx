import React from 'react'
import { Link } from 'react-router-dom'

const Ridding = () => {
  return (
    <div className='h-screen'>
        <Link to={'/home'} className='fixed right-2 top-2 h-10 w-10 bg-white rounded-full flex items-center justify-center'>
            <i className="text-lg font-medium ri-home-5-line"></i>
        </Link>
      <div className='h-1/2'>
        <img className='h-full w-full ' src="https://imgs.search.brave.com/VP8pU4e_Bdx9h1AUMbv9bVLbn2WjUzE6BseNuBdn1mA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvdG9wLXZpZXct/Y2l0eS1tYXBfNzAz/NDctMTMxMC5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA" alt="" />

      </div>
      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
            <img className='h-10' src="https://imgs.search.brave.com/rd8a_Sjk4Io-qjtxFxmx-FphzkQt8XeY6rH8fx61Oo8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNi8w/Ny9DYXItUE5HLnBu/Zw" alt="" />
            <div className='text-right'>
                <h2 className='text-lg font-medium'>Rajesh</h2>
                <h4 className='text-xl font-semibold -mb-1 -mt-1'>MP01 RJ 0001</h4>
                <p className='text-sm text-gray-600'>Wolkswagon virtus GT </p>
            </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full'>
                <div className='flex gap-3 items-center p-3 border-b-2'>
                    <i className=" text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className=' text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-700'>Near cyber park, Bengaluru, Karanataka</p>
                    </div>
                </div>
                <div className='flex gap-3 items-center p-3'>
                    <i className="ri-money-rupee-circle-line"></i>
                    <div>
                        <h3 className=' text-lg font-bold'>193.20</h3>
                        <p className='text-sm -mt-1 text-gray-700'>Cash only</p>
                    </div>
                </div>
            </div>
        </div>
        <button className='w-full bg-green-600 text-white font-semibold rounded-lg p-2'>Make a Payment</button>
      </div>
    </div>
  )
}

export default Ridding
