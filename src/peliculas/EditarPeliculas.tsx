import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/generos.model";
import FormularioPeliculas from "./FormularioPeliculas";

export default function EditarPeliculas(){
    const generosNoSeleccionados:generoDTO[]=[
        {id:2,nombre:'Drama'}]
        
    const generosSeleccionados:generoDTO[]=[
        {id:1,nombre:'Accion'},
        
        {id:3,nombre:'Comedia'}];
        const cinesSeleccionados:cineDTO[]=[
            {id:1,nombre:'Agora'}
        ]    
        const cinesNoSeleccionados:cineDTO[]=[
            {id:2,nombre:'Sambil'}
        ]
    return(
        <><h1>Editar Peliculas</h1>
        <FormularioPeliculas cinesNoSeleccionados={cinesNoSeleccionados} cinesSeleccionados={cinesSeleccionados}
        generosSeleccionados={generosSeleccionados} 
        generosNoSeleccionados={generosNoSeleccionados}
        modelo={{titulo:'SpiderMAn', enCines:true,trailer:''}} onSubmit={valores=>console.log(valores)}></FormularioPeliculas>
        </>
    )
}