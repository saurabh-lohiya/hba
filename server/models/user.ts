import mongoose from 'mongoose'

const { Schema } = mongoose
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required'
    },
    email: {
      type: String,
      trim: true,
      required: 'Email is required',
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin']
    },
    stripe_account_id: '',
    stripe_seller: {},
    stripeSession: {}
  },
  { timestamps: true }
)

// fancy stuff we don't need
// userSchema.pre<UserDocument>('save', async function (next) {
//   let user = this
//   if (user.isModified('password')) {
//     const salt = await bcrypt.genSalt(10)
//     user.password = await bcrypt.hash(user.password, salt)
//   }
//   next()
// })

export default mongoose.model('User', userSchema)

interface UserDocument extends mongoose.Document {
  name: string
  email: string
  password: string
  role: Role
  stripe_account_id: string
  stripe_seller: any
  stripeSession: any
  createdAt: any
  updatedAt: any
}

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export { UserDocument }
