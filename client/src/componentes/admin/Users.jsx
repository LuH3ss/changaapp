

import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../redux/actions";
// import {Link} from 'react-router-dom'


export default function Users() {
  const dispatch = useDispatch();
  const usersDb = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);

  console.log(usersDb);



  return (
    <div >
  iNSERTE SI TABLA QUI
  </div>
  )

}