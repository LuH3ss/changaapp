import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions";

export default function FormCategory(){
    const categoryState = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const [cat, setCat] = useState('')    
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllCategories())
        
    }, [dispatch])


    const handleOnClick = (e) => {
        e.preventDefault()
        setCat(e.target.value)
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        
        navigate(`/home/${cat}`)
    }

    return(
        <div>
            <form onSubmit={e => handleOnSubmit(e)}>
                <div>
                    <label>Todos</label>
                    <input type="radio" value='todos' onChange={handleOnClick} checked={cat === 'todos' ? true : false}/>
                </div>
                {
                    categoryState.map(e => {
                        return(
                            <div key={e.id}>
                                <label>{e.name}</label>
                                <input type="radio" value={e.name} name={e.name} onChange={handleOnClick} checked={cat === e.name ? true : false}/>
                            </div>
                        )
                    })
                }
                <button>Filtrar</button>
            </form>
        </div>)
}