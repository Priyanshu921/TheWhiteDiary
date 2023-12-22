import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import {Navbar} from "./components/Navbar/Navbar.jsx"
export const PrivateRouter = ({children}) => {
    const userLoggedIn  = useSelector(state=> state.userReducer.user)
    if(userLoggedIn){
        return (<Navbar>{children}</Navbar>)
    }
    else{
        return(
            <Navigate to="/login"/>
        )
    }
}