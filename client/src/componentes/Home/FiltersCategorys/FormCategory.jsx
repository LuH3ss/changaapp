import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
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
        if(cat === ''){
            setCat(e.target.value);
        }
        else if(cat !== e.target.value){
            document.getElementById(cat).checked = false;
            setCat(e.target.value);
        }
    }
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if(cat === '') {
           return navigate(`/home/todos`)
        }
        navigate(`/home/${cat}`)
    }

    return(
        <div>
            <form onSubmit={e => handleOnSubmit(e)}>
                <div>
                    <label>Todos</label>
                    <input id="todos" type="radio" value='todos' onChange={(e)=>handleOnClick(e)}/>
                </div>
                {
                    categoryState.map(el => {
                        return(
                            <div key={el.id}>
                                <label>{el.name}</label>
                                <input id={el.name} type="radio" value={el.name} name={el.name} onChange={(e)=>handleOnClick(e)}/>
                            </div>
                        )
                    })
                }
                <button type="submit">Filtrar</button>
            </form>
        </div>)
}