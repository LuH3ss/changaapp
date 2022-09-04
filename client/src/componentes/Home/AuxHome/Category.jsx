/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions";

import "../../css/home.css";
export default function Category() {
  const category = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          position: "relative ",
          margin: "60px auto 40px",
          borderBottom: "solid 2px black",
          paddingBottom: "40px",
          width: "700px",
        }}
      >
        Categorias mas concurridas
      </Typography>
      <div className="card-category-container">
        {category &&
          category?.map((e) => {
            console.log(category)
            return (
              <Link key={e.id} to={`/home/${e.name}`}>
                <div className="card-category-container">
                  <h3>{e.name}</h3>
                  <img src={e.img} alt={e.name} width="80%" height="250px" />
                  {/* <Button value={e.name} onClick={handleOnClick}>Ir</Button> */}
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}
