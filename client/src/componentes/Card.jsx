import React from "react";
import { Link } from "react-router-dom";
import './css/card.css'
const img = "https://1.bp.blogspot.com/-OONwIqLJAE0/YCH249Alt2I/AAAAAAAAIzQ/7moXO_wK3pMxyug7CTWW6qZWb05sV3MAACNcBGAsYHQ/s16000/trabajos-mas-demandados-en-brasil-en-2021.jpg"

export default function Card({name, img, description}){
    return(
        <div className="card-container">
        <h1>{name}</h1>
        <img src={img} alt="not found" width="200px" height='100px' />
        <p>{description}</p>
        </div>
    )
}