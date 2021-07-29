import React from "react";

const Header = (props) => {
  return (
    <form onSubmit={props.submitHandle}>
      <input
        type="text"
        className="form-control my-5 text-center"
        value={props.pokemon}
        onChange={props.onTextChange}
        placeholder={"Add pokemon to You'r POKEDEX..."}
      />
    </form>
  );
};

export default Header;
