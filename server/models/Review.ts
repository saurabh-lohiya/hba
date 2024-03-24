import mongoose from 'mongoose'

const { Schema } = mongoose

const reviewSchema = new Schema(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: {
      type: String,
      required: 'Review is required'
    },
    rating: {
      type: Number,
      required: 'Rating is required'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Review', reviewSchema)

export interface ReviewDocument extends mongoose.Document {
  hotelId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}
