import React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import "./css/stripe.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { allRequest } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const publicUrl =
  "pk_test_51Lb2ZIKO72YUdcCNim89I44LXzpgG2vz57CjEn0ZAqmTZVW4D1o9y1ea5rzYeeH3dMFE4CAclOjOUqfc5NXncwMe00Zzkr0H1d";
const stripePromise = loadStripe(publicUrl);
// const appearance = {

//         fontFamily: "Work Sans, sansSerif",
//         background: "transparent",
//         border: "none",
//         borderBottom: "1px solid transparent",
//         color: "#dbdce0",
//         transition: "border-bottom 0.4s",

// }
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  //   const elementss = stripe.elements({appearance});
  const dispatch = useDispatch();
  const service = useSelector((state) => state.serviceDetail);
  const request = useSelector((state) => state.allRequest);
  console.log(request);
  useEffect(() => {
    dispatch(allRequest());
  }, [dispatch]);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post("http://www.localhost:3001/payment", {
        id,
        amount: request[0]?.services.price,
      });
      console.log(data);
      console.log(paymentMethod);
      elements.getElement(CardElement).clear();
      alert(data.message);
    }
  };
  return (
    <div className="container-flex">
      <form onSubmit={handlerSubmit} className="input">
        <img
          src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
          className="logo-card"
        />

        <CardElement />
        <button className="proceed">
          <svg className="sendicon" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
          </svg>
        </button>

        <h3>
          {<br />}Price: ${request[0]?.services.price}
        </h3>
      </form>
    </div>
  );
};

export default function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <Link style={{ textDecoration: "none" }} to="/settings/requester">
        <Button sx={{ color: "#1F2937" }} variant="outlined">
          Volver atras
        </Button>
      </Link>
      <CheckoutForm />
    </Elements>
  );
}
