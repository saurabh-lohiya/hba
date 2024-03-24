import express from 'express'
import formidable from 'express-formidable'
import { requireSignin, hotelOwner } from '../middlewares'
import {
  create,
  image,
  sellerHotels,
  remove,
  read,
  update,
  userHotelBookings,
  isAlreadyBooked,
  searchListings,
  fetchAllHotels
} from '../controllers/hotel'

const hotelRouter = express.Router()

hotelRouter.get('/:hotelId', read)
// TODO
// hotelRouter.get('/reviews/:hotelId')
hotelRouter.post('/', requireSignin, create)
hotelRouter.put('/:hotelId', requireSignin, hotelOwner, formidable(), update)
hotelRouter.delete('/:hotelId', requireSignin, hotelOwner, remove)
hotelRouter.get('', fetchAllHotels)
// TODO:
// Get the images through CDN
// hotelRouter.get('/hotel/image/:hotelId', image)
// hotelRouter.get('/seller-hotels', requireSignin, sellerHotels)
// hotelRouter.get('/user-hotel-bookings', requireSignin, userHotelBookings)
// hotelRouter.get('/is-already-booked/:hotelId', requireSignin, isAlreadyBooked)
// hotelRouter.post('/search-listings', searchListings)

export default hotelRouter
