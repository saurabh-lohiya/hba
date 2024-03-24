import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import { Link } from 'react-router-dom'
import Search from '../components/forms/SearchHotels'
import { searchListings } from '../helpers/hotel'
import HotelCard from '../components/cards/Hotel'

const SearchResult = () => {
  const [hotels, setHotels] = useState([])
  // TODO: Set Data to Redux Store
  useEffect(() => {
    const { location, date, bed } = queryString.parse(window.location.search)
    searchListings({ location, date, bed }).then(res => {
      console.log('SEARCH RESULTS ===>', res.data)
      setHotels(res.data)
    })
  }, [window.location.search])

  return (
    <>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container">
        <div className="row">
          {hotels.map((h: any) => (
            <HotelCard key={h._id} h={h} />
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchResult
