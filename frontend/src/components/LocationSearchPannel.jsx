import React from 'react'

const LocationSearchPannel = ({
  suggestions = [],
  setPannelOpen,
  setVehiclePannel,
  setPickup,
  setDestination,
  activeField,
  setSuggestions
}) => {
  
  return (
    <div>
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (activeField === 'pickup') setPickup(item.display_name)
              if (activeField === 'destination') setDestination(item.display_name)
              setPannelOpen(false)
              setVehiclePannel(true)
              setSuggestions([])
            }}
            className='flex border-gray-100 active:border-black gap-4 p-3 my-2 border-2 items-center rounded-xl justify-start'
          >
            <h2 className=' bg-[#eee] h-10 w-15 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-line "></i>
            </h2>
            <h4 className='font-medium'>{item.display_name}</h4>
          </div>
        ))
      ) : (
        <div className='text-gray-400 text-center'>No suggestions</div>
      )}
    </div>
  )
}

export default LocationSearchPannel
