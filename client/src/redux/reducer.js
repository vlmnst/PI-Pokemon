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
  BACK,
} = require("./actionTypes.js");

const initialState = {
  allPokemons: [],
  allPokemonsCopy: [],
  detailPokemon: {},
  types: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: payload,
        allPokemonsCopy: payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detailPokemon: payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: payload,
      };
    case GET_FILTER_ABC:
      let filtroabc = [...state.allPokemonsCopy];
      if (payload === "A") {
        filtroabc.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      }
      if (payload === "Z") {
        filtroabc.sort(function (a, b) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
      }
      return {
        ...state,
        allPokemons: filtroabc,
      };
    case GET_FILTER_CREATED_API:
      let filtro = [...state.allPokemonsCopy];
      if (payload === "All") filtro = [...state.allPokemonsCopy];
      if (payload === "Api")
        filtro = filtro.filter((pokemon) => pokemon.id.toString().length < 9);
      if (payload === "Created") {
        filtro = filtro.filter((pokemon) => pokemon.id.length > 9);
        if (filtro.length < 1) {
          filtro = [...state.allPokemonsCopy];
          alert("¡Aun no has creado pokemons!");
        }
        console.log(filtro);
      }
      return {
        ...state,
        allPokemons: filtro,
      };
    case GET_FILTER_STRENGTH:
      let filtrosw = [...state.allPokemonsCopy];
      if (payload === "Stronger") {
        filtrosw.sort(function (a, b) {
          if (a.attack < b.attack) return 1;
          if (a.attack > b.attack) return -1;
          return 0;
        });
      }
      if (payload === "Weaker") {
        filtrosw.sort(function (a, b) {
          if (a.attack > b.attack) return 1;
          if (a.attack < b.attack) return -1;
          return 0;
        });
      }
      return {
        ...state,
        allPokemons: filtrosw,
      };
    case GET_FILTER_TYPES:
      let resultado = state.allPokemons.filter((pokemon) =>
        pokemon.types.includes(payload)
      );

      if (resultado.length === 0) {
        window.alert("The type selected not exist");
        resultado = state.allPokemonsCopy;
      }
      console.log(resultado);
      return {
        ...state,
        allPokemons: resultado,
      };
    case GET_SEARCH:
      console.log(payload);
      let pokemon;
      if (payload.error) {
        pokemon = payload;
      }
      if (payload.length) {
        pokemon = payload.map((info) => {
          return {
            id: info.id,
            name: info.name,
            types: info.types,
            image: info.image,
            attack: info.attack,
          };
        });
      }

      console.log(pokemon);
      return {
        ...state,
        allPokemons: pokemon,
      };
    case CREATE_POKEMON:
      console.log(payload);
      let nuevoPoke = payload.find((info) => {
        return {
          id: info.id,
          name: info.name,
          types: info.types.map((tipo) => tipo + " "),
          image: info.image,
          attack: info.attack,
        };
      });
      console.log(nuevoPoke);
      return {
        ...state,
        allPokemons: [...state.allPokemons, nuevoPoke],
        allPokemonsCopy: [...state.allPokemonsCopy, nuevoPoke],
      };
    case CLEAN:
      return {
        ...state,
        detailPokemon: payload,
      };
    case DELETE:
      let filtrado = state.allPokemons.filter(
        (pokemon) => pokemon.id !== payload
      );
      let filtradoAll = state.allPokemonsCopy.filter(
        (pokemon) => pokemon.id !== payload
      );
      console.log(filtrado);
      return {
        ...state,
        allPokemons: filtrado,
        allPokemonsCopy: filtradoAll,
      };
    case BACK:
      return {
        ...state,
        allPokemons: [...state.allPokemonsCopy],
      };
    default:
      return state;
  }
};

export default rootReducer;
