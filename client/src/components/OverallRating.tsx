import React from 'react'
import { ratingGuide } from '../data/reviews'

const OverallRating = (props: { rating: number; totalReviews: number }) => {
  return (
    <div>
      <div className="flex flex-col items-end">
        <p className="flex gap-x-2 mb-0 items-center">
          <span className="text-xl text-gray-600 font-bold">
            {ratingGuide[Math.ceil(props.rating)]}
          </span>
          <span className="p-1 rounded-sm bg-blue-500 font-xs text-white font-semibold">
            {props.rating.toFixed(1)}
          </span>
        </p>
        <p className="text-gray-400">({props.totalReviews} reviews)</p>
      </div>
    </div>
  )
}

export default OverallRating
