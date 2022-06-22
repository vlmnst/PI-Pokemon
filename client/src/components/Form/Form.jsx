import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../../redux/actions";
import { Link } from "react-router-dom";
import styles from "./form.module.css";

export default function Create() {
  let dispatch = useDispatch();
  let allPokemonsCopy = useSelector((state) => state.allPokemonsCopy);
  let typesform = useSelector((state) => state.types);
  const [input, setInput] = useState({
    name: "",
    image: "",
    defense: "",
    speed: "",
    hp: "",
    height: "",
    strength: "",
    weight: "",
    types: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(input);
    console.log(errors);
  });

  let validate = (input) => {
    let errors = {};
    //---Name
    if (!input.name) errors.name = "Necesitas elegir el nombre de un pokemon";
    if (input.name.length > 16)
      errors.name = "El nombre  no puede tener mas de 16 carácteres";
    if (input.name.length < 2)
      errors.name = "El nombre  debe terner mas de 2 carácteres";
    let names = allPokemonsCopy.map((pokemon) => pokemon.name);
    let newName = input.name.toLowerCase();
    if (names.includes(newName)) errors.name = "Ese pokemon ya existe";
    //--Image
    var r = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!r.test(input.image)) errors.image = "Ingresa una url valida";
    if (!input.image)
      errors.image = "Necesitas elegir una imagen para tu pokemon";
    //--Defense
    //menor: 55
    //mayor : 110
    if (!input.defense) errors.defense = "Ingresa un valor de defensa";
    var n = /^([0-9])*$/;
    if (!n.test(input.defense)) errors.defense = "El valor debe ser un numero";
    if (input.defense < 20) errors.defense = "El valor debe ser mayor a 20";
    if (input.defense > 150) errors.defense = "El valor debe ser menor a 150";
    //--Speed
    if (!input.speed) errors.speed = "Ingresa un valor de velocidad";
    if (input.speed < 20) errors.speed = "El valor debe ser mayor a 20";
    if (input.speed > 150) errors.speed = "El valor debe ser menor a 150";
    //--Life
    if (!input.hp) errors.hp = "Ingresa un valor de vida";
    if (input.hp < 20) errors.hp = "El valor debe ser mayor a 20";
    if (input.hp > 150) errors.hp = "El valor debe ser menor a 150";
    //--Height
    if (!input.height) errors.height = "Ingresa un valor de altura";
    if (input.height < 20) errors.height = "El valor debe ser mayor a 20";
    if (input.height > 150) errors.height = "El valor debe ser menor a 150";
    //--strength
    //masfuerte: 102
    //mas debil: 20
    if (!input.attack) errors.attack = "Ingresa un valor de fuerza";
    if (input.attack < 20) errors.attack = "El valor debe ser mayor a 20";
    if (input.attack > 150) errors.attack = "El valor debe ser menor a 150";
    //--weight
    if (!input.weight) errors.weight = "Ingresa un valor de peso";
    if (input.weight < 20) errors.weight = "El valor debe ser mayor a 20";
    if (input.weight > 150) errors.weight = "El valor debe ser menor a 150";
    //--types
    if (!input.types) errors.types = "Debes elegir al menos un tipo";
    if (input.types.length === 3)
      errors.types = "No puede elegir mas de dos tipos";
    return errors;
  };

  let handleType = (e) => {
    e.preventDefault();

    if (input.types.length === 2)
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    if (e.target.value.length !== 0 && e.target.value !== input.types[0] && input.types.length < 2) {
      setInput({
        ...input,
        [e.target.name]: input.types.concat(e.target.value),
      });
    }
  };

  let handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPokemon(input));
    //dispatch(getAllPokemons())
    setInput({
      name: "",
      image: "",
      defense: "",
      speed: "",
      hp: "",
      height: "",
      attack: "",
      weight: "",
      types: [],
    });
    alert("¡Felicidades! ¡Tienes un nuevo pokemon! Vuelve al Home para visualizarlo")
  };

  //----------Formulario
  return (
    <>
    <div className={styles.cont}>
      <div className={styles.form}>
        <div className={styles.title}> Create Pokemon </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.divLabel}>
            <div className={styles.divInput}>
              <label className={styles.text}>Name</label>
              <input
                className={styles.input}
                type="text"
                name={"name"}
                value={input.name}
                onChange={(e) => handleChange(e)}
                placeholder="Ingresa el nombre de tu pokemon"
              />
              {errors.name && <p className={styles.danger}>{errors.name}</p>}
            </div>

            <div className={styles.divInput}>
              <label className={styles.text}>Image</label>
              <input
                className={styles.input}
                type="text"
                name={"image"}
                value={input.image}
                onChange={(e) => handleChange(e)}
                placeholder="La URL debe ser ftp, http, https "
              />
              {errors.image && <p className={styles.danger}>{errors.image}</p>}
            </div>

            <div className={styles.divInput}>
              <label className={styles.text}>Defense</label>
              <input
                className={styles.input}
                type="text"
                name={"defense"}
                value={input.defense}
                onChange={(e) => handleChange(e)}
              />
              {errors.defense && (
                <p className={styles.danger}>{errors.defense}</p>
              )}
            </div>

            <div className={styles.divInput}>
              <label className={styles.text}>Speed</label>
              <input
                className={styles.input}
                type="text"
                name={"speed"}
                value={input.speed}
                onChange={(e) => handleChange(e)}
              />
              {errors.speed && <p className={styles.danger}>{errors.speed}</p>}
            </div>

            <div className={styles.divInput}>
              <label className={styles.text}>Life</label>
              <input
                className={styles.input}
                type="text"
                name={"hp"}
                value={input.hp}
                onChange={(e) => handleChange(e)}
              />
              {errors.hp && <p className={styles.danger}>{errors.hp}</p>}
            </div>

            <div className={styles.divInput}>
              <label className={styles.text}>Height</label>
              <input
                className={styles.input}
                type="text"
                name={"height"}
                value={input.height}
                onChange={(e) => handleChange(e)}
              />
              {errors.height && (
                <p className={styles.danger}>{errors.height}</p>
              )}
            </div>

            <div className={styles.divInput}>
              <label className={styles.text}>Attack</label>
              <input
                className={styles.input}
                type="text"
                name={"attack"}
                value={input.attack}
                onChange={(e) => handleChange(e)}
              />
              {errors.attack && (
                <p className={styles.danger}>{errors.attack}</p>
              )}
            </div>

            <div className={styles.divInput}>
              <label className={styles.text}>Weight</label>
              <input
                className={styles.input}
                type="text"
                name={"weight"}
                value={input.weight}
                onChange={(e) => handleChange(e)}
              />
              {errors.weight && (
                <p className={styles.danger}>{errors.weight}</p>
              )}
            </div>

            <div className={styles.types}>
              <label className={styles.text}>Types</label>
              <div className={styles.preTypes}>
                <select
                  className={styles.inputSelect}
                  onClick={(e) => handleType(e)}
                  name="types"
                  defaultValue=""
                >
                  <option value="">Select a type</option>
                  {typesform.map((type) => {
                    return <option value={type.name}>{type.name}</option>;
                  })}
                </select>
                <div className={styles.boxSeleccionado}>
                  <button className={styles.seleccionado}>
                    {input.types[0]} 
                  </button>
                  <button className={styles.seleccionado}>
                    {input.types[1]}
                  </button>
                  </div>
              </div>
              {errors.types && <p className={styles.danger}>{errors.types}</p>}

              <div className={styles.create}>
                <button
                  disabled={
                    input.name.length === 0 || Object.keys(errors).length > 0
                  }
                  className={
                    Object.keys(errors).length > 0
                      ? styles.btndisable
                      : styles.btncreate
                  }
                  type={"submit"}
                  value={"Create"}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </form>
        <div>
          <Link to={"/home"}>
            <button>Volver</button>
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
