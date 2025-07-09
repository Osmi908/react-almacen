
import { z } from "zod";

// Esquema de detalle de productos
export const detalleSolicitudSchema = z.object({
  id_producto: z.number(),
  nombre_producto: z.string(),
  cantidad: z.number().positive(), // Cantidad solicitada debe ser positiva
});

// Esquema principal de solicitud
export const solicitudSchema = z.object({
  id_solicitud: z.number(),
  usuario_solicitud: z.string(),
  usuario_revisor: z.string(),
  descripcion: z.string(),
  cla_estado_solicitud: z.number(),
  cla_prioridad_solicitud: z.number(),
  fecha_entrega_deseada: z.string(),
  fecha_solicitud: z.string(),
  detalles: z.array(detalleSolicitudSchema), // Array de detalles
});

// Inferir el tipo a partir del esquema Zod


export interface Solicitud{
    id_solicitud:number;
    usuario_solicitud:string;
    usuario_revisor:string;
    descripcion:string;
    cla_estado_solicitud:number;
    cla_prioridad_solicitud:number;
    fecha_entrega_deseada:string;
    fecha_solicitud:string;
    justificacion_estado?: string;
    detalles:DetalleSolicitud[]
}
export interface SolicitudDTO{
    id_solicitud:number;
    usuario_solicitud:string;
    nombre_usuario_solicitud:string;
    usuario_revisor:string;
    nombre_usuario_revisor:string;
    descripcion:string;
    cla_estado_solicitud:number;
    estado:string;
    nombre_estado:string;
    cla_prioridad_solicitud:number;
    prioridad:string;
    fecha_entrega_deseada:string;
    fecha_solicitud:string;
    justificacion_estado?: string;
}
export interface SolicitudCreacionDTO {
    cla_estado_solicitud: number;
    cla_prioridad_solicitud: number;
    usuario_solicitud: string;
    descripcion: string;
    fecha_entrega_deseada: string;
    fecha_solicitud: string;
    detalles?: DetalleSolicitudCreacionDTO[];
  }
  
  export interface DetalleSolicitudDTO {
    id_detalle_solicitud:number;
    id_producto: number;
    nombre_producto:string;
    cantidad: number;
  }
  export interface DetalleSolicitudCreacionDTO {
    id_producto: number;
    cantidad: number;
  }




  
