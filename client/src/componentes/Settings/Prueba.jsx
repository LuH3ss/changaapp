import React from "react";
import { Link , Outlet} from 'react-router-dom'
import Navbar from "../PrivateRoute/Navbar";

export default function Prueba() {
    return(
        <div>
            <Navbar/>
            <ul>
                <li><Link to='/edit'>Modifica</Link></li>
                <li><Link to='/logout'>Cerrar Sesion</Link></li>
            </ul>
            <Outlet />
        </div>)
}