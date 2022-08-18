/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index.js";
import { useEffect } from "react";

export default function ServiceDetail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  var services = useSelector((state) => state.serviceDetail);

  return (
    <div>
      <div>
        <div>
          <h2>{services.category}</h2>
        </div>
        <div>
          <img src={services.img} alt="Not found"></img>
        </div>
        <div>
          <p>Description</p>
          <p>{services.description}</p>
        </div>
        <div>
          <p>{`Rating: ${services.rating}`} </p>
        </div>
        <div>
          <p>Reviews</p>
          <p>{services.review}</p>
        </div>
      </div>
      <Link to="/home">
        <button>Back Home</button>
      </Link>
    </div>
  );
}
