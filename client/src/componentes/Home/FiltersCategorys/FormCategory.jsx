import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getAllCategories, getAllServices, sortServices } from "../../../redux/actions";

export default function FormCategory(){
    const categoryState = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const [cat, setCat] = useState('')
    const [ setSelect] = useState('')    
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllServices())
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

    const handleSort = (e) => {
        setSelect(e.target.value);
        dispatch(sortServices(e.target.value));
      };
    
    return(
        <div style={{ textAlign: 'center'}}>
            <select name="precios" onChange={handleSort}>
                <option value="neutro">Precios</option>
                <option value="mayor">Mayor precio</option>
                <option value="menor">Menor precio</option>
            </select>
            <form onSubmit={e => handleOnSubmit(e)} style={{ textAlign: 'center', display: 'flex', justifyContent:'center', gap: '10px', alignItems:'baseline'}}>
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
                <Button type="submit">Filtrar</Button>
            </form>
        </div>)
}