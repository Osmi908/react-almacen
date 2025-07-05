import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { GetCategorias, obtenerCategorias } from "../api/categorias"; // 🔁 llamada centralizada
import { categoriaDTO as Categoria, categoriaDTO } from "../categorias/Categorias.model";

import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownwardSharp";

interface FiltroProductosForm {
  nombre: string;
  categoriaId: number | "";
  estado: string;
}

interface FiltroProductosProps {
  onFiltrar: (filtros: FiltroProductosForm) => void;
}

export default function FiltroProductos({ onFiltrar }: FiltroProductosProps) {
  const { control, handleSubmit, reset } = useForm<FiltroProductosForm>();
  const [categorias, setCategorias] = useState<categoriaDTO[]>([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);
  const [errorCategorias, setErrorCategorias] = useState("");

  useEffect(() => {
    GetCategorias() // 🟡 asumiendo que no tienes más de 1000 categorías
      .then((res) => setCategorias(res.datos))
      .catch(() => setErrorCategorias("No se pudieron cargar las categorías."))
      .finally(() => setCargandoCategorias(false));
  }, []);

  const onSubmit = (data: FiltroProductosForm) => {
    onFiltrar(data);
  };

  return (
    <Accordion sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
          <TuneIcon /> Filtrar Productos
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="nombre"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Buscar por nombre" variant="outlined" fullWidth />
                )}
              />

              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Controller
                  name="categoriaId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="Categoría">
                      <MenuItem value="">Todas las Categorías</MenuItem>
                      {cargandoCategorias ? (
                        <MenuItem disabled>Cargando categorías...</MenuItem>
                      ) : errorCategorias ? (
                        <MenuItem disabled>{errorCategorias}</MenuItem>
                      ) : (
                        categorias.map((categoria) => (
                          <MenuItem key={categoria.id_categoria} value={categoria.id_categoria}>
                            {categoria.nombre}
                          </MenuItem>
                        ))
                      )}
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Controller
                  name="estado"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="Estado">
                      <MenuItem value="">Todos los Estados</MenuItem>
                      {[
                        { id: "0", nombre: "Nuevo" },
                        { id: "1", nombre: "Usado" },
                        { id: "2", nombre: "Reparación" },
                        { id: "3", nombre: "Mantenimiento" },
                        { id: "4", nombre: "Obsoleto" },
                        { id: "5", nombre: "Retirado" },
                        { id: "6", nombre: "Dañado" },
                        { id: "7", nombre: "Préstamo" },
                      ].map((estado) => (
                        <MenuItem key={estado.id} value={estado.id}>
                          {estado.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  fullWidth
                >
                  Buscar
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="inherit"
                  startIcon={<ClearIcon />}
                  onClick={() => reset()}
                  fullWidth
                >
                  Limpiar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
