import { create } from './../controllers/hotel'
import { Request } from 'express'
import Joi from 'joi'

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(64).required(),
  role: Joi.string().valid('user', 'admin').default('user')
})

export const createHotelSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.object({
    address: Joi.string().required(),
    landmark: Joi.string(),
    location: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email()
  }),
  active: Joi.boolean().default(true),
  features: Joi.object({
    content: Joi.string().max(1000),
    amenities: Joi.array().items(Joi.string()).required()
  }),
  images: Joi.array().items(Joi.string()),
  bedCapacity: Joi.number().required(),
  pricing: Joi.object({
    regular: Joi.number().required(),
    discountedPrice: Joi.number(),
    currency: Joi.string().default('INR')
  })
})
export interface CustomRequest extends Request {
  user?: any
}
