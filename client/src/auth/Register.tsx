import { toast } from 'react-toastify'
import { register as registerNewUser } from '../helpers/auth'
import { useForm } from 'react-hook-form'

type IRegisterInputs = {
  name: string
  email: string
  password: string
}

const Register = ({ history }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IRegisterInputs>()

  const onSubmit = async (data: IRegisterInputs) => {
    const { name, email, password } = data
    try {
      const res = await registerNewUser({
        name,
        email,
        password
      })
      if (res.status === 201) {
        toast.success('Register success. Please login.')
        history.push('/login')
      }
    } catch (err: any) {
      console.log(err)
      toast.error(err.response.data)
    }
  }

  return (
    <div className="flex flex-col items-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 min-w-[400px] max-w-[600px]"
      >
        <div className="flex flex-col">
          <input
            placeholder="Name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="p-2 rounded-sm border-2 border-gray-400"
          />
          {errors.name && (
            <span className="px-2 text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            placeholder="Email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
            })}
            className="p-2 rounded-sm border-2 border-gray-400"
          />
          {errors.email && (
            <span className="px-2 text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            placeholder="Password"
            type="password"
            className="p-2 rounded-sm border-2 border-gray-400"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long'
              }
            })}
          />
          {errors.password && (
            <span className="px-2 text-red-500">{errors.password.message}</span>
          )}
        </div>
        <input
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold border-none rounded-md cursor-pointer hover:bg-blue-600"
        />
      </form>
    </div>
  )
}

export default Register
