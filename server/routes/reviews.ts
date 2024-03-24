import express from 'express'
import { createReview, deleteReview, getAllReviews, getReview, updateReview } from '../controllers/controller'
import { requireSignin } from '../middlewares'

const reviewsRouter = express.Router()

reviewsRouter.get('/hotel/:hotelId', getAllReviews)
reviewsRouter.get('/:reviewId', getReview)
reviewsRouter.get('/')
reviewsRouter.post('/create', requireSignin, createReview)
reviewsRouter.delete('/:reviewId', requireSignin, deleteReview)
reviewsRouter.put('/:reviewId', requireSignin, updateReview)

export default reviewsRouter
