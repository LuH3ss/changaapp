import React from "react";
import { useState } from "react";

export default function SearchBar() {
  const [name, setName] = useState("");

  const handlerInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const value2 = value.charAt(0).toUpperCase() + value.slice(1);
    setName(value2);
  };

  const handlerButton = (e) => {
    e.preventDefault();
    setName("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="search service..."
        value={name}
        onChange={(e) => handlerInput(e)}
      ></input>
      <button type="submit" onClick={(e) => handlerButton(e)}>
        Search
      </button>
    </div>
  );
}
