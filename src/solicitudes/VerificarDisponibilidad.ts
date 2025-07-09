import { obtenerSolicitudesPorTipo } from "../api/solicitudes";
import { SolicitudDTO } from "./solicitudes.model";

interface ProductoVerificado {
  producto: string;
  solicitado: number;
  disponible: number;
  estado: "OK" | "PARCIAL" | "NO_DISPONIBLE";
}

export async function verificarDisponibilidadGlobal(): Promise<ProductoVerificado[]> {
  const solicitudes: SolicitudDTO[] = await obtenerSolicitudesPorTipo("pendientes");

  // Simulación: agrupamos por producto (en este ejemplo simplificado)
  const productosAgrupados: { [producto: string]: number } = {};

  solicitudes.forEach((solicitud) => {
    // Supongamos que la descripción contiene el producto
    const producto = solicitud.descripcion;
    productosAgrupados[producto] = (productosAgrupados[producto] || 0) + 1; // Simula cantidades
  });

  // Simulación de stock actual
  const stockActual: Record<
    "Solicitud de materiales de oficina" | "Materiales para mantenimiento" | "Insumos de laboratorio",
    number
  > = {
    "Solicitud de materiales de oficina": 3,
    "Materiales para mantenimiento": 0,
    "Insumos de laboratorio": 10
  };

  const resultado: ProductoVerificado[] = Object.entries(productosAgrupados).map(([producto, solicitado]) => {
    const disponible = stockActual[producto as keyof typeof stockActual] ?? 0;
    let estado: ProductoVerificado["estado"];

    if (disponible >= solicitado) estado = "OK";
    else if (disponible > 0) estado = "PARCIAL";
    else estado = "NO_DISPONIBLE";

    return { producto, solicitado, disponible, estado };
  });

  return resultado;
}
