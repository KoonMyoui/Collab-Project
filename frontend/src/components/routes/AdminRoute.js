import React,{ useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

import { currentAdmin } from '../functions/auth'

const AdminRoute = ({children}) => {

  const user  = useSelector((state) => (state.userStore))
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
    if (user && user.payload.token){
      currentAdmin(user.payload.token)
      .then(res=>{
        console.log(res)
        setIsAdmin(true)
      }).catch((err)=>{
        console.log(err)
        setIsAdmin(false)
      })
    }
  },[user])

  return isAdmin ? children : <LoadingToRedirect />
}

export default AdminRoute