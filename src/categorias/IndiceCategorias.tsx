import { useEffect, useState } from "react";
import {
  Box, Typography, IconButton, Stack, Paper, Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Snackbar, Alert
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { eliminarCategoria, obtenerCategorias } from "../api/categorias";
import { categoriaDTO } from "./Categorias.model";
import { useNavigate } from "react-router-dom";

interface CategoriaConHijos extends categoriaDTO {
  hijos: CategoriaConHijos[];
}

export default function IndiceCategorias() {
  const [categorias, setCategorias] = useState<CategoriaConHijos[]>([]);
  const [error, setError] = useState("");
  const [mostrarError, setMostrarError] = useState(false);
  const navigate = useNavigate();

  const [dialogoEliminar, setDialogoEliminar] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null,
  });

  const confirmarEliminar = (id: number) => setDialogoEliminar({ open: true, id });
  const cancelarEliminar = () => setDialogoEliminar({ open: false, id: null });

  const ejecutarEliminar = async () => {
    if (dialogoEliminar.id == null) return;
    try {
      await eliminarCategoria(dialogoEliminar.id);
      cargarCategorias();
    } catch (e: any) {
      if (e.response?.status === 409) {
        setError("No se puede eliminar la categoría: tiene subcategorías o productos relacionados.");
      } else {
        setError("No se pudo eliminar la categoría.");
      }
      setMostrarError(true);
    } finally {
      cancelarEliminar();
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    try {
      const res = await obtenerCategorias(1, 1000);
      const jerarquia = construirJerarquia(res.datos);
      setCategorias(jerarquia);
    } catch {
      setError("Error al cargar categorías");
      setMostrarError(true);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Categorías
      </Typography>

      <Stack spacing={2}>
        {categorias.map(cat => (
          <CategoriaItem
            key={cat.id_categoria}
            categoria={cat}
            onEditar={navigate}
            onEliminar={confirmarEliminar}
          />
        ))}
      </Stack>

      {/* Dialogo de confirmación */}
      <Dialog open={dialogoEliminar.open} onClose={cancelarEliminar}>
        <DialogTitle>¿Eliminar categoría?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Esta acción no se puede deshacer. ¿Estás seguro que deseas eliminar esta categoría?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelarEliminar}>Cancelar</Button>
          <Button onClick={ejecutarEliminar} autoFocus color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={mostrarError} autoHideDuration={4000} onClose={() => setMostrarError(false)}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}

function CategoriaItem({
  categoria,
  nivel = 0,
  onEditar,
  onEliminar,
}: {
  categoria: CategoriaConHijos;
  nivel?: number;
  onEditar: (url: string) => void;
  onEliminar: (id: number) => void;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        pl: nivel * 4,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>{categoria.nombre}</Typography>
      <Stack direction="row" spacing={1}>
        <IconButton color="primary" onClick={() => onEditar(`/categorias/editar/${categoria.id_categoria}`)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onEliminar(categoria.id_categoria)}>
          <Delete />
        </IconButton>
      </Stack>

      {categoria.hijos.length > 0 && (
        <Stack spacing={1} sx={{ width: "100%" }}>
          {categoria.hijos.map(hijo => (
            <CategoriaItem
              key={hijo.id_categoria}
              categoria={hijo}
              nivel={nivel + 1}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
}

function construirJerarquia(categorias: categoriaDTO[]): CategoriaConHijos[] {
  const mapa = new Map<number, CategoriaConHijos>();
  const raiz: CategoriaConHijos[] = [];

  categorias.forEach(cat => {
    mapa.set(cat.id_categoria, { ...cat, hijos: [] });
  });

  categorias.forEach(cat => {
    if (cat.id_categoria_padre && mapa.has(cat.id_categoria_padre)) {
      mapa.get(cat.id_categoria_padre)!.hijos.push(mapa.get(cat.id_categoria)!);
    } else {
      raiz.push(mapa.get(cat.id_categoria)!);
    }
  });

  return raiz;
}
