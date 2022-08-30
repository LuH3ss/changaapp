import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Footer from "../Footer";
import Paging from "../Paging";
import Navbar from "../PrivateRoute/Navbar";
import Category from "./AuxHome/Category";



export default function Guardar() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  

  useEffect(() => {
    if (user) setLoading(false);
  }, [user, setLoading]);

  if (loading)
    return (
      <div>
        <Navbar />
        <h1>Cargando datos...</h1>
        <Footer />
      </div>
    );
  else
    return (
      <div>
        <Navbar />
        {/* <SearchBar /> */}
        <div>
          <Category />
        </div>
        <div>
          <h2>Algunas de las reviews de nuestros usuarios</h2>
        </div>
        <Footer />
      </div>
    );
}
