export interface claim{
    nombre:string;
    valor:string;
}
export interface credencialesUsuario{
    username:string;
    password:string
}
export interface respuestaAutenticacion{
    token?:string;
    expiracion?:Date;
}
export interface usuarioDTO{
    id:string;
    username:string;
}