import { NextFunction, Response } from 'express'
import { CustomRequest } from '../Schema/Joi'
import Booking from '../models/Booking'
import { HttpError } from '../helpers/BaseError'

export const deleteBooking = async (req: CustomRequest, res: Response, NextFunction) => {
  const { bookingId } = req.params
  try {
    const booking = await Booking.findById(bookingId).exec()
    if (!booking) {
      throw new HttpError('Booking not found', 404)
    }
    // check if the user is the owner of the booking
    if (booking.session.userId !== req.user._id) {
      throw new HttpError('Unauthorized', 403)
    }
    // check if the cancellation date is atleast 7 days before the checkInDate
    const isRefundable = booking.checkInDate.valueOf() - new Date().valueOf() > 7 * 24 * 60 * 60 * 1000
    if (isRefundable) {
      booking.payment.status = 'cancelled'
      await booking.save()
      //   make a refund to the user
      //   await stripe.refunds.create({
      //     charge: booking.payment.id
      //   })
    }
    res.json({ ok: true })
  } catch (err: any) {
    throw new HttpError(err.message, 400)
  }
}
