// src/dashboards/EncargadoDashboard.tsx
import React from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const EncargadoDashboard: React.FC = () => {
  // Datos de ejemplo para solicitudes pendientes
  const solicitudesPendientes = [
    { id: 1, solicitante: "Juan Pérez", fecha: "2025-01-31", prioridad: "Alta" },
    { id: 2, solicitante: "María López", fecha: "2025-01-30", prioridad: "Media" },
    { id: 3, solicitante: "Carlos Ruiz", fecha: "2025-01-29", prioridad: "Baja" },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h5" gutterBottom>
        Panel de Encargado
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Solicitudes Pendientes de Aprobación
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Solicitud</TableCell>
              <TableCell>Solicitante</TableCell>
              <TableCell>Fecha Solicitud</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudesPendientes.map((solicitud) => (
              <TableRow key={solicitud.id}>
                <TableCell>{solicitud.id}</TableCell>
                <TableCell>{solicitud.solicitante}</TableCell>
                <TableCell>{solicitud.fecha}</TableCell>
                <TableCell>{solicitud.prioridad}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                    Aprobar
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Rechazar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default EncargadoDashboard;
