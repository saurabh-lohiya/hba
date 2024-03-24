import express from 'express'

const bookingRouter = express.Router()

bookingRouter.get('/hotel/:hotelId')
bookingRouter.get('/user/:hotelId')
bookingRouter.post('/create/:hotelId')
bookingRouter.delete('/:bookingId')
bookingRouter.put('/:bookingId')

export default bookingRouter
