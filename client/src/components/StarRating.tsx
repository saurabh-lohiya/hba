import React from 'react'

const StarRating = (props: { rating: number }) => {
  let { rating } = props
  rating = Math.round((rating * 2) / 2)
  let blackStars = 5 - rating
  return (
    <div className="flex gap-[4px]">
      {Array.from({ length: rating }, (_, i) => (
        <span key={i} className="text-yellow-400">
          ★
        </span>
      ))}
      {Array.from({ length: blackStars }, (_, i) => (
        <span key={i} className="text-gray-400">
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
