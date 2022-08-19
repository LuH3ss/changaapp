/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import Navbar from "./PrivateRoute/Navbar";
import {
  getAllServices,
  sortServices,
  getAllCategories,
} from "../redux/actions";
import "./css/home.css";
const imgDef =
  "https://1.bp.blogspot.com/-OONwIqLJAE0/YCH249Alt2I/AAAAAAAAIzQ/7moXO_wK3pMxyug7CTWW6qZWb05sV3MAACNcBGAsYHQ/s16000/trabajos-mas-demandados-en-brasil-en-2021.jpg";

export default function Home() {
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.services);
  const allCategories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAllCategories());
  }, [dispatch]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    logout();
    navigate("/");

  };

  const handleSort = (e) => {
    setOrder(e.target.value);
    dispatch(sortServices(e.target.value));

  };

  console.log(allServices);

  return (
    <div>
      <Navbar user={user} handleClick={handleClick} />
      <div className="container-filters">
        <label>order by: </label>
        <select
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value="PriceAs">Price ascendant</option>
          <option value="PriceDes">Price descendant</option>
          <option value="AlphabeticalAs">Alphabetical ascendant</option>
          <option value="AlphabeticalDes">Alphabetical descendant</option>
        </select>
        <label>filter by category: </label>
        <select
          onChange={(e) => {
            handleSort(e);
          }}
        >
          {allCategories?.map((el) => {
            return <option>{el.name}</option>;
          })}
        </select>
      </div>
      <div className="cards-container">
        {allServices &&
          allServices.map((service) => {
            return (
              <Link to={`services/${service.id}`}>
                <Card
                  key={service.id}
                  name={service.name}
                  img={service.img ? service.img : imgDef}
                  description={service.description}
                  price={service.price}
                  category={service.categories[0].name}
                  />
                  </Link>
                );
              })
            }
        </div>
                </div>
      
  );
}
