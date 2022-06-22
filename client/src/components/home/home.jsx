import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getTypes } from "../../redux/actions";
import styles from "./home.module.css";
import NavBar from "../nav/nav";
import Card from "../card/card";
import Error from "../error/error.jsx";
import charmarder from "../img/111.gif";
import Paginado from "../paginado/paginado";

export default function Home() {
  let dispatch = useDispatch();
  let allPokemons = useSelector((state) => state.allPokemons);
  let types = useSelector((state) => state.types);
  useEffect(() => {
    if (allPokemons.length < 1) dispatch(getAllPokemons());
  }, [dispatch, allPokemons]);
  useEffect(() => {
    if (types.length < 1) dispatch(getTypes());
  }, [dispatch, types.length]);

  //--paginado
  const [page, setPage] = useState(1);
  const pokemonsPorPage = 12;
  let ini = page * pokemonsPorPage - pokemonsPorPage; //0
  let fin = page * pokemonsPorPage; //12
  let pokeActuales = allPokemons;
  if (pokeActuales.length > 1) {
    pokeActuales = allPokemons.slice(ini, fin);
  }
  let paginado = (numero) => {
    setPage(numero);
  };
  //------
  

  
 //--------
  return (
    <div className={styles.conteiner1}>
      <div>
        <NavBar paginado={paginado} />
      </div>
      {!pokeActuales.length ? (
        pokeActuales.error ? (
          <div>
            <Error />
          </div>
        ) : (
          <div className={styles.loader}>
            <img src={charmarder} alt="loading" className={styles.img} />
          </div>
        )
      ) : (
        <div>
          <div>
            <Card pokeActuales={pokeActuales} />
          </div>

          <div className={styles.conteiner5}>
            <Paginado
              pokemonsPorPage={pokemonsPorPage}
              paginado={paginado}
              allPokemons={allPokemons.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}
