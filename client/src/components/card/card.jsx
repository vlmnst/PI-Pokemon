import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { deletePokemon } from "../../redux/actions.js";
import { useDispatch } from "react-redux";
export default function Card({ pokeActuales }) {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(deletePokemon(id));
  };
  return (
    <div className={styles.conteiner}>
      {pokeActuales ? (
        pokeActuales.map((pokemon) => {
          return (
            <div className={styles.conteinerCard}>
              <button className={styles.close} onClick={() => handleClick(pokemon.id)}>x</button>
              <Link to={`/detail/${pokemon.id}`}>
                <h4>{pokemon.name}</h4>
              </Link>
              <h5>{pokemon.types.map((name) => name + " ")}</h5>
              <img src={pokemon.image} alt={pokemon.name} className={styles.img} />
            </div>
          );
        })
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
