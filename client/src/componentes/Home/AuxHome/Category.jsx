import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions";

export default function Category() {
    const category = useSelector(state => state.categories)
    const dispatch = useDispatch()
    const filterCategory = category.slice(0, 3)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])
    
    const handleOnClick = (e) => {
        e.preventDefault()
        navigate(`/home/${e.target.value}`)
    }

    const handleAll = (e) => {
        e.preventDefault()
        navigate('/home/todos')
    }
    console.log(filterCategory)
    return(
        <div>
            <h4>Categorias mas concurridas</h4>
            {
                filterCategory && filterCategory?.map(e => {
                    return(
                        // <button   value={e.name} onClick={handleOnClick}>
                        // <h3 value={e.name} onClick={handleOnClick}>{e.name}</h3>
                        // {/* <img src={e.img} alt={e.name} width='350px' height='250px' /> */}
                        // </button>
                        <div>
                            <h3>{e.name}</h3>
                            <img src={e.img} alt={e.name} width='350px' height='250px' />
                            <button value={e.name} onClick={handleOnClick}>Ir</button>
                        </div>
                )})
            }
            <button onClick={handleAll}>+</button>
        </div>)
}