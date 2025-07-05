export interface accionDTO{
    id_accion:number;
    nombre:string;
    ruta:string;
    id_padre:number;
    nombre_padre:string;
    RoleId:Guid;
    descripcion:string
}
export interface accionCreacionDTO{
    nombre:number;
    nombre:string;
    ruta:string;
    id_padre:number;
    RoleId:Guid;
    descripcion:string

}