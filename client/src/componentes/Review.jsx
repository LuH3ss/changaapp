import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./css/review.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../redux/actions";
import { useParams } from "react-router-dom";

export default function Review({ user_id }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const userData = useSelector((state) => state.filter);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEmail());
  }, [dispatch]);
  console.log(userData);
  const postReview = () => {
    axios.post("http://www.localhost:3001/reviews", {
      message: message,
      rate: rating,
      user_id: id,
      author_id: userData.user_id,
    });
  };

  return (
    <div>
      <h3>
        Message: {message} <input onChange={() => setMessage()} type="text" />
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
                size={100}
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
