import { useContext } from "react"
import { authContext } from "../assets/auth/Context"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const { token } = useContext(authContext)
    if (!token) {
        return <Navigate to='/login' />
    }
    return token
        ? <Outlet />
        : <Navigate to='login' />
}
export default PrivateRoute;