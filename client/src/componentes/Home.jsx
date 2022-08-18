import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import Card from "./Card";
import Navbar from "./PrivateRoute/Navbar";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    logout();
    navigate("/login");
  };

  return (
    <div>
        <Navbar
        user={user}
        handleClick={handleClick} />  
        <Card/>
    </div>
  );
}

