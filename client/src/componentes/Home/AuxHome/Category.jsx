import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories, getAllServices } from "../../../redux/actions";

export default function Category() {
    const category = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const filterCategory = category.slice(0, 3)
    const services = useSelector(state => state.services)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllServices())
    }, [dispatch])
    
    const handleOnClick = (e) => {
        e.preventDefault()
        const name = e.target.value
        navigate(`/home/${name}`)
    }

    return(
        <div>
            <h4>Cateogrias mas concurridas</h4>
            {
                filterCategory && filterCategory.map(e => {
                    return(
                        <button key={e.id} value={e.name} onClick={handleOnClick}>
                            {e.name}<br/>
                            Aca iria la imagen de fondo    <br/>
                        </button>)
                })
            }
            <button>+</button>
        </div>)
}