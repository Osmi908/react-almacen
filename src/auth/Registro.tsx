import axios from "axios";
import { urlCuentas } from "../utils/endpoints";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import { useContext, useState } from "react";
import MostrarErrores from "../utils/MostrarErrores";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";
import AutenticacionContext from "./AutenticacionContext";
import { useNavigate } from "react-router-dom";

export default function Registro(){
    const navigate = useNavigate();
    const {actualizar}=useContext(AutenticacionContext);
    const [errores,setErrores]=useState<string[]>([]);
    async function registrar(credenciales:credencialesUsuario){
       
        try {
            const respuesta= await axios.post<respuestaAutenticacion>(`${urlCuentas}/registro`,credenciales);
            guardarTokenLocalStorage(respuesta.data);
            actualizar(obtenerClaims());
            navigate("/");
            console.log(respuesta.data);
        } catch (error: any) {
            if (error.response && error.response.data) {
                setErrores(error.response.data);
            } else {
                console.error("Error inesperado:", error);
                setErrores(["Ocurrió un error inesperado. Por favor, inténtalo nuevamente."]);
            }
        }
    }
    return(
        <><h3>
            REGISTRO
        </h3>
        <MostrarErrores errores={errores}/>
        <FormularioAuth modelo={{username:'',password:''} } onSubmit={async valores=> await registrar(valores)}></FormularioAuth>
    
        </>
        )

}