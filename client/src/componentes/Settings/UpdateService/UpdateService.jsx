import React, { useEffect, useState} from "react";
import Navbar from "../../PrivateRoute/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, getServiceById, updateService } from "../../../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function validate(service) {
    let error = {}

    if(!/^[a-z ñ]+$/i.test(service.name)) error.name = 'El nombre solo puede contener letras'
    else if(service.description > 150) error.description = 'La descripcion no puede contener mas de 150 caracteres'

    return error
}



export default function UpdateService() {
    const filterService = useSelector(state => state.services)
    const dispatch = useDispatch()
    const param = useParams()
    const idService = filterService.filter(e => e.id === param.id)
    const navigate = useNavigate()
    const [service, setService] = useState({
        name: '',
        day: [],
        price: '',
        description: ''
    })
    const [error, setError] = useState('')

    useEffect(() => {
        dispatch(getAllServices())
        dispatch(getServiceById(param.id))
    }, [dispatch, param.id])
    
    //PARA LEER LOS CAMBIOS
    const handleOnChange = (e) => {
        e.preventDefault()
        setService({
            ...service,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...service,
            [e.target.name]: e.target.value
        }))
    }
    //AGREGAR DIAS DISPONIBLES
    const handleOnClick = (e) => {
        if(!service.day.includes(e.target.value)){
            setService({
                ...service,
                day: [...service.day, e.target.value]

            })
        }else {
            console.log('Ya lo agregaste')
        }
    }
    //ENVIAR DATA DEL FORMULARIO
    const handleSubmit = (e) => {
        e.preventDefault()
        service.day = service.day.join(",");
        if(service.name === '') service.name =  idService[0]?.name
        if(service.price === '') service.price = idService[0]?.price
        if(service.description === '') service.description = idService[0]?.description
        if(service.day === '') service.day = idService[0]?.day
        dispatch(updateService(param.id,service))
        navigate('/settings/services')
    }

    return(
        <div>
            <Navbar/>
            <h3>Modificar servicio</h3>
            {error && <p>{error.name}</p>}
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre del servicio</label>
                    <input type="text" name="name"  placeholder={idService[0]?.name} value={service.name} onChange={handleOnChange}/>
                </div>
                <div>
                    <label>Dias disponibles</label>
                    {
                        ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabados', 'Domingos'].map(e => {
                            return <button onClick={handleOnClick} value={e} type="button" key={e}>{e}</button>
                        })
                    }
                </div>
                <div>
                    <label>Precio</label>
                    <input type="number"  name='price' placeholder={idService[0]?.price} value={service.price} onChange={handleOnChange}/>
                </div>
                <div>
                    <label>Descripcion</label>
                    <textarea  name="description" cols="40" rows="4" placeholder={idService[0]?.description} value={service.description} onChange={handleOnChange}/>
                </div>
                <button type="submit">Cargar cambios</button>
            </form>
            <Link to='/settings/services'>Volver Atras</Link>
        </div>)
}