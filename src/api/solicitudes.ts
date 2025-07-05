import { DetalleSolicitudDTO } from "../solicitudes/solicitudes.model";
import axios from "../utils/axiosConfig";
import { SolicitudDTO } from "../solicitudes/solicitudes.model";
import { urlSolicitudes } from "../utils/endpoints"; // Usa el endpoint correcto

// Obtener todas las solicitudes (admin)
export async function obtenerSolicitudes(): Promise<SolicitudDTO[]> {
  const response = await axios.get<SolicitudDTO[]>(`${urlSolicitudes}`);
  return response.data;
}

// Obtener detalles de una solicitud
export async function obtenerDetallesSolicitud(idSolicitud: number): Promise<DetalleSolicitudDTO[]> {
  const response = await axios.get<DetalleSolicitudDTO[]>(`${urlSolicitudes}/${idSolicitud}/detalles`);
  return response.data;
}

export async function obtenerSolicitudesPorUsuario(guid: string): Promise<SolicitudDTO[]> {
  const response = await axios.get<SolicitudDTO[]>(`${urlSolicitudes}/usuario/${guid}`);
  return response.data;}
