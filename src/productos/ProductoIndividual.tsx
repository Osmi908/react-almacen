import { ProductoDTO } from "./productos.model";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { ChangeEvent, useContext, useState } from "react";
import { Alert, IconButton, Snackbar, Stack, TextField, Tooltip } from "@mui/material";
import { urlCarrito } from "../utils/endpoints";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCartSharp";
import CancelIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";
import { ButtonGroup } from "reactstrap";
import AutenticacionContext from "../auth/AutenticacionContext";
import { CarritoContext, useCarrito } from "../carrito/CarritoContext";
import { CarritoDTO } from "../carrito/carrito.model";

interface ProductoIndividualProps {
  producto: ProductoDTO;
  onAgregarProducto: (producto:CarritoDTO) => void; // Se asegura de recibir el objeto correcto
}

// Estilos para el botón con degradado
const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #ffeb3b 0%, rgb(247, 246, 246) 100%)",
  borderRadius: 12,
  color: "#333",
  fontWeight: "bold",
  fontSize: "12px",
  padding: theme.spacing(1, 2),
  textTransform: "none",
  boxShadow: theme.shadows[2],
  "&:hover": {
    background: "linear-gradient(90deg, rgb(231, 219, 113) 0%, rgb(229, 235, 234) 100%)",
    boxShadow: theme.shadows[4],
  },
}));

export default function ProductoIndividual({ producto, onAgregarProducto }: ProductoIndividualProps) {
  const { setCarritoItems } = useCarrito();
  const { cartCount, setCartCount } = useContext(CarritoContext) ?? { cartCount: 0, setCartCount: () => {} };
  const { claims } = useContext(AutenticacionContext);
  
  const id_usuario = claims.find((claim) => claim.nombre === "sub")?.valor;
  const imagen = producto.url_imagen || `${process.env.PUBLIC_URL}/sinImagen.png`;

  const [cantidad, setCantidad] = useState<number>(1);
  const [agregando, setAgregando] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const manejarClickAgregar = () => setAgregando(true);
  const manejarCancelar = () => setAgregando(false);

  const manejarCambioCantidad = (e: ChangeEvent<HTMLInputElement>) => {
    const valor = Number(e.target.value);
    if (valor >= 1) setCantidad(valor); // Evita valores negativos o cero
  };

  const manejarEnviar = async () => {
    if (!id_usuario) {
      setError("Usuario no autenticado");
      return;
    }

    setLoading(true);
    setError(null);
    setMensaje(null);

    const datos = {
      id_usuario,
      id_producto: producto.id_producto,
      cantidad,
      estado: true,
      nombre_producto: producto.nombre,
    };

    try {
      const response = await axios.post<CarritoDTO>(urlCarrito, datos);

      if (response.status === 200 || response.status === 201) {
        const productoAgregado: CarritoDTO = {
          cantidad: datos.cantidad,
          id_carrito: response.data.id_carrito,
          nombre_producto: datos.nombre_producto,
          id_producto: datos.id_producto,
        };

        setMensaje("¡Elemento agregado al carrito!");
        setCartCount(cartCount + 1);
        setCarritoItems((prev) => [...prev, productoAgregado]);
        console.log("carritoAgregado")
        onAgregarProducto(productoAgregado); // ✅ Se pasa correctamente el objeto
      } else {
        throw new Error("No se pudo agregar el producto.");
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Ocurrió un error desconocido");
      } else {
        setError("Error de conexión con el servidor");
      }
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setAgregando(false);
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" alt={`Imagen de ${producto.nombre}`} image={imagen} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {producto.nombre}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {producto.descripcion}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ backgroundColor: "primary" }}>
          {!agregando ? (
            <GradientButton variant="contained" size="small" onClick={manejarClickAgregar}>
              Agregar a Solicitud
            </GradientButton>
          ) : (
            <Stack direction="row" spacing={2}>
              <TextField
                type="number"
                value={cantidad}
                onChange={manejarCambioCantidad}
                size="small"
                inputProps={{ min: 1 }}
              />
              <ButtonGroup variant="outlined">
                <Tooltip title="Agregar al carrito">
                  <IconButton
                    aria-label="Agregar"
                    color="secondary"
                    onClick={manejarEnviar}
                    disabled={loading} // Deshabilita el botón mientras se envía
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar">
                  <IconButton aria-label="Cancelar" color="default" onClick={manejarCancelar}>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
            </Stack>
          )}
        </CardActions>
      </Card>

      {/* Notificaciones */}
      <Snackbar open={!!mensaje} autoHideDuration={4000} onClose={() => setMensaje(null)}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }} onClose={() => setMensaje(null)}>
          {mensaje}
        </Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError(null)}>
        <Alert severity="error" variant="filled" sx={{ width: "100%" }} onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
