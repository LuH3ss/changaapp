/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/index.js";
import { useEffect } from "react";

const imgDef =
  "https://1.bp.blogspot.com/-OONwIqLJAE0/YCH249Alt2I/AAAAAAAAIzQ/7moXO_wK3pMxyug7CTWW6qZWb05sV3MAACNcBGAsYHQ/s16000/trabajos-mas-demandados-en-brasil-en-2021.jpg";

export default function ServiceDetail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch]);

  var service = useSelector((state) => state.serviceDetail);

  return (
    <div className="cards-container">
      <div className="card-container">
        <div>
          <h2>{service.name}</h2>
        </div>
        <div>
          <img src={service.img ? service.img : imgDef} alt="Not found"></img>
        </div>
        <div>
          <p>Description</p>
          <p>{service.description}</p>
        </div>
        <div>
          <p>{`Price: ${service.price}`} </p>
        </div>
        <div>
          <p>{`Rating: ${service.rating}`} </p>
        </div>
        <div>
          <p>Reviews</p>
          <p>{service.review}</p>
        </div>
        <Link to="/home">
          <button>Back Home</button>
        </Link>
      </div>
    </div>
  );
}
