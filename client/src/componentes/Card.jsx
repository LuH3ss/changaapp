import React from "react";
const img = "https://1.bp.blogspot.com/-OONwIqLJAE0/YCH249Alt2I/AAAAAAAAIzQ/7moXO_wK3pMxyug7CTWW6qZWb05sV3MAACNcBGAsYHQ/s16000/trabajos-mas-demandados-en-brasil-en-2021.jpg"

export default function Card(){
    return(
        <div>
        <h1>Titulo del servicio</h1>
        <img src={img} alt="not found" width="200px" height='100px' />
        <p>Descripcion del servicio</p>
        <button>mas info...</button>
        </div>
    )
}