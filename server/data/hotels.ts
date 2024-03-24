import { amenities } from '../../client/src/data/interface'
import { hotel1Images, hotel2Images, hotel3Images } from '../assets/hotels'
import { reviews } from './reviews'

export const hotels = [
  {
    _id: '1',
    name: 'Hotel Silvenia',
    address: {
      address: '123, ABC Road',
      location:
        'https://www.google.com/maps/place/Kolkata,+West+Bengal/data=!4m2!3m1!1s0x39f882db4908f667:0x43e330e68f6c2cbc?sa=X&ved=1t:242&ictx=111',
      landmark: 'XYZ',
      city: 'Kolkata',
      country: 'India',
      state: 'West Bengal',
      zip: '700001',
      phone: '1234567890'
    },
    features: {
      content: 'lorem ipsum mostel nsnsye ahjsdhgbas shynshys xnuywsb svhns',
      features: [
        'lorem ipsum mostel nsnsye ahjsdhgbas shynshys xnuywsb svhns',
        'lorem ipsum mostel nsnsyen sjxcynn sxuysx njshsjhscn xcnhhsbhjj nsbhcns hgsjs bcj shdn vsjs  hjhdbs',
        'lorem ipsum mostel nsnsye hshsb'
      ],
      amenities: [amenities.wifi, amenities.parking, amenities.pool, amenities.ac, amenities.restaurant, amenities.gym]
    },
    bedCapacity: 13,
    pricing: {
      regular: 100,
      discountedPrice: 90,
      currency: 'INR'
    },
    rating: calculateHotelRating('1'),
    postedBy: '2',
    images: hotel1Images,
    reviews: getHotelReviews('1')
  },
  {
    _id: '2',
    name: 'Hotel Silvenia',
    address: {
      address: '123, ABC Road',
      location:
        'https://www.google.com/maps/place/Kolkata,+West+Bengal/data=!4m2!3m1!1s0x39f882db4908f667:0x43e330e68f6c2cbc?sa=X&ved=1t:242&ictx=111',
      landmark: 'XYZ',
      city: 'Kolkata',
      country: 'India',
      state: 'West Bengal',
      zip: '700001',
      phone: '1234567890'
    },
    features: {
      content: 'lorem ipsum mostel nsnsye',
      features: ['lorem ipsum mostel nsnsye', 'lorem ipsum mostel nsnsye'],
      amenities: [amenities.wifi, amenities.parking, amenities.pool, amenities.ac, amenities.restaurant, amenities.gym]
    },
    bedCapacity: 9,
    pricing: {
      regular: 100,
      discountedPrice: 90,
      currency: 'INR'
    },
    postedBy: '3',
    rating: calculateHotelRating('2'),
    images: hotel2Images,
    reviews: getHotelReviews('2')
  },
  {
    _id: '3',
    name: 'Hotel Sea View',
    address: {
      address: '123, ABC Road',
      location:
        'https://www.google.com/maps/place/Kolkata,+West+Bengal/data=!4m2!3m1!1s0x39f882db4908f667:0x43e330e68f6c2cbc?sa=X&ved=1t:242&ictx=111',
      landmark: 'XYZ',
      city: 'Goa',
      country: 'India',
      state: 'Goa',
      zip: '700001',
      phone: '1234567890'
    },
    features: {
      content: 'lorem ipsum mostel nsnsye',
      features: ['lorem ipsum mostel nsnsye'],
      amenities: [amenities.wifi, amenities.parking, amenities.pool, amenities.ac, amenities.restaurant, amenities.gym]
    },
    bedCapacity: 15,
    pricing: {
      regular: 100,
      discounted: 90,
      currency: 'INR'
    },
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
  const rating = hotelReviews.reduce((acc, item) => acc + item.rating, 0) / reviewsCount
  return rating
}
