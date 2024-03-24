import express from 'express'
import { readdirSync } from 'fs'
import cors from 'cors'
import mongoose from 'mongoose'
import { errorHandler } from './middlewares/ErrorHandler'
import { config } from './config'
import { authRouter, hotelRouter, bookingRouter, stripeRouter } from './routes'

const app = express()

if (!process.env.JWT_SECRET) {
  // TODO: add for all important env variables
  console.log('JWT_SECRET is not defined')
  process.exit(1)
}

mongoose
  .connect(process.env.DATABASE || '', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('DB Connected'))
  .catch(err => console.log('DB Connection Error: ', err))

app.use(cors())
app.use(express.json())

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
  throw reason
})

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error)
  if (!errorHandler.isTrustedError(error)) {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...', error)
    process.exit(1)
  }
})

app.use('/api/auth', authRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/bookings', bookingRouter)
app.use('/api/stripe', stripeRouter)

app.listen(config.port, () => console.log(`Server is running on port ${config.port}`))
