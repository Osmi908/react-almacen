import { date } from "yup";
import FormularioActores from "./FormularioActores";
import { urlActores } from "../utils/endpoints";
import axios from "axios";
import { actorCreacionDTO } from "./actores.model";
import { useNavigate } from "react-router-dom";
import MostrarErrores from "../utils/MostrarErrores";
import { useState } from "react";
import { convertirActorAFormData } from "../utils/FormDataUtils";

export default function CrearActores(){
    const [errores,setErrores]=useState<string[]>([]);
    const navigate = useNavigate();
    async function crear(actor:actorCreacionDTO){
        try {
            const formData=convertirActorAFormData(actor);
            await axios({
                method:'post',
                url:urlActores,
                data:formData,
                headers:{'Content-Type':'multipart/form-data'}
            });
            navigate('/actores')
        } catch (error:any) {
            setErrores(error.response.data)
        }
    }
    return(
    <>
       <h3>Crear Actores</h3>
       <MostrarErrores errores={errores}/>
        <FormularioActores 
        modelo={{nombre:'',fechaNacimiento:new Date('1996-12-12T:00:00:00'), fotoURL:''}}
        onSubmit={async valores=>await crear(valores)}/>

    </>
         )
}