import React from 'react'

const HotelImagesCarousal = props => {
  const { images } = props
  return (
    <div>
      <div className="flex-[30%] flex flex-col">
        {images?.[0] ? (
          <img
            src={images[0]}
            alt="default hotel image"
            className="h-[200px] w-full object-cover rounded-md"
          />
        ) : (
          <></>
        )}
        <div className="flex gap-[6px] mt-2">
          {images?.slice(0, 4).map((img, index) => (
            <img
              key={index}
              src={images[index + 1]}
              alt="default hotel image"
              className="h-[50px] w-[50px] object-cover rounded-md"
            />
          ))}
          {images?.length > 4 && (
            <img
              src="https://via.placeholder.com/900x500.png?text=MERN+Booking"
              alt="default hotel image"
              className="h-[50px] w-[50px] object-cover rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default HotelImagesCarousal
