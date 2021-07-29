import React from "react";
import axios from "axios";
import Header from "./components/Header";
import ShowListOfPokemons from "./components/ShowListOfPokemons";

class App extends React.Component {
  state = {
    searchPokemon: "",
    isPokemonFetched: false,
    pokemonArray: [],
  };

  componentDidMount() {
    this.getPokemonLocalStorageArray();
    this.getAllTypes();
  }

  getPokemonLocalStorageArray = () => {
    let localPokemonArray = localStorage.getItem("pokemonArray") || "";
    if (localPokemonArray) {
      this.setState({
        pokemonArray: JSON.parse(localPokemonArray),
      });
    }
    return localPokemonArray;
  };

  removePokemonFromLocalStorage = (index) => {
    var test = JSON.parse(localStorage.getItem("pokemonArray"));
    test.splice(index, 1);
    this.setState({
      pokemonArray: test,
    });
    localStorage.setItem(
      "pokemonArray",
      JSON.stringify(this.state.pokemonArray)
    );
  };

  getAllTypes = async () => {
    const url = "https://pokeapi.co/api/v2/type/";
    const res = await axios.get(url);
    this.setState({
      allTypes: res.data.results,
    });
  };
  getPokemon = async () => {
    const { searchPokemon } = this.state;
    try {
      if (this.state.pokemonArray.find((e) => e.name === searchPokemon)) {
        alert("Pokemon named: " + searchPokemon + " already existing!");
      } else {
        const url = `https://pokeapi.co/api/v2/pokemon/${searchPokemon}`;
        const res = await axios.get(url);
        this.setState({
          searchedPokemonData: res.data,
          isPokemonFetched: true,
          pokemonName: res.data.name,
        });
        localStorage.setItem(
          "pokemonArray",
          JSON.stringify(this.state.pokemonArray)
        );
        this.getListOfSearchedPokemons();
      }
    } catch (e) {
      console.log(e.message);
      alert("There is no pokemon like : " + searchPokemon);
    }
  };

  getListOfSearchedPokemons = () => {
    const list = this.state.pokemonArray.slice();
    list.push(this.state.searchedPokemonData);
    this.setState(
      {
        pokemonArray: list,
      },
      () =>
        localStorage.setItem(
          "pokemonArray",
          JSON.stringify(this.state.pokemonArray)
        )
    );
  };

  onTextChange = (e) => {
    this.setState({
      searchPokemon: e.target.value.toLowerCase(),
    });
  };

  submitHandle = (e) => {
    e.preventDefault();
    this.getPokemon();
  };

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  deleteFromPokedex = (index) => {
    const newList = this.state.pokemonArray.slice();
    newList.splice(index, 1);
    this.setState(
      {
        pokemonArray: newList,
      },
      () => {
        this.removePokemonFromLocalStorage(index);
      }
    );
  };

  render() {
    console.log(this.state.pokemonArray);
    return (
      <>
        <Header
          submitHandle={this.submitHandle}
          pokemon={this.state.searchPokemon}
          onTextChange={this.onTextChange}
        />

        <ShowListOfPokemons
          pokemonArray={this.state.pokemonArray}
          allTypes={this.state.allTypes}
          capitalizeLetter={this.capitalizeFirstLetter}
          deleteFromPokedex={(e) => this.deleteFromPokedex(e)}
        />
      </>
    );
  }
}

export default App;
