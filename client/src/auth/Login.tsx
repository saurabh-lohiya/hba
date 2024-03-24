import { login } from '../helpers/auth'
import { useDispatch } from 'react-redux'
import { SubmitHandler, useForm } from 'react-hook-form'

type LoginInputs = {
  email: string
  password: string
}

const Login = ({ history }) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = async data => {
    const { email, password } = data
    let res = await login({ email, password })

    if (res.data) {
      localStorage.setItem('auth', JSON.stringify(res.data))
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: res.data
      })
      history.push('/dashboard')
    }
  }
  return (
    <div className="w-full flex flex-col justify-center items-center px-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 min-w-[400px] max-w-[600px]"
      >
        <div className="flex flex-col">
          <input
            placeholder="abc@example.com"
            {...register('email', { required: 'Email is required' })}
            className="p-2 rounded-sm border-2 border-gray-400"
          />
          {errors.email && (
            <span className="px-2 text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col">
          <input
            placeholder="*********"
            className="p-2 rounded-sm border-2 border-gray-400"
            {...register('password', {
              required: 'Password is required'
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

export default Login
