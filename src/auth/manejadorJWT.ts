import { claim, respuestaAutenticacion } from "./auth.model";
const llaveToken="Token";
const llaveExpiracion="Expiration"
export function guardarTokenLocalStorage(autenticacion:respuestaAutenticacion){
    localStorage.setItem(llaveToken,autenticacion.token||'');
    localStorage.setItem(llaveExpiracion, autenticacion.expiracion?.toISOString() || '');
}
export function obtenerClaims() : claim[]{
    const token=localStorage.getItem(llaveToken);
    if (!token) {
        return [];
    }
    const expiracion=localStorage.getItem(llaveExpiracion)!;
    const expiracionFecha=new Date(expiracion);
    if (expiracionFecha<= new Date()) {
        console.log(expiracionFecha + "<=" + new Date())

        logout();
        return[];
    }
    const dataToken=JSON.parse(atob(token.split(".")[1]));
    const respuesta:claim[]=[];
    for(const propiedad in dataToken){
        respuesta.push({nombre:propiedad,valor:dataToken[propiedad]});
    }
    return respuesta;

}
export function logout(){
    localStorage.removeItem(llaveToken);
    localStorage.removeItem(llaveExpiracion);
}