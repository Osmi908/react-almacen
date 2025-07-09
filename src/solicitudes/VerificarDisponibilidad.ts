import Swal from "sweetalert2";
import { obtenerSolicitudesPorTipo } from "../api/solicitudes";
import { SolicitudDTO } from "./solicitudes.model";

interface ProductoVerificado {
  producto: string;
  solicitado: number;
  disponible: number;
  estado: "OK" | "PARCIAL" | "NO_DISPONIBLE";
}

export async function verificarDisponibilidadGlobal(): Promise<void> {
  const solicitudes: SolicitudDTO[] = await obtenerSolicitudesPorTipo("pendientes");

  const productosAgrupados: { [producto: string]: number } = {};

  solicitudes.forEach((solicitud) => {
    const producto = solicitud.descripcion;
    productosAgrupados[producto] = (productosAgrupados[producto] || 0) + 1;
  });

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

  const htmlResultado = resultado.map((r) =>
    `<tr>
      <td>${r.producto}</td>
      <td style="text-align:center">${r.solicitado}</td>
      <td style="text-align:center">${r.disponible}</td>
      <td style="text-align:center"><b style="color:${r.estado === "OK" ? "green" : r.estado === "PARCIAL" ? "orange" : "red"}">${r.estado}</b></td>
    </tr>`
  ).join("");

  const tablaHtml = `
    <table style="width:100%;border-collapse:collapse" border="1">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Solicitado</th>
          <th>Disponible</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>${htmlResultado}</tbody>
    </table>
  `;

  Swal.fire({
    title: "Disponibilidad Global",
    html: tablaHtml,
    width: 600,
    showCloseButton: true,
    confirmButtonText: "Cerrar",
  });
}
