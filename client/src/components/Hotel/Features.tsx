import React from 'react'
import Tick from '../assets/tick-light.svg'

const HotelFeatures = (props: { features: string[] }) => {
  const { features } = props
  return (
    <>
      {features && (
        <div className="flex flex-col gap-2">
          {features?.map((f, index) => (
            <div className="flex gap-2 mb-0">
              <img src={Tick} alt="" style={{ width: '14px' }} />
              <span key={index} className="text-sm text-[#00a19c]">
                {f}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default HotelFeatures
