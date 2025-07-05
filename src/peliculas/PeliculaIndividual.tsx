import {pelicula} from "./peliculas.model";
import css from './PeliculaIndividual.module.css'
import { Link } from "react-router-dom";
export default function PeliculaIndividual(props:peliculaIndividualProps){
    const construirLink=()=>`/pelicula/${props.pelicula.id}`
    return (
        <div className={css.div}>
            <Link to={construirLink()}>
                <img src={props.pelicula.poster} alt="Poster"></img>
            </Link>
            <p >
                <Link to={construirLink()}>{props.pelicula.titulo}</Link>
            </p>
        </div>
    )
}

interface peliculaIndividualProps{
    pelicula:pelicula;
}