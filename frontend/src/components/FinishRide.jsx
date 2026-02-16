import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {
    const navigate = useNavigate();

    async function endRide(){
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
            rideId:props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.status === 200) {
            navigate('/captain-home');
        }
    }
  return (
    <div >
      <h5 className='p-1 text-center absolute top-0  w-[93%]' onClick={()=>{
          props.setFinishRidePannel(false);
        }}><i className=" text-3xl text-gray-200 ri-arrow-down-s-line"></i></h5>
        <h3 className='text-2xl font-semibold mb-7'>Finish Ride</h3>
        
        <div className='flex items-center justify-between m-2 p-2 border-2 border-yellow-400 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-12 object-cover rounded-full' src="https://imgs.search.brave.com/6gwE4nDkd3aIpCMWWqe7vEm0ljUVvVyPl_eb8NB8-_k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTAy/NDY5MTA2L3Bob3Rv/L2ZsZXhpYmlsaXR5/LWluLWJ1c2luZXNz/LW1lYW5zLXN1Y2Nl/c3MuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTRaTXFveVdI/WDNxNEJiS0VRUXdK/VGViLVNubmc4VDZ4/cnR3My11X2w2cFk9" alt="" />
                <h2 className='text-lg font-medium '>{props.ride?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 Km</h5>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
            <div className='w-full'>
                <div className='flex gap-3 items-center p-3 border-b-2'>
                    <i className="ri-map-pin-user-fill"></i>
                    <div>
                        <h3 className=' text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-700'>{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className='flex gap-3 items-center p-3 border-b-2'>
                    <i className=" text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className=' text-lg font-bold'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-700'>{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex gap-3 items-center p-3'>
                    <i className="ri-money-rupee-circle-line"></i>
                    <div>
                        <h3 className=' text-lg font-bold'>₹{props.ride?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-700'>Cash only</p>
                    </div>
                </div>
            </div>
            <div className='mt-10 w-full'>

                <button
                    onClick={endRide}
                    className='w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>
                        Finish Ride
                </button>


            </div>

        </div>
    </div>
  )
}

export default FinishRide
