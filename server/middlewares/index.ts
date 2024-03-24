import Hotel from '../models/Hotel'
import { NextFunction, Request, Response } from 'express'
import { Role } from '../models/user'
import { HttpError } from '../helpers/BaseError'
import jwt from 'jsonwebtoken'
import { CustomRequest } from '../Schema/Joi'

export const AuthGuard = (role: Role) => (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.user.role !== role) {
    throw new HttpError(`Forbidden! Requires ${role} access`, 403)
  }
  next()
}

const requireSignin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    throw new HttpError('Access denied. No token provided', 401)
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '')
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

const hotelOwner = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec()
  let owner = hotel.postedBy._id.toString() === req.user._id.toString()
  if (!owner) {
    throw new HttpError('Forbidden', 403)
  }
  next()
}

export { requireSignin, hotelOwner }
