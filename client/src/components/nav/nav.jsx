import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCreateOrApi,
  filterABC,
  filterStrength,
  getSearch,
  filterTypes,
} from "../../redux/actions";
import styles from "./nav.module.css";

export default function NavBar({ paginado }) {
  const dispatch = useDispatch();
  let types = useSelector((state) => state.types);
  let [search, setSearch] = useState("");

  function handleCreateorApi(e) {
    e.preventDefault();
    paginado(1);
    dispatch(filterCreateOrApi(e.target.value));
  }

  function handleAbc(e) {
    e.preventDefault();
    paginado(1);
    dispatch(filterABC(e.target.value));
  }

  function handleSw(e) {
    e.preventDefault();
    paginado(1);
    dispatch(filterStrength(e.target.value));
  }

  function inputSearch(e) {
    setSearch(e.target.value);
  }

  function handleSearch(e) {
    e.preventDefault();
    dispatch(getSearch(search));
    setSearch("");
  }

  function handleTypes(e) {
    console.log(e);
    e.preventDefault();
    paginado(1);
    dispatch(filterTypes(e.target.value));
  }

  return (
    <nav>
      <div className={styles.conteiner}>
        <div>
          <Link to={"/createPokemon"}>
            <button className={styles.btn}>Create Pokemon</button>
          </Link>
        </div>

        <div className={styles.filter}>
          <select
            className={styles.inputFilter}
            onChange={(e) => handleCreateorApi(e)}
            name="database"
            defaultValue=""
          >
            <option value="">Select a option</option>
            <option value="All">All</option>
            <option value="Api">Api</option>
            <option value="Created">Created</option>
          </select>

          <select
            className={styles.inputFilter}
            onChange={(e) => handleAbc(e)}
            name="abc"
            defaultValue=""
          >
            <option value="">Alphabetical Order</option>
            <option value="A">A-Z</option>
            <option value="Z">Z-A</option>
          </select>

          <select
            className={styles.inputFilter}
            onChange={(e) => handleSw(e)}
            name="attack"
            defaultValue=""
          >
            <option value="">Order by attack</option>
            <option value="Stronger">Stronger</option>
            <option value="Weaker">Weaker</option>
          </select>
        </div>

        <div  className={styles.contInputSearch}>
          <input
            className={styles.inputSearch}
            type="text"
            placeholder="Search a pokemon.."
            value={search}
            onChange={(e) => inputSearch(e)}
          />
          <button
            className={styles.btnSearch}
            type="submit"
            onClick={(e) => handleSearch(e)}
          >
            Search
          </button>
        </div>
      </div>
      <div >
        <ul className={styles.type}>
          {types.map((type) => {
            return (
              <div className={styles.btntype}>
                <button
                  value={type.name}
                  id={type.name}
                  className={styles.botonFiltro}
                  onClick={(e) => handleTypes(e)}
                >
                  {type.name}
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
