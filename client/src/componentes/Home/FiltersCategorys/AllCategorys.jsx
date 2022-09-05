import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../redux/actions";
import Navbar from "../../PrivateRoute/Navbar";
import FormCategory from "./FormCategory";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import "../../css/card-services.css"
export default function AllCategorys() {
  const services = useSelector((state) => state.services);
  const dispath = useDispatch();
  useEffect(() => {
    dispath(getAllServices());
  }, [dispath]);

  return (
    <div className="service-container-full">
      <Navbar />
      <FormCategory />
      <div className="container-services">
        {services &&
          services?.map((e) => {
            return (
              <div className="cards-services"
               
                key={e.id}
              >
                <h3>Servicio: {e.name}</h3>
                <h4>{e.user?.firstName}</h4>
                {/* <img src={e.user?.img} alt="No tiene" width='64px' height="64px"/> */}
                <p>{e.description}</p>
                <p>${e.price}</p>
                <Button>
                  <Link to={`/home/services/${e.id}`}>Haz tu reserva</Link>
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
}
