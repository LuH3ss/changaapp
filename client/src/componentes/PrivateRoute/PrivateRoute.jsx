/* eslint-disable no-unused-vars */
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../redux/actions";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  const dispatch = useDispatch();
  // const userState = useSelector(state => state.filter)

  useEffect(() => {
    dispatch(getUserEmail(user?.email));
  }, [dispatch, user?.email]);

  if (loading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/settings/edit" />;

  return <>{children}</>;
}
