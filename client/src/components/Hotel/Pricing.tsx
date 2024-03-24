import React from 'react'
import { currencyFormatter } from '../../helpers/stripe'

const HotelPricing = (props: {
  pricePerNight: number
  discountedPricePerNight: number
}) => {
  const { pricePerNight, discountedPricePerNight } = props

  return (
    <div className="text-lg text-gray-800 flex flex-col items-end">
      <del className="text-gray-400 text-sm">
        {currencyFormatter({
          amount: pricePerNight * 100,
          currency: 'inr'
        })}{' '}
      </del>
      <span className="text-2xl font-bold">
        {currencyFormatter({
          amount: props.discountedPricePerNight * 100,
          currency: 'inr'
        })}
      </span>
      <span className="flex text-sm text-gray-400 text-end">
        +{' '}
        {currencyFormatter({
          amount: discountedPricePerNight * 10,
          currency: 'inr'
        })}{' '}
        taxes & fees per night
      </span>
      <span className="text-blue-500 text-[11px] text-end font-semibold self-end">
        Login To Book Now & Pay Later!
      </span>
    </div>
  )
}

export default HotelPricing
