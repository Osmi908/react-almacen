import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoriaDTO, categoriaCreacionDTO } from "./Categorias.model";
import {
  obtenerCategorias,
  crearCategoria,
} from "../api/categorias";

import {
  Button, TextField, Box,
  Typography, Paper, Stack,
  FormControl, InputLabel, Select, MenuItem as MenuItem1,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { nullable } from "zod";

const schema = yup.object({
  nombre: yup.string().required("Nombre es obligatorio").max(100),
  descripcion: yup.string().required("Descripción es obligatoria").max(255),
  id_categoria_padre: yup.number().nullable(),
});

type FormData = categoriaCreacionDTO & { id_categoria_padre?: number | null };

export default function CrearCategoria() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<categoriaDTO[]>([]);
  const [cargando, setCargando] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { nombre: "", descripcion: "", id_categoria_padre: 0 }
  });
const [mensaje, setMensaje] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState<"success" | "error">("success");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  useEffect(() => {
    obtenerCategorias(1, 1000) // carga todas las categorías como posibles padres
      .then(res => setCategorias(res.datos))
      .catch(() => {setMensaje("no se pudo cargar ...");setTipoAlerta("error");
    setMostrarAlerta(true);})
  }, []);
const mostrarMensaje = (texto: string, tipo: "success" | "error") => {
    setMensaje(texto);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);
  };
  const onSubmit = async (data: categoriaCreacionDTO) => {
    setCargando(true);
    try {
      await crearCategoria(data);
      mostrarMensaje("Categoría creada correctamente", "success");
      reset();
      setTimeout(() => navigate("/categorias"), 1500); // redirige luego de éxito
    } catch (error: any) {
      mostrarMensaje(error.message || "Error al crear categoría", "error");
    } finally {
      setCargando(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Crear Categoría / Subcategoría
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Nombre"
            {...register("nombre")}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
            fullWidth
          />
          <TextField
            label="Descripción"
            {...register("descripcion")}
            error={!!errors.descripcion}
            helperText={errors.descripcion?.message}
            fullWidth
            multiline rows={3}
          />

          <FormControl fullWidth>
            <InputLabel>Categoría Padre</InputLabel>
            <Controller
              name="id_categoria_padre"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Categoría Padre">
                  <MenuItem value={0}>— Sin Padre —</MenuItem>
                  {categorias.map(c => (
                    <MenuItem key={c.id_categoria} value={c.id_categoria}>
                      {c.nombre}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
                                                          
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={cargando}>
              {cargando ? "Guardando..." : "Guardar"}
            </Button>
            <Button variant="outlined" onClick={() => reset()} disabled={cargando}>
              Limpiar
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Snackbar
        open={mostrarAlerta}
        autoHideDuration={4000}
        onClose={() => setMostrarAlerta(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setMostrarAlerta(false)} severity={tipoAlerta} sx={{ width: "100%" }}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Paper>
    
  );
}
