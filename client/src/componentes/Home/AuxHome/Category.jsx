import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions";

export default function Category() {
    const category = useSelector(state => state.categories)
    console.log(category)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])
    
    const handleOnClick = (e) => {
        e.preventDefault()
        navigate(`/home/${e.target.value}`)
    }

    return(
        <div>
            <h4>Categorias mas concurridas</h4>
            {
                category && category?.map(e => {
                    return(
                        <div key={e.id}>
                            <h3>{e.name}</h3>
                            <img src={e.img} alt={e.name} width='350px' height='250px' />
                            <button value={e.name} onClick={handleOnClick}>Ir</button>
                        </div>
                )})
            }
            
        </div>)
}