import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { getAllReviews, getUserEmail } from "../../redux/actions";
import Rating from "@mui/material/Rating";
import styles from './Request/style'

export default function ProfileRev(){
    const { user } = useAuth()
    let allReviews = useSelector(state => state.reviews)
    const userDb = useSelector(state => state.filter)
    allReviews = allReviews.filter(r => r.user_id === userDb[0]?.id)
    const dispatch = useDispatch()
    console.log(userDb)
    console.log(allReviews)

    //Paginado para las reviews
  const paginas = Math.ceil(allReviews.length / 3)
  const [pages, setPages] = useState(1)
  const [notisPerPage] = useState(3)
  const ultima = pages * notisPerPage
  const primera = ultima - notisPerPage
  const revSlice = allReviews.slice(primera, ultima)

  const handleAnterior = (e) => {
    e.preventDefault()
    setPages(pages - 1)
      if(pages < 2){
        setPages(1)
      }
      window.scrollTo(0,0)
  }

  const handleSiguiente = () => {
    setPages(pages + 1)
    if(pages >= paginas){
      setPages(paginas)
    }
    window.scrollTo(0,0)
}

    useEffect(() => {
        dispatch(getUserEmail(user?.email))
        dispatch(getAllReviews())
    }, [dispatch, user?.email])
    // console.log()
    return(
        <div>
            {
                allReviews.length === 0 ? <p>No recibiste reseñas por el momento</p>
                : revSlice.map(e => {
                    return( 
                        <div key={e.id}>
                            <h4>Autor: {e.author?.firstName} {e.author?.lastName}</h4>
                            <img src={e.author?.img} alt="Rompio" width='100px' height='100px' />
                            <span>Mensaje: {e.message}</span>
                            <p>Calificacion: <Rating
                            defaultValue={e.rate} 
                            readOnly
                            /></p>
                        </div>)
                })
            }
            <div style={styles.paginadoDiv}>
          <button style={styles.btnPaginado} onClick={handleAnterior}>{'<'}</button>
          {pages} of {paginas}
          <button style={styles.btnPaginado} onClick={handleSiguiente}>{'>'}</button>
        </div>
        </div>)
}