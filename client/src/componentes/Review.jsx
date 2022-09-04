import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./css/review.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, getServiceById, getUserEmail } from "../redux/actions";
import { useParams } from "react-router-dom";
import { gridColumnGroupsLookupSelector } from "@mui/x-data-grid";
import { useAuth } from "../context/authContext";

export default function Review({ user_id }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const userData = useSelector((state) => state.filter);
  // const serviceId = useSelector((state) => state.filterId);
  const { id } = useParams();
  console.log(id);
  let service = useSelector((state) => state.services);
  service = service.filter((p) => p.id === id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEmail(user?.email));
    dispatch(getAllServices());
  }, [dispatch, user?.email]);
  console.log(service, "service");

  console.log(userData, "userData");
  const postReview = async (e) => {
    e.preventDefault();
    const reviewData = await axios.post("http://www.localhost:3001/reviews", {
      message: message,
      rate: rating,
      author_id: userData[0]?.id,
      user_id: service[0]?.user_id,
    });

    alert("Gracias por dejar su reseña");
    setMessage("");
    setRating(null);
  };

  function handleInput(e) {
    e.preventDefault();
    const value = e.target.value;
    const value2 = value.charAt(0).toUpperCase() + value.slice(1);
    setMessage(value2);
  }

  return (
    <div>
      <h3>
        Reseña:{" "}
        <input value={message} onChange={(e) => handleInput(e)} type="text" />
        {console.log(message)}
      </h3>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <div className="reviews">
            <label>
              <input
                className="input-review"
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={20}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
              ;
            </label>
          </div>
        );
      })}
      <button onClick={postReview}>Enviar</button>
    </div>
  );
}
