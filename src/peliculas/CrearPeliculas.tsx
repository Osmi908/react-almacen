
import { FormikHelpers } from "formik";
import { generoDTO } from "../generos/generos.model";
import FormularioPeliculas from "./FormularioPeliculas";
import { PeliculaCreacionDTO } from "./peliculas.model";
import { cineDTO } from "../cines/cines.model";
export default function CrearPeliculas(){
    const generos:generoDTO[]=[
        {id:1,nombre:'Accion'},
        {id:2,nombre:'Drama'},
        {id:3,nombre:'Comedia'}];

    const cines:cineDTO[]=[
        {id:1,nombre:'Agora'},{id:2,nombre:'Sambil'}
    ]
    return(
        <><h1>Crear Peliculas</h1>
        <FormularioPeliculas modelo={{ titulo: '', enCines: false, trailer: '' }} onSubmit={(valores)=>{console.log(valores)
            } } generosSeleccionados={generos} generosNoSeleccionados={[]} cinesSeleccionados={[]} cinesNoSeleccionados={cines}/>
        </>
    )
}