/* eslint-disable no-unused-vars */
import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategories } from "../../../redux/actions";

export default function Category() {
  const category = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <h4>Categorias mas concurridas</h4>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {category &&
          category?.map((e) => {
            return (
              <Link key={e.id} to={`/home/${e.name}`}>
                <div
                  style={{
                    margin: "50px",
                    border: "solid black 1px",
                    maxWidth: "370px",
                    textAlign: "center",
                    
                  }}
                >
                  <h3>{e.name}</h3>
                  <img src={e.img} alt={e.name} width="350px" height="250px"/>
                  {/* <Button value={e.name} onClick={handleOnClick}>Ir</Button> */}
                </div>
              </Link>
            );
          })}
      </Box>
    </>
  );
}
