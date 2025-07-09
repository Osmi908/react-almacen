import React, { useEffect, useState } from "react";
import {rechazarSolicitud} from "../api/solicitudes";
import Swal from "sweetalert2"; 
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Tooltip, Stack
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";

import { SolicitudDTO } from "./solicitudes.model";
import { obtenerSolicitudesPorTipo } from "../api/solicitudes";

interface Props {
  tipo: "pendientes" | "gestionadas";
}

export default function TablaSolicitudes({ tipo }: Props) {
  const [solicitudes, setSolicitudes] = useState<SolicitudDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarSolicitudes = async () => {
      setLoading(true);
      const data = await obtenerSolicitudesPorTipo(tipo);
      setSolicitudes(data);
      setLoading(false);
    };
    cargarSolicitudes();
  }, [tipo]);

  const verDetalle = (id: number) => {
    console.log("Ver detalle solicitud", id);
  };

  const gestionarSolicitud = (id: number) => {
    console.log("Gestionar solicitud", id);
  };

  const manejarRechazoSolicitud = (id: number) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Deseas rechazar esta solicitud?",
    icon: "warning",
    showCancelButton: true,
    input: "text",
    inputPlaceholder: "Motivo del rechazo",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, rechazar",
    cancelButtonText: "Cancelar",
    inputValidator: (value) => {
  if (!value) {
    return "Debes ingresar un motivo de rechazo";
  }
  return null;
}
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      console.log("Solicitud rechazada por:", result.value);
      
      // Aquí llamas a la función que hace el rechazo real
      rechazarSolicitud(id, result.value)
        .then(() => {
          Swal.fire("Rechazada", "La solicitud fue rechazada correctamente.", "success");
        })
        .catch((error) => {
          console.error("Error al rechazar solicitud:", error);
          Swal.fire("Error", "No se pudo rechazar la solicitud.", "error");
        });
    }
  });
};

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Solicitante</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>Cargando...</TableCell>
            </TableRow>
          ) : (
            solicitudes.map((sol) => (
              <TableRow key={sol.id_solicitud}>
                <TableCell>{sol.id_solicitud}</TableCell>
                <TableCell>{sol.fecha_solicitud?.toString().split("T")[0]}</TableCell>
                <TableCell>{sol.nombre_usuario_solicitud}</TableCell>
                <TableCell>{sol.estado}</TableCell>
                <TableCell>{sol.descripcion}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Ver detalle">
                      <IconButton size="small" color="primary" onClick={() => verDetalle(sol.id_solicitud)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    {tipo === "pendientes" && (
                      <>
                        <Tooltip title="Gestionar">
                          <IconButton size="small" color="success" onClick={() => gestionarSolicitud(sol.id_solicitud)}>
                            <SettingsIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Rechazar">
                          <IconButton size="small" color="error" onClick={() => manejarRechazoSolicitud(sol.id_solicitud)}>
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
