import React from "react";
import styles from "./error.module.css";
import notfound from "../img/notfound.jpg";
import { useDispatch } from "react-redux";
import { back } from '../../redux/actions.js'
export default function Error() {
let dispatch = useDispatch()

const handleBack = (e) =>{
  e.preventDefault()
  dispatch(back())
}
  return (
    <div className={styles.div}>
      <button 
      className={styles.btn}
      onClick={(e)=>handleBack(e)}
      >
        Lo sentimos, ese pokemon no existe. ¡Vuelve al home!
      </button>
      <img src={notfound} alt="notfound" className={styles.notfound} />
    </div>
  );
}
