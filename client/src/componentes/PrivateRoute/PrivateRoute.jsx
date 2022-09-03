/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";


export default function PrivateRoute({children}){
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userState = useSelector(state => state.filter)
    console.log(userState)
    useEffect(() => {
    dispatch(getUserEmail(user?.email))
    
  }, [dispatch, user?.email])
  
  const handleClose = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  if(userState[0]?.banned) return <div style={{textAlign: 'center', fontSize: '40px'}}>
    <h1>Tienes el acceso prohibido</h1>
    <button onClick={handleClose}>Volver atras</button>
  </div>
  else{
    return <>{children}</>
  }
  // if(userState[0]?.email === 'pow.chorba@hotmail.com') {
  //   return <>{children}</> }
  // else{
  //   return <button>Algo salio mal <Link to='/home'>volver al inicio</Link></button>
  // } 
    
    
}

