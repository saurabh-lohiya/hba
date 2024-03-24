import { amenities } from '../../client/src/data/interface'
import mongoose from 'mongoose'

const { Schema } = mongoose
const ObjectId = mongoose.Types.ObjectId

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Title is required'
    },
    address: {
      address: {
        type: String,
        required: 'Address is required'
      },
      landmark: {
        type: String
      },
      location: {
        type: String
      },
      city: {
        type: String,
        required: 'City is required'
      },
      state: {
        type: String,
        required: 'State is required'
      },
      country: {
        type: String,
        required: 'Country is required'
      },
      zip: {
        type: String,
        required: 'Zip is required'
      },
      phone: {
        type: String,
        required: 'Phone is required'
      },
      email: {
        type: String
      }
    },
    active: {
      type: Boolean,
      default: true
    },
    features: {
      content: {
        type: String,
        maxlength: 1000
      },
      amenities: {
        type: [String],
        required: 'Amenities are required'
      }
    },
    postedBy: {
      type: String,
      required: 'Posted by is required'
    },
    images: {
      type: [Buffer],
      required: 'Images are required',
      validate: {
        validator: (v: Buffer[]) => Array.isArray(v) && v.length > 0,
        message: 'Image is required'
      }
    },
    bedCapacity: {
      type: Number,
      required: 'Bed capacity is required'
    },
    pricing: {
      discountedPrice: {
        type: Number,
        required: 'Discounted price is required'
      },
      regular: {
        type: Number,
        required: 'Price per night is required'
      },
      currency: {
        type: String,
        required: 'Currency is required'
      }
    }
  },
  { timestamps: true }
)

export default mongoose.model('Hotel', hotelSchema)

interface HotelDocument extends mongoose.Document {
  _id: string
  name: string
  address: {
    address: string
    landmark?: string
    location: string
    city: string
    state: string
    country: string
    zip: string
    phone: string
    email?: string
  }
  features: {
    content: string
    features: string[]
    amenities: amenities[]
  }
  postedBy: string
  images?: Buffer[]
  bedCapacity: number
  pricing: {
    discountedPrice: number
    regular: number
    currency: string
  }
  active: boolean
  reviews: string[]
  rating: number
  createdAt: string
  updatedAt: string
}

export { HotelDocument }
