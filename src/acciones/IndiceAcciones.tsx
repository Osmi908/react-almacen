import { Link } from "react-router-dom";
import IndiceEntidad from "../utils/IndiceEntidad";
import { accionDTO } from "./acciones.model";
import { urlAcciones, urlActores } from "../utils/endpoints";

export default function IndiceAcciones(){
    return (
        <>
        <IndiceEntidad<accionDTO> url={urlAcciones} 
                urlCrear="acciones/crear" 
                titulo="Acciones" 
                nombreEntidad="Accion">
                     {(acciones,botones)=> <>
            <thead>
            <tr>
                <th></th>
                <th>Nombre</th>
                <th>Padre</th>
            </tr>
            </thead>
            <tbody>
                {acciones?.map(accion=>
                <tr key={accion.id_accion}>
                    <td>
                        {botones(`acciones/editar/${accion.id_accion}`,accion.id_accion)}
                        </td>
                    <td>
                        {accion.nombre}
                    </td>
                    <td>
                        {accion.nombre_padre}
                    </td>
                </tr>)}
            </tbody>
        
            </>}
                </IndiceEntidad>
        
        </>
            )
}