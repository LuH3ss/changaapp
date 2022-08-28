import React from "react";

export default function SearchBar(){
    return(
        <div>
            <h2>Recorre por la pagina y encuentra el servicio que necesites!</h2>
            <form>
                <input type="text" placeholder="Que necesitas?"/>
                <button>Encontrar</button>
            </form>
        </div>)
}