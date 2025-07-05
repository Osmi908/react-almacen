
// import { urlCarrito, urlSolicitudes } from '../utils/endpoints';
// import { CarritoDTO } from '../carrito/carrito.model';
// import { DetalleSolicitudDTO, SolicitudCreacionDTO } from './solicitud.model';
// import { useCarrito } from '../carrito/CarritoContext';
// import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
// import ListadoActivos from '../activos/ListadoActivos';
// import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
// import React, { useContext, useEffect, useState } from 'react';
// import { useForm,useFieldArray,SubmitHandler, Controller } from "react-hook-form";
// import { solicitudActivosSchema } from "../Validaciones";
// import {yupResolver} from '@hookform/resolvers/yup';
// import AutenticacionContext from '../auth/AutenticacionContext';
// import axios from 'axios';

// export default function FormularioSolicitudes() {
//   const [errores, setErrores] = useState<string[]>([]);
//   var userId:string="";
//   const { claims } = useContext(AutenticacionContext);
//   const userClaim = claims.find(claim => claim.nombre === 'sub');
//     useEffect(() => {
    
//     if (userClaim) {
//       userId = userClaim.valor;
//       axios
//         .get<CarritoDTO[]>(`${urlCarrito}/${userId}`)
//         .then(response => {setCartItems(response.data);setCarritoItems(response.data)} )
//         .catch(error => console.log('Error cargando el carrito:', error));
//     }
//   }, [claims]);
//   const borrarItemCarrito = (id: number) => {
//         axios.delete(`${urlCarrito}/${id}`)
//         .then(()=>{setCartItems(prevItems=>prevItems.filter(item=>item.id_carrito!==id)); setCarritoItems(prevItems=>prevItems.filter(item=>item.id_carrito!==id))})
//         .catch();
//       };
//   const [carItems, setCartItems] = useState<CarritoDTO[]>([]);
//   const handleQuantityChange = (id: number, nuevaCantidad: number) => { console.log(id+" "+nuevaCantidad)
//         setCartItems(prev =>
//           prev.map(item => (item.id_carrito === id ? { ...item, cantidad: nuevaCantidad } : item))
//         );
//         setCarritoItems(prev =>
//           prev.map(item => (item.id_carrito === id ? { ...item, cantidad: nuevaCantidad } : item)))
//       };
//       const [openModal, setOpenModal] = useState<boolean>(false);
//   const {carritoItems,setCarritoItems}=useCarrito();
//   const handleAddAsset = () => {
 
//   setOpenModal(true);
//   };
//   const handleAssetSelected = (asset: CarritoDTO) => {
//         // Se añade el activo a la lista; si ya existe se podría actualizar la cantidad
//         setCarritoItems(prev => [...prev, asset]);
//         setOpenModal(false);
//       };
//   const {control, register,handleSubmit,formState:{errors}} =useForm<SolicitudCreacionDTO>({
    
//     defaultValues:{
//       fecha_entrega_deseada:'',
//       cla_prioridad_solicitud:0,
//       descripcion:'',
//       detalles:[{id_activo:0,cantidad:0}],
//     },
//     resolver:yupResolver(solicitudActivosSchema),
//   });
//   const {fields,append,remove}=useFieldArray({
//     control,
//     name:'detalles',
//   });
//   const onSubmit:SubmitHandler<SolicitudCreacionDTO>=async(data)=>{
//     console.log('Solicitud enviada:' + data);
//     const userClaim = claims.find(claim => claim.nombre === 'sub');
//     if (userClaim) {
//            const userId = userClaim.valor;
//            data.usuario_solicitud=userId;
//            data.cla_estado_solicitud=1;
//            data.fecha_solicitud=new Date().toString();
//           axios
//             .post(`${urlSolicitudes}`, data)
//             .then(response => {
//               console.log('Solicitud enviada:', response.data);
//             })
//             .catch(error => console.error('Error enviando la solicitud:', error));
//   }

// };
// return(<Paper sx={{ p: 3, m: 2 }}>
//   <Typography variant="h5" gutterBottom>
//     Crear Solicitud de Activos
//   </Typography>
//   <Box component="form" onSubmit={handleSubmit(onSubmit)}>
//     <Controller
//     name="descripcion"
//     control={control}
    
//   rules={{ required: 'Este campo es obligatorio' }}
//     render={({field})=>(
//       <TextField
//       {...field}
//       label="Descripción de la Solicitud"
//       fullWidth
//       multiline
//       rows={2}
//       error={!!errors.descripcion}
//       sx={{ mb: 2 }}
//     />
//     )}/>
//     <Controller 
//     name="fecha_entrega_deseada"
//     control={control}
    
//   rules={{ required: 'Este campo es obligatorio' }}
//     render={({field})=>(
//       <TextField
//       {...field}
//       label="Fecha Deseada"
//       type="date"
//       fullWidth
//       error={!!errors.fecha_entrega_deseada}
//       InputLabelProps={{ shrink: true }}
//       sx={{ mb: 2 }}
//     />)}
//     />
   
//     <FormControl fullWidth sx={{ mb: 2 }}
//     error={!!errors.cla_prioridad_solicitud}
//     >
//       <InputLabel id="prioridad-label">Prioridad</InputLabel>
//       <Controller
//   name="cla_prioridad_solicitud"
//   control={control}
//   rules={{ required: 'Este campo es obligatorio' }}
//   render={({ field }) => (
//       <Select
//         {...field}
//         labelId="prioridad-label"
//         label="Prioridad">
//         <MenuItem value="0"><em>Seleccione la prioridad</em></MenuItem>
//         <MenuItem value="1">Alta</MenuItem>
//         <MenuItem value="2">Media</MenuItem>
//         <MenuItem value="3">Baja</MenuItem>
//       </Select>)}/>
//       {errors.cla_prioridad_solicitud && <FormHelperText>{errors.cla_prioridad_solicitud.message}</FormHelperText>}
//       </FormControl>
//     <Button
//       variant="contained"
//       startIcon={<AddIcon />}
//       onClick={handleAddAsset}
//       sx={{ mb: 2 }}
//     >
//       Agregar Activo
//     </Button>

//     { (
//       <TableContainer component={Paper} sx={{ mb: 2 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Activo</TableCell>
//               <TableCell>Cantidad</TableCell>
//               <TableCell align="center">Acciones</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {carritoItems.map((item) => (
//               <TableRow key={item.id_carrito}>
//                 <TableCell>{item.nombre_activo}</TableCell>
//                 <TableCell>
//                   <TextField
//                     type="number"
//                     value={item.cantidad}
//                     onChange={(e) =>
//                       handleQuantityChange(
//                         item.id_carrito,
//                         parseInt(e.target.value, 10) || 1
//                       )
//                     }
//                     inputProps={{ min: 1 }}
//                     size="small"
//                   />
//                 </TableCell>
//                 <TableCell align="center">
//                   <IconButton onClick={() => borrarItemCarrito(item.id_carrito)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     )}
//     <Button type="submit" variant="contained" color="primary">
//       Enviar Solicitud
//     </Button>
//   </Box>

//   {/* Modal para seleccionar activos */}
//   <Dialog
//     open={openModal}
//     onClose={() => {setOpenModal(false);setCarritoItems([]) }}
//     fullWidth
//     maxWidth="md"
//   >
//     <DialogTitle>Seleccionar Activo</DialogTitle>
//     <DialogContent>
//       {/* Se espera que ListadoActivos reciba un prop onSelect para devolver el activo seleccionado */}
//       <ListadoActivos  onActivoAgregado={handleAssetSelected} />
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={() => setOpenModal(false)} color="secondary">
//         Cancelar
//       </Button>
//     </DialogActions>
//   </Dialog>
// </Paper>)
// }
export default function FormularioSolicitudes() {return <></>}