import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, clean } from "../../redux/actions.js";
import snorlax from "../img/111.gif";
import styles from "./detail.module.css";
export default function Detail(props) {
  console.log(props);
  let dispatch = useDispatch();
  let pokemon = useSelector((state) => state.detailPokemon);
  console.log(pokemon);
  let id = props.match.params.id;
  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(clean());
    };
  }, [dispatch]);

  return (
    <>
      {pokemon.name ? (
        <div className={styles.pri}>
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <div className={`${styles.cardFace} ${styles.cardFront}`}>
                <div className={styles.encabezado}>
                  <h2>{pokemon.name}</h2>
                  <h3>{pokemon.id}</h3>
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className={styles.pp}
                  />
                

                <div className={styles.content}>
                  <li className={styles.body}>
                    <ul>Weight: {pokemon.weight}</ul>
                    <ul>Height: {pokemon.height}</ul>
                    <ul>Life: {pokemon.hp}</ul>
                    <ul>Attack: {pokemon.attack}</ul>
                    <ul>Defense: {pokemon.defense}</ul>
                    <ul>Speed: {pokemon.speed}</ul>
                    <ul>Types: {pokemon.types}</ul>
                  </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link to={"/home"}>
              <button className={styles.back}>Volver</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          <img src={snorlax} alt="loading" className={styles.img} />
        </div>
      )}
    </>
  );
}
