import React from "react";
import styles from './paginado.module.css'
export default function Paginado({pokemonsPorPage, paginado, allPokemons }){

    const numerosDePagina= []
    for( let i =1; i<= Math.ceil(allPokemons/pokemonsPorPage); i++){
        numerosDePagina.push(i)
    }

    return(
        <nav className={styles.paginado}>
            {
               numerosDePagina?.map(numero => (
                   <button className={styles.btn} onClick={()=>paginado(numero)}>{numero}</button>
               ))
            }
        </nav>
    )
}



