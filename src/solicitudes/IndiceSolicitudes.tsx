import { useContext, useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import ListadoSolicitudes from "./ListadoSolicitudes";
import { obtenerSolicitudesPorUsuario } from "../api/solicitudes"; // Asegúrate de tener esta función
import { SolicitudDTO } from "./solicitudes.model";
import AutenticacionContext from "../auth/AutenticacionContext";

export default function IndiceSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudDTO[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const { claims } = useContext(AutenticacionContext);
  const guidUsuario = claims.find((c) => c.nombre === "sub")?.valor;

  useEffect(() => {
    if (!guidUsuario) {
      setError("Usuario no autenticado");
      setCargando(false);
      return;
    }

    const cargarSolicitudes = async () => {
      try {
        const datos = await obtenerSolicitudesPorUsuario(guidUsuario);
        setSolicitudes(datos);
      } catch (e: any) {
        setError("Error al cargar solicitudes");
      } finally {
        setCargando(false);
      }
    };

    cargarSolicitudes();
  }, [guidUsuario]);

  if (cargando) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Solicitudes
      </Typography>

      {solicitudes.length > 0 ? (
        <ListadoSolicitudes admin={false} titulo="" />
      ) : (
        <Typography variant="body1" color="text.secondary">
          No tienes solicitudes registradas.
        </Typography>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

