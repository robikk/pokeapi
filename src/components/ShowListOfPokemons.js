import React, { useState } from "react";
import "./pokeapi.css";

const ShowListOfPokemons = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  if (props.pokemonArray.length < 0) {
    return "";
  }
  // const pokemonTypes = props.pokemonArray;
  // const pokeType = pokemonTypes.map((data) => data.types.map((e) => e.type.name));
  // let iterator = pokeType.values();
  // for (let letter of iterator) {
  //   let setPokemons = letter.toString();
  //   return singleTypes
  // }
  // console.log(pokeType);
  return (
    <div className="container">
      <div>
        <input
          type="text"
          className="form-control my-5 text-center"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder={"Search for pokemon..."}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center flex-wrap">
        {props.allTypes
          ? props.allTypes.map((type, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    type.name === "fire"
                      ? "btn btn-danger text-white"
                      : "d-none"
                  }`}
                >
                  {console.log(type.name)}
                  {type.name === "fire" ? type.name : ""}
                </button>
              );
            })
          : ""}
      </div>
      <div className="d-flex justify-content-evenly align-items-center flex-wrap">
        {props.pokemonArray
          ? props.pokemonArray
              .filter((pokemon) => {
                if (searchTerm == "") {
                  return pokemon;
                } else if (
                  pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return pokemon;
                }
              })
              .map((pokemonData, index) => {
                return (
                  <div
                    className="card p-0 m-0 mt-5 card-shadow"
                    style={{ width: "18rem", borderRadius: "10px" }}
                    key={pokemonData.id}
                  >
                    <div
                      className="custom-badge py-3 m-0"
                      onClick={() => props.deleteFromPokedex(index)}
                    >
                      <svg
                        fill="none"
                        stroke="#fff"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="card-header text-center">
                      {props.capitalizeLetter(pokemonData.name)}
                    </h2>
                    <div className="text-center py-3">
                      Type:{" "}
                      {pokemonData.types.map((type, id) => (
                        <span key={id}>
                          <button className="btn btn-info mx-2">
                            {props.capitalizeLetter(type.type.name)}
                          </button>
                        </span>
                      ))}
                    </div>
                    <img
                      style={{ background: "rgba(0,0,0,.03)" }}
                      src={pokemonData.sprites.front_default}
                      className="card-img-top"
                      alt={"Pokemon Image"}
                    />
                    <div className="card-body">
                      <h4 className="text-center">Stats</h4>
                      {pokemonData.stats.map((stats, id) => {
                        return (
                          <div className="row" key={id}>
                            <div className="col-6">
                              {props.capitalizeLetter(stats.stat.name)}
                            </div>
                            <div className="col-6 text-end">
                              {" "}
                              {stats.base_stat}{" "}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
          : ""}
      </div>
    </div>
  );
};

export default ShowListOfPokemons;
