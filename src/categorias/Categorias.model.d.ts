export interface categoriaCreacionDTO{
    nombre:string;
    descripcion:string;
    id_categoria_padre?:int

}
export interface categoriaDTO{
    id_categoria:number;
    nombre:string;
    descripcion:string;
    fecha_registro:datetime;
    id_categoria_padre:internal;
    estado:internal;
    fecha_eliminacion:datetime
}