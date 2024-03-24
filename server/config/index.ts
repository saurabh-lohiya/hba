const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'
require('dotenv').config()

export const config = {
  secret: process.env.SECRET,
  port: process.env.PORT || 8080,
  db: process.env.DATABASE || '',
  cors: process.env.CORS || clientUrl,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET,
  clientUrl,
  stripeRedirectUrl: clientUrl + '/stripe/callback',
  stripeSettingRedirectUrl: clientUrl + '/dashboard/seller',
  stripeSuccessUrl: clientUrl + '/stripe/success',
  stripeCancelUrl: clientUrl + '/stripe/cancel'
}
