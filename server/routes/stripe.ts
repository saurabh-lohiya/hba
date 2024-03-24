import express from 'express'
import { requireSignin } from '../middlewares'
import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSessionId,
  stripeSuccess
} from '../controllers/stripe'

const stripeRouter = express.Router()
stripeRouter.post('/create-connect-account', requireSignin, createConnectAccount)
stripeRouter.post('/get-account-status', requireSignin, getAccountStatus)
stripeRouter.post('/get-account-balance', requireSignin, getAccountBalance)
stripeRouter.post('/payout-setting', requireSignin, payoutSetting)
stripeRouter.post('/stripe-session-id', requireSignin, stripeSessionId)
// order
stripeRouter.post('/stripe-success', requireSignin, stripeSuccess)

export default stripeRouter
