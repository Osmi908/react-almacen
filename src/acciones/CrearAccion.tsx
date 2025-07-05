import FormularioGenerico from "../utils/FormularioGenerico";
import FormularioAcciones from "./FormularioAcciones";

export default function CrearAccion(props:crearAccionProps)
{
    return<FormularioGenerico title={"Crear Acciones"} ><FormularioAcciones></FormularioAcciones></FormularioGenerico>
}
interface crearAccionProps{

}