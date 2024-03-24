import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { logger } from './../helpers/Logger'
import { HttpError } from '../helpers/BaseError'
import User, { UserDocument } from '../models/user'
import { createUserSchema } from '../Schema/Joi'

export const register = async (req: Request, res: Response) => {
  try {
    createUserSchema.validate(req.body, { abortEarly: true })
    const { email } = req.body

    let userExist = await User.findOne({ email }).exec()
    if (userExist) {
      throw new HttpError('Email is already taken!', 400)
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    req.body.password = hashedPassword
    const user = new User(req.body)
    await user.save()
    logger.info('User created successfully', user)
    return res.json({ ok: true })
  } catch (err: any) {
    logger.error('User registration failed', err)
    throw new HttpError(err?.message, 400)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    let user: UserDocument = await User.findOne({ email }).exec()

    if (!user) {
      throw new HttpError('User with that email not found', 400)
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new HttpError('Wrong password', 401, true, 'Unauthorized')
    }

    let token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        stripe_account_id: user.stripe_account_id,
        stripe_seller: user.stripe_seller,
        stripeSession: user.stripeSession
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '7d'
      }
    )

    res.json({
      token
    })
  } catch (err: any) {
    logger.error('User login failed', err)
    throw new HttpError(err?.message, 400)
  }
}
