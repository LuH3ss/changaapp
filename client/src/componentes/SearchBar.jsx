import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../redux/actions/index.js";

export default function SearchBar() {
  // const [name, setName] = useState("");

  // const handlerInput = (e) => {
  //   e.preventDefault();
  //   const value = e.target.value;
  //   const value2 = value.charAt(0).toUpperCase() + value.slice(1);
  //   setName(value2);
  // };

  // const handlerButton = (e) => {
  //   e.preventDefault();
  //   setName("");
  // };

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getName(name));
    console.log(name);
    setName("");
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search service..."
        value={name}
        onChange={(e) => handleInput(e)}
      ></input>
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
