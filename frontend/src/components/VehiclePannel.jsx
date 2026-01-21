import React from 'react'

const VehiclePannel = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center absolute top-0  w-[93%]' onClick={()=>{
          props.setVehiclePannel(false)
        }}><i className=" text-3xl text-gray-200 ri-arrow-down-s-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Choose a Ride</h3>
        <div onClick={()=>{
            props.setConfirmRidePannel(true)
        }} className='w-full bg-gray-100 flex active:border-2 border-black rounded-xl items-center justify-between  p-3 mb-2'>
          <img className='h-10' src="https://imgs.search.brave.com/rd8a_Sjk4Io-qjtxFxmx-FphzkQt8XeY6rH8fx61Oo8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAxNi8w/Ny9DYXItUE5HLnBu/Zw" alt="" />
          <div className='ml-2 w-1/2' >
            <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-fill"></i> 4 </span></h4>
            <h5 className='font-normal text-xs text-gray-600'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'><i className="ri-money-rupee-circle-line"></i>193.20</h2>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePannel(true)
        }} className='w-full flex active:border-2 bg-gray-100 border-black rounded-xl items-center justify-between  p-3 mb-2'>
          <img className='h-10' src="https://imgs.search.brave.com/1CY0USIoL_tWecHL3g2Qa1ekF00Cik2As-VVqSXMVGQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHNkLWdyYXR1aXRh/cy9tb3RvY2ljbGV0/YS1lbGV0cmljYS1h/bWFyZWxhLWVsZWdh/bnRlLXRyYW5zcG9y/dGUtZGUtZGVzaWdu/LW1vZGVybm9fNjMy/NDk4LTQ4NTUwLmpw/Zz9zZW10PWFpc19o/eWJyaWQ" alt="" />
          <div className='-ml-1 w-1/2' >
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-fill"></i> 1 </span></h4>
            <h5 className='font-normal text-xs text-gray-600'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, motorcycle ride</p>
          </div>
          <h2 className='text-xl font-semibold'><i className="ri-money-rupee-circle-line"></i>65</h2>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePannel(true)
        }} className='w-full flex active:border-2 bg-gray-100 border-black rounded-xl items-center justify-between  p-3 mb-2'>
          <img className='h-10' src="https://imgs.search.brave.com/67EOC9mRdwpFVukzNjLY-ZqwuxIPpauR933HXFkkhFU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wNy5o/aWNsaXBhcnQuY29t/L3ByZXZpZXcvNDA0/LzM3NC80NjcvYmFq/YWotYXV0by1jYXIt/YXV0by1yaWNrc2hh/dy1waWFnZ2lvLWFw/ZS1jYXItdGh1bWJu/YWlsLmpwZw" alt="" />
          <div className='-ml-4 w-1/2' >
            <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-fill"></i> 3 </span></h4>
            <h5 className='font-normal text-xs text-gray-600'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, Auto ride</p>
          </div>
          <h2 className='text-xl font-semibold'><i className="ri-money-rupee-circle-line"></i>115</h2>
        </div>
    </div>
  )
}

export default VehiclePannel
