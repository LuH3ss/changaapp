import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import Navbar from "../../PrivateRoute/Navbar";
import FormCategory from "./FormCategory";

export default function AllCategorys(){
    const services = useSelector(state => state.services)
    const dispath = useDispatch()
    useEffect(() => {
        dispath(getAllServices())
    }, [dispath])

    console.log(services)
    return(
        <div>
            <Navbar/>
            <FormCategory/>
            {
                services && services?.map(e => {
                    return(
                        <div >
                            <div key={e.id}>
                                <h4>{e.user?.firstName}</h4>
                                <img src={e.user?.img} alt="No tiene" width='64px' height="64px"/>
                                <p>{e.description}</p>
                                <p>${e.price}</p>
                                <button>Reservate el lugar capo</button>
                            </div>
                        </div>)
                })
            }
        </div>)
}