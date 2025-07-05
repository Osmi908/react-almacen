
import FormularioSolicitudes from "./FormularioSolicitudes";
import { CarritoProvider } from "../carrito/CarritoContext";
import FormularioSolicitud from "./FormularioSolicitud";
import FormularioGenerico from "../utils/FormularioGenerico";

export default function CrearSolicitud() {

  return (
      <CarritoProvider>
        <FormularioGenerico title={"Solicitud de Activos"} >
        <FormularioSolicitud/>
        </FormularioGenerico>
        
      </CarritoProvider>
  );
}

