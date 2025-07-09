import React, { useEffect, useState } from "react";
import {
  Box, Tabs, Tab, Button, Typography, Divider, Stack
} from "@mui/material";
import PendingIcon from "@mui/icons-material/HourglassTop";
import DoneIcon from "@mui/icons-material/TaskAlt";
import InventoryIcon from "@mui/icons-material/Inventory";

import TablaSolicitudes from "./TablaSolicitudes";
import { verificarDisponibilidadGlobal } from "./VerificarDisponibilidad";

export default function GestionSolicitudes() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (_e: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Gestión de Solicitudes de Producto
      </Typography>

      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Tabs value={tabIndex} onChange={handleChangeTab}>
          <Tab icon={<PendingIcon />} label="Pendientes" />
          <Tab icon={<DoneIcon />} label="Gestionadas" />
        </Tabs>
        <Button
          variant="outlined"
          startIcon={<InventoryIcon />}
          onClick={verificarDisponibilidadGlobal}
        >
          Verificar Stock Global
        </Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {tabIndex === 0 ? (
        <TablaSolicitudes tipo="pendientes" />
      ) : (
        <TablaSolicitudes tipo="gestionadas" />
      )}
    </Box>
  );
}
