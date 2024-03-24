import { hotel1Images, hotel2Images, hotel3Images } from '../assets/hotels'
import { IHotel } from './interface'
import { reviews } from './reviews'

export const hotels: IHotel[] = [
  {
    _id: '1',
    title: 'Hotel Silvenia',
    location:
      'https://www.google.com/maps/place/Kolkata,+West+Bengal/data=!4m2!3m1!1s0x39f882db4908f667:0x43e330e68f6c2cbc?sa=X&ved=1t:242&ictx=111',
    area: 'Salt Lake',
    address: '123, ABC Road',
    landmark: 'XYZ',
    amenities: ['wifi', 'parking', 'pool', 'ac', 'restaurant', 'gym'],
    features: [
      'lorem ipsum mostel nsnsye ahjsdhgbas shynshys xnuywsb svhns',
      'lorem ipsum mostel nsnsyen sjxcynn sxuysx njshsjhscn xcnhhsbhjj nsbhcns hgsjs bcj shdn vsjs  hjhdbs',
      'lorem ipsum mostel nsnsye hshsb'
    ],
    content: 'lorem ipsum',
    bedCapacity: 13,
    pricePerNight: 100,
    discountedPrice: 90,
    rating: calculateHotelRating('1'),
    postedBy: '2',
    images: hotel1Images,
    reviews: getHotelReviews('1'),
    city: 'Kolkata'
  },
  {
    _id: '2',
    title: 'Hotel Silvenia',
    city: 'Kolkata',
    location:
      'https://www.google.com/maps/place/Kolkata,+West+Bengal/data=!4m2!3m1!1s0x39f882db4908f667:0x43e330e68f6c2cbc?sa=X&ved=1t:242&ictx=111',
    area: 'Salt Lake',
    address: '123, ABC Road',
    landmark: 'XYZ',
    amenities: ['wifi', 'parking', 'pool', 'ac', 'restaurant', 'gym'],
    features: ['lorem ipsum mostel nsnsye', 'lorem ipsum mostel nsnsye'],
    content: 'lorem ipsum',
    bedCapacity: 9,
    pricePerNight: 100,
    discountedPrice: 90,
    postedBy: '3',
    rating: calculateHotelRating('2'),
    images: hotel2Images,
    reviews: getHotelReviews('2')
  },
  {
    _id: '3',
    title: 'Hotel Sea View',
    city: 'Goa',
    location:
      'https://www.google.com/maps/place/Kolkata,+West+Bengal/data=!4m2!3m1!1s0x39f882db4908f667:0x43e330e68f6c2cbc?sa=X&ved=1t:242&ictx=111',
    area: 'Salt Lake',
    address: '123, ABC Road',
    landmark: 'XYZ',
    amenities: ['wifi', 'parking', 'pool', 'ac', 'restaurant', 'gym'],
    features: [
      'lorem ipsum mostel nsnsye',
      'lorem ipsum mostel nsnsye',
      'asds jynew gssnu2nnms nnnn'
    ],
    content: 'lorem ipsum',
    bedCapacity: 11,
    pricePerNight: 100,
    discountedPrice: 90,
    postedBy: '2',
    rating: calculateHotelRating('3'),
    images: hotel3Images,
    reviews: getHotelReviews('3')
  }
]

function getHotelReviews(hotelId: string) {
  return reviews.filter(r => r.hotelId === hotelId)
}

function calculateHotelRating(hotelId: string) {
  const hotelReviews = getHotelReviews(hotelId)
  const reviewsCount = hotelReviews.length
  if (reviewsCount === 0) return 0
  const rating =
    hotelReviews.reduce((acc, item) => acc + item.rating, 0) / reviewsCount
  return rating
}

function getHotelImages(hotelId: string) {
  return hotels.find(h => h._id === hotelId)?.images
}
