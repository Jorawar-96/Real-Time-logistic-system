import React from 'react'

const LocationSearchPannel = (props) => {

  console.log(props)
  //sample array for location
  const locations = [
    "24B, Near Kapoor's cafe, Shreyians Coding School, Bhopal",
    "22B, Near Malhotra's cafe, Shreyians Coding School, Bhopal",
    "21B, Near Singhania's cafe, Shreyians Coding School, Bhopal",
    "20B, Near Prajapati's cafe, Shreyians Coding School, Bhopal"
  ]
  return (
    <div>
      {/*this is just an sample data*/}
      {
        locations.map(function(elem,idx){
          return <div key={idx} onClick={()=>{
            props.setVehiclePannel(true)
            props.setPannelOpen(false)
          }} className='flex border-gray-100 active:border-black gap-4 p-3 my-2 border-2 items-center rounded-xl justify-start'>
        <h2 className=' bg-[#eee] h-10 w-15 flex items-center justify-center rounded-full'><i className="ri-map-pin-line "></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }
    </div>
  )
}

export default LocationSearchPannel
