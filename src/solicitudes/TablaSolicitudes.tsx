import React, { useEffect, useState } from "react";
import {
  Box, Button, Stack, Tooltip, IconButton
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";

import { SolicitudDTO } from "./solicitudes.model";
import { obtenerSolicitudes, obtenerSolicitudesPorTipo } from "../api/solicitudes";

interface Props {
  tipo: "pendientes" | "gestionadas";
}

export default function TablaSolicitudes({ tipo }: Props) {
  const [solicitudes, setSolicitudes] = useState<SolicitudDTO[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cargarSolicitudes = async () => {
      setLoading(true);
      const data = await obtenerSolicitudesPorTipo(tipo); // Aquí filtras en el servicio
      setSolicitudes(data);
      setLoading(false);
    };
    cargarSolicitudes();
  }, [tipo]);

  const columnas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "fecha", headerName: "Fecha", width: 130 },
    { field: "solicitante", headerName: "Solicitante", flex: 1 },
    { field: "estado", headerName: "Estado", width: 150 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 180,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Ver detalle">
            <IconButton size="small" color="primary" onClick={() => verDetalle(row.id)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {tipo === "pendientes" && (
            <>
              <Tooltip title="Gestionar">
                <IconButton size="small" color="success" onClick={() => gestionarSolicitud(row.id)}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Rechazar">
                <IconButton size="small" color="error" onClick={() => rechazarSolicitud(row.id)}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Stack>
      )
    }
  ];

  const verDetalle = (id: number) => {
    console.log("Ver detalle solicitud", id);
    // Navegación a componente de detalle
  };

  const gestionarSolicitud = (id: number) => {
    console.log("Gestionar solicitud", id);
    // Redirigir a componente de gestión
  };

  const rechazarSolicitud = (id: number) => {
    if (confirm("¿Deseas rechazar esta solicitud?")) {
      console.log("Solicitud rechazada:", id);
      // Llamar API para cambiar estado
    }
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={solicitudes}
        columns={columnas}
        loading={loading}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
