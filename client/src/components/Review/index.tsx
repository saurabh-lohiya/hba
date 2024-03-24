import React from 'react'
const Review = props => {
  const { userId, hotelId, rating, content } = props

  return (
    <div className="b-2 border-gray-500 rounded-sm ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="text-sm font-semibold text-gray-800">{userId}</div>
            <div className="text-xs font-semibold text-gray-500 ml-1">
              - {hotelId}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="text-sm font-semibold text-gray-800">{rating}</div>
          <div className="text-xs font-semibold text-gray-500 ml-1">stars</div>
        </div>
      </div>
      <div className="text-sm text-gray-800 mt-2">{content}</div>
    </div>
  )
}

export default Review
