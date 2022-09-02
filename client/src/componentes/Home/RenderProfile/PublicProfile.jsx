import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { allUsers, getAllServices } from "../../../redux/actions";
import Footer from "../../Footer";
import Navbar from "../../PrivateRoute/Navbar";
import { Link } from "react-router-dom";

export default function PublicProfile() {
  let userServices = useSelector((state) => state.services);
  let allUser = useSelector((state) => state.users);
  const param = useParams();
  const dispatch = useDispatch();
  allUser = allUser.filter((n) => n.id === param.id);
  userServices = userServices.filter((e) => e.user?.id === param.id);
  useEffect(() => {
    dispatch(getAllServices());
    dispatch(allUsers());
  }, [dispatch]);

  const handleOnClic = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div>
      <Navbar />
      <button onClick={handleOnClic}>Volver atras</button>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ border: "1px solid black" }}>
          <img src={allUser[0]?.img} alt={allUser[0]?.firstName} />
          <h4>{allUser[0]?.firstName}</h4>
          <p>{allUser[0]?.location}</p>
          <p>{allUser[0]?.createdAt}</p>
          <p>Descripcion</p>
          <span>{allUser[0]?.description}</span>
        </div>
        <div>
          {userServices &&
            userServices.map((s) => {
              return (
                <div key={s.id}>
                  <h3>{s.name}</h3>
                  <p>{s.price}</p>
                  <p>{allUser[0]?.location}</p>
                  <Link to={`/home/services/${s.id}`}>
                    <button>Reservar</button>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
