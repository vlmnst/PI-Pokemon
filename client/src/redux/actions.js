import axios from "axios";
const {
  GET_ALL_POKEMONS,
  GET_DETAIL,
  GET_FILTER_ABC,
  GET_FILTER_CREATED_API,
  GET_FILTER_STRENGTH,
  GET_FILTER_TYPES,
  GET_SEARCH,
  CREATE_POKEMON,
  CLEAN,
  GET_TYPES,
  DELETE,
  BACK
} = require("./actionTypes.js");

export const getAllPokemons = () => {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/pokemons");
      return dispatch({ type: GET_ALL_POKEMONS, payload: json.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetail = (id) => (dispatch) => {
  fetch("http://localhost:3001/pokemons/" + id)
    .then((detail) => detail.json())
    .then((detail) => dispatch({ type: GET_DETAIL, payload: detail }));
};

export const createPokemon = (input) => {
  console.log(input);
  return async function (dispatch) {
    await fetch("http://localhost:3001/pokemons", {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => { console.log(data);
        dispatch({ type: CREATE_POKEMON, payload: data });
      })
      .catch(error => console.log(error))
   };
};

//debo filtrar de manera alfabética. metodo SORT tomando los nombres
export const filterABC = (payload) => {
  return {
    type: GET_FILTER_ABC,
    payload,
  };
};

export const filterCreateOrApi = (payload) => {
  return {
    type: GET_FILTER_CREATED_API,
    payload,
  };
};
//debo filtrar de manera alfabética. metodo SORT tomando el ataque
export const filterStrength = (payload) => {
  return {
    type: GET_FILTER_STRENGTH,
    payload,
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterTypes = (type) => {
  return {
    type: GET_FILTER_TYPES,
    payload: type,
  };
};

export const getSearch = (name) => {
  return async function (dispatch) {
    await fetch(`http://localhost:3001/pokemons?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
         console.log(data);
        dispatch({
          type: GET_SEARCH,
          payload: data,
        });
      });
  };
};

export const clean = () => {
  return {
    type: CLEAN,
    payload: {},
  };
};


export const deletePokemon = (id) => {
  console.log(id)
  return function (dispatch) {
    axios.delete(`http://localhost:3001/pokemons/${id}`)
      return dispatch({ type: DELETE, payload: id })   
  };
}

export const back = () => {
  return {
    type: BACK
  }
}