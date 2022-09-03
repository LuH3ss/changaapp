/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";
import Navbar from "./Navbar";

export default function PrivateRoute({ children }) {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.filter);
  console.log(userState);
  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  if (userState[0]?.banned)
    return (
      <div style={{ textAlign: "center", fontSize: "20px" }}>
        <Navbar />
        <h1>Tu cuenta se encuentra con acceso restringido.</h1>
        <h4>Para mas informacion contacta al soporte</h4>
      </div>
    );
  else {
    return <>{children}</>;
  }
}
