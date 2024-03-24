import fs from 'fs'
import { createHotelSchema } from './../Schema/Joi'
import Booking, { BookingDocument } from '../models/Booking'
import Hotel, { HotelDocument } from '../models/Hotel'
import { RequestHandler, Response } from 'express'
import { CustomRequest } from '../Schema/Joi'
import { hotels } from '../data/hotels'

export const create = async (req: CustomRequest, res: Response) => {
  try {
    createHotelSchema.validate(req.body)

    let files = req.files
    let hotel = new Hotel(req.body) as HotelDocument

    hotel.postedBy = req.user._id
    // handle image
    if (files?.image) {
      // hotel.images.data = fs.readFileSync(files.image.path)
      // hotel.images[0].contentType = files.image.type
    }

    const newHotel = await hotel.save()
    res.json(newHotel)
  } catch (err: any) {
    console.log(err)
    res.status(400).json({
      err: err.message
    })
  }
}

export const fetchAllHotels: RequestHandler = async (req, res) => {
  let all = await Hotel.find({})
  res.json(all)
}

export const fetchHotelById: RequestHandler = async (req, res) => {
  // let hotel = await Hotel.findById(req.params.hotelId).exec()
  const hotel = hotels[0]
  res.json(hotel)
}

export const image: RequestHandler = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec()
  if (hotel && hotel.image && hotel.image.data !== null) {
    res.set('Content-Type', hotel.image.contentType)
    return res.send(hotel.image.data)
  }
}

export const sellerHotels: RequestHandler = async (req: any, res) => {
  let all = await Hotel.find({ postedBy: req.locals.user._id })
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec()
  res.send(all)
}

export const remove: RequestHandler = async (req, res) => {
  let removed = await Hotel.findByIdAndDelete(req.params.hotelId).select('-image.data').exec()
  res.json(removed)
}

export const read: RequestHandler = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId).populate('postedBy', '_id name').select('-image.data').exec()
  res.json(hotel)
}

export const update: RequestHandler = async (req: any, res) => {
  try {
    let fields = req.fields
    let files = req.files

    let data = { ...fields }

    if (files.image) {
      const image: any = {}
      image.data = fs.readFileSync(files.image.path)
      image.contentType = files.image.type
      data.image = image
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true
    }).select('-image.data')

    res.json(updated)
  } catch (err) {
    console.log(err)
    res.status(400).send('Hotel update failed. Try again.')
  }
}

export const userHotelBookings: RequestHandler = async (req: any, res) => {
  const all = await Booking.find({ bookedBy: req.locals.user._id })
    .select('session')
    .populate('hotel', '-image.data')
    .populate('orderedBy', '_id name')
    .exec()
  res.json(all)
}

export const isAlreadyBooked: RequestHandler = async (req: any, res) => {
  const { hotelId } = req.params
  // find orders of the currently logged in user
  const userBookings = await Booking.find({ bookedBy: req.locals.user._id }).select('hotel').exec()
  // check if hotel id is found in userBookings array
  let ids: BookingDocument[] = []
  for (let i = 0; i < userBookings.length; i++) {
    ids.push(userBookings[i].hotel.toString())
  }
  res.json({
    ok: ids.includes(hotelId)
  })
}

export const searchListings: RequestHandler = async (req, res) => {
  const { location, date, bed } = req.body

  const fromDate = date.split(',')
  let result = await Hotel.find({
    from: { $gte: new Date(fromDate[0]) },
    location
  })
    .select('-image.data')
    .exec()
  res.json(result)
}
