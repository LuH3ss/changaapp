import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "./css/review.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../redux/actions";
import { useParams } from "react-router-dom";
import Navbar from "./PrivateRoute/Navbar";
import Footer from "./Footer";

export default function Review({ user_id }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const userData = useSelector((state) => state.filter);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState({
    message: '',
    rate: '',
    author_id: '',
    user_id: '',

  });
  useEffect(() => {
    dispatch(getUserEmail());
  }, [dispatch]);
  console.log(rating)
  const handleOnChange = (e) => {
    e.preventDefault()
    setReview({
      ...review,
      [e.target.name]: e.target.value
    })
  }

  const postReview = (e) => {
    e.preventDefault()
    dispatch(postReview(review))
  };

  return (
    <div>
      <Navbar/>
      <h3>
        Message: <input  type="text" value={review.message}/>
      </h3>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1

        return (
          <div className="reviews">
            <label>
              <input
                className="input-review"
                type="radio"
                name="rate"
                value={review.rate}
                
              />
              <FaStar
                className="star"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={50}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
              ;
            </label>
          </div>
        );
      })}
      <button onClick={postReview}>Enviar</button>
      <Footer/>
    </div>
  );
}
