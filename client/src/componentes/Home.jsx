/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import Paging from "./Paging";
import Navbar from "./PrivateRoute/Navbar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import {
  getAllServices,
  sortServices,
  getAllCategories,
  filterByCategory,
} from "../redux/actions";
import "./css/home.css";
const imgDef =
  "https://1.bp.blogspot.com/-OONwIqLJAE0/YCH249Alt2I/AAAAAAAAIzQ/7moXO_wK3pMxyug7CTWW6qZWb05sV3MAACNcBGAsYHQ/s16000/trabajos-mas-demandados-en-brasil-en-2021.jpg";


export default function Home() {
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.services);
  const allCategories = useSelector((state) => state.categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage, setServicesPerPage] = useState(6);
  const indexOfLastService = currentPage * servicesPerPage; // =3
  const indexOfFirstService = indexOfLastService - servicesPerPage; // =0
  const Services = allServices.slice(indexOfFirstService, indexOfLastService);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

  const handleFilter = (e) => {
    e.preventDefault();
    dispatch(filterByCategory(e.target.value));
  };

  const handlerReload = (e) => {
    e.preventDefault();
    dispatch(getAllServices());
  };

  console.log(allServices);

  const styles = {
    containerCards:{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      backgroundColor: '#E5E7EB',
      color: '#1F2937',
    },
    button: {
      display: 'flex',
      flexDirection: 'column',
      width: '30%',
      alignItems: 'center',
    },
  }

  return (
    <div>
      <Navbar user={user} handleClick={handleClick} />
      <div className="container-filters">
        <Typography variant="h6">ordenar por: </Typography>
        <select
          onChange={(e) => {
            handleSort(e);
          }}
        >
          <option value="PriceAs">Precio ascendente</option>
          <option value="PriceDes">Precio descendente</option>
          <option value="AlphabeticalAs">Alfabético A-Z</option>
          <option value="AlphabeticalDes">Alfabético Z-A</option>
        </select>
        <Typography variant="h6">filtrar por categoría: </Typography>
        <select
          onChange={(e) => {
            handleFilter(e);
          }}
        >
          {allCategories?.map((el) => {
            return <option value={el.name}>{el.name}</option>;
          })}
        </select>
        <Button onClick={(e) => handlerReload(e)}>
          Reload page
        </Button>
      </div>
      <Paging
        servicesPerPage={servicesPerPage}
        allServices={allServices.length}
        paging={paging}
      />
      <Box style={styles.containerCards}>
        {Services &&
          Services.map((service) => {
            return (
              <Link style={{textDecoration: 'none'}} to={`services/${service.id}`}>
                <Card
                  key={service.id}
                  name={service.name}
                  img={service.img ? service.img : imgDef}
                  description={service.description}
                  price={service.price}
                  category={service.categories[0]?.name}
                />
              </Link>
            );
          })}
      </Box>
      <Paging
        servicesPerPage={servicesPerPage}
        allServices={allServices.length}
        paging={paging}
      />
    </div>
  );
}
