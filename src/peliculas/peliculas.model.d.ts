import { generoDTO } from "../generos/generos.model";

export interface pelicula{
    id:number;
    titulo:string;
    poster:string;
}
export interface PeliculaCreacionDTO{
    titulo:string;
    enCines:boolean;
    trailer:string;
    fechaLanzamiento?:Date;
    poster?:File;
    posterURL?:string;
    generosIds?:number[];
    cinesIds?:number[];
}
export interface peliculasPostGetDTO{
    generos:generoDTO[]
}
