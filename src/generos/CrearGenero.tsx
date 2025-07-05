import axios from "axios";
import { urlGeneros } from "../utils/endpoints";
import FormularioGeneros from "./FormularioGeneros";
import { generoCreacionDTO } from "./generos.model";
import { useNavigate } from "react-router-dom";
import MostrarErrores from "../utils/MostrarErrores";
import { useState } from "react";

export default function CrearGenero(){
    const navigate = useNavigate();
    const [errores, setErrores] = useState<string[]>([]);

async function crear(genero: generoCreacionDTO) {
    try {
        await axios.post(urlGeneros, genero);
        navigate('/generos');
    } catch (error: any) { // Tipo 'any' para asegurar compatibilidad
        if (axios.isAxiosError(error) && error.response) { // Verifica si es un error de Axios
            setErrores(error.response.data);
        } else {
            setErrores(['Error inesperado']);
        }
    }
}
    return(
        <>
        <h3>Crear Genero</h3>
        <MostrarErrores errores={errores}/>
        <FormularioGeneros modelo={{nombre:''}}

            onSubmit={async valores =>{
                await crear(valores);
            }
            } />
        </>
        )
}
    