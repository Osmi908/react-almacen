// src/dashboards/AsistenteDashboard.tsx
import React from "react";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";

const AsistenteDashboard: React.FC = () => {
  // Datos de ejemplo para tareas asignadas
  const tareas = [
    { id: 1, descripcion: "Preparar entrega para Solicitud #1", fecha: "2025-02-01" },
    { id: 2, descripcion: "Verificar inventario para Solicitud #2", fecha: "2025-02-02" },
    { id: 3, descripcion: "Registrar entrega de activos para Solicitud #3", fecha: "2025-02-03" },
  ];

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h5" gutterBottom>
        Panel de Asistente
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Tareas Asignadas
      </Typography>
      <List>
        {tareas.map((tarea, index) => (
          <React.Fragment key={tarea.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={tarea.descripcion}
                secondary={`Fecha asignada: ${tarea.fecha}`}
              />
              <Button variant="contained" color="primary" size="small">
                Iniciar
              </Button>
            </ListItem>
            {index < tareas.length - 1 && <Divider component="li" />}         </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default AsistenteDashboard;
