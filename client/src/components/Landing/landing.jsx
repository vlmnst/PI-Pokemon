import { Link } from "react-router-dom";
import styles from "./landing.module.css";
import React from "react";

export default function Landing() {
  return (
    <div className={styles.full}>
   
          <Link to={"/home"}>
            <button className={styles.btn}>HOME</button>
          </Link>
    
    </div>
  );
}
