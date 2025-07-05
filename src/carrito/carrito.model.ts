import { generoDTO } from "../generos/generos.model";

export interface Carrito{
    id_carrito:number;
    id_usuario:string;
    id_producto:number;
    cantidad:number;
}
export interface CarritoDTO{
    id_carrito:number;
    nombre_producto:string;
    id_producto:number;
    cantidad:number;
    
}