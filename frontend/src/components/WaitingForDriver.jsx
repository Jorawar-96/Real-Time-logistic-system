import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0  w-[93%]' onClick={()=>{
          props.WaitingForDriver(false)
        }}><i className=" text-3xl text-gray-200 ri-arrow-down-s-line"></i></h5>

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
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className=' text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-700'>Kaikondrahill, Bengaluru, Karanataka</p>
                    </div>
                </div>
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

    </div>
  )
}

export default WaitingForDriver
