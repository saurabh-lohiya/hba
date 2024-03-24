import { NextFunction, Response } from 'express'
import { CustomRequest } from '../Schema/Joi'
import Review from '../models/Review'
import { HttpError } from '../helpers/BaseError'

export async function getAllReviews(req: CustomRequest, res: Response, next: NextFunction) {
  const reviews = await Review.find({}).exec()
  res.json({ success: true, data: reviews })
}

export async function getReview(req: CustomRequest, res: Response, next: NextFunction) {
  const review = await Review.findById(req.params.reviewId).exec()
  res.json({ success: true, data: review })
}

export async function createReview(req: CustomRequest, res: Response, next: NextFunction) {
  // TODO: User Must have stayed in the hotel to review
  const reviewBody = req.body
  reviewBody.postedBy = req.user._id
  const review = new Review(reviewBody)
  await review.save()
  res.status(201).json({ success: true, data: review })
}

export async function updateReview(req: CustomRequest, res: Response, next: NextFunction) {
  const { reviewId } = req.params
  //   user must be the owner of the review
  const review = await Review.findById(reviewId).exec()
  const isValidUser = req.user._id === review.postedBy
  if (!isValidUser) {
    throw new HttpError('User Can only update his own reviews', 403)
  }

  const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, { new: true }).exec()
  res.status(200).json({ success: true, data: updatedReview })
}

export async function deleteReview(req: CustomRequest, res: Response, next: NextFunction) {
  // user must be the owner of the review
  const review = await Review.findById(req.params.reviewId).exec()
  const isValidUser = req.user._id === review.postedBy
  if (!isValidUser) {
    throw new HttpError('User Can only delete his own reviews', 403)
  }
  await Review.findByIdAndDelete(req.params.reviewId).exec()
  res.sendStatus(204)
}

export async function getReviewByHotel(req: CustomRequest, res: Response, next: NextFunction) {
  const reviews = await Review.find({ hotel: req.params.hotelId }).exec()
  res.status(200).json({ success: true, data: reviews })
}
