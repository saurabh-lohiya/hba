import { useState, useEffect } from 'react'
import { allHotels } from '../helpers/hotel'
import HotelCard from '../components/cards/Hotel'
import Search from '../components/forms/SearchHotels'
import travelBg from '../assets/travel-landscape.jpg'
import { IHotel } from '../data/interface'
import { hotels as dummyHotels } from '../data/hotels'

const Home = () => {
  const [hotels, setHotels] = useState<IHotel[]>([])

  useEffect(() => {
    loadAllhotels()
  }, [])

  const loadAllhotels = async () => {
    // let res = await allHotels()
    setHotels(dummyHotels)
  }

  function deleteHotelListing(hotelId: string) {
    console.log('delete hotel', hotelId)
  }

  return (
    <>
      <img src={travelBg} alt="" className="w-full h-[280px]" />
      <div className="col">
        <Search />
      </div>
      <div className="flex flex-col gap-4 my-1.5">
        {[...hotels].map((h: IHotel, index) => (
          <HotelCard key={index} h={h} handleDeleteHotel={deleteHotelListing} />
        ))}
      </div>
    </>
  )
}

export default Home
