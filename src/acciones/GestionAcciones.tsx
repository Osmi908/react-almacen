import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../utils/axiosConfig";
import { Button, TextField, MenuItem, Card, CardContent, Typography } from "@mui/material";
import { urlAcciones } from "../utils/endpoints";

interface ActAccion {
  id?: number;
  nombre: string;
  descripcion: string;
  rol: string;
}

const roles = ["act_encargado", "act_asistente", "act_solicitante", "act_administrador"];

export default function GestionAcciones() {
  const { register, handleSubmit, reset } = useForm<ActAccion>();
  const [acciones, setAcciones] = useState<ActAccion[]>([]);

  useEffect(() => {
    axios.get(`${urlAcciones}`).then(response => setAcciones(response.data));
  }, []);

  const onSubmit = (data: ActAccion) => {
    axios.post("/api/acciones", data).then(() => {
      setAcciones([...acciones, data]);
      reset();
    });
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Gestión de Acciones</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField label="Nombre" {...register("nombre")} fullWidth margin="normal" required />
          <TextField label="Descripción" {...register("descripcion")} fullWidth margin="normal" required />
          <TextField select label="Rol" {...register("rol")} fullWidth margin="normal" required>
            {roles.map(rol => (
              <MenuItem key={rol} value={rol}>{rol}</MenuItem>
            ))}
          </TextField>
          <Button type="submit" variant="contained" color="primary">Guardar</Button>
        </form>
      </CardContent>
    </Card>
  );
}
