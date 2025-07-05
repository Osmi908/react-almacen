import React, { useEffect, useState } from "react";
import {
  Box, TextField, Button, FormControl, InputLabel,
  Select, MenuItem, FormHelperText, Snackbar, Alert, Slide
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { motion } from "framer-motion";
import { ProductoCreacionDTO } from "./productos.model";
import { urlCategorias, urlProductos, urlClaveValor } from "../utils/endpoints";
import  {crearProductoSchema}  from "../Validaciones";
function TransitionSlide(props: any) {
  return <Slide {...props} direction="up" />;
}

type AlertSeverity = "success" | "error" | "info" | "warning";

interface Mensaje {
  tipo: AlertSeverity;
  texto: string;
  open: boolean;
}

const FormularioProducto: React.FC = () => {
  const [categorias, setCategorias] = useState<{ id: number; descripcion: string }[]>([]);
  const [estado, setEstado] = useState<{ clv_codigo: number; clv_descripcion: string }[]>([]);
  const [mensaje, setMensaje] = useState<Mensaje>({ tipo: "success", texto: "", open: false });
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProductoCreacionDTO>({
    defaultValues: {
      id_categoria: 0,
      nombre: "",
      cantidad: 1,
      descripcion: "",
      imagen: undefined,
      url_imagen: "",
      estado: 0,
      codigo: ""
    },
    resolver: yupResolver(crearProductoSchema),
  });

  useEffect(() => {
    axios.get(urlCategorias)
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error al cargar categorías", err));
  }, []);
  useEffect(() => {
    axios.get(`${urlClaveValor}/cla_estado_producto`)
      .then(res => setEstado(res.data))
      .catch(err => console.error("Error al cargar estados", err));
  }, []);
  const onSubmit = (data: ProductoCreacionDTO) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    setLoading(true);
    axios.post(urlProductos, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(() => {
      setMensaje({ tipo: "success", texto: "Producto creado exitosamente", open: true });
      reset();
    }).catch(() => {
      setMensaje({ tipo: "error", texto: "Error al crear el producto", open: true });
    }).finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box mb={2}>
        <FormControl fullWidth error={!!errors.id_categoria}>
          <InputLabel>Categoría</InputLabel>
          <Controller
            name="id_categoria"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Categoría">
                <MenuItem value={0}><em>Seleccione una categoría</em></MenuItem>
                {categorias.map(c => (
                  <MenuItem key={c.id} value={c.id}>{c.descripcion}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.id_categoria?.message}</FormHelperText>
        </FormControl>
      </Box>

      <Box mb={2}>
        <Controller
          name="nombre"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Nombre" fullWidth error={!!errors.nombre} helperText={errors.nombre?.message} />
          )}
        />
      </Box>

      <Box mb={2}>
        <Controller
          name="codigo"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Código" fullWidth error={!!errors.codigo} helperText={errors.codigo?.message} />
          )}
        />
      </Box>

      <Box mb={2}>
        <Controller
          name="cantidad"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Cantidad"
              fullWidth
              inputProps={{ min: 1 }}
              error={!!errors.cantidad}
              helperText={errors.cantidad?.message}
            />
          )}
        />
      </Box>

      <Box mb={2}>
      <FormControl fullWidth error={!!errors.id_categoria}>
          <InputLabel>Categoría</InputLabel>
          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Estado">
                <MenuItem value={0}><em>Seleccione un estado</em></MenuItem>
                {estado.map(c => (
                  <MenuItem key={c.clv_codigo} value={c.clv_codigo}>{c.clv_descripcion}</MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.id_categoria?.message}</FormHelperText>
        </FormControl>
      </Box>

      <Box mb={2}>
        <Controller
          name="descripcion"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Descripción" multiline rows={3} fullWidth error={!!errors.descripcion} helperText={errors.descripcion?.message} />
          )}
        />
      </Box>

      <Box mb={2}>
        <FormControl fullWidth error={!!errors.imagen}>
          <input title="input"
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              setValue("imagen", file);
            }}
          />
          <FormHelperText>{errors.imagen?.message}</FormHelperText>
        </FormControl>
      </Box>

      <Button variant="contained" type="submit" fullWidth disabled={loading}>
        {loading ? "Creando..." : "Crear Producto"}
      </Button>

      <Snackbar
        open={mensaje.open}
        onClose={() => setMensaje({ ...mensaje, open: false })}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={TransitionSlide}
      >
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <Alert severity={mensaje.tipo}>{mensaje.texto}</Alert>
        </motion.div>
      </Snackbar>
    </form>
  );
};

export default FormularioProducto;
