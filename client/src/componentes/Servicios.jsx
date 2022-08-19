import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CLOUDINARY_API } from "../Secret/Secret";


export default function Servicios(){
    const [service, setService] = useState({
        img: '',
        rating: '',
        description: '',
        review: '',
        price: '',
    })
    const disptach = useDispatch()



    const handleOnChange = (e) => {
        e.preventDefault()
        setService({
            ...service,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            const datos = new FormData()
            datos.append('file', file)
            datos.append('upload_preset', 'changApp')
            const cloudinary = await axios.post(CLOUDINARY_API, datos)
            setService({
                ...service,
                img: cloudinary.data.secure_url
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // disptach(postService(service))
    }
    
    return(
        <div>
            <h1>Servicios</h1>
            <form>
                <div>
                    <label>Imagen del servicio</label>
                    <input type="file"  name='img' onChange={handleImage}/>
                </div>
                <div>
                    <label>Puntaje</label>
                    <input type="numbers" name='rating' value={service.rating} onChange={handleOnChange}/>
                </div>
                <div>
                    <label>Descripcion</label>
                    <input type="text" name='description' value={service.description} onChange={handleOnChange}/>
                </div>
                <div>
                    <label>Review</label>
                    <input type="text" name='review' value={service.review} onChange={handleOnChange}/>
                </div>
                <div>
                    <label>Precio del servicio</label>
                    <input type="text" name='price' value={service.price} onChange={handleOnChange}/>
                </div>
                <button type="submit">Solicitar servicio</button>
            </form>
        </div>)
}