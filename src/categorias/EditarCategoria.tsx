//import { useParams } from "react-router-dom"
import FormularioCategorias from "./FormularioCategorias";
import { categoriaCreacionDTO, categoriaDTO } from "./Categorias.model";
import { urlGeneros } from "../utils/endpoints";
import EditarEntidad from "../utils/EditarEntidad";

export default function EditarGenero() {
    return (
        <>
            <EditarEntidad<categoriaCreacionDTO, categoriaDTO>
                url={urlGeneros} 
                urlIndice="/generos" 
                nombreEntidad="Géneros"
                transformar={(categoria: categoriaDTO) => {
                    return {
                        nombre: categoria.nombre,
                        descripcion: ''
                        // Agrega otras propiedades necesarias de generoDTO a generoCreacionDTO
                    };
                }}
                children={(entidad, editar) => (
                    <FormularioCategorias 
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
