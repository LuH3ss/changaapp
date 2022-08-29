import React from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";
import "./css/stripe.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
const publicUrl =
  "pk_test_51Lb2ZIKO72YUdcCNim89I44LXzpgG2vz57CjEn0ZAqmTZVW4D1o9y1ea5rzYeeH3dMFE4CAclOjOUqfc5NXncwMe00Zzkr0H1d";
const stripePromise = loadStripe(publicUrl);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const service = useSelector((state) => state.serviceDetail);
  const request = useSelector((state) => state.allRequest);
  console.log(request)
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
        amount: service.price,
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
        <h3>Price: {service.price}</h3>
      </form>
    </div>
  );
};

export default function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
