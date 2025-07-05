
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DeleteIcon from '@mui/icons-material/Delete';
import {TextField,  Button,  Typography,  Box,  Divider,  IconButton,  Paper,  Table,  TableBody,
  TableCell,  TableContainer,  TableHead,  TableRow,  FormControl,  InputLabel,  MenuItem,
  Select,  FormHelperText,  Alert,  Snackbar,
  Fab,
  AlertColor,
  Slide} from "@mui/material";
import { SolicitudCreacionDTO } from "./solicitud.model";
import { CarritoDTO } from "../carrito/carrito.model";
import AutenticacionContext from "../auth/AutenticacionContext";
import axios from "axios";
import { urlCarrito, urlClaveValor, urlSolicitudes } from "../utils/endpoints";
import ModalAgregarProductos from "./ModalAgregarProducto"; // Importar el modal
import { formularioSolicitudSchema } from "../Validaciones";
import AddCircle from "@mui/icons-material/PlaylistAdd";
import { motion } from "framer-motion";
function TransitionSlide(props: any) {
  return <Slide {...props} direction="up" />;
}

const FormularioSolicitud: React.FC = () => {
  
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: "" as AlertColor, texto: "", open: false });
  const { claims } = useContext(AutenticacionContext);
  const usuario = claims.find((c) => c.nombre === 'sub')?.valor || '';
  const { control, handleSubmit, setValue, formState: { errors },reset } = useForm<SolicitudCreacionDTO>({
    defaultValues: {
      cla_prioridad_solicitud: 0,
      usuario_solicitud: usuario,
      descripcion: '',
      fecha_entrega_deseada: '',
      detalles: [],
    },
    resolver: yupResolver(formularioSolicitudSchema),mode:"onChange",
  });

  const { fields, append, remove,update } = useFieldArray({ control, name: 'detalles' });
  const [prioridades, setPrioridades] = useState<{ clv_codigo: number; clv_descripcion: string }[]>([]);
  const handleQuantityChange = (index: number, nuevaCantidad: number) => {
    fields[index].cantidad = nuevaCantidad; // Actualiza localmente
    update(index, { ...fields[index], cantidad: nuevaCantidad }); // Aplica la actualización en el formulario
  };
  
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    axios.get<{ clv_codigo: number; clv_descripcion: string }[]>(`${urlClaveValor}/cla_prioridad_solicitud`)
      .then((response) => {
        setPrioridades(response.data);
      })
      .catch((error) => console.error("Error al obtener prioridades", error));
  }, []);
  useEffect(() => {
    axios.get<CarritoDTO[]>(`${urlCarrito}/${usuario}`)
      .then((response) => {
        setValue('detalles', response.data.map(({ id_producto, cantidad, nombre_producto, id_carrito }) => ({ id_producto, cantidad, nombre_producto,id_carrito })));
      })
      .catch((error) => console.error('Error al obtener detalles', error));
  }, [setValue]);

  const onSubmit = (data: SolicitudCreacionDTO) => {
    console.log(data);
    setLoading(true);
    axios.post(`${urlSolicitudes}`, data, {
      validateStatus: (status) => status >= 200 && status < 300 // Acepta 201 como éxito
    })
    .then((response) => {
      axios.delete(`${urlCarrito}/${usuario}`);
      reset({
      cla_prioridad_solicitud: 0,
      usuario_solicitud: usuario,
      descripcion: '',
      fecha_entrega_deseada: '',
      detalles: []
    });
      setMensaje({ tipo: "success", texto: "Formulario enviado con éxito", open: true });
    })
    .catch((error) => {
      setMensaje({ tipo: "error", texto: "Hubo un error al enviar", open: true });
    })
    .finally(() => setLoading(false));
  };

  const agregarProducto = (producto: CarritoDTO) => {
    append({ id_producto: producto.id_producto, cantidad: producto.cantidad, nombre_producto: producto.nombre_producto,id_carrito:producto.id_carrito });
  };

  return (<>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Dropdown para Prioridad */}
        <Box mb={2}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="prioridad-label">Prioridad de la Solicitud</InputLabel>
            <Controller
              name="cla_prioridad_solicitud"
              control={control}
              render={({ field }) => (
                <Select {...field} labelId="prioridad-label"  error={!!errors.cla_prioridad_solicitud}>
                  <MenuItem key={0} value={0}><em>Seleccione la prioridad</em></MenuItem>
                  {prioridades.map((prioridad) => (
                    <MenuItem key={prioridad.clv_codigo} value={prioridad.clv_codigo}>
                      {prioridad.clv_descripcion}
                    </MenuItem>
                  ))}
                </Select>
                )}  
            />
            <FormHelperText error={!!errors.cla_prioridad_solicitud}> {errors.cla_prioridad_solicitud?.message}</FormHelperText>
          </FormControl>
        </Box>
        {/* Campo de Descripción */}
        <Box mb={2}>
          <Controller
            name="descripcion"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Descripción" fullWidth multiline rows={4} error={!!errors.descripcion} helperText={errors.descripcion?.message} />
            )}
          />
        </Box>

        {/* Campo de Fecha de Entrega Deseada */}
        <Box mb={2}>
          <Controller
            name="fecha_entrega_deseada"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Fecha de Entrega Deseada" type="date" fullWidth InputLabelProps={{ shrink: true }} error={!!errors.fecha_entrega_deseada} helperText={errors.fecha_entrega_deseada?.message} />
            )}
          />
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="h6">Productos solicitados</Typography>
        <Fab aria-label="Agregar Producto" color="secondary" onClick={() =>
         {setModalOpen(true);
        }}>
          <AddCircle/>
        </Fab>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Producto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={field.id_producto}>
                  <TableCell>{field.nombre_producto}</TableCell>
                  <TableCell>
                    <TextField type="number" value={field.cantidad} size="small"  
                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
    inputProps={{ min: 1 }} />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => {
                      setLoading(true);
                      remove(index);axios.delete(`${urlCarrito}/${field.id_carrito}`)
                      .then(()=>{})
                      .catch()
                      .finally();}}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <FormHelperText error={!!errors.detalles}> {errors.detalles?.message}</FormHelperText>
        
        <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth sx={{ mt: 3 }}>
          {loading ? "Enviando solicitud..." : "Enviar solicitud"}
        </Button>
        <Snackbar
       open={mensaje.open}
       onClose={() => setMensaje({ ...mensaje, open: false })}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Alert severity={mensaje.tipo} onClose={() => setMensaje({ ...mensaje, open: false })}>
        {mensaje.texto}</Alert>
      </motion.div>
    </Snackbar>
      </form>
      <ModalAgregarProductos open={modalOpen} onClose={() => setModalOpen(false)} onAgregarProducto={agregarProducto} />
      </>
  

  );
};

export default FormularioSolicitud;
