import mongoose from 'mongoose'
import { HotelDocument } from './Hotel'
import { UserDocument } from './user'

const ObjectId = mongoose.Types.ObjectId

export enum PaymentStatus {
  Pending = 'pending',
  Completed = 'completed',
  Cancelled = 'cancelled',
  Refunded = 'refunded'
}

const BookingSchema = new mongoose.Schema(
  {
    hotel: {
      type: ObjectId,
      ref: 'Hotel'
    },
    pricing: {
      totalPrice: {
        type: Number,
        required: true
      },
      taxes: {
        type: Number,
        required: true
      }
    },
    bedsBooked: {
      type: Number,
      required: true
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    payment: {
      id: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true,
        enum: [PaymentStatus.Pending, PaymentStatus.Completed, PaymentStatus.Cancelled, PaymentStatus.Refunded],
        default: PaymentStatus.Pending
      }
    },
    bookedBy: { type: ObjectId, ref: 'User' }
  },
  { timestamps: true }
)

export interface BookingDocument extends mongoose.Document {
  hotel: HotelDocument
  pricing: {
    totalPrice: number
    taxes: number
  }
  bedsBooked: number
  payment: {
    id: string
    amount: number
    currency: string
    status: PaymentStatus
  }
  checkInDate: Date
  checkOutDate: Date
  session: any
  bookedBy: UserDocument
}

export default mongoose.model('Booking', BookingSchema)
