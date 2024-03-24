import User from '../models/user'
import Stripe from 'stripe'
import queryString from 'query-string'
import Hotel from '../models/Hotel'
import { RequestHandler } from 'express'
import Booking from '../models/Booking'

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2020-08-27',
  typescript: true
})

const createConnectAccount: RequestHandler = async (req: any, res) => {
  const user = await User.findById(req.locals.user._id).exec()
  if (!user.stripe_account_id) {
    const account = await stripe.accounts.create({
      type: 'express'
    })
    user.stripe_account_id = account.id
    user.save()
  }
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: 'account_onboarding'
  })
  accountLink = Object.assign(accountLink, {
    'stripe_user[email]': user.email || undefined
  })
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`
  console.log('LOGIN LINK', link)
  res.send(link)
}

const updateDelayDays = async (accountId: string) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7
        }
      }
    }
  })
  return account
}

const getAccountStatus: RequestHandler = async (req: any, res) => {
  const user = await User.findById(req.locals.user._id).exec()
  const account = await stripe.accounts.retrieve(user.stripe_account_id)
  const updatedAccount = await updateDelayDays(account.id)
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount
    },
    { new: true }
  )
    .select('-password')
    .exec()
  res.json(updatedUser)
}

const getAccountBalance: RequestHandler = async (req: any, res) => {
  const user = await User.findById(req.locals.user._id).exec()

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id
    })
    res.json(balance)
  } catch (err) {
    console.log(err)
  }
}

const payoutSetting: RequestHandler = async (req: any, res) => {
  try {
    const user = await User.findById(req.locals.user._id).exec()

    const loginLink = await stripe.accounts.createLoginLink(user.stripe_account_id, {
      redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
    })
    res.json(loginLink)
  } catch (err) {
    console.log('STRIPE PAYOUT SETTING ERR ', err)
  }
}

const stripeSessionId: RequestHandler = async (req: any, res) => {
  const { hotelId } = req.body
  const item = await Hotel.findById(hotelId).populate('postedBy').exec()
  const fee = (item.price * 20) / 100
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        name: item.title,
        amount: item.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ],
    payment_intent_data: {
      application_fee_amount: fee * 100,
      transfer_data: {
        destination: item.postedBy.stripe_account_id
      }
    },
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL || ''
  })

  await User.findByIdAndUpdate(req.locals.user._id, {
    stripeSession: session
  }).exec()

  res.send({
    sessionId: session.id
  })
}

const stripeSuccess: RequestHandler = async (req: any, res) => {
  try {
    // 1 get hotel id from req.body
    const { hotelId } = req.body
    // 2 find currently logged in user
    const user = await User.findById(req.locals.user._id).exec()
    // check if user has stripeSession
    if (!user.stripeSession) return
    // 3 retrieve stripe session, based on session id we previously save in user db
    const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id)
    // 4 if session payment status is paid, create order
    if (session.payment_status === 'paid') {
      // 5 check if order with that session id already exist by querying orders collection
      const orderExist = await Booking.findOne({
        'session.id': session.id
      }).exec()
      if (orderExist) {
        // 6 if order exist, send success true
        res.json({ success: true })
      } else {
        // 7 else create new order and send success true
        let newOrder = await new Booking({
          hotel: hotelId,
          session,
          orderedBy: user._id
        }).save()
        // 8 remove user's stripeSession
        await User.findByIdAndUpdate(user._id, {
          $set: { stripeSession: {} }
        })
        res.json({ success: true })
      }
    }
  } catch (err) {
    console.log('STRIPE SUCCESS ERR', err)
  }
}

export { createConnectAccount, getAccountStatus, getAccountBalance, payoutSetting, stripeSessionId, stripeSuccess }
