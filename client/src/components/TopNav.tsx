import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

const TopNav = () => {
	const dispatch = useDispatch()
	const { auth } = useSelector((state) => ({ ...state }))
	const history = useHistory()

	const logout = () => {
		dispatch({
			type: "LOGOUT",
			payload: null,
		})
		window.localStorage.removeItem("auth")
		history.push("/login")
	}

	return (
		<div className='w-full px-5 py-2 flex justify-between'>
			<Link className='nav-link text-xl font-semibold' to='/'>
				Home
			</Link>

			{auth !== null && (
				<Link className='nav-link text-xl font-semibold' to='/dashboard'>
					Dashboard
				</Link>
			)}

			{auth !== null && (
				<Link
					to='#'
					className='nav-link pointer text-xl font-semibold'
					onClick={logout}>
					Logout
				</Link>
			)}

			{auth === null && (
				<>
					<Link className='nav-link text-xl font-semibold' to='/login'>
						Login
					</Link>
					<Link className='nav-link text-xl font-semibold' to='/register'>
						Register
					</Link>
				</>
			)}
		</div>
	)
}

export default TopNav
