//import { useParams } from "react-router-dom"
import FormularioGeneros from "./FormularioGeneros";
import { generoCreacionDTO, generoDTO } from "./generos.model";
import { urlGeneros } from "../utils/endpoints";
import EditarEntidad from "../utils/EditarEntidad";

export default function EditarGenero() {
    return (
        <>
            <EditarEntidad<generoCreacionDTO, generoDTO>
                url={urlGeneros} 
                urlIndice="/generos" 
                nombreEntidad="Géneros"
                transformar={(genero: generoDTO) => {
                    return {
                        nombre: genero.nombre,
                        // Agrega otras propiedades necesarias de generoDTO a generoCreacionDTO
                    };
                }}
                children={(entidad, editar) => (
                    <FormularioGeneros 
                        modelo={entidad}
                        onSubmit={async valores => {
                            await editar(valores);
                        }} 
                    />
                )}
            />
        </>
    );
}
