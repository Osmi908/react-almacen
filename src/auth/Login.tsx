import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AutenticacionContext from "../auth/AutenticacionContext";
import { guardarTokenLocalStorage, obtenerClaims } from "../auth/manejadorJWT";
import axios from "axios";
import { urlAuth } from "../utils/endpoints";
import { useLoading } from "../LoadingContext";

interface Credenciales {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("El usuario es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria"),
});

export default function Login() {
  const { setLoading } = useLoading();
  const { actualizar } = useContext(AutenticacionContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const parser = new DOMParser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credenciales>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: Credenciales) => {
    setError("");
    try {
      setLoading(true);
      const respuesta = await axios.post(
        `${urlAuth}/ValidateUser`,
        new URLSearchParams({
  username: data.username,
  password: data.password,
}),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      const xml = parser.parseFromString(respuesta.data, "application/xml");
      const token = xml.getElementsByTagName("Token")[0]?.textContent;
      const exp = xml.getElementsByTagName("Expiration")[0]?.textContent;
      if (!token || !exp) throw new Error("Token inválido");

      guardarTokenLocalStorage({ token, expiracion: new Date(exp) });
      actualizar(obtenerClaims());
      navigate("/");
    } catch (e: any) {
      setError("Credenciales inválidas o error de servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0d47a1, #42a5f5)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            borderRadius: 4,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
            boxShadow: 5,
          }}
        >
          <CardContent>
            <Stack spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "primary.main", width: 60, height: 60 }}>
                <LockOutlined fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight="bold">
                Sistema de Inventario
              </Typography>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
              <TextField
                label="Correo institucional"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("username")}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, fontWeight: "bold" }}
              >
                Ingresar
              </Button>
            </Box>
          </CardContent>
        </Card>
        <small> usuario administrador : ABC9861988 pass:9861988 </small>
      <small> usuario solicitante : jparedes pass:6100722 </small>
      <small> usuario encargado de almacen : FBG4800492 pass:4800492</small>
      <small> usuario asistente de encargado :  pass: </small>
      </Container>
      
    </Box>
  );
}
