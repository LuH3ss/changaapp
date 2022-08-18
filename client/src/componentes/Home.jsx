import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import Navbar from "./PrivateRoute/Navbar";
import { getAllServices } from "../redux/actions";
import './css/home.css'

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
              allServices && allServices.map((service, i) => {
                return (
                  <Link to={`services/${service.id}`}>
                  
                  <Card
                  key={service.id}
                  name={service.name}
                  img={service.img}
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

