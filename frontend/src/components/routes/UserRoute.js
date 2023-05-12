import React  from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'


const UserRoute = ({children}) => {

    const user  = useSelector((state) => state.userStore)
    console.log(user)
    return user && user.payload.token ? children : <LoadingToRedirect/>
}

export default UserRoute