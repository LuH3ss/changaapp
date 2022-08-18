import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import Navbar from "./PrivateRoute/Navbar";
import { getAllServices } from "../redux/actions";
import './css/home.css'
const imgDef = "https://1.bp.blogspot.com/-OONwIqLJAE0/YCH249Alt2I/AAAAAAAAIzQ/7moXO_wK3pMxyug7CTWW6qZWb05sV3MAACNcBGAsYHQ/s16000/trabajos-mas-demandados-en-brasil-en-2021.jpg"

export default function Home() {
  
  const dispatch = useDispatch()
  const allServices = useSelector(state => state.services)
  useEffect(() => {
    dispatch(getAllServices())
  }, [dispatch])
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    logout();
    navigate("/login");
  };

  return (
    <div>
        <Navbar
        user={user}
        handleClick={handleClick} />
        <div className="cards-container">
            {
              allServices && allServices.map((service) => {
                return (
                  <Link to={`services/${service.id}`}>
                  <Card
                  key={service.id}
                  name={service.name}
                  img={service.img ? service.img : imgDef} 
                  description={service.description}
                  />
                  </Link>
                )
              })
            }
        </div>
    </div>
  );
}

