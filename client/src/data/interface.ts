export interface IHotel {
  _id: string
  title: string
  location: string
  city: string
  area: string
  address: string
  landmark: string
  features: string[]
  content: string
  bedCapacity: number
  pricePerNight: number
  discountedPrice: number
  images: string[]
  postedBy: string
  rating?: number
  amenities?: string[]
  reviews?: IReview[]
}

export interface IReview {
  _id: string
  userId: string
  hotelId: string
  rating: number
  comment: string
  createdAt: string
}

export interface IUser {
  name: string
  email: string
  role: string
  token: string
  _id: string
  stripe_account_id: string
  stripe_seller: {
    charges_enabled: boolean
    payouts_enabled: boolean
  }
  createdAt: string
  updatedAt: string
}

export enum amenities {
  wifi = 'wifi',
  parking = 'parking',
  pool = 'pool',
  ac = 'ac',
  restaurant = 'restaurant',
  gym = 'gym',
  smokeFree = 'smokeFree',
  petFriendly = 'petFriendly',
  roomService = 'roomService',
  spa = 'spa',
  bar = 'bar',
  laundry = 'laundry',
  conference = 'conference',
  banquet = 'banquet',
  airportShuttle = 'airportShuttle',
  breakfast = 'breakfast'
}
