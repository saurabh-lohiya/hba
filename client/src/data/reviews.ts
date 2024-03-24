import { IReview } from './interface'

export const reviews: IReview[] = [
  {
    _id: '1',
    userId: '1',
    hotelId: '1',
    rating: 4,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  {
    _id: '2',
    userId: '2',
    hotelId: '1',
    rating: 5,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  {
    _id: '3',
    userId: '3',
    hotelId: '1',
    rating: 3,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  // Create reviews for hotel 2 and 3
  {
    _id: '4',
    userId: '1',
    hotelId: '2',
    rating: 4,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  {
    _id: '5',
    userId: '2',
    hotelId: '2',
    rating: 5,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  {
    _id: '6',
    userId: '3',
    hotelId: '2',
    rating: 3,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  {
    _id: '7',
    userId: '1',
    hotelId: '3',
    rating: 4,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  {
    _id: '8',
    userId: '2',
    hotelId: '3',
    rating: 5,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  },
  {
    _id: '9',
    userId: '3',
    hotelId: '3',
    rating: 3,
    comment: 'lorem ipsum',
    createdAt: '2021-09-01'
  }
]

export const ratingGuide = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent'
}
