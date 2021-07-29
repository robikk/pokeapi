import React, { useState } from "react";

const FindPokemon = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <input
          type="text"
          className="form-control my-5 text-center"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder={"Search for pokemon..."}
        />
      </form>
    </div>
  );
};

export default FindPokemon;
