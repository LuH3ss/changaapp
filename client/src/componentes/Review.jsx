import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./css/review.css"
export default function Review({ user_id }) {
  const { rating, setRating } = useState();
  const postReview = () => {
    axios.post("http://www.localhost:3001/reviews", {
      message: "Excelente",
      rate: 5,
      user_id: "408d32af-1e4b-4bfa-a04d-8ed9b71b1490",
      author_id: "ac9b8aaf-0da8-4e14-8e6a-d6e00349426e",
    });
  };
  return (
    <div>
      <h1>Componente review</h1>
      <h3>Reseña:</h3>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <div className="reviews">
            <label>
              <input
              className="input"
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
              />
              <FaStar className="star" size={100} 
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}/>;
            </label>
          </div>
        );
    })}
    <button onClick={postReview}>Enviar</button>
    </div>
  );
}
