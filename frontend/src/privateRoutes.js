import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PrivateRouter = ({children}) => {
    const userLoggedIn  = useSelector(state=> state.userReducer.user)
    if(userLoggedIn){
        return children
    }
    else{
        return(
            <Navigate to="/login"/>
        )
    }
}