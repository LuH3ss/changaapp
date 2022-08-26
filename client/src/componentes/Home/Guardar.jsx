import React from "react";
import Navbar from "../PrivateRoute/Navbar";
import Category from "./AuxHome/Category";
import RenderCard from "./AuxHome/RenderCard";
import SearchBar from "./AuxHome/SearchBar";

export default function Guardar(){
    
    
    return(
        <div>
            <Navbar/>
            <SearchBar/>
            <div>
                <Category/>
            </div>
            <div>
                <RenderCard/>
            </div>
            
        </div>)
}