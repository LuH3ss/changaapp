import React from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";



export default function PrivateRoute({children}){
    const {user} = useAuth()
    
    const dispatch = useDispatch()
    const userState = useSelector(state => state.filter)
    console.log(userState)
    useEffect(() => {
    dispatch(getUserEmail(user?.email))
    
  }, [dispatch, user?.email])
    
  
    

  if(userState[0]?.email === 'pow.chorba@hotmail.com') {
    return <>{children}</> }
  else{
    return <button>Algo salio mal <Link to='/home'>volver al inicio</Link></button>
  } 
    
    
}